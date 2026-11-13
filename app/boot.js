// Démarrage commun (vrai serveur ou faux serveur de test) : identité, chargement, fêtes du jour.
import { run } from "./scene.js?v=69d6e01e";
import { iso } from "./store.js?v=69d6e01e";

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
// Fêtes : le jour même pour les anniversaires, une période pour les grandes fêtes.
export function todayEvent(d, catInfo) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  const cat = catBday(catInfo, d);
  if (cat) return { id: "anniv", cat };
  if (md === 110) return { id: "annivE" };
  if (md === 929) return { id: "annivC" };
  if (md === 422) return { id: "couple" };
  if (md >= 1215 && md <= 1227) return { id: "noel" };
  if (md >= 1230 || md <= 105) return { id: "nouvelan", jan1: md === 101 };
  if (md >= 1020 && md <= 1031) return { id: "halloween" };
  if (md >= 210 && md <= 214) return { id: "valentin" };
  const e = easter(d.getFullYear()), day = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - e) / 864e5);
  if (day >= -2 && day <= 1) return { id: "paques" };
  return null;
}
// Saisons réelles ; « Noël » du 15 au 27 décembre, « Nouvelle année » du 30 décembre au 5 janvier.
export function seasonOf(d) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  if (md >= 1215 && md <= 1227) return "noel";
  if (md >= 1221 || md < 320) return "hiver";
  if (md < 320) return "hiver";
  if (md < 621) return "printemps";
  if (md < 922) return "ete";
  if (md < 1221) return "automne";
  return "hiver";
}

// Météo réelle de Bron (Open-Meteo, gratuit et sans clé) : les fenêtres et la véranda la suivent en « Auto ».
const WMO = (c) => c <= 1 ? ["soleil", "ensoleillé"] : c <= 3 ? ["nuageux", c === 2 ? "partiellement nuageux" : "couvert"] : c <= 48 ? ["nuageux", "brouillard"]
  : (c >= 71 && c <= 77) || c === 85 || c === 86 ? ["neige", "neige"] : ["pluie", c >= 95 ? "orage" : c <= 57 ? "bruine" : "pluie"];
async function meteo(logic) {
  try {
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=45.7386&longitude=4.9118&current=weather_code,temperature_2m&daily=sunrise,sunset&forecast_days=1&timezone=Europe%2FParis");
    const js = await r.json(), c = js.current;
    if (js.daily && js.daily.sunrise) SUN = { rise: hm(js.daily.sunrise[0]), set: hm(js.daily.sunset[0]) };
    const [kind, txt] = WMO(c.weather_code), d = new Date();
    if (logic.state.dark !== isDark(d)) logic.setState({ dark: isDark(d) });
    logic.setState({ meteoReel: { kind, txt, t: Math.round(c.temperature_2m), h: d.getHours() + "h" + String(d.getMinutes()).padStart(2, "0") } });
  } catch (e) { console.warn("météo indisponible", e); }
}

// Les chats dorment de 1 h 30 à 7 h 30 ; le paysage passe à la nuit du coucher au lever du soleil à Bron
// (20 minutes de crépuscule après le coucher), d'après Open-Meteo, sinon de 18 h à 7 h 30.
export const isNight = (d) => { const m = d.getHours() * 60 + d.getMinutes(); return m >= 90 && m < 450; };
let SUN = null;
const hm = (t) => { const x = String(t).slice(11, 16).split(":"); return +x[0] * 60 + +x[1]; };
export const isDark = (d) => { const m = d.getHours() * 60 + d.getMinutes(), rise = SUN ? SUN.rise : 450, set = SUN ? SUN.set + 20 : 1080; return m < rise || m >= set; };

export function ctxFor(me, L) {
  const now = new Date();
  return { me, other: me === "C" ? "E" : "C", now, today: iso(now), soirDates: L.SOIR_DAYS.map((d) => d.iso), mealDates: L.MEAL_ISO };
}

export async function boot({ me, backend, createSync }) {
  window.MAISON_REEL = true;
  window.MAISON_MOI = me;
  const L = await import("./logic.js?v=69d6e01e");
  const ctx = ctxFor(me, L);
  const [remote, perso] = await Promise.all([backend.loadAll(), backend.loadPerso()]);
  const logic = new L.Component({});
  const initial = JSON.parse(JSON.stringify(logic.state));
  const now = ctx.now;
  logic.setState({ saison: seasonOf(now), event: null, eventShown: false, night: isNight(now), dark: isDark(now), zoomedOnce: true });
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
    if (ev.jan1) { const v = logic.renderVals(); if (v.nyReplay) setTimeout(v.nyReplay, 1500); }
  }
  // nuit : vérifiée chaque minute ; nouvelle journée : rechargement au retour sur l'appli
  // Son : les navigateurs (Firefox, Safari) n'autorisent l'audio qu'après un geste ; on le réveille à chaque toucher.
  ["pointerdown", "touchend", "keydown"].forEach((t) => document.addEventListener(t, () => { try { L.SFX.ac(); } catch (e) { /* pas d'audio */ } }, { capture: true, passive: true }));
  meteo(logic); setInterval(() => meteo(logic), 30 * 60e3);
  const ciel = () => { const d = new Date(), n = isNight(d), k = isDark(d); if (logic.state.night !== n || logic.state.dark !== k) logic.setState({ night: n, dark: k }); };
  setInterval(ciel, 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sync.flush();
    else if (iso(new Date()) !== ctx.today) location.reload();
  });
  window.addEventListener("pagehide", () => sync.flush());
  window.__sync = sync;
  return { logic, sync };
}
