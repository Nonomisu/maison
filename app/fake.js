// Faux serveur pour les tests : les onglets d'un même navigateur partagent les données (localStorage + BroadcastChannel).
import { boot as bootApp } from "./boot.js?v=6d0cd0fd";
import { createSync } from "./store.js?v=6d0cd0fd";

export function boot(me) {
  const ch = new BroadcastChannel("maison-essai");
  const backend = {
    async loadAll() {
      const o = {};
      for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("essai.etat.")) o[k.slice(11)] = JSON.parse(localStorage.getItem(k)); }
      return o;
    },
    async write(k, v) { localStorage.setItem("essai.etat." + k, JSON.stringify(v)); ch.postMessage({ k, v }); },
    listen(cb) { ch.onmessage = (e) => cb(e.data.k, e.data.v); },
    async loadPerso() { const v = localStorage.getItem("essai.perso." + me); return v ? JSON.parse(v) : null; },
    async writePerso(o) { localStorage.setItem("essai.perso." + me, JSON.stringify(o)); },
  };
  // notifications simulées : rangées dans localStorage pour les tests
  window.MAISON_NOTIFY = (kind, to, text) => { const l = JSON.parse(localStorage.getItem("essai.news") || "[]"); l.push({ kind, to, from: me, text }); localStorage.setItem("essai.news", JSON.stringify(l)); };
  window.MAISON_PUSH = { state: async () => "off", enable: async () => {}, disable: async () => {} };
  return bootApp({ me, backend, createSync });
}
