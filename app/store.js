// Moteur d'enregistrement partagé, indépendant de Firebase (testable avec un faux serveur).
//
// Chaque donnée partagée (liste de courses, tâches, missions…) est rangée dans son propre document.
// Quand les deux téléphones modifient la même liste en même temps, les changements sont fusionnés
// élément par élément (un ajout de chaque côté = deux ajouts, pas un écrasement).

const J = (v) => JSON.stringify(v === undefined ? null : v);
const clone = (v) => (v === undefined ? undefined : JSON.parse(J(v)));

// Données partagées telles quelles entre Co et Emie.
export const SHARED = ["items", "tasks", "missions", "soirActs", "recipes", "garde", "titles", "plaidOn", "logsOn", "ff",
  "ward", "sizes", "sante", "stocks", "bSel", "projets", "radioOn", "roomSel", "furnSel", "tableDecoOn",
  "contacts", "journal", "litBags", "gmailAddr", "catInfo", "notes", "fireOn", "xp", "lvl", "treeOn", "vacances", "candleOff"];
// Données partagées rangées autrement que dans l'appli (par date, ou par personne).
export const ADAPTED = ["soirees", "meals", "wishes"];
// Données propres à chaque personne (dans Firestore) et à chaque appareil (dans le navigateur).
// Les hauts faits (et la chasse aux souris) se débloquent compte par compte.
export const PERSO = ["notifOn", "reserved", "journalSeen", "hf", "mice"];
export const DEVICE = ["sfxOn", "sfxVol", "sfxNight", "zoomAuto"];
const COUNTERS = ["nextId", "nextTask", "nextMiss", "nextNote", "nextContact", "nextFf", "nextWard", "nextProj", "nextAct",
  "nextRec", "nextGarde", "nextWish", "nextJ"];

// ------------------------------------------------------------------ fusion à trois voies
const hasIds = (a) => Array.isArray(a) && a.every((x) => x && typeof x === "object" && x.id != null);
const isObj = (o) => o && typeof o === "object" && !Array.isArray(o);

export function merge3(base, local, remote) {
  if (J(local) === J(base)) return clone(remote);
  if (J(remote) === J(base) || J(remote) === J(local)) return clone(local);
  if (hasIds(local) && hasIds(remote) && (base == null || hasIds(base))) {
    const B = new Map((base || []).map((x) => [String(x.id), x]));
    const L = new Map(local.map((x) => [String(x.id), x]));
    const out = [];
    remote.forEach((r) => {
      const k = String(r.id);
      if (L.has(k)) { const l = L.get(k); out.push(clone(B.has(k) && J(l) === J(B.get(k)) ? r : l)); }
      else if (!B.has(k)) out.push(clone(r));                 // ajouté de l'autre côté
    });
    local.forEach((l) => {
      const k = String(l.id);
      if (!remote.some((r) => String(r.id) === k) && !B.has(k)) out.push(clone(l));   // ajouté ici
    });
    return out;
  }
  if (isObj(local) && isObj(remote) && (base == null || isObj(base))) {
    const b = base || {}, out = {};
    new Set([...Object.keys(b), ...Object.keys(local), ...Object.keys(remote)]).forEach((k) => {
      const inL = k in local, inR = k in remote, inB = k in b;
      if (inL && inR) out[k] = merge3(b[k], local[k], remote[k]);
      else if (inL && !inR) { if (!inB || J(local[k]) !== J(b[k])) out[k] = clone(local[k]); }
      else if (!inL && inR) { if (!inB || J(remote[k]) !== J(b[k])) out[k] = clone(remote[k]); }
    });
    return out;
  }
  return clone(local);
}

// ------------------------------------------------------------------ dates
export const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const parseIso = (s) => new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const dayDiff = (a, b) => Math.round((parseIso(b) - parseIso(a)) / 864e5);
const addDays = (s, n) => { const d = parseIso(s); d.setDate(d.getDate() + n); return iso(d); };

