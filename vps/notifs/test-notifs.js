// Test sans réseau des rappels programmés : node test-notifs.js
'use strict';
const R = require('./regles');
let ko = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  ÉCHEC ') + m); if (!c) ko++; };
const E = {
  missions: [
    { id: 'm3', t: 'Vétérinaire : vaccins', type: 'rdv', who: '2', date: '2026-11-20', time: '' },
    { id: 'm4', t: 'Coiffeur', type: 'rdv', who: 'C', date: '2026-11-25', time: '10:30' },
    { id: 'p1', t: 'Déclaration', type: 'papiers', who: 'E', due: '2026-11-25' },
    { id: 'x', t: 'Fait', type: 'rdv', who: '2', date: '2026-11-20', done: true },
  ],
  agenda: [{ id: 'a1', d: '2026-11-19', h: '20:30', t: 'Soirée Baldur' }],
  catInfo: { nahla: { anniv: '16 avril' }, bao: { anniv: '18 novembre' } },
  stocks: [
    { id: 'pate', n: 'Pâté', kind: 'count', unit: 'sachet', qty: 10, perDay: 1, low: 7, asOf: '2026-11-15' },
    { id: 'croq', n: 'Croquettes', kind: 'time', since: '2026-10-20', warn: 24, dur: 30 },
    { id: 'filtre', n: 'Filtre fontaine', kind: 'time', since: '2026-11-10', warn: 26, blue: true },
  ],
  litBags: 2,
  tasks: [{ id: 'h', t: 'Faire la vaisselle', freq: 'jour', done: true, doneOn: '2026-11-18' }, { id: 'i', t: 'Faire la cuisine', freq: 'jour' }, { id: 'a', t: 'Aspirateur', freq: 'semaine' }],
};
const m = R.matin(E, '2026-11-18');
ok(m.filter((x) => x.key.includes('rdv-m3-J2')).length === 2, 'vaccin à J-2 : Co et Emie prévenus');
ok(m.some((x) => x.key.includes('rdv-m4-J7') && x.to === 'C' && x.text.includes('10h30')), 'coiffeur à J-7 : Co seul, avec l\'heure');
ok(m.some((x) => x.key.includes('papiers-p1-J7') && x.to === 'E'), 'papiers à J-7 : Emie');
ok(!m.some((x) => x.key.includes('rdv-x')), 'mission faite : pas de rappel');
ok(m.some((x) => x.key.includes('agenda-a1-J1') && x.text.startsWith('Demain à 20h30')), 'agenda : la veille');
ok(m.some((x) => x.key.includes('anniv-bao')), 'anniversaire de Bao le jour même');
ok(R.matin(E, '2027-01-03').some((x) => x.key.includes('anniv-E-J7') && x.to === 'C'), 'anniversaire d\'Emie : Co prévenu à J-7');
ok(R.matin(E, '2026-09-28').some((x) => x.key.includes('anniv-C-J1') && x.to === 'E'), 'anniversaire de Co : Emie prévenue la veille');
const low = R.reserves(E, '2026-11-18');
ok(low.pate && low.pate.includes('7 sachets'), 'pâté : 10 - 3 jours = 7, réserve basse');
ok(low.croq, 'croquettes rechargées il y a 29 jours : à racheter');
ok(!low.filtre, 'filtre changé il y a 8 jours : rien');
ok(low.litiere && low.litiere.includes('2 sacs'), 'litière : 2 sacs');
ok(R.tachesDuJour(E, '2026-11-18') === 'Il reste 1 tâche du jour : faire la cuisine.', 'tâches du jour pas faites');
console.log(ko ? `${ko} échec(s).` : 'Tout est bon.');
process.exit(ko ? 1 : 0);
