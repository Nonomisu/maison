// Petit moteur qui fait tourner la logique de la maquette (classe Component)
// et son gabarit compilé, avec Preact pour mettre à jour la page sans la reconstruire.
import { h as ph, render as prender } from "./preact.module.js?v=6b061d94";
import { BLOBS } from "./blobs.js?v=6b061d94";

export function blobUrl(u) {
  if (typeof u !== "string" || u.indexOf("/_blob/") !== 0) return u;
  return BLOBS[u.slice(7)] || u;
}

// h() qui traduit les adresses /_blob/<id> en fichiers du dossier a/
export function h(tag, props, kids) {
  if (props) {
    if (props.src) props.src = blobUrl(props.src);
    if (tag === "a" && props.href) props.href = blobUrl(props.href);
  }
  return ph(tag, props, kids);
}

// Classe de base attendue par la logique de la maquette.
export class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; this._listeners = []; }
  setState(upd) {
    var next = typeof upd === "function" ? upd(this.state) : upd;
    if (!next) return;
    var prev = this.state;
    this.state = Object.assign({}, prev, next);
    this._listeners.forEach(function (fn) { fn(next, prev); });
  }
  onChange(fn) { this._listeners.push(fn); }
}

// Monte l'appli dans `el`. `template(h, vals)` vient du gabarit compilé.
export function mount(el, logic, template) {
  var queued = false;
  function draw() {
    queued = false;
    var vals;
    try { vals = logic.renderVals(); }
    catch (e) { console.error(e); return; }
    prender(ph("div", {class: "frame"}, template(h, vals)), el);
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  logic.onChange(schedule);
  draw();
  if (logic.componentDidMount) logic.componentDidMount();
  return { redraw: schedule };
}
