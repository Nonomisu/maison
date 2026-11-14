// Maison — règles des rappels programmés (sans réseau : testées par test-notifs.js).
// Entrée : l'état partagé de la maison (documents « etat ») et la date du jour.
// Sortie : la liste des notifications à envoyer, chacune avec une clé unique (pour ne jamais l'envoyer deux fois).
'use strict';
const pad = (n) => String(n).padStart(2, '0');
const isoOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const diff = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const quand = (iso) => { const d = parse(iso); return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`; };
const heure = (t) => (t ? ' à ' + t.replace(':', 'h') : '');
const NOMS = { nahla: 'Nahla', bao: 'Bao', tsunky: 'Tsunky' };
const dest = (who) => (who === 'C' || who === 'E' ? [who] : ['C', 'E']);
function anniv(txt) {
  const m = String(txt || '').toLowerCase().match(/(\d{1,2})\s*(?:er)?\s+([a-zéû]+)/); if (!m) return null;
  const mi = MOIS.findIndex((n) => n.indexOf(m[2].slice(0, 3)) === 0); return mi < 0 ? null : { d: +m[1], m: mi };
}

// Rappels du matin (à partir de 9 h)
function matin(E, today) {
  const out = [];
  const add = (to, kind, key, text) => dest(to).forEach((w) => out.push({ to: w, kind, key: `${today}:${key}:${w}`, text }));
  // rendez-vous : J-7, J-2, jour J ; papiers : J-7 et J-2 avant l'échéance
  for (const m of E.missions || []) {
    if (m.done) continue;
    if (m.type === 'rdv' && m.date) {
      const n = diff(today, m.date);
      const t = n === 0 ? `Aujourd'hui${heure(m.time)} : ${m.t}` : n === 2 ? `Après-demain (${quand(m.date)}${heure(m.time)}) : ${m.t}` : n === 7 ? `Dans une semaine (${quand(m.date)}${heure(m.time)}) : ${m.t}` : null;
      if (t) add(m.who, 'rdv', `rdv-${m.id}-J${n}`, t);
    }
    if (m.type === 'papiers' && m.due) {
      const n = diff(today, m.due);
      if (n === 7 || n === 2) add(m.who, 'rdv', `papiers-${m.id}-J${n}`, `Papiers à faire avant ${quand(m.due)} : ${m.t}${n === 2 ? ' (plus que 2 jours)' : ''}`);
    }
  }
  // agenda des jeux et du RP : la veille et le jour même
  for (const a of E.agenda || []) {
    const n = diff(today, a.d);
    if (n === 1) add('2', 'rdv', `agenda-${a.id}-J1`, `Demain${heure(a.h)} : ${a.t}`);
    if (n === 0) add('2', 'rdv', `agenda-${a.id}-J0`, `Aujourd'hui${heure(a.h)} : ${a.t}`);
  }
  // anniversaires d'Emie (prévenir Co) et de Co (prévenir Emie) : J-7 et la veille ; chats : le jour même
  const d0 = parse(today);
  for (const [who, to, nom, md] of [['E', 'C', 'Emie', { d: 10, m: 0 }], ['C', 'E', 'Co', { d: 29, m: 8 }]]) {
    for (const n of [7, 1]) {
      const t = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + n);
      if (t.getDate() === md.d && t.getMonth() === md.m) add(to, 'rdv', `anniv-${who}-J${n}`, n === 7 ? `L'anniversaire de ${nom} est dans une semaine (${quand(isoOf(t))}) : une idée de cadeau ?` : `Demain, c'est l'anniversaire de ${nom} !`);
    }
  }
  for (const [k, info] of Object.entries(E.catInfo || {})) {
    const a = anniv(info && info.anniv);
    if (a && a.d === d0.getDate() && a.m === d0.getMonth()) add('2', 'rdv', `anniv-${k}`, `C'est l'anniversaire de ${NOMS[k] || k} aujourd'hui ! La fête est au salon.`);
  }
  return out;
}

// Réserves basses : renvoie { id: texte } pour chaque réserve basse aujourd'hui.
function reserves(E, today) {
  const low = {};
  for (const x of E.stocks || []) {
    if (x.kind === 'count') {
      const n = x.asOf && x.asOf < today && !E.vacances ? diff(x.asOf, today) : 0;
      const q = Math.max(0, (x.qty || 0) - Math.round(n * (x.perDay || 1)));
      if (q <= (x.low || 0)) low[x.id] = `Réserve basse : ${x.n}, plus que ${q} ${x.unit || ''}${q > 1 ? 's' : ''} (environ ${Math.floor(q / (x.perDay || 1))} jours). À racheter.`;
    } else {
      const ago = x.since ? diff(x.since, today) : (x.ago || 0);
      if (ago >= (x.warn || 999)) low[x.id] = x.blue ? `${x.n} : à changer (changé il y a ${ago} jours).` : `${x.n} : bientôt vide (rechargé il y a ${ago} jours). À racheter.`;
    }
  }
  if (typeof E.litBags === 'number' && E.litBags <= 2) low.litiere = `Plus que ${E.litBags} sac${E.litBags > 1 ? 's' : ''} de litière en réserve : à racheter.`;
  return low;
}

// Tâches du jour pas faites (18 h)
function tachesDuJour(E, today) {
  const t = (E.tasks || []).filter((x) => (x.freq || '') === 'jour' && !(x.done && x.doneOn === today));
  return t.length ? `Il reste ${t.length} tâche${t.length > 1 ? 's' : ''} du jour : ${t.map((x) => x.t.toLowerCase()).join(', ')}.` : null;
}

module.exports = { matin, reserves, tachesDuJour, isoOf, diff };
