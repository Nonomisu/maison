// Démarrage commun (vrai serveur ou faux serveur de test) : identité, chargement, fêtes du jour.
import { run } from "./scene.js";
import { iso } from "./store.js";

export function porte(msg, { button = true, err = false, logout = null } = {}) {
  const el = document.getElementById("porte");
  el.style.display = "flex";
  const m = document.getElementById("porteMsg");
  m.textContent = msg; m.className = err ? "err" : "";
  const b = document.getElementById("porteBtn");
  b.style.display = button || logout ? "" : "none";
  if (logout) { b.textContent = "Changer de compte"; b.onclick = logout; }
}

// Fête ou événement du jour (décor et animations), d'après la date.
function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, mo - 1, da);
}
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
function catBday(catInfo, d) {
  for (const k of Object.keys(catInfo || {})) {
    const m = String(catInfo[k].anniv || "").toLowerCase().match(/(\d{1,2})\s*(?:er)?\s+([a-zéû]+)/);
    if (m && +m[1] === d.getDate() && MOIS[d.getMonth()].indexOf(m[2].slice(0, 3)) === 0) return k;
  }
  return null;
}
export function todayEvent(d, catInfo) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  const cat = catBday(catInfo, d);
  if (cat) return { id: "anniv", cat };
  if (md === 110) return { id: "annivE" };
  if (md === 929) return { id: "annivC" };
  if (md === 422) return { id: "couple" };
  if (md === 214) return { id: "valentin" };
  if (md === 1031) return { id: "halloween" };
  if (md === 1224 || md === 1225) return { id: "noel" };
  if (iso(easter(d.getFullYear())) === iso(d)) return { id: "paques" };
  return null;
}
export function seasonOf(d) {
  const m = d.getMonth(), md = (m + 1) * 100 + d.getDate();
  if (md >= 1201 || md <= 106) return "noel";
  if (m <= 1) return "hiver";
  if (m <= 4) return "printemps";
  if (m <= 7) return "ete";
  return "automne";
}

export function ctxFor(me, L) {
  const now = new Date();
  return { me, other: me === "C" ? "E" : "C", now, today: iso(now), soirDates: L.SOIR_DAYS.map((d) => d.iso), mealDates: L.MEAL_ISO };
}

export async function boot({ me, backend, createSync }) {
  window.MAISON_REEL = true;
  window.MAISON_MOI = me;
  const L = await import("./logic.js");
  const ctx = ctxFor(me, L);
  const [remote, perso] = await Promise.all([backend.loadAll(), backend.loadPerso()]);
  const logic = new L.Component({});
  const initial = JSON.parse(JSON.stringify(logic.state));
  const now = ctx.now;
  logic.setState({ saison: seasonOf(now), event: null, eventShown: false, night: now.getHours() >= 21 || now.getHours() < 7, zoomedOnce: true });
  const sync = createSync({ logic, backend, ctx, onStatus: (s, e) => { if (s === "error") console.error("enregistrement", e); window.__syncStatus = s; } });
  await sync.start(remote, perso, initial);
  document.getElementById("porte").style.display = "none";
  run(logic);
  // fête du jour
  const ev = todayEvent(now, logic.state.catInfo);
  if (ev) {
    if (ev.cat) logic.setState({ bdayCat: ev.cat });
    const b = (logic.renderVals().eventBtns || []).find((x) => x.id === ev.id);
    if (b) b.pick();
  }
  // nuit : vérifiée chaque minute ; nouvelle journée : rechargement au retour sur l'appli
  setInterval(() => { const h = new Date().getHours(), n = h >= 21 || h < 7; if (logic.state.night !== n) logic.setState({ night: n }); }, 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sync.flush();
    else if (iso(new Date()) !== ctx.today) location.reload();
  });
  window.addEventListener("pagehide", () => sync.flush());
  window.__sync = sync;
  return { logic, sync };
}
