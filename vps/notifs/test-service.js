// Test du service avec Firestore et web-push simulés (aucun accès réseau) : node test-service.js
'use strict';
const Module = require('module');
let ko = 0; const ok = (c, m) => { console.log((c ? '  ok  ' : '  ÉCHEC ') + m); if (!c) ko++; };
const st = {
  'etat/missions': { j: JSON.stringify([{ id: 'm3', t: 'Vétérinaire : vaccins de Nahla, Tsunky et Bao', type: 'rdv', who: '2', date: '2026-11-20', time: '' }]) },
  'etat/stocks': { j: JSON.stringify([{ id: 'pate', n: 'Pâté', kind: 'count', unit: 'sachet', qty: 5, perDay: 1, low: 7, asOf: '2026-11-18' }]) },
  'etat/litBags': { j: '6' },
  'perso/C': { j: JSON.stringify({ notifOn: { rdv: true } }) },
  'perso/E': { j: JSON.stringify({ notifOn: { rdv: false } }) },
  'pushSubs/C/subs/a': { endpoint: 'https://push/c1', keys: {} },
  'pushSubs/E/subs/b': { endpoint: 'https://push/e1', keys: {} },
};
const sent = [];
const doc = (p) => ({ path: p, get: async () => ({ exists: p in st, data: () => st[p] }), set: async (v) => { st[p] = v; }, update: async (v) => { st[p] = { ...st[p], ...v }; }, delete: async () => { delete st[p]; } });
const coll = (c) => ({ get: async () => { const docs = Object.keys(st).filter((k) => k.startsWith(c + '/') && k.split('/').length === c.split('/').length + 1).map((k) => ({ id: k.split('/').pop(), ref: doc(k), data: () => st[k] })); return { docs, forEach: (f) => docs.forEach(f) }; } });
const db = { doc, collection: coll };
Module._load = ((orig) => function (req, ...r) {
  if (req === 'firebase-admin') return { credential: { cert: (k) => k }, initializeApp: () => ({ firestore: () => db }), firestore: { Timestamp: { fromMillis: (x) => x } } };
  if (req === 'firebase-admin/firestore') return { FieldValue: { serverTimestamp: () => 'ts' } };
  if (req === 'web-push') return { setVapidDetails() {}, sendNotification: async (s, body) => { sent.push({ to: s.endpoint, ...JSON.parse(body) }); } };
  if (/cle\.json$/.test(req)) return { project_id: 'maison-6b9f4' };
  if (/vapid\.json$/.test(req)) return { publicKey: 'p', privateKey: 'k' };
  return orig.call(this, req, ...r);
})(Module._load);
process.env.DST_KEY = '/x/maison-cle.json'; process.env.VAPID_KEY = '/x/maison-vapid.json';
const S = require('./notifs.js');
(async () => {
  await S.tour(new Date(2026, 10, 18, 8, 0));
  ok(sent.length === 0, 'avant 9 h : rien');
  await S.tour(new Date(2026, 10, 18, 9, 5));
  const vac = sent.filter((x) => x.body.includes('vaccins'));
  ok(vac.length === 1 && vac[0].to === 'https://push/c1' && vac[0].body.startsWith('Après-demain (mercredi 18'.replace('mercredi 18', 'vendredi 20')), 'vaccin J-2 envoyé à Co seulement (Emie a coupé les rendez-vous)');
  ok(sent.some((x) => x.body.includes('Pâté')), 'réserve basse envoyée');
  const n = sent.length;
  await S.tour(new Date(2026, 10, 18, 9, 15));
  ok(sent.length === n, 'deuxième passage : rien en double');
  await S.tour(new Date(2026, 10, 19, 9, 5));
  ok(!sent.slice(n).some((x) => x.body.includes('Pâté')), 'réserve toujours basse le lendemain : pas de nouveau rappel');
  await S.tour(new Date(2026, 10, 20, 9, 5));
  ok(sent.some((x) => x.body.startsWith("Aujourd'hui : Vétérinaire")), 'jour J envoyé');
  console.log(ko ? `${ko} échec(s).` : 'Tout est bon.'); process.exit(ko ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
