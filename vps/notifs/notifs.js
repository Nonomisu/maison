// Maison — service des notifications push, à lancer sur le VPS avec pm2 (nom : maison-notifs).
//
//   - chaque message de la collection « news » (soirée proposée, petit mot, cœur, mode magasin…) part sur les appareils
//     de son destinataire, si ses réglages le permettent ;
//   - chaque matin à 9 h : rappels des rendez-vous (J-7, J-2, jour J), papiers, agenda, anniversaires, réserves basses ;
//   - à 18 h : tâches du jour pas faites (pour qui l'a demandé) ;
//   - chaque nouvel appareil reçoit une notification de bienvenue.
//
// Clés (jamais dans le dépôt) : DST_KEY = clé de service Firebase du projet maison-6b9f4,
// VAPID_KEY = fichier { publicKey, privateKey } créé une fois avec « npx web-push generate-vapid-keys --json ».
'use strict';
process.env.TZ = 'Europe/Paris';
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const webpush = require('web-push');
const R = require('./regles');

const need = (k) => { const v = process.env[k]; if (!v) { console.error(`Variable ${k} manquante.`); process.exit(1); } return v; };
const key = require(need('DST_KEY')), vapid = require(need('VAPID_KEY'));
if (key.project_id !== 'maison-6b9f4') { console.error(`Clé inattendue (${key.project_id}) : arrêt.`); process.exit(1); }
const APP = 'https://nonomisu.github.io/maison/';
webpush.setVapidDetails(APP, vapid.publicKey, vapid.privateKey);
const db = admin.initializeApp({ credential: admin.credential.cert(key) }, 'maison-notifs').firestore();
const log = (...a) => console.log(new Date().toLocaleString('fr-FR'), ...a);
const PREFS0 = { rdv: true, mot: true, coeur: true, magasin: true, soiree: true, taches: false };

async function prefs(who, test) {
  const s = await db.doc(`${test ? 'test-perso' : 'perso'}/${who}`).get();
  try { return { ...PREFS0, ...((s.exists && JSON.parse(s.data().j).notifOn) || {}) }; } catch (e) { return PREFS0; }
}
async function etat(test) {
  const E = {};
  (await db.collection(test ? 'test-etat' : 'etat').get()).forEach((d) => { try { E[d.id] = JSON.parse(d.data().j); } catch (e) { /* rien */ } });
  return E;
}

// Envoie à tous les appareils de « who » ; supprime les abonnements expirés.
async function sendTo(who, payload, only) {
  const subs = only ? [only] : (await db.collection(`pushSubs/${who}/subs`).get()).docs;
  let sent = 0;
  for (const s of subs) {
    const d = s.data();
    try { await webpush.sendNotification({ endpoint: d.endpoint, keys: d.keys }, JSON.stringify(payload), { TTL: 24 * 3600 }); sent++; }
    catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) { await s.ref.delete(); log(`abonnement expiré supprimé (${who})`); }
      else log(`échec d'envoi à ${who} :`, e.statusCode || '', e.body || e.message);
    }
  }
  return sent;
}
// Une notification qui n'est envoyée qu'une fois (clé gardée dans notifsLog)
async function once(k, who, kind, text, test) {
  const ref = db.doc(`notifsLog/${(test ? 'test-' : '') + k.replace(/\//g, '_')}`);
  if ((await ref.get()).exists) return 0;
  await ref.set({ at: FieldValue.serverTimestamp(), who, text });
  if (!(await prefs(who, test))[kind]) return 0;
  return sendTo(who, { title: (test ? '[Test] ' : '') + 'Maison', body: text, tag: k, url: APP });
}

