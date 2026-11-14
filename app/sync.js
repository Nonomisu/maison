// Connexion Google et enregistrement dans Firestore (projet maison-6b9f4).
import { firebaseConfig } from "./firebase-config.js?v=9fffc343";
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, getDocs, setDoc, deleteDoc, addDoc, collection, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";
import { createSync } from "./store.js?v=9fffc343";
import { porte, boot as bootApp } from "./boot.js?v=9fffc343";

// Empreinte SHA-256 de l'adresse de Co : l'adresse elle-même ne figure pas dans le code public.
const CO_HASH = "93f3070dff5cd551660e6fa9c55ff25aa21278d964f1c8baeec7dfe9c0da7a2a";
const sha256 = async (t) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].map((b) => b.toString(16).padStart(2, "0")).join("");

const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb);
// Copie locale de la base sur l'appareil : l'appli s'ouvre et se coche hors connexion (en magasin),
// les changements partent dès que le réseau revient.
let db;
try { db = initializeFirestore(fb, { ignoreUndefinedProperties: true, localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }); }
catch (e) { console.warn("copie locale indisponible", e); db = initializeFirestore(fb, { ignoreUndefinedProperties: true }); }
const HORS_LIGNE = "Pas de connexion, et la maison n'est pas encore enregistrée sur cet appareil : ouvre-la une première fois avec du réseau.";

// ?test : tout est enregistré à part (collections test-…), pour essayer sans toucher aux vraies données ni à l'XP.
const TEST = new URLSearchParams(location.search).has("test");
const C_ETAT = TEST ? "test-etat" : "etat", C_PERSO = TEST ? "test-perso" : "perso";

function firestoreBackend(me) {
  const etat = collection(db, C_ETAT);
  return {
    async loadAll() {
      const out = {};
      const snap = await getDocs(etat);
      if (snap.empty && snap.metadata.fromCache) throw new Error(HORS_LIGNE);
      snap.forEach((d) => { try { out[d.id] = JSON.parse(d.data().j); } catch (e) { console.error(d.id, e); } });
      return out;
    },
    write: (k, v) => setDoc(doc(db, C_ETAT, k), { j: JSON.stringify(v), by: me, at: serverTimestamp() }),
    listen(cb) {
      onSnapshot(etat, (snap) => snap.docChanges().forEach((c) => {
        if (c.doc.metadata.hasPendingWrites || c.type === "removed") return;
        try { cb(c.doc.id, JSON.parse(c.doc.data().j)); } catch (e) { console.error(e); }
      }));
    },
    async loadPerso() {
      let s;
      try { s = await getDoc(doc(db, C_PERSO, me)); } catch (e) { throw new Error(navigator.onLine ? (e.message || String(e)) : HORS_LIGNE); }
      if (!s.exists() && s.metadata.fromCache) throw new Error(HORS_LIGNE);
      return s.exists() ? JSON.parse(s.data().j) : null;
    },
    writePerso: (o) => setDoc(doc(db, C_PERSO, me), { j: JSON.stringify(o), at: serverTimestamp() }),
  };
}

// ------------------------------------------------ notifications push
const pushSupported = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
const swReg = "serviceWorker" in navigator ? navigator.serviceWorker.register("sw.js").catch((e) => { console.error(e); return null; }) : Promise.resolve(null);
const b64u = (s) => { const b = atob((s + "=".repeat((4 - s.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(b, (c) => c.charCodeAt(0)); };
function pushApi(me) {
  const subRef = async (endpoint) => doc(db, "pushSubs", me, "subs", (await sha256(endpoint)).slice(0, 40));
  return {
    // 'unsupported' | 'denied' | 'off' | 'on'
    async state() {
      if (!pushSupported() || !VAPID_PUBLIC) return "unsupported";
      if (Notification.permission === "denied") return "denied";
      const reg = await swReg; if (!reg) return "unsupported";
      return Notification.permission === "granted" && (await reg.pushManager.getSubscription()) ? "on" : "off";
    },
    async enable() {
      const perm = await Notification.requestPermission();   // doit partir pendant le geste (iPhone)
      if (perm !== "granted") throw new Error("autorisation refusée");
      const reg = await swReg; if (!reg) throw new Error("service worker indisponible");
      await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(VAPID_PUBLIC) }));
      const j = sub.toJSON();
      await setDoc(await subRef(j.endpoint), { endpoint: j.endpoint, keys: j.keys, device: navigator.userAgent.slice(0, 200), createdAt: serverTimestamp() });
    },
    async disable() {
      const reg = await swReg, sub = reg && (await reg.pushManager.getSubscription()); if (!sub) return;
      await deleteDoc(await subRef(sub.endpoint)).catch((e) => console.error(e));
      await sub.unsubscribe();
    },
  };
}
// Message pour l'autre : rangé dans « news », envoyé par le service du VPS selon ses réglages.
const notifyFn = (me) => (kind, to, text) => addDoc(collection(db, "news"), { kind, to, from: me, text, test: TEST, createdAt: serverTimestamp() }).catch((e) => console.error("notification", e));

export function boot() {
  if (TEST) document.getElementById("bandeauTest").style.display = "block";
  const btn = document.getElementById("porteBtn");
  btn.onclick = async () => {
    const p = new GoogleAuthProvider();
    try { await signInWithPopup(auth, p); }
    catch (e) {
      if (["auth/popup-blocked", "auth/operation-not-supported-in-this-environment", "auth/cancelled-popup-request"].includes(e.code)) return signInWithRedirect(auth, p);
      if (e.code !== "auth/popup-closed-by-user") porte("Connexion impossible : " + (e.message || e.code), { err: true });
    }
  };
  getRedirectResult(auth).catch((e) => porte("Connexion impossible : " + (e.message || e.code), { err: true }));
  let started = false;
  onAuthStateChanged(auth, async (user) => {
    if (!user) { if (started) location.reload(); else porte("L'appli du foyer de Co et Emie. Connecte-toi avec ton compte Google."); return; }
    if (started) return;
    started = true;
    const me = (await sha256((user.email || "").trim().toLowerCase())) === CO_HASH ? "C" : "E";
    porte("Ouverture de la maison…", { button: false });
    try {
      const backend = firestoreBackend(me);
      window.MAISON_PUSH = pushApi(me);
      window.MAISON_NOTIFY = notifyFn(me);
      await bootApp({ me, backend, createSync });
    } catch (e) {
      console.error(e);
      porte(e.code === "permission-denied" ? "Le compte " + user.email + " n'a pas accès à cette maison." : "Erreur de chargement : " + (e.message || e), { button: false, err: true, logout: () => signOut(auth) });
    }
  });
}
