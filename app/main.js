// Point d'entrée.
//   ./                    → vraie appli (connexion Google, Firestore)
//   ./?essai              → maquette de démo, sans connexion
//   ./?essai=reel&moi=C   → vraie appli avec un faux serveur local (tests)
import { run } from "./scene.js?v=6d0cd0fd";

const q = new URLSearchParams(location.search);
if (q.get("essai") === "reel") import("./fake.js?v=6d0cd0fd").then((f) => f.boot(q.get("moi") === "E" ? "E" : "C"));
else if (q.has("essai")) import("./logic.js?v=6d0cd0fd").then((L) => run(new L.Component({})));
else import("./sync.js?v=6d0cd0fd").then((s) => s.boot());
