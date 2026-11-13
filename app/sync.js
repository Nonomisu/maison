// Connexion Google et enregistrement dans Firestore (projet maison-6b9f4).
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";
import { initializeFirestore, doc, getDoc, getDocs, setDoc, collection, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";
import { createSync } from "./store.js";
import { porte, boot as bootApp } from "./boot.js";

// Empreinte SHA-256 de l'adresse de Co : l'adresse elle-même ne figure pas dans le code public.
const CO_HASH = "93f3070dff5cd551660e6fa9c55ff25aa21278d964f1c8baeec7dfe9c0da7a2a";
const sha256 = async (t) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].map((b) => b.toString(16).padStart(2, "0")).join("");

const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb);
const db = initializeFirestore(fb, { ignoreUndefinedProperties: true });

function firestoreBackend(me) {
  const etat = collection(db, "etat");
  return {
    async loadAll() {
      const out = {};
      (await getDocs(etat)).forEach((d) => { try { out[d.id] = JSON.parse(d.data().j); } catch (e) { console.error(d.id, e); } });
      return out;
    },
    write: (k, v) => setDoc(doc(db, "etat", k), { j: JSON.stringify(v), by: me, at: serverTimestamp() }),
    listen(cb) {
      onSnapshot(etat, (snap) => snap.docChanges().forEach((c) => {
        if (c.doc.metadata.hasPendingWrites || c.type === "removed") return;
        try { cb(c.doc.id, JSON.parse(c.doc.data().j)); } catch (e) { console.error(e); }
      }));
    },
    async loadPerso() { const s = await getDoc(doc(db, "perso", me)); return s.exists() ? JSON.parse(s.data().j) : null; },
    writePerso: (o) => setDoc(doc(db, "perso", me), { j: JSON.stringify(o), at: serverTimestamp() }),
  };
}

export function boot() {
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
      await bootApp({ me, backend, createSync });
    } catch (e) {
      console.error(e);
      porte(e.code === "permission-denied" ? "Le compte " + user.email + " n'a pas accès à cette maison." : "Erreur de chargement : " + (e.message || e), { button: false, err: true, logout: () => signOut(auth) });
    }
  });
}