// ---------- messages immédiats (collection news) ----------
function watchNews() {
  db.collection('news').onSnapshot((snap) => {
    for (const ch of snap.docChanges()) {
      if (ch.type !== 'added') continue;
      const ref = ch.doc.ref;
      setTimeout(async () => {
        const n = await db.runTransaction(async (tx) => { const s = await tx.get(ref); const d = s.exists ? s.data() : null; if (!d || d.pushedAt) return null; tx.update(ref, { pushedAt: FieldValue.serverTimestamp() }); return d; });
        if (!n || !n.to || !n.text) return;
        const age = Date.now() - (n.createdAt && n.createdAt.toMillis ? n.createdAt.toMillis() : Date.now());
        if (age > 6 * 3600e3) return;                                    // trop vieux (service arrêté longtemps) : on ne l'envoie pas
        if (!(await prefs(n.to, n.test))[n.kind || 'mot']) { log(`message pour ${n.to} non envoyé (réglage ${n.kind})`); return; }
        const sent = await sendTo(n.to, { title: (n.test ? '[Test] ' : '') + 'Maison', body: n.text, tag: (n.kind || 'mot') + '-' + ref.id, url: APP });
        log(`message ${n.kind} pour ${n.to} : ${sent} appareil(s)`);
      }, 3000);
    }
  }, (e) => { log('écoute des messages interrompue :', e.message); setTimeout(watchNews, 30000); });
}

// ---------- bienvenue sur un nouvel appareil ----------
function watchSubs() {
  db.collectionGroup('subs').onSnapshot((snap) => {
    for (const ch of snap.docChanges()) {
      if (ch.type !== 'added' || ch.doc.data().welcomedAt) continue;
      const who = ch.doc.ref.parent.parent && ch.doc.ref.parent.parent.id; if (!who) continue;
      (async () => {
        await ch.doc.ref.update({ welcomedAt: FieldValue.serverTimestamp() });
        const sent = await sendTo(who, { title: 'Maison', body: 'Notifications activées : Nahla, Bao et Tsunky te préviendront ici.', tag: 'bienvenue', url: APP }, ch.doc);
        log(`bienvenue envoyée à ${who} (${sent})`);
      })().catch((e) => log('erreur bienvenue', who, e.message));
    }
  }, (e) => { log('écoute des appareils interrompue :', e.message); setTimeout(watchSubs, 30000); });
}

// ---------- rappels programmés ----------
async function tour(now = new Date()) {
  const today = R.isoOf(now), h = now.getHours();
  if (h < 9) return;
  const E = await etat(false);
  if (!Object.keys(E).length) return;                                  // maison pas encore ouverte
  for (const n of R.matin(E, today)) await once(n.key, n.to, n.kind, n.text, false);
  // réserves basses : prévenir une fois quand ça devient bas, recommencer quand ça repasse au-dessus
  const low = R.reserves(E, today), stRef = db.doc('notifsLog/etat-reserves'), prev = ((await stRef.get()).data() || {}).low || {};
  for (const [id, text] of Object.entries(low)) if (!prev[id]) for (const w of ['C', 'E']) await once(`${today}:reserve-${id}:${w}`, w, 'rdv', text, false);
  await stRef.set({ low: Object.fromEntries(Object.keys(low).map((k) => [k, true])) });
  if (h >= 18) {
    const t = R.tachesDuJour(E, today);
    if (t) for (const w of ['C', 'E']) await once(`${today}:taches:${w}`, w, 'taches', t, false);
  }
}
// ménage : messages et journal de plus de 30 jours
async function menage() {
  const lim = admin.firestore.Timestamp.fromMillis(Date.now() - 30 * 864e5);
  for (const c of ['news', 'notifsLog']) {
    const old = await db.collection(c).where(c === 'news' ? 'createdAt' : 'at', '<', lim).limit(200).get();
    for (const d of old.docs) await d.ref.delete();
  }
}

if (require.main !== module) module.exports = { tour, db };   // pour test-service.js
else {
  log('Service des notifications de Maison démarré.');
  watchNews();
  watchSubs();
  setInterval(() => tour().catch((e) => log('erreur rappels', e.message)), 10 * 60e3);
  setTimeout(() => tour().catch((e) => log('erreur rappels', e.message)), 15000);
  setInterval(() => menage().catch((e) => log('erreur ménage', e.message)), 24 * 3600e3);
}
