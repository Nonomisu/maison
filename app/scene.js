// La scène de 390 × 844 mise à l'échelle de l'écran, et le montage de l'appli dedans.
import { mount } from "./runtime.js?v=ce36ab4a";
import { template } from "./template.js?v=ce36ab4a";

const W = 390, H = 844;
const app = document.getElementById("app");
// Encoche et barre d'état de l'iPhone (appli ouverte depuis l'écran d'accueil) : la scène reste dans la zone sûre.
const probe = document.createElement("div");
probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;top:0;left:0;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)";
document.body.appendChild(probe);
function fit() {
  const cs = getComputedStyle(probe), top = parseFloat(cs.paddingTop) || 0, bot = parseFloat(cs.paddingBottom) || 0;
  const vw = window.innerWidth, vh = window.innerHeight - top - bot;
  const k = Math.min(vw / W, vh / H);
  app.style.transform = "scale(" + k + ")";
  document.getElementById("scene").style.paddingTop = top + Math.max(0, (vh - H * k) / 2) + "px";
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
