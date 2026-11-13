// Faux serveur pour les tests : les onglets d'un même navigateur partagent les données (localStorage + BroadcastChannel).
import { boot as bootApp } from "./boot.js?v=b0e47063";
import { createSync } from "./store.js?v=b0e47063";

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
  return bootApp({ me, backend, createSync });
}
