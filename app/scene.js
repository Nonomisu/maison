// La scène de 390 × 844 mise à l'échelle de l'écran, et le montage de l'appli dedans.
import { mount } from "./runtime.js?v=75ccfab6";
import { template } from "./template.js?v=75ccfab6";

const W = 390, H = 844;
const app = document.getElementById("app");
function fit() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const k = Math.min(vw / W, vh / H);
  app.style.transform = "scale(" + k + ")";
  document.getElementById("scene").style.paddingTop = Math.max(0, (vh - H * k) / 2) + "px";
}
window.addEventListener("resize", fit);
fit();

export function run(logic) {
  const m = mount(app, logic, template);
  window.__maison = logic;
  return m;
}