// Prochaine date à laquelle une tâche récurrente revient, d'après le texte de répétition.
const WD = { dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6 };
export function nextDue(rec, doneOn) {
  const r = String(rec || "").toLowerCase();
  if (!r || /une fois|saison/.test(r)) return null;
  const days = Object.keys(WD).filter((d) => r.includes(d));
  if (days.length) {
    for (let n = 1; n <= 7; n++) { const s = addDays(doneOn, n); if (days.some((d) => WD[d] === parseIso(s).getDay())) return s; }
  }
  let m;
  if ((m = r.match(/(\d+)\s*fois par semaine/))) return addDays(doneOn, Math.max(1, Math.floor(7 / +m[1])));
  if ((m = r.match(/tous les (\d+) jours/))) return addDays(doneOn, +m[1]);
  if ((m = r.match(/toutes les (\d+) semaines/))) return addDays(doneOn, 7 * +m[1]);
  if ((m = r.match(/tous les (\d+) mois/))) return addDays(doneOn, 30 * +m[1]);
  if (/jour/.test(r)) return addDays(doneOn, 1);
  if (/semaine/.test(r)) return addDays(doneOn, 7);
  if (/mois/.test(r)) return addDays(doneOn, 30);
  if (/an\b|année/.test(r)) return addDays(doneOn, 365);
  return null;
}

// Remises à zéro de FFXIV : quotidienne à 15 h UTC, hebdomadaire le mardi à 8 h UTC.
function lastReset(now, weekly) {
  const d = new Date(now);
  if (!weekly) { d.setUTCHours(15, 0, 0, 0); if (d > now) d.setUTCDate(d.getUTCDate() - 1); return d.getTime(); }
  d.setUTCHours(8, 0, 0, 0);
  while (d.getUTCDay() !== 2 || d > now) d.setUTCDate(d.getUTCDate() - 1);
  return d.getTime();
}

// ------------------------------------------------------------------ passage des jours
// Appliqué au chargement : tâches récurrentes qui reviennent, réserves qui baissent, quotidien FFXIV…
export function roll(st, today, now = new Date()) {
  const out = {};
  // tâches récurrentes
  if (Array.isArray(st.tasks)) {
    let ch = false;
    const t = st.tasks.map((x) => {
      if (!x.done) return x;
      const doneOn = x.doneOn || today, due = nextDue(x.rec, doneOn);
      if (!x.doneOn) { ch = true; return { ...x, doneOn }; }
      if (due && due <= today) { ch = true; const y = { ...x, done: false }; delete y.doneOn; return y; }
      return x;
    });
    if (ch) out.tasks = t;
  }
  // réserves
  if (Array.isArray(st.stocks)) {
    let ch = false;
    const s = st.stocks.map((x) => {
      const y = { ...x };
      if (x.kind === "count") {
        if (!x.asOf) { y.asOf = today; ch = true; }
        else if (x.asOf < today) {
          const n = dayDiff(x.asOf, today);
          if (!st.vacances) y.qty = Math.max(0, x.qty - Math.round(n * (x.perDay || 1)));
          y.asOf = today; ch = true;
        }
      } else {
        if (!x.since) { y.since = addDays(today, -(x.ago || 0)); ch = true; }
        else if (st.vacances && x.seen && x.seen < today) { y.since = addDays(x.since, dayDiff(x.seen, today)); ch = true; }
        y.ago = Math.max(0, dayDiff(y.since, today));
        if (y.seen !== today) { y.seen = today; ch = true; }
        if (y.ago !== x.ago) ch = true;
      }
      return y;
    });
    if (ch) out.stocks = s;
  }
  // quotidien et hebdo FFXIV
  if (st.ff && st.ff.C) {
    const r = st.ff._r || {}, d = lastReset(now, false), w = lastReset(now, true);
    if ((r.d || 0) < d || (r.w || 0) < w) {
      const f = clone(st.ff);
      ["C", "E"].forEach((k) => (f[k] || []).forEach((y) => {
        if ((y.sec === "jour" && (r.d || 0) < d) || (y.sec === "semaine" && (r.w || 0) < w)) y.d = false;
      }));
      f._r = { d, w };
      out.ff = f;
    }
  }
  // habitudes des grands projets
  if (Array.isArray(st.projets)) {
    let ch = false;
    const p = st.projets.map((x) => {
      if (x.today && x.todayOn && x.todayOn < today) { ch = true; return { ...x, today: false }; }
      if (!x.today && x.todayOn && dayDiff(x.todayOn, today) > 1 && x.streak) { ch = true; return { ...x, streak: 0 }; }
      return x;
    });
    if (ch) out.projets = p;
  }
  return out;
}

