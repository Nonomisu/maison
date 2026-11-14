// La scène de 390 × 844 mise à l'échelle de l'écran, et le montage de l'appli dedans.
import { mount } from "./runtime.js?v=719b5b03";
import { template } from "./template.js?v=719b5b03";

const W = 390, H = 844;
const app = document.getElementById("app");
// Encoche et barre d'état de l'iPhone (appli ouverte depuis l'écran d'accueil) : la scène reste dans la zone sûre.
const probe = document.createElement("div");
probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;top:0;left:0;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)";
document.body.appendChild(probe);
// Sur iPhone, ouverte depuis l'écran d'accueil, l'appli passe sous la barre d'état (heure, batterie) :
// on garde au moins 54 px en haut si l'iPhone ne donne pas la mesure.
const ecranAccueil = navigator.standalone === true || matchMedia("(display-mode: standalone)").matches;
function fit() {
  const cs = getComputedStyle(probe);
  let top = parseFloat(cs.paddingTop) || 0, bot = parseFloat(cs.paddingBottom) || 0;
  if (ecranAccueil && /iPhone|iPad|iPod/.test(navigator.userAgent)) top = Math.max(top, 54);
  bot = Math.min(bot, 20);   // la barre d'accueil peut passer sur le parquet
  const vw = window.innerWidth, vh = window.innerHeight - top - bot;
  const k = Math.min(vw / W, vh / H);
  app.style.transform = "scale(" + k + ")";
  document.getElementById("scene").style.paddingTop = top + Math.max(0, (vh - H * k) / 2) + "px";
  if (location.search.includes("diag")) document.title = [cs.paddingTop, cs.paddingBottom, window.innerHeight, ecranAccueil].join(" ");
}
window.addEventListener("resize", fit);
window.addEventListener("orientationchange", () => setTimeout(fit, 300));
setTimeout(fit, 300);
fit();

export function run(logic) {
  const m = mount(app, logic, template);
  window.__maison = logic;
  return m;
}