// Corrections faites à chaque modification locale (date à laquelle une tâche est cochée, etc.).
export function normalize(key, val, today) {
  if (key === "tasks" && Array.isArray(val)) {
    let ch = false;
    const v = val.map((x) => {
      if (x.done && !x.doneOn) { ch = true; return { ...x, doneOn: today }; }
      if (!x.done && x.doneOn) { ch = true; const y = { ...x }; delete y.doneOn; return y; }
      return x;
    });
    return ch ? v : null;
  }
  if (key === "stocks" && Array.isArray(val)) {
    let ch = false;
    const v = val.map((x) => {
      if (x.kind === "count") return x.asOf === today ? x : (ch = true, { ...x, asOf: today });
      const since = addDays(today, -(x.ago || 0));
      return x.since === since && x.seen === today ? x : (ch = true, { ...x, since, seen: today });
    });
    return ch ? v : null;
  }
  if (key === "projets" && Array.isArray(val)) {
    let ch = false;
    const v = val.map((x) => (x.today && x.todayOn !== today ? (ch = true, { ...x, todayOn: today }) : x));
    return ch ? v : null;
  }
  return null;
}

// ------------------------------------------------------------------ conversions appli <-> documents
// soirées et repas : rangés par date dans Firestore, par position (0 à 6) dans l'appli.
export function makeAdapters(ctx) {
  const byIndex = (dates) => ({
    toLocal: (remote) => { const o = {}; dates.forEach((d, i) => { if (remote && remote[d] != null) o[i] = clone(remote[d]); }); return o; },
    toRemote: (local, remote) => { const o = clone(remote || {}); dates.forEach((d, i) => { if (local[i] != null) o[d] = clone(local[i]); else delete o[d]; }); return o; },
  });
  return {
    soirees: { local: "soirees", ...byIndex(ctx.soirDates) },
    meals: { local: "meals", ...byIndex(ctx.mealDates) },
    wishes: {
      local: "myWishes",
      toLocal: (remote) => clone((remote || {})[ctx.me] || []),
      toRemote: (local, remote) => ({ ...clone(remote || {}), [ctx.me]: clone(local) }),
      extra: (remote) => ({ wishOther: clone((remote || {})[ctx.other] || []) }),
    },
  };
}

// ------------------------------------------------------------------ données de départ (premier lancement)
export function seeds(st) {
  const zero = (o, v) => Object.fromEntries(Object.keys(o).map((k) => [k, v]));
  const titles = Object.fromEntries(Object.entries(st.titles).map(([k, v]) => [k, zero(v, 0)]));
  return {
    notes: [], projets: [], ward: [], journal: [], titles,
    xp: zero(st.xp, 0), lvl: zero(st.lvl, 1),
    contacts: st.contacts.filter((c) => c.cat === "chats"),
    sante: Object.fromEntries(Object.keys(st.sante).map((k) => [k, { poids: [], soins: {}, rdv: "" }])),
    ff: { C: st.ff.C.map((x) => ({ ...x, d: false })), E: st.ff.E.map((x) => ({ ...x, d: false })) },
    tasks: st.tasks.map((x) => { const y = { ...x }; delete y.done; return y; }),
    soirees: {}, meals: {}, wishes: { C: [], E: [] }, reserved: {},
  };
}

// ------------------------------------------------------------------ synchronisation
// backend : { loadAll() -> {key: value}, write(key, value), listen(cb(key, value)), loadPerso(), writePerso(obj) }
export function createSync({ logic, backend, ctx, onStatus = () => {} }) {
  const adapters = makeAdapters(ctx);
  const base = {};          // dernière version connue du serveur, sous la forme de l'appli
  const remoteFull = {};    // dernière version brute des données adaptées
  const dirty = new Set();
  let timer = null, applying = false, persoTimer = null;
  const localKey = (k) => (adapters[k] ? adapters[k].local : k);
  const keyOfLocal = {};
  SHARED.forEach((k) => (keyOfLocal[k] = k));
  ADAPTED.forEach((k) => (keyOfLocal[adapters[k].local] = k));

  function toLocalPatch(k, remote) {
    if (adapters[k]) { remoteFull[k] = clone(remote); return { [adapters[k].local]: adapters[k].toLocal(remote), ...(adapters[k].extra ? adapters[k].extra(remote) : {}) }; }
    return { [k]: clone(remote) };
  }

  async function start(remoteAll, perso, initialState) {
    const seed = seeds(initialState);
    const patch = {};
    const missing = [];
    [...SHARED, ...ADAPTED].forEach((k) => {
      let v = remoteAll[k];
      if (v === undefined) { v = k in seed ? seed[k] : initialState[k]; missing.push(k); }
      Object.assign(patch, toLocalPatch(k, v));
      base[localKey(k)] = clone(patch[localKey(k)]);
    });
    Object.assign(patch, { reserved: {}, hf: {}, mice: 0, ...clone(perso || {}) });
    try { DEVICE.forEach((k) => { const v = localStorage.getItem("maison." + k); if (v != null) patch[k] = JSON.parse(v); }); } catch (e) { /* stockage indisponible */ }
    COUNTERS.forEach((k) => (patch[k] = 1e8 + Math.floor(Math.random() * 8e8)));
    // activités des soirées : l'ancienne liste de la maquette est remplacée par la vôtre
    if (Array.isArray(patch.soirActs) && ["jdr", "resto", "balade", "lecture"].every((id) => patch.soirActs.some((a) => a.id === id))) {
      patch.soirActs = clone(initialState.soirActs); base.soirActs = null; missing.push("soirActs");
    }
    // passage des jours
    const merged = { ...initialState, ...patch };
    const rolled = roll(merged, ctx.today, ctx.now);
    Object.assign(patch, rolled);
    applying = true; logic.setState(patch); applying = false;
    missing.forEach((k) => dirty.add(k));
    Object.keys(rolled).forEach((lk) => dirty.add(keyOfLocal[lk]));
    if (dirty.size) await flush();
    logic.onChange(onLocal);
    backend.listen(onRemote);
  }

  function onLocal(next, prev) {
    if (applying) return;
    const fixes = {};
    let touched = false;
    Object.keys(next).forEach((lk) => {
      if (DEVICE.includes(lk)) { try { localStorage.setItem("maison." + lk, J(next[lk])); } catch (e) { /* rien */ } return; }
      if (PERSO.includes(lk)) { schedulePerso(); return; }
      const k = keyOfLocal[lk];
      if (!k || J(next[lk]) === J(prev[lk])) return;
      const n = normalize(lk, next[lk], ctx.today);
      if (n) fixes[lk] = n;
      dirty.add(k); touched = true;
    });
    if (Object.keys(fixes).length) { applying = true; logic.setState(fixes); applying = false; }
    if (touched) { clearTimeout(timer); timer = setTimeout(flush, 400); onStatus("pending"); }
  }

  async function flush() {
    clearTimeout(timer);
    const keys = [...dirty]; dirty.clear();
    const st = logic.state;
    try {
      await Promise.all(keys.map((k) => {
        const lk = localKey(k), val = clone(st[lk]);
        const out = adapters[k] ? adapters[k].toRemote(val, remoteFull[k]) : val;
        if (adapters[k]) remoteFull[k] = clone(out);
        base[lk] = val;
        return backend.write(k, out);
      }));
      onStatus("saved");
    } catch (e) {
      keys.forEach((k) => dirty.add(k));
      onStatus("error", e);
    }
  }

  function onRemote(k, remote) {
    if (![...SHARED, ...ADAPTED].includes(k)) return;
    const lk = localKey(k);
    const patch = toLocalPatch(k, remote);
    const incoming = patch[lk];
    if (dirty.has(k)) patch[lk] = merge3(base[lk], logic.state[lk], incoming);
    base[lk] = clone(incoming);
    if (J(patch[lk]) === J(logic.state[lk]) && !adapters[k]) return;
    applying = true; logic.setState(patch); applying = false;
  }

  function schedulePerso() {
    clearTimeout(persoTimer);
    persoTimer = setTimeout(() => {
      const st = logic.state, o = {};
      PERSO.forEach((k) => (o[k] = clone(st[k])));
      backend.writePerso(o).catch((e) => onStatus("error", e));
    }, 600);
  }

  return { start, flush, merge3 };
}
