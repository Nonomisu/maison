// Fichier généré par outils/build.py à partir de src/Main.dc.html : ne pas modifier à la main.
import { DCLogic, blobUrl } from "./runtime.js?v=ce36ab4a";

// Mode réel : défini par l'appli (window.MAISON_REEL). Sans lui, la maquette reste en démo au 13 novembre 2026.
var REEL = typeof window !== "undefined" && !!window.MAISON_REEL;
var ME = (REEL && window.MAISON_MOI) || "C", OTHER = ME === "C" ? "E" : "C";
var NOW0 = REEL ? new Date() : new Date(2026, 10, 13, 19, 0);
var TODAY_Y = NOW0.getFullYear(), TODAY_M = NOW0.getMonth(), TODAY_D = NOW0.getDate();
var TODAY_UTC = Date.UTC(TODAY_Y, TODAY_M, TODAY_D);
function isoD(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
var TODAY_ISO = isoD(new Date(TODAY_Y, TODAY_M, TODAY_D));
function addDaysIso(n) { return isoD(new Date(TODAY_Y, TODAY_M, TODAY_D + n)); }
var RARE = REEL ? 12 : 1;   // les animations surprises sont plus rares dans la vraie appli
var JOURS_L = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
var IMG = {
  nahla: {sit:"c5e87960cca9459f63de6e1a544ecb0d", blink:"3718c004e3145d274eac4514a5c397bb", tailup:"72e3fb6bbb55f4a8e3c73c32cb15d8fb", groomA:"3e2d084829b4d6e1335585deffc74ecb", groomB:"473f8c4316576086fcba4d6727581f83", happy:"cb2983dfa734d5eff3ddc92c2bb3f363", happyT:"f0053a71d47723922c04066669a53215", stretch:"c1162678decb72610c7962604b478a20", chaseA:"de625fa70966be966e3ec349d9476466", chaseB:"91385906309fe5afcd629a5ede377b2e", chaseC:"7504a84de391f24a97ff3f828c79da94", sleepA:"55e2c941474f5e70e73fec4f5c14ecfc", sleepB:"b8b41920db3afca67837776e9e6ac912", painA:"0b258cfdfeafa3c0875712510a2a8426", painB:"2e53afd4cbbaced24cb0f924c0786a1d"},
  bao: {sit:"53a68fb3bc2e94fda3480c894eb7bde7", blink:"6a196fdc52f3092404e4068a9cdb653e", tailup:"72d29d28d6704398a0a4eb4f7f4dc7a4", groomA:"bd2aad658ec63a7b9eef87593aff186b", groomB:"859e870d0650d514ae13010a2f3725ee", happy:"6e5b0251eb1affb507ac1a82045a10f3", happyT:"e8bbff1f4f25834cf692bc7be3726e94", stretch:"f101c5fa3a7efc5129c9ff9b6e0d5c40", chaseA:"29f2aca10a77865840095dadef922015", chaseB:"c05bf46da6eb76f99986a27a2fc90b8d", chaseC:"f3c15f132c953a9fc2e80534237a918c", sleepA:"2af410594233f5839360ab788a01fdf3", sleepB:"065147e170e52dd7e082bc242dcbb551", painA:"bae3e4466674b25e971111c847a003b6", painB:"1a901bf1a59fb5770330cadd99ff635e"},
  tsunky: {sit:"2fed77e510494554b23090758c8933e0", blink:"92744718fac843896b417766ec81fdcc", tailup:"b56466d02a942531902d9e55414e4e79", groomA:"0de38fb28e57f57fd018029f3ea31b7d", groomB:"bd397114d657b1a7dad5d6ba4d73eb3f", happy:"f198df805f53efc74a148cba428b7f5c", happyT:"6564eea54479016562a711ec7853d102", stretch:"55fc8c4fb30755ce757140cd4bada6c0", chaseA:"c4a9645d42eeebd4bb6c31dba6c51334", chaseB:"519947134ac8f656a6a354fb9ab5f2c0", chaseC:"68fc6b31fa8cf6a704bd3738a174643a", sleepA:"ae398160bbbe4b439c846797a0d7528d", sleepB:"00f7ab387bef3ae7b892a9a1ea6a52b0", painA:"00a412f445886a97178c0b16808e5938", painB:"1886da247f3697d794c5fab2728fef9e"}
};
var ANIMS = {
  repos: {label:"Repos", frames:["sit","sit","sit","sit","sit","blink"], ms:400, css:"calm", bubble:""},
  queue: {label:"Queue", frames:["sit","tailup"], ms:500, css:"calm", bubble:""},
  toilette: {label:"Toilette", frames:["groomA","groomB"], ms:350, css:"calm", bubble:""},
  chasse: {label:"Papillon", frames:["chaseA","chaseB","chaseA","chaseB","chaseC","chaseC"], ms:450, css:"calm", bubble:""},
  ronron: {label:"Ronron", frames:["happy","happyT"], ms:450, css:"happy", bubble:"rrr"},
  sieste: {label:"Sieste", frames:["sleepA","sleepB"], ms:1100, css:"sleep", bubble:"Zzz"},
  chant: {label:"Chansonnette", frames:["happy","happyT","happy","sit"], ms:420, css:"calm", bubble:"♪ ♫"},
  pain: {label:"Fait le pain", frames:["painA","painB"], ms:320, css:"calm", bubble:"rrr"},
  pompon: {label:"Pompon", frames:["chaseA","chaseB","chaseC","chaseB"], ms:280, css:"calm", bubble:""}
};
var ANIM_EXTRA = {nahla: ["chant", "pain"], tsunky: ["pain"], bao: ["pompon", "pain"]};
var ANIM_ORDER = ["repos","queue","toilette","chasse","ronron","sieste"];
var CATS = {
  nahla: {name:"Nahla", domain:"Ménage & tâches", color:"#3E6FB0", level:5, xp:60, x:"36px", y:"630px", status:"Dernière tâche : hier",
    history:[{t:"Sortir les poubelles", xp:"+5 XP"},{t:"Changer la litière", xp:"+5 XP"}],
    next:"Niveau 6 : Nahla gagne son étagère perchée au salon, au-dessus du bureau."},
  bao: {name:"Bao", domain:"Courses & cuisine", color:"#9A5B12", level:4, xp:45, x:"272px", y:"585px", status:"Dernière tâche : il y a 2 j",
    history:[{t:"Courses du samedi", xp:"+15 XP"},{t:"Planning des repas", xp:"+10 XP"},{t:"Recette ajoutée en photo", xp:"+5 XP"}],
    next:"Niveau 5 : Bao gagne un petit bol en céramique devant le frigo."},
  tsunky: {name:"Tsunky", domain:"Missions & rendez-vous", color:"#4A7034", level:2, xp:10, x:"150px", y:"718px", status:"Rien depuis 9 j : elle fait la sieste",
    history:[{t:"Déchèterie (cartons)", xp:"+20 XP"}],
    next:"Une mission faite la réveille. Niveau 3 : son coussin dans le bureau."}
};
var ORDER = ["nahla","bao","tsunky"];
var TREE_POS = {nahla:{x:"30px", y:"456px"}, bao:{x:"85px", y:"556px"}, tsunky:{x:"68px", y:"691px"}};
var SALONS = {hiver:"/_blob/ebbdc6c4e0844e41febdb01e6f87e1f4", printemps:"/_blob/e574a021d2103a6d9aec51bcf1550c72", ete:"/_blob/ce83c6112bee9b91bf0f4c7a017161e2", automne:"/_blob/77effda9deff3fd89753e3f6af8996e7", classique:"/_blob/77effda9deff3fd89753e3f6af8996e7", noel:"/_blob/4cc5c358160940404e33ec46719cc264"};
var SEASON_RUG = {hiver:"/_blob/1d4f0104b336cf772843c6f35617a0f9", printemps:"/_blob/8b1d62bf439f5b5e9664e7eb97a97f4b", ete:"/_blob/f03feac62e6b9c030852e313e6091c5c", automne:"/_blob/cd4d708e9798850413cb64cbae8e70b5", classique:"/_blob/cd4d708e9798850413cb64cbae8e70b5", noel:"/_blob/57efa2b01ed3aafda12e4d1770e38f6c"};
var ROOMV = {
  mur: {kind:"Mur", objPos:"50% 8%", v:[{n:"Crème rayé", src:"/_blob/10ba5ea26abe2738df979cb909d57d3d", lvl:1}, {n:"Terracotta", src:"/_blob/1082437465014217756add61e0ae505c", lvl:8}, {n:"Vert sauge", src:"/_blob/2f6e9cc0316df3effa7b47296223d72d", lvl:11}, {n:"Bleu ardoise", src:"/_blob/3673267857234a9133e513ba56dcbac9", lvl:15}, {n:"Papier peint fleuri", src:"/_blob/8c7c31955cb8690e745d8e8672436b41", lvl:22}]},
  sol: {kind:"Sol", objPos:"50% 96%", v:[{n:"Parquet chêne clair", src:"/_blob/6f475eb7e85f03417389979401633fe3", lvl:1}, {n:"Parquet noyer", src:"/_blob/fe5b245c87ff886028e3769dfd9bf78e", lvl:10}, {n:"Point de Hongrie", src:"/_blob/b088516fa854827b9281e795c6742b04", lvl:14}, {n:"Tomettes", src:"/_blob/fc78ef635ecdbc8bdfea056db7f9e5ca", lvl:19}]},
  tapis: {kind:"Tapis", objPos:"50% 82%", v:[{n:"Selon la saison", season:true, src:"", lvl:1}, {n:"Berbère", src:"/_blob/0cde3fb5a358b55905d6356e37bb6a70", lvl:8}, {n:"Rond bleu", src:"/_blob/400621fd01b98e1d067a14d694433845", lvl:13}, {n:"Kilim", src:"/_blob/30a2a737e767d34d70e447aa4eaf26b9", lvl:17}]}
};
var BASKET = {full:"/_blob/f87381367738e7d94b873750ff5c9a67", half:"/_blob/49c03f8a63b9f099ba7a251af2aaf7b1", empty:"/_blob/64f41457da7b13e8b27edf2cc9d0e137"};
var FIRE = ["/_blob/f0537c227b3bd3f326a81bb6778e1f53","/_blob/7f6048530b1d9b8abb1c8b7fc29d3c3c","/_blob/4cc343095b6ac9042c699f3f26b7234b"];
var TABS = {
  courses: {title:"Courses", color:"#9A5B12", text:"La liste partagée, rangée par rayon, avec les recettes prises en photo et le planning des repas.", items:["Lait, œufs, beurre","Croquettes (stock bas)","+ 9 autres articles"]},
  taches: {title:"Tâches", color:"#3E6FB0", text:"Les tâches ponctuelles et récurrentes, attribuées à l'un ou l'autre, avec rappel.", items:["Passer l'aspirateur","Changer la litière","Arroser la plante"]},
  demarches: {title:"Démarches", color:"#4A7034", text:"Les papiers et déclarations avec leur date limite, les pièces à réunir et les rappels.", items:["Attestation d'assurance · avant le 30 nov."]},
  infos: {title:"Infos", color:"#2B2A30", text:"Les infos de référence et les suivis à remplir.", items:["Suivi des chats (vétérinaire, vaccins)","Contacts utiles","Relevés de compteurs"]}
};
var WEEK = [
  {short:"lun", long:"Lun. 9", num:9, items:[{t:"Sortir les poubelles", c:"#3E6FB0"}]},
  {short:"mar", long:"Mar. 10", num:10, items:[]},
  {short:"mer", long:"Mer. 11", num:11, items:[]},
  {short:"jeu", long:"Jeu. 12", num:12, items:[{t:"Sortir les poubelles", c:"#3E6FB0"}]},
  {short:"ven", long:"Ven. 13", num:13, today:true, items:[{t:"Passer l'aspirateur", c:"#3E6FB0"},{t:"Courses de la semaine", c:"#9A5B12"},{t:"Attestation d'assurance", c:"#4A7034"}]},
  {short:"sam", long:"Sam. 14", num:14, items:[]},
  {short:"dim", long:"Dim. 15", num:15, items:[{t:"Planifier les repas", c:"#9A5B12"}]}
];
var DECOS = [
  {name:"Plante", lvl:8, ok:false}, {name:"Tapis", lvl:9, ok:false}, {name:"Lampe", lvl:10, ok:false},
  {name:"Arbre à chat", lvl:11, ok:false}, {name:"Coussins", lvl:12, ok:false}
];
var RAYONS = ["Fruits & légumes","Frais","Épicerie","Chats","Maison"];
var ITEMS0 = [
  {id:1, n:"Miel", q:"", r:"Épicerie", by:"C"},
  {id:2, n:"Parmesan", q:"", r:"Frais", by:"C"},
  {id:3, n:"Bouillon", q:"", r:"Épicerie", by:"C"},
  {id:4, n:"Huile de tournesol", q:"", r:"Épicerie", by:"C"},
  {id:5, n:"Œufs", q:"", r:"Frais", by:"C"},
  {id:6, n:"Riz", q:"", r:"Épicerie", by:"C"},
  {id:7, n:"Sacs poubelle 30 L", q:"", r:"Maison", by:"C"},
  {id:8, n:"Sacs poubelle 50 L", q:"", r:"Maison", by:"C"}
];
var WHO = {E:{bg:"#8A4F9E", label:"ajouté par Emie"}, C:{bg:"#2F7F86", label:"ajouté par Co"}, A:{bg:"#6B6470", label:"ajouté automatiquement"}, "2":{bg:"#B5653A", label:"à deux"}, R:{bg:"#9A5B12", label:"depuis une recette"}};
var GUESS = [
  ["Fruits & légumes", ["pomme","poire","banane","oignon","ail","tomate","carotte","salade","citron","courgette","poireau","patate","pommes de terre","fraise","orange"]],
  ["Frais", ["lait","yaourt","fromage","crème","creme","beurre","jambon","œuf","oeuf","poulet","gruyère","viande","poisson"]],
  ["Chats", ["croquette","litière","litiere","pâtée","patee","friandise"]],
  ["Maison", ["savon","papier","lessive","éponge","eponge","dentifrice","shampo","sac"]]
];
function guessRayon(n) {
  var l = n.toLowerCase();
  for (var i = 0; i < GUESS.length; i++) {
    for (var j = 0; j < GUESS[i][1].length; j++) { if (l.indexOf(GUESS[i][1][j]) >= 0) return GUESS[i][0]; }
  }
  return "Épicerie";
}
var ING = [
  {id:"pdt", n:"Pommes de terre", q:1000, u:"g", r:"Fruits & légumes"},
  {id:"creme", n:"Crème liquide", q:40, u:"cl", r:"Frais"},
  {id:"lait", n:"Lait", q:50, u:"cl", r:"Frais", merge:true},
  {id:"ail", n:"Ail", q:2, u:"gousse", r:"Fruits & légumes"},
  {id:"gruyere", n:"Gruyère râpé", q:100, u:"g", r:"Frais"},
  {id:"muscade", n:"Muscade", q:1, u:"pincée", r:"Épicerie", off:true}
];
function fmtQty(q, u) {
  if (u === "g") { if (q >= 1000) return (Math.round(q / 100) / 10).toString().replace(".", ",") + " kg"; return Math.round(q / 10) * 10 + " g"; }
  if (u === "cl") return Math.round(q) + " cl";
  if (u === "gousse") { var n = Math.max(1, Math.round(q)); return n + (n > 1 ? " gousses" : " gousse"); }
  return "1 " + u;
}
var FAVS = [
  {n:"Lait", r:"Frais", q:"1 L"}, {n:"Pain de mie", r:"Épicerie", q:""}, {n:"Bananes", r:"Fruits & légumes", q:""},
  {n:"Croquettes", r:"Chats", q:""}, {n:"Café", r:"Épicerie", q:""}, {n:"Yaourts", r:"Frais", q:""}, {n:"Litière", r:"Chats", q:""}
];
var NOTE_COLORS = [{c:"#F7E27A", label:"Post-it jaune"}, {c:"#F6C1C7", label:"Post-it rose"}, {c:"#BFE0F2", label:"Post-it bleu"}, {c:"#CDE8C1", label:"Post-it vert"}];
var NOTES0 = [
  {id:1, by:"Emie", text:"Pense à appeler le véto pour le vaccin de Nahla", color:"#F7E27A", read:false, liked:false},
  {id:2, by:"Co", text:"Merci pour le gratin d'hier soir !", color:"#F6C1C7", read:true, liked:true}
];
var TASKS0 = [
  {id:"a", t:"Passer l'aspirateur", who:"C", when:"today", rec:"chaque semaine", pts:5, freq:"semaine"},
  {id:"b", t:"Faire les litières", who:"2", when:"today", rec:"tous les 2 jours", pts:4, freq:"2sem"},
  {id:"d", t:"Sortir les poubelles", who:"C", when:"week", rec:"mardi et vendredi", pts:4, freq:"2sem"},
  {id:"e", t:"Changer les draps", who:"2", when:"week", rec:"toutes les 2 semaines", pts:5, freq:"semaine"},
  {id:"f", t:"Nettoyer la salle de bain", who:"E", when:"week", rec:"chaque semaine", pts:5, freq:"semaine"},
  {id:"g", t:"Détartrer la bouilloire", who:"C", when:"later", rec:"chaque mois", pts:10, freq:"mois"},
  {id:"h", t:"Faire la vaisselle", who:"C", when:"today", rec:"chaque jour", pts:2, freq:"jour"},
  {id:"i", t:"Faire la cuisine", who:"E", when:"today", rec:"chaque jour", pts:2, freq:"jour"}
];
var QUICK = [
  {t:"Faire les litières", rec:"2 fois par semaine", freq:"2sem", pts:4}, {t:"Vaisselle", rec:"chaque jour", freq:"jour", pts:2}, {t:"Lessive", rec:"2 fois par semaine", freq:"2sem", pts:4},
  {t:"Aspirateur", rec:"chaque semaine", freq:"semaine", pts:5}, {t:"Poubelles", rec:"2 fois par semaine", freq:"2sem", pts:4}, {t:"Serpillière", rec:"chaque semaine", freq:"semaine", pts:5}
];
var WHEN = [{id:"today", name:"Aujourd'hui"}, {id:"week", name:"Cette semaine"}, {id:"later", name:"Plus tard"}];
var SEASONAL = [
  {id:"rad", t:"Purger les radiateurs", why:"Avant les grands froids"},
  {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"},
  {id:"vmc", t:"Nettoyer les bouches de VMC", why:"Avant l'hiver"},
  {id:"joint", t:"Vérifier les joints des fenêtres", why:"Contre les courants d'air"}
];
var HER_WISHES = [
  {id:"h1", t:"Bougie parfumée à la figue", note:"Taille moyenne"},
  {id:"h2", t:"Plaid en laine", note:"Tons bleus ou crème"},
  {id:"h3", t:"Atelier céramique à deux", note:"Un samedi"},
  {id:"h4", t:"Un roman au choix", note:"Pas encore lu : à demander à ses amies"}
];
var MY_WISHES = [{id:"m1", t:"Jeu de société coopératif"}, {id:"m2", t:"Carnet en cuir"}];
function rnd(i) { var x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); }
function winParticles(kind) {
  var p = [], i;
  if (kind === "snow") {
    for (i = 0; i < 22; i++) { var sz = rnd(i) > 0.7 ? 6 : 4;
      p.push({cls:"wsnow", x: Math.round(rnd(i + 1) * 92) + "px", y: "-6px", w: sz + "px", h: sz + "px", c: "#FFFFFF", dur: (4 + rnd(i + 2) * 4).toFixed(1) + "s", delay: (-rnd(i + 3) * 8).toFixed(1) + "s"}); }
  } else if (kind === "leaves") {
    var lc = ["#E08A3A", "#C0532F", "#E9B949"];
    for (i = 0; i < 9; i++) p.push({cls:"wleaf", x: Math.round(rnd(i + 5) * 80) + "px", y: "-6px", w: "6px", h: "5px", c: lc[i % 3], dur: (5 + rnd(i + 6) * 4).toFixed(1) + "s", delay: (-rnd(i + 7) * 9).toFixed(1) + "s"});
    for (i = 0; i < 18; i++) p.push({cls:"wrain", x: Math.round(rnd(i + 30) * 110) + "px", y: "-10px", w: "2px", h: "9px", c: "rgba(225,235,245,0.85)", dur: (0.55 + rnd(i + 31) * 0.3).toFixed(2) + "s", delay: (-rnd(i + 32) * 1).toFixed(2) + "s"});
  } else if (kind === "petals") {
    for (i = 0; i < 10; i++) p.push({cls:"wpetal", x: Math.round(40 + rnd(i + 11) * 54) + "px", y: Math.round(10 + rnd(i + 12) * 30) + "px", w: "4px", h: "4px", c: i % 3 ? "#F4B6C8" : "#FFFFFF", dur: (3.5 + rnd(i + 13) * 3).toFixed(1) + "s", delay: (-rnd(i + 14) * 6).toFixed(1) + "s"});
  } else if (kind === "rain") {
    for (i = 0; i < 24; i++) p.push({cls:"wrain", x: Math.round(rnd(i + 30) * 110) + "px", y: "-10px", w: "2px", h: "9px", c: "rgba(225,235,245,0.85)", dur: (0.55 + rnd(i + 31) * 0.3).toFixed(2) + "s", delay: (-rnd(i + 32) * 1).toFixed(2) + "s"});
  } else if (kind === "sea") {
    var rows = [[56, 4], [62, 10], [68, 2], [74, 8]];
    for (i = 0; i < 8; i++) { var r = rows[i % 4];
      p.push({cls:"wwave", x: (r[1] + (i > 3 ? 46 : 0)) + "px", y: r[0] + "px", w: (12 + Math.round(rnd(i + 21) * 14)) + "px", h: "3px", c: "#BDE6F2", dur: "2.4s", delay: (-rnd(i + 22) * 2.4).toFixed(1) + "s"}); }
  }
  return p;
}
var ITEMS_IMG = {popcorn:"/_blob/5c48c837fd4345d6352bd864d472aad8", jeu:"/_blob/a9b2dca8831eaaa5860fdd1d503c924f", de:"/_blob/9d829005f27125a390b022acaabdbd44", livre:"/_blob/01cd2faad48307d5d3eb0b3adcc2148b", manette:"/_blob/637ed11179bf29ec4f7a9bab040f784f", cuisine:"/_blob/2d085e070fafb53a164044547134b3b4", bougie:"/_blob/ac7aedfaf010db9648142b6c53d1e846"};
var ACTS0 = [
  {id:"serie", n:"Série", item:"popcorn"}, {id:"film", n:"Film", item:"popcorn"}, {id:"rp", n:"Soirée RP", item:"de"},
  {id:"overwatch", n:"Overwatch", item:"manette"}, {id:"baldur", n:"Baldur", item:"manette"}, {id:"minecraft", n:"Minecraft", item:"manette"}
];
var SOIR_DAYS0 = [{s:"ven", n:13, l:"Ce soir · vendredi 13"}, {s:"sam", n:14, l:"Samedi 14"}, {s:"dim", n:15, l:"Dimanche 15"}, {s:"lun", n:16, l:"Lundi 16"}, {s:"mar", n:17, l:"Mardi 17"}, {s:"mer", n:18, l:"Mercredi 18"}, {s:"jeu", n:19, l:"Jeudi 19"}];
var SOIR_DAYS = !REEL ? SOIR_DAYS0 : [0, 1, 2, 3, 4, 5, 6].map(function (n) { var d = new Date(TODAY_Y, TODAY_M, TODAY_D + n), jl = JOURS_L[d.getDay()];
  return {s: jl.slice(0, 3), n: d.getDate(), l: n === 0 ? "Ce soir · " + jl + " " + d.getDate() : jl.charAt(0).toUpperCase() + jl.slice(1) + " " + d.getDate(), iso: isoD(d)}; });
var SOIR_STATUS = {attente:{l:REEL ? "En attente de réponse" : "En attente d'Emie", bg:"#FFF1D6", fg:"#6E400C"}, accepte:{l:"C'est validé !", bg:"#E4EEDC", fg:"#36532A"}, autre:{l:REEL ? "Une autre idée est proposée" : "Emie a une autre idée", bg:"#E3EAF4", fg:"#23324A"}, refuse:{l:"Pas ce soir", bg:"#F4E6E6", fg:"#7A2A2A"}};
var TRACKS = {
  automne: ["6ea6f8a5e1c7fbe036f38b3126d4e51d", "1f68a1c208ca6ba5a9f1adacc2b91220", "ddd0e96f6c7eb9ad955ec6ae5e35e88a"],
  hiver: ["adcf7fcc31ae8c7f61268bbd004ff5ad", "b5063abf21b2bfc1ad6a5aa7993e6adc", "0df10aaa0aa2d4a3ddb8c9ba33668ee4"],
  noel: ["8fd70a2c0a30f7fcca79ef2a99cf39c8", "75e3d816194f8df021c5d7369735419a", "9a1c72dffa1dc0381377b48a7f93db89"]
};
TRACKS.base = TRACKS.automne.concat(TRACKS.hiver);
function trackKey(st) { if (st.event === "noel" && st.eventShown && TRACKS.noel) return "noel"; return TRACKS[st.saison] ? st.saison : "base"; }
var MUSIC = {
  el: null, key: null, idx: 0, on: false, fadeT: null, target: 0.55, blocked: false,
  list: function () { return TRACKS[this.key] || TRACKS.base; },
  ensure: function () {
    if (this.el || typeof Audio === "undefined") return !!this.el;
    var m = this; this.el = new Audio(); this.el.preload = "auto";
    this.el.addEventListener("ended", function () { m.idx = (m.idx + 1) % m.list().length; m.load(); m.play(false); });
    if (typeof document !== "undefined") document.addEventListener("pointerdown", function () { if (m.blocked && m.on) { m.blocked = false; m.play(true); } });
    return true;
  },
  load: function () { this.el.src = blobUrl("/_blob/" + this.list()[this.idx]); },
  play: function (fade) {
    var m = this; this.el.volume = fade ? 0 : this.target;
    var pr = this.el.play(); if (pr && pr.catch) pr.catch(function () { m.blocked = true; });
    if (fade) this.fade(this.target, null, 1500);
  },
  fade: function (to, cb, ms) {
    var m = this, from = this.el.volume, steps = Math.max(1, Math.round((ms || 1200) / 50)), i = 0;
    clearInterval(this.fadeT);
    this.fadeT = setInterval(function () { i++; m.el.volume = Math.max(0, Math.min(1, from + (to - from) * i / steps)); if (i >= steps) { clearInterval(m.fadeT); if (cb) cb(); } }, 50);
  },
  sync: function (on, key) {
    if (!this.ensure()) return;
    var m = this;
    if (!on) { if (this.on) { this.on = false; this.fade(0, function () { m.el.pause(); }, 600); } return; }
    if (key !== this.key) {
      var first = this.key === null; this.key = key; this.idx = Math.floor(Math.random() * this.list().length); this.on = true;
      if (!first && !this.el.paused) this.fade(0, function () { m.load(); m.play(true); }, 1200);
      else { this.load(); this.play(true); }
      return;
    }
    if (!this.on) { this.on = true; this.play(true); }
  },
  label: function () { return this.key ? "morceau " + (this.idx + 1) + "/" + this.list().length : ""; }
};
var PLAYLISTS = {printemps:"Printemps (en attendant : automne et hiver)", ete:"Été (en attendant : automne et hiver)", automne:"Automne", hiver:"Hiver", noel:"Noël", classique:"Automne et hiver", base:"Automne et hiver"};
var MTYPES = [{id:"rdv", l:"Rendez-vous", bg:"#F6C1C7", pts:50}, {id:"achat", l:"Achat", bg:"#F7E27A", pts:50}, {id:"sortie", l:"Sortie", bg:"#BFE0F2", pts:50}, {id:"papiers", l:"Papiers", bg:"#CDE8C1", pts:80}];
function recPts(rec) { rec = String(rec || ""); if (/mois|saison|trimestre|an\b/.test(rec)) return 10; if (/semaine|mardi|lundi|mercredi|jeudi|vendredi|samedi|dimanche/.test(rec)) return 5; return 2; }
var MISS0 = [
  {id:"m1", t:"Acheter la nouvelle clim", type:"achat", who:"2", note:"Comparer 3 modèles · avant l'été", pts:100, big:true},
  {id:"m2", t:"Acheter le tapis de marche", type:"achat", who:"2", note:"À planifier", pts:100, big:true},
  {id:"m3", t:"Vétérinaire : vaccins de Nahla, Tsunky et Bao", type:"rdv", who:"2", date:"2026-11-20", time:"", pts:50, cats:["nahla","bao","tsunky"]},
  {id:"m4", t:"Coiffeur", type:"rdv", who:"C", date:"2026-11-28", time:"", note:"fin novembre · date à fixer", pts:50},
  {id:"m5", t:"Déchèterie", type:"sortie", who:"2", note:"À planifier", pts:50, details:""}
];
var TODAY = new Date(TODAY_Y, TODAY_M, TODAY_D);
var JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
var MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
function parseD(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
function fmtD(d) { return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()]; }
function daysBetween(a, b) { return Math.round((b - a) / 86400000); }
var FREQS = [{id: "jour", n: "Quotidienne", g: "Chaque jour", sub: "deux passages possibles par jour · remises à zéro à minuit", pts: 2},
  {id: "2sem", n: "2×/semaine", g: "Deux fois par semaine", sub: "deux passages par semaine · renouvelées le lundi à 0 h", pts: 4},
  {id: "semaine", n: "Hebdomadaire", g: "Chaque semaine", sub: "renouvelées le lundi à 0 h", pts: 5},
  {id: "mois", n: "Mensuelle", g: "Chaque mois", sub: "renouvelées le 1er à 0 h", pts: 10},
  {id: "une", n: "Ponctuelle", g: "Ponctuelles", sub: "une seule fois", pts: 10}];
function freqOf(t) { if (t.freq) return t.freq; var r = String(t.rec || "").toLowerCase(); if (t.seasonal || /une fois|saison/.test(r)) return "une"; if (/mois/.test(r)) return "mois"; if (/2 fois par semaine|mardi et vendredi|tous les 2 jours/.test(r)) return "2sem"; if (/semaine|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/.test(r)) return "semaine"; if (/jour/.test(r)) return "jour"; return "semaine"; }
function catSleeping(st, k) { var l = ((st.stats || {}).catLast || {})[k]; return !!l && Math.round((parseD(TODAY_ISO) - parseD(l)) / 864e5) >= 3; }
var BASKETS = {
  rond: {full:"/_blob/51ec7f85673fd728da76b1864e3fa618", half:"/_blob/0793c3445a0abb81a7c2cc06fe631014", empty:"/_blob/627c14459ad470c8728c06183fc7194e"},
  sac: {full:"/_blob/e9a9bb22bb3de128ace99a82c980f18b", half:"/_blob/2b7aaa15e3863eb594caaa32f8c95645", empty:"/_blob/0c205c4bea3d6c9d92346559e4bec711"},
  osier: {full:"/_blob/f87381367738e7d94b873750ff5c9a67", half:"/_blob/49c03f8a63b9f099ba7a251af2aaf7b1", empty:"/_blob/64f41457da7b13e8b27edf2cc9d0e137"},
  tissu: {full:"/_blob/e36e48e3aefdc296078fa340680ea1e9", half:"/_blob/7134ffa8ae45ce4e2a4e8980c0acb27d", empty:"/_blob/edf00fa614c7d22e0bef07a3a71b3bab"},
  rotin: {full:"/_blob/851104d2b8f288b6f1f9523bb1b4bbae", half:"/_blob/16eb309d0a04d1907cc90d96d2d39382", empty:"/_blob/c8c61ff9610133aa651cb521f9415f41"}
};
var FURN = {
  bureau: {kind:"Bureau", w:"66px", h:"90px", v:[{n:"Bois classique", src:"/_blob/288ed1e666c374f8fcc4c3e15422b6cf", lvl:1}, {n:"Noyer", src:"/_blob/22e7dc10ccbe0d7469c3e2753e8c0784", lvl:8}, {n:"Moderne blanc", src:"/_blob/5c2aeb7df161f8787e67be994daa0536", lvl:12}, {n:"Secrétaire", src:"/_blob/68f6d53a3bd8603265bff3da6febdd6b", lvl:20}]},
  frigo: {kind:"Frigo", w:"24px", h:"63px", v:[
    {n:"Blanc", src:"/_blob/05dc59bf950b99e16165c0fd23353cb8", lvl:1},
    {n:"Crème rétro", src:"/_blob/d298ecc29dfb92ebf8b8bf3cace4698d", lvl:8},
    {n:"Rouge", src:"/_blob/6f6673cf56d75f641ca022587a382956", lvl:13},
    {n:"Américain", src:"/_blob/3a0dd8c2e9006e1084597b3d4c12b1ba", lvl:16, fw:"108px", pw:"27px"},
    {n:"Vert sauge", src:"/_blob/3488850f5902126c9356e7d5dd5f30d6", lvl:22},
    {n:"Mini rétro", src:"/_blob/acde1f63ad76f069a7fdfc0c26d384fd", lvl:24, fh:"156px", ftop:396, ph:"39px"}]},
  panier: {kind:"Panier à linge", w:"72px", h:"60px", v:[{n:"Osier", key:"osier", src:"/_blob/49c03f8a63b9f099ba7a251af2aaf7b1", lvl:1}, {n:"Tissu gris", key:"tissu", src:"/_blob/7134ffa8ae45ce4e2a4e8980c0acb27d", lvl:9}, {n:"Panier rond", key:"rond", src:"/_blob/0793c3445a0abb81a7c2cc06fe631014", lvl:10}, {n:"Sac à linge", key:"sac", src:"/_blob/2b7aaa15e3863eb594caaa32f8c95645", lvl:14}, {n:"Rotin clair", key:"rotin", src:"/_blob/16eb309d0a04d1907cc90d96d2d39382", lvl:18}]},
  pensebete: {kind:"Pense-bête", w:"78px", h:"64px", v:[{n:"Liège", src:"/_blob/0db208983f8813fa871cb9a11ac6138b", lvl:1}, {n:"Ardoise", src:"/_blob/15d852b25ccd4575a79939affe9af1dc", lvl:9}, {n:"Tableau blanc", src:"/_blob/c1b9fbf33e1505b407e7492a0f155c8b", lvl:12}, {n:"Maisonnette", src:"/_blob/22e24e2b064770e0492071d615a0a27a", lvl:14, bh:"96px", btop:126, ph:"60px", pw:"64px"}, {n:"Rond", src:"/_blob/bc8e0aa54bc18e7b6530dec5c5f157bc", lvl:19}]},
  plaid: {kind:"Plaid du canapé", w:"80px", h:"56px", v:[{n:"Bleu rayé", src:"/_blob/61e04830f68c4eebc5803b413d5114b2", lvl:1}, {n:"Tartan rouge", src:"/_blob/d3b3897030c87cc73c291d0d1f80d1ca", lvl:8}, {n:"Grosse maille crème", src:"/_blob/75b62cc15498d40a3d92caa876a6837d", lvl:14}, {n:"Fausse fourrure grise", src:"/_blob/e960cadeb4f445f03e2532e245c578b2", lvl:19}, {n:"Patchwork pastel", src:"/_blob/105df4203e06f9a5849ecb4849fcd71f", lvl:26}]},
  canape: {kind:"Canapé", w:"80px", h:"56px", v:[{n:"Bleu canard", src:"/_blob/ea65ac29b00cd4ee6271041f89ee72f7", lvl:9}, {n:"Moutarde", src:"/_blob/0883ade9d77e1db32e21443c56d213b9", lvl:9}, {n:"Banquette scandinave", src:"/_blob/f000e696713ecd81a4d8a6b36e68157e", lvl:12}, {n:"Velours rose", src:"/_blob/1f7314835a18b5a5a8837945d7740d0b", lvl:16}, {n:"Chesterfield", src:"/_blob/44e6eff8aad83df217aa8493ebfced3e", lvl:21}]},
  table: {kind:"Table basse", w:"84px", h:"33px", v:[{n:"Chêne", src:"/_blob/7a186ae279546552447ccd007a226833", lvl:10}, {n:"Noyer", src:"/_blob/182f7fdd888b130b2f2a8f50d49053be", lvl:10}, {n:"Ronde", src:"/_blob/be62a7e43ef57c207a2285269e1b41f4", lvl:11}, {n:"Laquée blanche", src:"/_blob/579045c8d3a18e43ce3b05079d915821", lvl:20}, {n:"Malle de voyage", src:"/_blob/2c58c1d96142b7437ff8591e7e5ef764", lvl:23}]}
};
var BFURN = {"setupR": {"kind": "Setup rose", "box": [0, 60, 25, 44], "v": [["Rose & bois blanc", "/_blob/8aa9af629c8152a4e90bf25c2c03e8c4", 2], ["Menthe & bois blanc", "/_blob/94bcb1c68bcd4cac9ff0e34cc4c36a8e", 12], ["Lilas & bouleau", "/_blob/dfc9fb0abeea99798643c1453ddf9dd7", 20], ["Tout blanc", "/_blob/6937b018eb3084880d7a4c2aec6802ea", 26]]}, "chaiseR": {"kind": "Chaise rose", "box": [6, 79, 12, 26], "v": [["Rose", "/_blob/799b46e4da453fcb174d92f5835a806f", 2], ["Blanche", "/_blob/59241221b9b70c5ef6b15e3d0735ada9", 11], ["Lilas", "/_blob/f4a06186a7838973eca87778a3d70a1b", 16], ["Gaming rose & blanc", "/_blob/4aeebc9c30b782de9baa242d90dbb792", 22]]}, "setupB": {"kind": "Setup bleu", "box": [40, 60, 25, 44], "v": [["Bois foncé & pieds bleus", "/_blob/657af0ee9db5cc844c18fa05f1b89719", 2], ["Noyer & noir", "/_blob/5c4fc01e1fa3be0edfabf7682f6de5fb", 14], ["Chêne & vert sapin", "/_blob/44b64d49b80ca8f691b708240c76b3f4", 21], ["Triple écran", "/_blob/bb387a3747ecfbae83bfd2058fab8854", 28]]}, "chaiseB": {"kind": "Chaise bleue", "box": [47, 79, 12, 26], "v": [["Bleu nuit", "/_blob/16f1495f7dfa775ba7719ce0d7b6130f", 2], ["Noire", "/_blob/2dc8cc57c027b2426129d3ca43027801", 11], ["Gaming bleu", "/_blob/03a4b59ae3491d16de6d45143a4a9558", 18], ["Cuir cognac", "/_blob/443bddf2fcadba524704f8d8a0e81c01", 25]]}, "cubes": {"kind": "Étagère à cubes", "box": [26, 59, 13, 45], "v": [["Blanche", "/_blob/8493671ab270c0391cb135edd08b253c", 2], ["Effet chêne", "/_blob/e23e6f4958ea07de94960e187a98aeae", 13], ["Noire", "/_blob/ab49869f9482d2d5f611d6a86b50f5b7", 18], ["Rose poudré", "/_blob/b2be58d593a89ac46044b2cc15ac52eb", 23]]}, "dodo": {"kind": "Dodo en hauteur", "box": [25, 52, 15, 7], "v": [["Coussin gris", "/_blob/4a7d1c5e63594c96e3153017b7186538", 2], ["Panier rond", "/_blob/cd0c2034e948c844175c9214616be7ed", 11], ["Coussin moelleux", "/_blob/fd59bf5632bfc192cca6732f247c84f9", 16], ["Hamac", "/_blob/d0779acd37dc89a08a3da1e5df5d33e4", 22]]}, "murales": {"kind": "Parcours mural", "box": [0, 20, 65, 38], "v": [["Bois clair", ["/_blob/8c46c923f52e098a83dd6c8ae500d03b", "/_blob/b7ac3cb7b600542675cd87f3a65ab324", "/_blob/eabd4861c32fed0a7cd90bbc3299756f"], 15], ["Noyer", ["/_blob/08142ebb06c401a78265917fe909e52c", "/_blob/27f48b2dc9a7acabe3fea68854e3f508", "/_blob/6ecd0263316d0681eb2b6812d2654a2b"], 20], ["Blanc & sisal", ["/_blob/b69b857a1bc2fb463ac266d3fd15827f", "/_blob/786b78f2355014941afbd33e8a589311", "/_blob/c285aaa65fbc00c1015e3dfd034bdd55"], 25]]}, "projets": {"kind": "Tableau des projets", "box": [3, 38, 20, 15], "v": [["Liège", "/_blob/3c08914cf7c0d1e6b10bf58bfd9d551a", 2], ["Tableau blanc", "/_blob/77691166b043e22689b0f02a50b12fc5", 13], ["Ardoise", "/_blob/79668edcb3db63c9781f6860b1be2846", 17]]}, "tapis": {"kind": "Tapis", "box": [2, 103, 61, 14], "v": [["Gris chiné", "/_blob/af26a120a355d85e37a5d06b84f7076c", 2], ["Rose & bleu", "/_blob/50b0365861ec7a5d2cc3cce83367a44d", 17], ["Vert d'eau", "/_blob/26aa4ee66a85ebd017c31729db349f1b", 23]]}};
var BORDER = ["setupR", "chaiseR", "setupB", "chaiseB", "cubes", "dodo", "murales", "projets", "tapis"];
var MURAL_STAGES = [15, 23, 30];
var PROJ0 = [
  {id:"p1", who:"C", t:"Apprendre le japonais", habit:"15 min par jour", streak:12, today:false, steps:[{t:"Hiragana", d:true}, {t:"Katakana", d:true}, {t:"100 premiers kanji · 37/100", d:false}, {t:"Lire un manga simple", d:false}, {t:"JLPT N5", d:false}, {t:"Tenir 15 min de conversation", d:false}]},
  {id:"p2", who:"N", t:"Aménager le balcon", habit:"", streak:0, today:false, steps:[{t:"Mesurer l'espace", d:true}, {t:"Choisir les plantes", d:true}, {t:"Acheter les jardinières", d:false}, {t:"Installer la guirlande", d:false}]}
];
var AGCATS = [{id:"patch", l:"Patch", c:"#3E6FB0"}, {id:"sortie", l:"Sortie de jeu", c:"#8A4F9E"}, {id:"rp", l:"Événement RP", c:"#B4527A"}, {id:"groupe", l:"Soirée en groupe", c:"#4A7034"}, {id:"autre", l:"Autre", c:"#6B6470"}];
var AGENDA0 = REEL ? [] : [{id:"g1", d:"2026-11-18", h:"", t:"Patch Overwatch : nouvelle saison", cat:"patch", note:""}, {id:"g2", d:"2026-11-21", h:"20:30", t:"Soirée Baldur en groupe", cat:"groupe", note:"Discord du groupe"}, {id:"g3", d:"2026-11-28", h:"21:00", t:"Bal masqué à Ul'dah", cat:"rp", note:""}, {id:"g4", d:"2026-12-04", h:"", t:"Mise à jour Minecraft", cat:"patch", note:""}];
var WHO_P = {C:{l:"C", c:"#3E6FB0"}, E:{l:"E", c:"#B4527A"}, N:{l:"E&C", c:"#4A7034"}};
var NAME = {C:"Co", E:"Emie"};
var TITLE_CATS = [
  {id:"litiere", n:"Litière", src:"task", re:/liti[eè]re/i, t:[[5,"Ramasseur de caca novice","Ramasseuse de caca novice"],[15,"Ramasseur de caca en herbe","Ramasseuse de caca en herbe"],[30,"Ramasseur de caca intermédiaire","Ramasseuse de caca intermédiaire"],[50,"Ramasseur de caca d'élite","Ramasseuse de caca d'élite"],[100,"Ramasseur de caca héroïque","Ramasseuse de caca héroïque"],[200,"Ramasseur de caca légendaire","Ramasseuse de caca légendaire"]]},
  {id:"vaisselle", n:"Vaisselle", src:"task", re:/vaisselle/i, t:[[5,"Rinceur de verres","Rinceuse de verres"],[15,"Laveur d'assiettes","Laveuse d'assiettes"],[30,"Plongeur confirmé","Plongeuse confirmée"],[50,"As de l'éponge","As de l'éponge"],[100,"Maître de la mousse","Maîtresse de la mousse"],[200,"Légende de l'évier","Légende de l'évier"]]},
  {id:"cuisine", n:"Cuisine", src:"task", re:/cuisine|à manger|repas/i, t:[[5,"Apprenti marmiton","Apprentie marmitonne"],[15,"Commis de cuisine","Commis de cuisine"],[30,"Cuisinier du quotidien","Cuisinière du quotidien"],[50,"Chef de partie","Cheffe de partie"],[100,"Chef étoilé","Cheffe étoilée"],[200,"Grand chef légendaire","Grande cheffe légendaire"]]},
  {id:"sousmarins", n:"FFXIV · sous-marins", src:"ff", re:/sous-marin/i, t:[[5,"Mousse","Mousse"],[15,"Matelot","Matelote"],[30,"Second du bord","Seconde du bord"],[50,"Capitaine","Capitaine"],[100,"Amiral de la compagnie","Amirale de la compagnie"],[200,"Légende des abysses","Légende des abysses"]]},
  {id:"goldsaucer", n:"FFXIV · Gold Saucer", src:"ff", re:/gold saucer|cactpot/i, t:[[5,"Joueur du dimanche","Joueuse du dimanche"],[15,"Habitué du Gold Saucer","Habituée du Gold Saucer"],[30,"Flambeur","Flambeuse"],[50,"Roi du Cactpot","Reine du Cactpot"],[100,"Baron du Gold Saucer","Baronne du Gold Saucer"],[200,"Légende du Gold Saucer","Légende du Gold Saucer"]]},
  {id:"soirees", n:"Soirées acceptées", src:"soiree", re:null, t:[[3,"Animateur du canapé","Animatrice du canapé"],[10,"Organisateur de soirées","Organisatrice de soirées"],[25,"Pro des soirées","Pro des soirées"],[50,"Roi des soirées","Reine des soirées"],[100,"Légende du canapé","Légende du canapé"]]}
];
var TITLES0 = {litiere: {C: 47, E: 52}, vaisselle: {C: 12, E: 18}, cuisine: {C: 28, E: 9}, sousmarins: {C: 44, E: 3}, goldsaucer: {C: 16, E: 31}, soirees: {C: 7, E: 11}};
function tierOf(cat, n) { var t = -1; cat.t.forEach(function (x, i) { if (n >= x[0]) t = i; }); return t; }
function titleOf(cat, who, i) { return cat.t[i][who === "E" ? 2 : 1]; }
var KFURN = {"kplan": {"kind": "Plan de travail", "box": [13, 74, 52, 30], "v": [["Façades blanches", "/_blob/0ed338c57027404633a409262fd7182f", 3], ["Vert sauge", "/_blob/87b139e21692db5896c2fc783d14e8b3", 17], ["Bleu nuit", "/_blob/4a49e277adbc8e19e6a1d1eeaf51e37d", 21], ["Tout bois", "/_blob/84a4ceecd0d2e1249593f7dd9c0f233b", 25]]}, "kplaques": {"kind": "Plaques & hotte", "box": [40, 40, 14, 40], "v": [["Induction", "/_blob/00f9fc088136ab6a08d29f583aa9af12", 3], ["Gaz inox", "/_blob/5f1046124063dd49bf5f46a151a54a63", 18], ["Gaz & hotte cuivre", "/_blob/bf2c1ab3c771a0908647d21a9b05e5a5", 26]]}, "kfrigo": {"kind": "Frigo de la cuisine", "box": [0, 50, 13, 54], "v": [["Inox", "/_blob/74f9ed5241d5f895f446de2325013b11", 3], ["Blanc", "/_blob/4d97952c2bfebd703b9c612badeaad60", 15], ["Crème rétro", "/_blob/d812a3fba7d900237fe577a4c31ddf29", 20], ["Bleu pastel", "/_blob/16c7966f763f5b44b07379eba3a6df55", 25]]}, "ketagere": {"kind": "Étagère à bocaux", "box": [55, 46, 10, 18], "v": [["Bois", "/_blob/5c8022eea4282eab1413ba0de9e09a03", 3], ["Métal noir", "/_blob/34db5a521959cf7031390f6e123862fe", 21], ["Blanche suspendue à des cordes", "/_blob/cc15bb89d7835470dbddc7b0524b937d", 15], ["Bois flotté", "/_blob/4089603fa53358b71127c1ef5e32498a", 25], ["D'angle en cuivre", "/_blob/3ffc63a0013d6ce55bc3898da875af12", 33]]}, "kilot": {"kind": "Îlot", "box": [13, 98, 38, 24], "v": [["Bois & crème", "/_blob/39aaa6bdd799b962ae648445627be555", 3], ["Blanc & chêne", "/_blob/012c88673ac0ec62fb060ffc68b5d44e", 19], ["Vert & marbre", "/_blob/552f68933971a1a4872a3831674a8f95", 23]]}, "kgamelles": {"kind": "Gamelles des chats", "box": [52, 109, 12, 8], "v": [["Céramique aux couleurs des chats", "/_blob/1ca0fc9a67a1e6e771e789554ba20b07", 3], ["Inox", "/_blob/ca33e6d8f341a2096770efa86f3ffce1", 17], ["Avec fontaine à eau", "/_blob/71e9eae7491cf4f75898ed799f63a770", 24]]}, "kepices": {"kind": "Étagère à épices", "box": [38, 18, 24, 24], "v": [["Bois", "/_blob/8dc1f7af55f411ffb0bb08103831cd62", 3], ["Métal noir", "/_blob/9719c18332d25fd1ea098f4ccd74eeed", 14], ["Cuivre", "/_blob/0053fbf3edf48b66e6e98dd24d0e3dac", 25]]}, "kparcours": {"kind": "Parcours des chats", "box": [0, 30, 40, 13], "v": [["Bois clair", "/_blob/5a795bcabfda084a518d17c027ef9308", 3], ["Blanc & sisal", "/_blob/adc7f32405e453a5d51149d9c3a6db2f", 20], ["Noyer & corde", "/_blob/2843f23968de4cf19336fe0d9a741dff", 14], ["Pastel arc-en-ciel", "/_blob/79b05357ae6380c73127e5baf3a103fd", 23], ["Bambou", "/_blob/4172d043092b20e6a01bf13a168e70dd", 32]]}};
var KORDER = ["kplan", "kplaques", "kepices", "kparcours", "kwin", "kfrigo", "ketagere", "kilot", "kgamelles"];
var POT = {induction: ["/_blob/68658ecd5e2e29a90823f3620fc172df", "/_blob/dc5671ebda5275ace5b9d0bed0834d8f"], gaz: ["/_blob/6bf9f2bb04055d07dda27258ca14e885", "/_blob/122b59e758be45150f8d642ce9b7b8fc"]};
function isMealTime(d) { var m = d.getHours() * 60 + d.getMinutes(); return (m >= 690 && m < 810) || (m >= 1110 && m < 1230); }
var KWIN = {printemps: "/_blob/7e90f319168b18a6feefb2b35c39d8e3", ete: "/_blob/956664c58f47fc7deac59303b8273496", automne: "/_blob/4589452a46f6b812a7e599b4cd8dafbe", classique: "/_blob/9a426b0767cc1ac6f8b071b54494b49f", jour: "/_blob/9a426b0767cc1ac6f8b071b54494b49f", hiver: "/_blob/dab4be26aea4b23239de0fc36c8b8288", noel: "/_blob/4557bd0c74b1223983f6e490680c241c"};
var BNOEL = ["/_blob/432ee0c6dbef5451ede77195346457b8", "/_blob/5f0e4e0ac94cb82e40ac559d0225e68a"];
KORDER.forEach(function (k) { BFURN[k] = KFURN[k]; });
var VFURN = {"vplantes": {"kind": "Plantes", "box": [0, 12, 65, 100], "v": [["Plantes vertes", "/_blob/e1c04bcbb9623bda22bbe5cd5ef9e8b6", 7], ["Plantes fleuries", "/_blob/4485c6990eb9b55b4e2a1d8c0650b513", 32], ["Citronnier", "/_blob/0d18388094e0a3075c1ef07be033780b", 34]]}, "vfauteuil": {"kind": "Fauteuil suspendu", "box": [47, 12, 18, 62], "v": [["Rotin", "/_blob/7c010b2d365758517f64ee9246a59897", 31], ["Macramé", "/_blob/215d0c5cd6411675991ce9522c250469", 33], ["Œuf en osier noir", "/_blob/1a7c03af9b6cae7471cf1289f62ed1b1", 17], ["Hamac rose et lilas", "/_blob/3270cf904be7472419fd2827038e97b0", 28], ["Bulle transparente", "/_blob/36e389a2b3bd603ea9323836554704e1", 34]]}, "vbanquette": {"kind": "Banquette au soleil", "box": [8, 88, 48, 22], "v": [["Rotin naturel", "/_blob/1b4d23a33098b3f09948ce9304f4ac15", 7], ["Rotin blanc", "/_blob/4a1f61154363382a10fc76f7e65dd558", 33], ["Velours vert", "/_blob/dc0766fcf06d877266b997e47e3ac53c", 34]]}};
var VORDER = ["vplantes", "vfauteuil", "vbanquette"];
VORDER.forEach(function (k) { BFURN[k] = VFURN[k]; });
var VBG = {printemps: "/_blob/7ae3afa616a5fc5f5596673de20f8348", ete: "/_blob/950ee9584e2fbc9e19fd837405c38e62", automne: "/_blob/d8f70dd9ec90ad5dc45683bb8094a5d8", hiver: "/_blob/875fbe08f9742e07c125b8c57504898a", noel: "/_blob/cf159385306fa05dac4db2751ad8e1a0", classique: "/_blob/950ee9584e2fbc9e19fd837405c38e62"};
var BSEAS = {printemps: "/_blob/74d44a00a147c855c4d27b35419a7bfb", ete: "/_blob/d3572339689c5423a6f870a4ca22af0d", automne: "/_blob/49fc7fd757554af51f59af02fffa440b", hiver: "/_blob/c84493b5a4ad0f9d2b9de12974ae8bc5"};
var KSEAS = {printemps: "/_blob/05b347537efe2dd6ae0386f3b8d6d849", ete: "/_blob/bd75be02c63d74dbce45c3c722c0aea3", automne: "/_blob/6a493fff6aeb25513d5f8c4dc0058450", hiver: "/_blob/692bd08204178c5393f512b33461fb65", noel: "/_blob/b57c9533959f80cca03ca03e388cbeea"};
var SFX = {
  ctx: null, vol: 0.5, on: true, mute: false,
  ac: function () {
    if (typeof window === "undefined") return null;
    if (!this.ctx) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; this.ctx = new A(); }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  out: function (c) { var g = c.createGain(); g.gain.value = this.vol * 0.35; g.connect(c.destination); return g; },
  note: function (c, dst, f, t, d, type, peak, f2) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "square"; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak || 0.6, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(dst); o.start(t); o.stop(t + d + 0.02);
  },
  play: function (name, dur) {
    if (!this.on || this.mute || this.vol <= 0) return;
    var c = this.ac(); if (!c) return;
    var t = c.currentTime + 0.01, o = this.out(c), n = this.note.bind(this, c, o);
    if (name === "ding") { n(988, t, 0.09, "square", 0.45); n(1319, t + 0.08, 0.22, "square", 0.45); }
    else if (name === "mission") { [523, 659, 784, 1047].forEach(function (f, i) { n(f, t + i * 0.07, 0.16, "triangle", 0.8); }); n(1047, t + 0.28, 0.35, "square", 0.25); }
    else if (name === "niveau") { [[392, 0, 0.12], [523, 0.12, 0.12], [659, 0.24, 0.12], [784, 0.36, 0.42]].forEach(function (x) { n(x[0], t + x[1], x[2], "square", 0.5); n(x[0] / 2, t + x[1], x[2], "triangle", 0.5); }); }
    else if (name === "bloup") { n(260, t, 0.11, "sine", 0.9, 640); }
    else if (name === "hautfait") { [1568, 2093, 2637, 3136].forEach(function (f, i) { n(f, t + i * 0.06, 0.6, "sine", 0.35); }); n(4186, t + 0.3, 0.5, "sine", 0.15); }
    else if (name === "ronron") {
      var D = dur || 2.4, osc = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      osc.type = "sawtooth"; osc.frequency.value = 48; lp.type = "lowpass"; lp.frequency.value = 320;
      lfo.type = "sine"; lfo.frequency.value = 24; lg.gain.value = 0.35;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.5, t + 0.3);
      for (var b = 0; b < D; b += 1.2) { g.gain.linearRampToValueAtTime(0.55, t + b + 0.6); g.gain.linearRampToValueAtTime(0.3, t + b + 1.2); }
      g.gain.linearRampToValueAtTime(0.0001, t + D);
      lfo.connect(lg); lg.connect(g.gain); osc.connect(lp); lp.connect(g); g.connect(o);
      osc.start(t); lfo.start(t); osc.stop(t + D + 0.05); lfo.stop(t + D + 0.05);
    }
  }
};
var SFX_LIST = [{id: "ding", l: "Tâche cochée"}, {id: "mission", l: "Mission terminée"}, {id: "niveau", l: "Passage de niveau"}, {id: "bloup", l: "Article de courses"}, {id: "hautfait", l: "Haut fait"}, {id: "ronron", l: "Ronron"}];
var SFX_VOLS = [{id: 0, l: "Doux", v: 0.3}, {id: 1, l: "Moyen", v: 0.6}, {id: 2, l: "Fort", v: 1}];
var JKINDS = {hf: {l: "Haut fait", icon: "★", bg: "#FFF1D6", ibg: "#F2C14E", fg: "#8A5A00"}, titre: {l: "Titre", icon: "♛", bg: "#F3ECF8", ibg: "#C9B6E8", fg: "#5A3E86"}, chat: {l: "Niveau d'un chat", icon: "▲", bg: "#EAF3E6", ibg: "#9DC97E", fg: "#36532A"}, foyer: {l: "Niveau du foyer", icon: "⌂", bg: "#FFF6DD", ibg: "#D9A441", fg: "#6E400C"}};
var JOURNAL0 = [
  {id: "j1", ts: Date.UTC(2026, 10, 13, 8, 15), kind: "titre", text: "Ramasseuse de caca d'élite", sub: "Litière · Emie · 50 litières cette année"},
  {id: "j2", ts: Date.UTC(2026, 10, 12, 19, 40), kind: "chat", text: "Bao passe au niveau 4", sub: "Courses & cuisine"},
  {id: "j3", ts: Date.UTC(2026, 10, 10, 18, 5), kind: "foyer", text: "Le foyer passe au niveau 7", sub: "La véranda est débloquée"},
  {id: "j4", ts: Date.UTC(2026, 10, 9, 21, 30), kind: "titre", text: "Second du bord", sub: "FFXIV · sous-marins · Co"},
  {id: "j5", ts: Date.UTC(2026, 10, 7, 12, 0), kind: "chat", text: "Nahla passe au niveau 5", sub: "Ménage & tâches"}
];
var STOCKS0 = [
  {id:"croq", n:"Croquettes", kind:"time", act:"Rechargé", ago:0, dur:30, warn:24, blue:false, note:"tient 3,5 semaines à 1 mois"},
  {id:"pate", n:"Pâté", kind:"count", unit:"sachet", qty:29, perDay:1, ref:30, low:7, blue:false},
  {id:"nutri", n:"Nutricroc", kind:"count", unit:"gélule", qty:60, perDay:1, ref:60, low:7, pack:30, packLabel:"+ 1 boîte (30)", blue:false},
  {id:"filtre", n:"Filtre fontaine", kind:"time", act:"Changé", ago:7, dur:30, warn:26, blue:true}
];
var VSPR = {swallow:["/_blob/80286b6a1d3678ce28e7b73c7fd477e1","/_blob/47d3cf1b2ccae00f25ca2787a606f25a"], sparrow:["/_blob/1277a7fcef9aca7cbf9265c4f17bd39f","/_blob/c77aa38894946d220f4021b61559cefe"], goose:["/_blob/272b6a9f7a5ea6834e8842ede0255308","/_blob/3a0fde1137029f1a1053fa4be596fa6c"], papj:["/_blob/b9017b49f99d9d15d5928649baca94ce","/_blob/c9b7e3cc1ae8b23cc3d4bce0e94f1dd6"], papb:["/_blob/8c0fd805ae6fa7db9501d1af568bf3e1","/_blob/4ac68c2720ac18bea3723d41f6a46743"], robin:["/_blob/c48479a22302a01d6fc17f7e88b44967","/_blob/c48479a22302a01d6fc17f7e88b44967"], star:["/_blob/7205ca40db3685b2a6d181bd15b8f12b","/_blob/7205ca40db3685b2a6d181bd15b8f12b"]};
var VFRAME = "/_blob/b1b1e53d7fa70fffaaef8b664b4d11ae";
function verandaLife(season, tick) {
  var a = [], p = [], i, f = Math.floor(tick / 2) % 2;
  var bird = function (k, cls, x, y, dur, delay, slow) { a.push({cls: cls, src: VSPR[k][slow ? Math.floor(tick / 4) % 2 : f], x: x + "px", y: y + "px", dur: dur + "s", delay: delay + "s"}); };
  var fall = function (cls, n, cols, w, h, d0, seed) { for (i = 0; i < n; i++) p.push({cls: cls, x: Math.round(rnd(seed + i) * 380) + "px", w: w + "px", h: h + "px", c: cols[i % cols.length], dur: (d0 + rnd(seed + i + 50) * d0 * 0.6).toFixed(1) + "s", delay: (-rnd(seed + i + 90) * d0 * 1.5).toFixed(1) + "s"}); };
  if (season === "printemps") {
    bird("swallow", "vswoop", 0, 90, 14, 0); bird("swallow", "vswoop", 0, 130, 14, -1.2); bird("swallow", "vswoop", 0, 60, 22, -9);
    bird("papb", "vflutter", 210, 360, 7, 0, true);
    fall("vleaf", 8, ["#F4B6C8", "#FFFFFF"], 4, 4, 9, 300);
  } else if (season === "ete" || season === "classique") {
    bird("sparrow", "vfly", 0, 120, 16, -2); bird("sparrow", "vfly", 0, 140, 16, -2.6); bird("swallow", "vswoop", 0, 70, 21, -12);
    bird("papj", "vflutter", 120, 350, 6, 0, true); bird("papj", "vflutter", 260, 370, 8, -3, true);
  } else if (season === "automne") {
    var V = [[0, 0], [-18, -10], [-18, 10], [-36, -20], [-36, 20], [-54, -30]];
    V.forEach(function (o) { bird("goose", "vgeese", o[0], 70 + o[1], 26, -3); });
    bird("sparrow", "vfly", 0, 160, 19, -11);
    fall("vleaf", 12, ["#E08A3A", "#C0532F", "#E9B949"], 6, 5, 8, 400);
  } else if (season === "hiver") {
    bird("robin", "vrobin", 200, 372, 22, -8); bird("sparrow", "vfly", 0, 140, 24, -15);
    fall("vsnow", 30, ["#FFFFFF"], 5, 5, 9, 500);
  } else if (season === "noel") {
    bird("star", "vstar", 60, 30, 11, -2); bird("robin", "vrobin", 230, 372, 26, -14);
    fall("vsnow", 34, ["#FFFFFF"], 5, 5, 9, 600);
  }
  return {birds: a, parts: p};
}
var CFURN = {"crideaux": {"kind": "Rideaux", "box": [19, 15, 36, 46], "v": [["Lin", "/_blob/518f73223a86af913c5f3c062839208b", 4], ["Voilage blanc", "/_blob/d175376e433cb764d01230b45b5da89e", 26], ["Velours bordeaux", "/_blob/a5cc41fc0098afaa222a16d18e90d9f2", 28]]}, "cpenderie": {"kind": "Penderie", "box": [0, 33, 22, 72], "v": [["Bois clair", "/_blob/5d772230e9b1f22601a8c140af910f40", 4], ["Blanche", "/_blob/8d5f8764e5882083d8a7c4a722eb4b94", 26], ["Noyer", "/_blob/5f85ee741164a7068479fe7d9ece6199", 29]]}, "carbre": {"kind": "Arbre à chat", "box": [51, 39, 14, 82], "v": [["Beige & sisal", "/_blob/cd53152e90a6ec439857098251d8c1e0", 4], ["Gris", "/_blob/3f7cdf34b7d118335f32c8bcc578ea1f", 24], ["Bois & sisal", "/_blob/85e744893f5ee0f3b6620f9fd4b16aae", 29], ["Géant", "/_blob/f29a820ab094d59d3534d71c0a6c062a", 32]]}, "clit": {"kind": "Housse de couette", "box": [22, 70, 31, 51], "v": [["Petits cœurs rouges", "/_blob/8a3f7831439a79e115bb1702e8263117", 4], ["Étoiles dorées", "/_blob/3fa47a5101c7f29551d532ed747d9999", 24], ["Fleurs pastel", "/_blob/3b75ca8e963149aad642e47ff0e09593", 27], ["Rayures bleues", "/_blob/1c958e672f840eed7706f5caf2481bcf", 29], ["Pattes de chat", "/_blob/07baaca72e5c7a0fceccb1cafd773dc8", 32]]}};
var CORDER = ["clit", "ccadre", "cwin", "crideaux", "cpenderie", "carbre"];
CORDER.forEach(function (k) { BFURN[k] = CFURN[k]; });
var CWIN = {printemps: "/_blob/cbb918e25473dd49cb7560d481d8b91d", ete: "/_blob/00a1c6f732e692e87ef27d87b2d3d4e0", classique: "/_blob/00a1c6f732e692e87ef27d87b2d3d4e0", automne: "/_blob/cc99188662b60d3e50088998dcc1b03e", hiver: "/_blob/9532136f65e8992b1587e6547c6f5289", noel: "/_blob/ad18004f1b6707f39871b73f31e9307d"};
var CSEAS = {printemps: "/_blob/d11c3b349904cabc2b6f09e881dbed87", ete: "/_blob/929f5666bcf2307f920103d977df4d60", automne: "/_blob/5097b098dbde465da4683d0879f77010", hiver: "/_blob/d7b6e946aaed72b65ba76cebbd1640d9", noel: "/_blob/bd7702c42baa366bfafe5e9a64801284"};
var EYES = {nahla: "#5FB0E8", bao: "#E0A53A", tsunky: "#7BC96F"};
var SFURN = {"sbain": {"kind": "Baignoire & douche", "box": [22, 52, 43, 64], "v": [["Classique", "/_blob/64089ab3e6050ea11753c1ed8bc1c771", 5], ["Carrelage métro", "/_blob/f3c391aae14730ba0f6b24a82540cd42", 27], ["Carrelage vert d'eau", "/_blob/c84be3369a83c9dec87f3b218df4c666", 30], ["Pattes de lion bleu nuit", "/_blob/3265a8d5b21a93c0dcafa3102373ebba", 33]]}, "srideau": {"kind": "Rideau de douche", "box": [51, 46, 14, 44], "v": [["Blanc", "/_blob/29809f132581fac502a9c385b4389bd3", 5], ["Rayé bleu", "/_blob/da3b78a4e5947ebecfa871dfb6e1c160", 29], ["Feuillage", "/_blob/2fa2649d18edf5622a17bd0c9e619663", 31], ["Poissons", "/_blob/e781389955128f9e350b24e3f88aca45", 32]]}, "slavabo": {"kind": "Meuble lavabo", "box": [1, 78, 21, 30], "v": [["Bois", "/_blob/027366794febd0e009082e14a7a77c97", 5], ["Blanc", "/_blob/64a4b3ffeeea831c1fbce50b8890f78f", 27], ["Rose poudré", "/_blob/fb04611d5e732a31cf26acddde5d9dac", 23], ["Vert sauge", "/_blob/41f71abc03765773bd65723706be83a6", 31]]}, "smiroir": {"kind": "Grand miroir", "box": [2, 32, 19, 46], "v": [["Rectangle", "/_blob/9f8d8d3e4d4dc9f67143411810e72978", 5], ["Arche noire", "/_blob/4e7a10fd362a8d8be7ec29922ca9282d", 29], ["Rond doré", "/_blob/33cbaf9692b7df5895256650a870ac9b", 33]]}, "sbougie": {"kind": "Grosse bougie", "box": [24, 80, 7, 8], "v": [["Verre ambré", "/_blob/d88a7533d01b128840a782eb9ebb0a30", 5], ["Céramique blanche", "/_blob/a490bb7bb24eb93ca6c1527ad6117e6e", 27], ["Pot rose", "/_blob/9ba7972c1cfe457432b6c6abcdce8fae", 30], ["Pot doré", "/_blob/614472fa7d6de010af1abc0f1ddba97c", 34]]}, "stapis": {"kind": "Tapis de bain", "box": [26, 114, 24, 5], "v": [["Blanc", "/_blob/98478006228a53d49dcef7ffc8dd1e38", 5], ["Bleu", "/_blob/90a52af076700038f7d8d792922d6fec", 28], ["Rose moelleux", "/_blob/a772674e6dcf17ff9a114976af0d4634", 31]]}};
var SORDER = ["sbain", "sfen", "srideau", "slavabo", "smiroir", "sbougie", "scanard", "stapis"];
SORDER.forEach(function (k) { BFURN[k] = SFURN[k]; });
var SALFURN = {"schem": {"kind": "Cheminée", "box": [23, 68, 24, 26], "v": [["Pierre claire", "/_blob/b1ef5b23cb966baace033e89edbea39d", 1], ["Briques rouges", "/_blob/f7df6c467628a35d00036780ca712fc6", 10], ["Marbre blanc", "/_blob/bbc09171507404ed051655e67070585d", 21], ["Poêle à bois noir", "/_blob/b798e9f4b862e3eb83f4ac25a1dca401", 30]]}, "setag": {"kind": "Étagère", "box": [43, 12, 21, 26], "v": [["Planches bois", "/_blob/8d8f822f86eb3bfc5ab33955e794dcca", 1], ["Échelle en bois", "/_blob/098acb6943d30614bef6be17a953c7a9", 9], ["Étagères flottantes noires", "/_blob/2dac41ed5d37d4da258e67cfdf8e2f46", 16], ["Bibliothèque blanche & lierre", "/_blob/8357c0757c119ee8c6838619070dccf9", 26]]}, "sradio": {"kind": "Radio", "box": [0, 0, 9, 6], "v": [["Poste orange", "/_blob/6b09a3789e256d389b46a666ada283af", 1], ["Poste rétro en bois", "/_blob/80108c3ff96f77e1a382c5214ee8302e", 11], ["Tourne-disque", "/_blob/814be51815cfb0ff12b461da762ce1f3", 19], ["Enceinte ronde menthe", "/_blob/9fd40541e5d8f99427aa1261e25228bf", 27]]}, "sbuches": {"kind": "Panier à bûches", "box": [0, 0, 12, 10], "v": [["Caisse en bois", "/_blob/4ca2fdb3d6a8102c32b656a98510d218", 1], ["Panier en osier", "/_blob/458769e448401f937635484987266ad2", 12], ["Seau en métal noir", "/_blob/7381b5fbf8c712f6000ab331201678ff", 18], ["Sac en feutre gris", "/_blob/30b6ac0066502867fb6869d1f896bcd8", 24]]}, "swin": {"kind": "Fenêtre", "box": [2, 21, 20, 22], "v": [["Bois foncé", "/_blob/19da8b681390920928f8f1c837447f15", 1], ["Blanc classique", "/_blob/03b82b7924e9ea33896485fcf31f202d", 9], ["Bois naturel", "/_blob/da5b42472f6ee9f41aedb633e2002a73", 20], ["Atelier métal noir", "/_blob/6d5920c83523aa5940ec810a91a1b11c", 29]]}};
var SALORDER = ["schem", "setag", "sradio", "sbuches", "swin"];
SALORDER.forEach(function (k) { BFURN[k] = SALFURN[k]; });
BFURN.ccadre = {"kind": "Structure du lit", "box": [22, 70, 31, 51], "v": [["Bois clair", "/_blob/7b3ab95f9ed4fa8105de9027cf2c51ed", 4], ["Tête de lit capitonnée grise", "/_blob/4ecc1e9d467721ca4b1772be177d1d8c", 13], ["Lit en rotin", "/_blob/d0e8ac542410e1c81dfe1e8fcee9ec8e", 22], ["Bois foncé à barreaux", "/_blob/52e4f241f918a98b4133b9aeaf8aa126", 31]]};
BFURN.kwin = {"kind": "Fenêtre", "box": [16, 44, 22, 32], "v": [["Blanc", "/_blob/b7b47d4eeda4bf7499db7adc1fba6b53", 3], ["Bois naturel", "/_blob/639492c70df02231c77802d846ece7d2", 11], ["Atelier métal noir", "/_blob/b9dad1c4ee3e4361296b6f102d90006e", 22], ["Vert sauge", "/_blob/f6305e823e8160dccdf6699a33cf24ea", 33]]};
BFURN.cwin = {"kind": "Fenêtre", "box": [24, 19, 26, 38], "v": [["Blanc", "/_blob/c653ccfc24015c3f435aa67a2ffb866a", 4], ["Bois naturel", "/_blob/10435fa1f9dfc9c9939178a4a2b14827", 12], ["Atelier métal noir", "/_blob/3de6881926b9e7b3343fec668f3333d2", 24], ["Vert sauge", "/_blob/58eb82e471c6241d696ecf90c29c1c9f", 31]]};
BFURN.sfen = {"kind": "Fenêtre", "box": [33, 30, 18, 24], "v": [["Blanc", "/_blob/616a5a2019d38d187e37e967cf83e263", 5], ["Bois naturel", "/_blob/bd822a4ac9a30d2d5584020be064f477", 13], ["Atelier métal noir", "/_blob/ab3d108b1e7a675b8d59e351801424d0", 26], ["Vert sauge", "/_blob/e049a78d65e28eea2df20be09761ab5e", 34]]};
var POELE_FEU = ["/_blob/c6837957e0ad0bd18f34535af52534f7", "/_blob/560057813e7d4d34be4dbcc2dc56a56d"];
var CHEM_NOEL = "/_blob/8504d222181424d2e1a184249518c6f9";
var SWIN = {printemps: "/_blob/081a608860938cba6fb7bf38cc4312be", ete: "/_blob/6c94a9eb4f66c9b066cfee1fc2bc14a7", classique: "/_blob/6c94a9eb4f66c9b066cfee1fc2bc14a7", automne: "/_blob/47324b107613e29867226bba912c30c3", hiver: "/_blob/0e37b0493632fd4c501fec9b2d4f9ac0", noel: "/_blob/bb848e4041fd74daada11fce58a7326c"};
var SSEAS = {printemps: "/_blob/f019ed0d58066246c57869cb28f68f44", ete: "/_blob/920ed66f6948a44b3b39cc0cfdd416f0", automne: "/_blob/4bc90f30009aee84787af4a4c17fc0b2", hiver: "/_blob/6fdbd260bfa408d2fb95eb1032568114", noel: "/_blob/c6bef6032090b4d25b4444371657d92e"};
var WALK_X = {bureau: [150, 150, 252], cuisine: [300, 141, 117], chambre: [177, 300, 15], sdb: [21, 267, 177], veranda: [60, 150, 240]};
var SLOT = 150, WALK = 30;
var RECIPES = {
  gratin: {n:"Gratin dauphinois", ing:[["Pommes de terre","1 kg","Fruits & légumes"],["Crème fraîche","40 cl","Frais"],["Gruyère râpé","100 g","Frais"],["Muscade","","Épicerie"]]},
  curry: {n:"Curry de lentilles corail", ing:[["Lentilles corail","250 g","Épicerie"],["Lait de coco","40 cl","Épicerie"],["Oignons","x2","Fruits & légumes"],["Épinards","200 g","Fruits & légumes"]]},
  carbo: {n:"Pâtes carbonara", ing:[["Pâtes","500 g","Épicerie"],["Lardons","200 g","Frais"],["Œufs","x4","Frais"],["Parmesan","80 g","Frais"]]},
  soupe: {n:"Soupe de potiron", ing:[["Potiron","x1","Fruits & légumes"],["Oignons","x1","Fruits & légumes"],["Crème fraîche","20 cl","Frais"]]},
  poulet: {n:"Poulet rôti & légumes", ing:[["Poulet fermier","x1","Frais"],["Carottes","x6","Fruits & légumes"],["Pommes de terre","800 g","Fruits & légumes"]]},
  tacos: {n:"Tacos maison", ing:[["Tortillas","x8","Épicerie"],["Bœuf haché","400 g","Frais"],["Avocats","x2","Fruits & légumes"],["Tomates","x3","Fruits & légumes"]]},
  risotto: {n:"Risotto aux champignons", ing:[["Riz arborio","300 g","Épicerie"],["Champignons","400 g","Fruits & légumes"],["Parmesan","60 g","Frais"]]},
  resto: {n:"Resto ou à emporter", ing:[]}
};
var GARDE0 = [{id:"g1", t:"Repas : croquettes matin et soir, pâté le soir (quantités à compléter)."}, {id:"g2", t:"Eau : vérifier la fontaine chaque jour, le filtre se change tous les 30 jours."}, {id:"g3", t:"Litière : à nettoyer chaque jour."}, {id:"g4", t:"Nahla : adore chanter et qu'on lui parle."}, {id:"g5", t:"Bao : joue volontiers au pompon, gourmande."}, {id:"g6", t:"Tsunky : fait le pain sur les plaids, aime les caresses sur la tête."}];
var MEAL_DAYS0 = ["Lun. 16","Mar. 17","Mer. 18","Jeu. 19","Ven. 20","Sam. 21","Dim. 22"];
var MEAL_MON = (function () { var d = new Date(TODAY_Y, TODAY_M, TODAY_D), wd = (d.getDay() + 6) % 7; return new Date(TODAY_Y, TODAY_M, TODAY_D - wd + (wd >= 4 ? 7 : 0)); })();
var MEAL_ISO = [0, 1, 2, 3, 4, 5, 6].map(function (n) { return isoD(new Date(MEAL_MON.getFullYear(), MEAL_MON.getMonth(), MEAL_MON.getDate() + n)); });
var MEAL_DAYS = !REEL ? MEAL_DAYS0 : MEAL_ISO.map(function (iso) { var d = new Date(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)), jl = JOURS_L[d.getDay()]; return jl.charAt(0).toUpperCase() + jl.slice(1, 3) + ". " + d.getDate(); });
var MEALS0 = {0:"gratin", 1:"curry", 2:"carbo", 4:"soupe", 5:"resto", 6:"poulet"};
var TODAY = TODAY_UTC;
var MOIS_L = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
var CATINFO_F = [{id:"anniv", l:"Anniversaire", ph:"ex. 16 avril"}, {id:"naissance", l:"Année de naissance", ph:"ex. 2019"}, {id:"race", l:"Race et robe", ph:""}, {id:"sexe", l:"Sexe · stérilisation", ph:"ex. femelle stérilisée"},
  {id:"puce", l:"Puce électronique", ph:"numéro d'identification"}, {id:"alim", l:"Alimentation", ph:"croquettes, pâtée, quantités"}, {id:"veto", l:"Vétérinaire", ph:"nom, téléphone"}, {id:"assur", l:"Assurance", ph:"compagnie, contrat"}, {id:"notes", l:"À savoir", ph:"allergies, traitements, caractère"}];
var CATINFO0 = {
  nahla: {anniv:"16 avril", naissance:"", race:"Sacré de Birmanie", sexe:"Femelle", puce:"", alim:"", veto:"", assur:"", notes:""},
  bao: {anniv:"17 juin", naissance:"", race:"British Shorthair lilas", sexe:"Femelle", puce:"", alim:"", veto:"", assur:"", notes:""},
  tsunky: {anniv:"17 juillet", naissance:"", race:"Sibérienne silver", sexe:"Femelle", puce:"", alim:"", veto:"", assur:"", notes:""}
};
function parseJM(s) { var m = String(s || "").toLowerCase().match(/(\d{1,2})\s*(?:er)?\s+([a-zéû]+)/); if (!m) return null; var mi = -1; MOIS_L.forEach(function (n, i) { if (n.indexOf(m[2].slice(0, 3)) === 0) mi = i; }); return mi < 0 ? null : {d: +m[1], m: mi}; }
function nextJM(jm) { var y = TODAY_Y, d = Date.UTC(y, jm.m, jm.d); if (d < TODAY_UTC) d = Date.UTC(y + 1, jm.m, jm.d); return Math.round((d - TODAY_UTC) / 864e5); }
var SANTE0 = {
  nahla: {poids:[3.9, 4.0, 4.0, 4.1, 4.1], soins:{vaccin:"2026-03-14", vermifuge:"2026-09-02", antipuces:"2026-10-20"}, rdv:"Ven. 20 nov. · vaccin chez le vétérinaire"},
  bao: {poids:[5.6, 5.8, 5.9, 6.0, 6.1], soins:{vaccin:"2025-12-05", vermifuge:"2026-08-10", antipuces:"2026-10-28"}, rdv:"Ven. 20 nov. · vaccin chez le vétérinaire"},
  tsunky: {poids:[4.4, 4.5, 4.5, 4.4, 4.5], soins:{vaccin:"2026-06-20", vermifuge:"2026-10-01", antipuces:"2026-11-02"}, rdv:"Ven. 20 nov. · vaccin chez le vétérinaire"}
};
var SOINS = [{id:"vaccin", n:"Vaccin annuel", every:365}, {id:"vermifuge", n:"Vermifuge", every:90}, {id:"antipuces", n:"Antipuces", every:30}];
var CANARDS = [["Canard jaune", "/_blob/c4c2fea4edc092dff6dd001cc3d94a13", 5], ["Canard rose", "/_blob/51716fe8fa0763a44ba5f9fbab7326d9", 28], ["Canard pirate", "/_blob/5c762a0407139cae0d498c9a0f3ba738", 30], ["Canard licorne", "/_blob/c07645810fa511ef3a9f1cec8e194526", 32], ["Canard doré", "/_blob/2015c8f417e020c2731ccbf686b92da1", 34]];
BFURN.scanard = {kind:"Canard en plastique", box:[34,79,11,9], v:CANARDS};
var SOURIS = "/_blob/bfd53e62639e3d43f18cb78b29554a09";
var MOUSE_SPOTS = {salon:[[60,760],[250,740],[330,700]], bureau:[[20,720],[300,730]], cuisine:[[100,770],[320,690]], chambre:[[250,730],[110,780]], sdb:[[60,700],[300,760]], veranda:[[30,640],[330,700]]};
var DEFIS = [{n:"5 tâches chacun", c:REEL ? 0 : 3, e:REEL ? 0 : 4, goal:5, two:true, rw:"+150 XP · Coussin étoilé (exclusif)"}, {n:"Vider la liste en mode magasin", v:0, goal:1, rw:"+80 XP · Cabas brodé pour le frigo"}];
var HF_PROG0 = [{id:"cent", n:"Cent tâches", d:"Faire 100 tâches à deux", v:37, goal:100}, {id:"japonais", n:"Trente jours d'affilée", d:"Tenir une série de 30 jours sur un grand projet", v:12, goal:30}, {id:"soirees", n:"Un mois de soirées", d:"Valider une soirée chaque semaine pendant 4 semaines", v:2, goal:4}, {id:"souris", n:"Chasseurs de souris", d:"Trouver 5 souris en peluche cachées dans la maison", v:-1, goal:5}];
var HF_PROG = HF_PROG0.map(function (h) { return REEL ? Object.assign({}, h, {v: 0}) : h; });
var WEATHER = [{id:"auto", l:"Auto"}, {id:"soleil", l:"Soleil"}, {id:"pluie", l:"Pluie"}, {id:"neige", l:"Neige"}];
var EVO = {"couple": {"bureau": "/_blob/d9b9a5157ed68c6b5e0834d401d0f680", "chambre": "/_blob/b077bdf9426653c7fda91d809196e652", "cuisine": "/_blob/95d198f1f79811a041830970adbfc8c1", "salon": "/_blob/63df38e934c9d29c4d8ae7fdbab9f464", "sdb": "/_blob/efa5c815045e69e7da44d9dd02798537", "veranda": "/_blob/9a2cf8b2943fe850c7adafaf2bd1eeff"}, "halloween": {"bureau": "/_blob/475405d8642969266fd49e87443ff564", "chambre": "/_blob/0d7d4ca7e578be9a60efae44f4e5c487", "cuisine": "/_blob/7e3f07df426919d5998d49f975bdb842", "salon": "/_blob/69363d955931f44a939dbea062ee93ad", "sdb": "/_blob/79f34e118c3fd458575638d71157f0f4", "veranda": "/_blob/ceed5a336cbfbf2bc0e13e68d3fbd984"}, "paques": {"bureau": "/_blob/0bc8fba4c85904830d5f41061e14ee8d", "chambre": "/_blob/986b6070c371d9509bea8ca1a51d23d7", "cuisine": "/_blob/f995dab0bb702a107bea4f1615e3e148", "salon": "/_blob/711526bd4b7f64e469f0322dd319fd37", "sdb": "/_blob/8d67d1ec199aa8ed0a310d26cfd8dd44", "veranda": "/_blob/8841211abe3e8dadfaea5980ed2e6e54"}, "valentin": {"bureau": "/_blob/c985ee672e75a1d48f2ae2e1a10cb190", "chambre": "/_blob/236dbd02c7d3365b19f1dad7a4f95f68", "cuisine": "/_blob/0b37e5897647caa49ce813f47a2ff697", "salon": "/_blob/6d53f8712ffe148980362d453eba3081", "sdb": "/_blob/40e4c2921ec9f39af7bb545f011b41f1", "veranda": "/_blob/cc0c00493ddcaeb415c46821f55b0a77"}};
var EV_SEASON = {nouvelan: "hiver", halloween: "automne", valentin: "hiver", paques: "printemps", couple: "printemps"};
var GRANDES = [["10 janvier", "Anniversaire d'Emie · rappel à Co à J-7 et la veille", "#8A4F9E"], ["14 février", "Saint-Valentin (décor dès le 10)", "#C0392B"], ["Pâques", "date variable, du vendredi au lundi", "#9DC9EA"], ["22 avril", "Notre anniversaire de couple", "#D9A441"], ["29 septembre", "Anniversaire de Co · rappel à Emie à J-7 et la veille", "#2F7F86"], ["31 octobre", "Halloween (décor dès le 20)", "#E8762B"], ["25 décembre", "Noël (décor du 15 au 27 décembre)", "#2F5E4A"]];
var WARD0 = [
  {id:"w1", who:"C", n:"Chemise blanche pour le travail", cat:"Hauts", prio:"bientot", done:false},
  {id:"w2", who:"C", n:"Chaussures de ville", cat:"Chaussures", prio:"urgent", done:false},
  {id:"w3", who:"E", n:"Robe d'été", cat:"Hauts", prio:"unjour", done:false},
  {id:"w4", who:"E", n:"Bottines", cat:"Chaussures", prio:"bientot", done:false},
  {id:"w5", who:"C", n:"Chaussettes", cat:"Dessous", prio:"bientot", done:true}
];
var WCATS = ["Hauts", "Bas", "Chaussures", "Manteaux", "Dessous", "Accessoires"];
var WPRIO = {urgent: {l:"Urgent", c:"#B23A48"}, bientot: {l:"Bientôt", c:"#D9762B"}, unjour: {l:"Un jour", c:"#4A7034"}};
var SIZES0 = {C: {haut:"", bas:"", pointure:""}, E: {haut:"", bas:"", pointure:""}};
var NIGHT_PANES = {cuisine: [[108,276,48,80],[168,276,48,80],[108,356,48,64,"bas"],[168,356,48,64,"bas"]], chambre: [[162,126,54,90],[228,126,54,90],[162,222,54,90,"bas"],[228,222,54,90,"bas"]], sdb: [[210,192,36,54],[258,192,36,54],[210,246,36,54,"bas"],[258,246,36,54,"bas"]], salon: [[24,132,42,48],[78,132,42,48],[24,192,42,54,"bas"],[78,192,42,54,"bas"]]};
var FF0 = {
  C: [{id:"f1", sec:"jour", t:"Roulette de donjons (expert)", d:false}, {id:"f2", sec:"jour", t:"Mini Cactpot ×3 au Gold Saucer", d:true}, {id:"f3", sec:"semaine", t:"Contrats de chasse élite", d:false}, {id:"f4", sec:"semaine", t:"Carnet d'aventurier (Wondrous Tails)", d:false}, {id:"f5", sec:"projet", t:"Préparer la prochaine soirée RP", d:false, link:"https://fr.finalfantasyxiv.com/lodestone/"}, {id:"f10", sec:"jour", t:"Renvoyer les sous-marins", d:false}],
  E: [{id:"f6", sec:"jour", t:"Roulette de donjons (niveau)", d:false}, {id:"f11", sec:"jour", t:"Mini Cactpot ×3 au Gold Saucer", d:false}, {id:"f7", sec:"jour", t:"Quêtes de tribu (×3)", d:false}, {id:"f8", sec:"semaine", t:"Butin hebdo du raid", d:false}, {id:"f9", sec:"projet", t:"Finir le craft du mobilier de maison", d:false, link:"https://ffxivteamcraft.com/"}]
};
var FF_SECS = [{id:"jour", l:"Quotidien", note:"Remise à zéro chaque jour à 16 h (17 h l'été)"}, {id:"semaine", l:"Hebdo", note:"Remise à zéro le mardi à 9 h (10 h l'été)"}, {id:"projet", l:"À faire", note:"Objectifs perso, sans remise à zéro"}];
var FF_LINKS = [["Journée RP", "https://nonomisu.github.io/journee-rp/"], ["Lodestone", "https://fr.finalfantasyxiv.com/lodestone/"], ["Teamcraft", "https://ffxivteamcraft.com/"], ["Garland Tools", "https://www.garlandtools.org/"]];
var SANTA = "/_blob/a42d03382520f18806db413c12a21c92";
var WITCH = ["/_blob/819a0567c233ad31f2c5e5dda602ff98", "/_blob/db4de586c5f05ae5326e7ce0247dac23"];
var RENNES = [["/_blob/0d2c0402c4d77392b3ee24fe470bcf2e", "/_blob/394d69c578ac443ee8bf50f41881b215"], ["/_blob/837f231558cd2bdd34f8036bde022625", "/_blob/80bb6107ab61cf667dcddc0628fab947"]];
var HF = [{id:"souris", n:"Chasseurs de souris", d:"Trouver 5 souris en peluche", prog:true}, {id:"zoomies", n:"Zoomies !", d:"Voir une crise de zoomies dans le salon"}, {id:"cachecache", n:"Cache-cache", d:"Voir des yeux briller sous le lit"}, {id:"oiseaux", n:"Visite à plumes", d:"Voir les oiseaux narguer les chats à la véranda"}, {id:"sieste3", n:"Sieste à trois", d:"Voir les trois chats endormis ensemble à la véranda"}, {id:"perenoel", n:"Père Noël en vue", d:"Voir passer le traîneau du Père Noël"}, {id:"sorciere", n:"Petite sorcière", d:"Voir passer la sorcière sur son balai à Halloween"}];
var STARS = [[20,30],[60,12],[95,44],[130,20],[170,8],[210,38],[250,16],[285,50],[340,28],[370,10],[40,70],[150,64],[230,80],[320,84],[110,96],[360,60]];
var LOCK = "/_blob/343a99701c7d166658f77cd445603bfb";
var FOYER_LVL = 7;
function foyerXpOf(st) { return ["nahla", "bao", "tsunky"].reduce(function (a, k) { return a + Math.max(0, (st.lvl[k] - 1) * 100 + st.xp[k]); }, 0); }
function foyerLvlOf(st) { var x = foyerXpOf(st), n = 1; while (n < 99 && x >= FOYER_COST(n + 1)) { x -= FOYER_COST(n + 1); n++; } return n; }
function FOYER_COST(n) { return n <= 7 ? [0, 0, 150, 450, 650, 750, 850, 850][n] : 900 + 30 * (n - 8); }
var NOTIF_PREFS = [{id:"rdv", l:"Rappels (rendez-vous, anniversaires, réserves)"}, {id:"mot", l:"Nouveau petit mot"}, {id:"coeur", l:"Cœur sur un petit mot"}, {id:"magasin", l:"Mode magasin activé"}, {id:"soiree", l:"Soirées et planning des repas"}, {id:"taches", l:"Tâches du jour pas faites (18 h)"}];
var WALKF = {nahla: ["ff92ecdcb63db041977abb03cdadef94","e675c02f4183dea8f23ed62ed4ef0bd8","3ac0d96604614e1414e32612ea5ed04c","4d763227912cfaf33e428a82ad906f91"], bao: ["f8fbf9da81e2943197e08acbdd12b402","11824f949b6161e3780e891694603134","97407ea22d7eff7533780d38dca3e3f3","7c6d2889e7397a139f5eb8040da278ce"], tsunky: ["9aa887b47543384e266a3dd3bc84603a","502db9af4fe35d02b7ffd4f07b323081","5b07174ecc4ff9896c3b3236ac659a07","c1d98565ba811d64709fd984b72f13f4"]};
var JUMPF = {nahla: {crouch:"1cc5d422c8e4b41d4127a660a3542f61", down:"65e4c7536d4aa047e87355a09e33d0f0", up:"7c2243ed325041e0d23ca6c38e9f6d60"}, bao: {crouch:"936908900a03e1e6228bdf7049ac2576", down:"9bd1690af928dc00a405b67e70379a37", up:"e896abe3ef0574d184db78a46c074a7b"}, tsunky: {crouch:"206f5c1e64d0c3218402100981e5d287", down:"ce2a3fabf674707a72877cb9d8249a33", up:"dbdda7fdeec4edf08535be4a0174bf4d"}};
var WALK_Y = {cuisine: [623, 503, 125], chambre: [515, 205, 533], sdb: [397, 443, 610], veranda: [503, 503, 503]};
var RUN = {nahla:["/_blob/66b16df441f0e0381fd9b4bfe852276d","/_blob/968edaa1a705c4e09f9e2871665d643c"], bao:["/_blob/1d54ce617ea244c4a797e4ac5680611b","/_blob/f2da3044ffa4366eceec5cbf915a8dec"], tsunky:["/_blob/d64e5ad7aa96f0dc312d0a35776f0ebe","/_blob/6047bc948a8173c685c7a57c30773049"]};
var ZOOM_LEN = 62;
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
var HATS = {nahla:"/_blob/8924317b5cb196e7c6d8a8c974bc5389", bao:"/_blob/4d34c83a55bea60f874ba04e8cad958c", tsunky:"/_blob/981e870ca0c66f92052de823e8bcee70"};
var BALS = {nahla:"/_blob/819cd6a03c6c3228d765843f2925fb37", bao:"/_blob/e88ed149fb9976b3b4755780b7609d9c", tsunky:"/_blob/0712e0ba9bbd014367585f250fd38e81"};
var CAKE = {on:"/_blob/5ab6fbaf67b9b6275f5f4776fa8388bc", off:"/_blob/7909cdca1be90e2cd74cda205f43fb2b"};
var GIFTS = ["/_blob/f3b91d952856a8bb26eee97feaa58338", "/_blob/38fb1f470bd15e557233ccb24a42636a"];
var CAT_COL = {nahla:"#6f9fd8", bao:"#d79a3a", tsunky:"#6FA055"};
function deN(w) { return /^[AEIOUYÉÈaeiouyéè]/.test(NAME[w]) ? "d'" + NAME[w] : "de " + NAME[w]; }
function isIOS() { return typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent || ""); }
var GMAIL_SHARED = { addr: "" };
function gmailUrl(to, su, body) {
  if (isIOS()) return "googlegmail:///co?to=" + encodeURIComponent(to) + "&subject=" + encodeURIComponent(su) + "&body=" + encodeURIComponent(body);
  return "https://mail.google.com/mail/u/" + (GMAIL_SHARED.addr ? GMAIL_SHARED.addr.replace(/[^A-Za-z0-9@._+-]/g, "") : "0") + "/?view=cm&fs=1&to=" + encodeURIComponent(to) + "&su=" + encodeURIComponent(su) + "&body=" + encodeURIComponent(body);
}
var CCATS = [
  {id:"chats", l:"Chats", c:"#4A7034"}, {id:"sante", l:"Santé", c:"#3E6FB0"},
  {id:"logement", l:"Logement", c:"#9A5B12"}, {id:"admin", l:"Administratif", c:"#5E4130"}, {id:"proches", l:"Proches", c:"#7A4E9E"}, {id:"divers", l:"Divers", c:"#4A4450"}
];
var CONTACTS0 = [
  {id:"k5", cat:"chats", n:"Dr Semblat", r:"Vétérinaire traitant", p:"", e:""},
  {id:"k6", cat:"chats", n:"Onlyvet", r:"Médecine interne", p:"", e:""},
  {id:"k7", cat:"chats", n:"Onlyvet", r:"Secrétariat", p:"", e:""},
  {id:"k16", cat:"chats", n:"V2TU", r:"Urgences vétérinaires", p:"", e:""},
  {id:"k8", cat:"sante", n:"Dr Lefèvre", r:"Médecin traitant (fictif)", p:"04 00 00 00 04", e:"cabinet.lefevre@medecin.example"},
  {id:"k9", cat:"sante", n:"Pharmacie du Parc", r:"Pharmacie de quartier (fictif)", p:"04 00 00 00 05", e:"contact@pharmacie-du-parc.example"},
  {id:"k10", cat:"logement", n:"Agence Bellecour Gestion", r:"Propriétaire / syndic (fictif)", p:"04 00 00 00 06", e:"gestion@bellecour-gestion.example"},
  {id:"k11", cat:"logement", n:"Plomberie Martin", r:"Plombier (fictif)", p:"06 00 00 00 07", e:"devis@plomberie-martin.example"},
  {id:"k12", cat:"logement", n:"Élec Express", r:"Électricien (fictif)", p:"06 00 00 00 08", e:"contact@elec-express.example"},
  {id:"k13", cat:"admin", n:"Assurance habitation", r:"Contrat n° 000000 (fictif)", p:"09 00 00 00 09", e:"sinistres@assurance-habitation.example"},
  {id:"k14", cat:"admin", n:"Mutuelle", r:"Service adhérents (fictif)", p:"09 00 00 00 10", e:"adherents@mutuelle.example"},
  {id:"k15", cat:"proches", n:"Voisine du 2e", r:"Double des clés (fictif)", p:"06 00 00 00 11", e:""}
];
var ROOMS = [{id:"salon", n:"Salon", lvl:1}, {id:"bureau", n:"Bureau", lvl:2}, {id:"cuisine", n:"Cuisine", lvl:3}, {id:"chambre", n:"Chambre", lvl:4}, {id:"sdb", n:"Bain", lvl:5}, {id:"veranda", n:"Véranda", lvl:7}];
var PREF = {bao:"cuisine", tsunky:"sdb", nahla:"veranda"};
var ROOM_DE = {bureau:"le bureau", cuisine:"la cuisine", chambre:"la chambre", veranda:"la véranda", sdb:"la salle de bain", salon:"le salon"};
function presence(slot, lvl) {
  var ok = function (id) { return ROOMS.filter(function (r) { return r.id === id; })[0].lvl <= lvl; };
  var res = {};
  ORDER.forEach(function (k, ki) {
    var prev = "salon";
    for (var sl = Math.max(0, slot - 20); sl <= slot; sl++) {
      var r = rnd(sl * 7 + ki * 131 + 3), room = r < 0.5 ? "salon" : (r < 0.625 ? "chambre" : (r < 0.75 ? "bureau" : PREF[k]));
      if (!ok(room)) room = "salon";
      if (room === prev && room !== "salon") room = "salon";
      prev = room;
    }
    res[k] = prev;
  });
  if (ok("veranda") && rnd(slot * 3 + 17) < 0.15) { ORDER.forEach(function (k) { res[k] = "veranda"; }); return res; }
  if (!ORDER.some(function (k) { return res[k] === "salon"; })) res[ORDER[Math.floor(rnd(slot + 99) * 3)]] = "salon";
  return res;
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {stats: {}, xpDay: null, agenda: AGENDA0, nextAg: 5, agDraft: "", agDate: "", agTime: "", agCat: "patch", agPast: false, ed: null, edD: null, recipes: JSON.parse(JSON.stringify(RECIPES)), nextRec: 1, recDraft: "", garde: GARDE0, nextGarde: 7, gardeDraft: "", witchT0: 200, titles: TITLES0, plaidOn: true, logsOn: true, ffEdit: null, ffEditT: "", ffEditL: "", play: null, ff: FF0, ffWho: ME, ffDraft: "", ffSec: "jour", ffLink: "", nextFf: 12, ward: WARD0, wardWho: ME, wardDraft: "", wardCat: "Hauts", wardPrio: "bientot", nextWard: 6, sizes: SIZES0, candleOff: false, candleBlow: -99, personStart: -1, coupleStart: -1, purr: null, meteo: "auto", vacances: false, meals: MEALS0, mealPick: null, sante: SANTE0, santeCat: "nahla", poidsDraft: "", duckEv: null, mouse: null, mice: 0, zoomLock: null, hf: {}, birdEv: null, vHold: 0, night: false, santaT0: 0, bedEv: null, bedHold: null, stocks: STOCKS0, bSel: {schem:0, setag:0, sradio:0, sbuches:0, swin:0, ccadre:0, kwin:0, cwin:0, sfen:0, scanard:0, sbain:0, srideau:0, slavabo:0, smiroir:0, sbougie:0, stapis:0, clit:0, crideaux:0, cpenderie:0, carbre:0, vplantes:0, vfauteuil:0, vbanquette:0, kplan:0, kplaques:0, kfrigo:0, ketagere:0, kilot:0, kgamelles:0, kepices:0, kparcours:0, setupR:0, chaiseR:0, setupB:0, chaiseB:0, cubes:0, dodo:0, murales:0, projets:0, tapis:0}, bView: {schem:0, setag:0, sradio:0, sbuches:0, swin:0, ccadre:0, kwin:0, cwin:0, sfen:0, scanard:0, sbain:0, srideau:0, slavabo:0, smiroir:0, sbougie:0, stapis:0, clit:0, crideaux:0, cpenderie:0, carbre:0, vplantes:0, vfauteuil:0, vbanquette:0, kplan:0, kplaques:0, kfrigo:0, ketagere:0, kilot:0, kgamelles:0, kepices:0, kparcours:0, setupR:0, chaiseR:0, setupB:0, chaiseB:0, cubes:0, dodo:0, murales:0, projets:0, tapis:0}, projets: PROJ0, projOpen: "p1", projDraft: "", projWho: ME, stepDraft: "", nextProj: 3, editCtx: null, room: "salon", radioOn: true, demoUnlock: false, roomSel: {mur: 0, sol: 0, tapis: 0}, roomView: {mur: 0, sol: 0, tapis: 0}, accOpen: {piece: true, meubles: false, bureau: false, cuisine: false, chambre: false, sdb: false, veranda: false, affiches: false, saison: false, musique: false, notifs: false}, furnSel: {plaid: 0, bureau: 0, canape: 0, table: 0, frigo: 0, panier: 0, pensebete: 0}, furnView: {plaid: 0, bureau: 0, canape: 0, table: 0, frigo: 0, panier: 0, pensebete: 0}, tableDecoOn: true, contacts: CONTACTS0, contactQuery: "", contactCat: "all", cName: "", cPhone: "", cMail: "", nextContact: 17, bdayCat: "nahla", bdayStart: 15, candleLit: true, confStart: 15, confGen: 0, toastHead: null, zoom: null, zoomAuto: true, zoomedOnce: false, notifOn: {rdv:true, mot:true, coeur:true, magasin:true, soiree:true, taches:false}, toast: null, missions: MISS0, missDraft: "", missType: "rdv", journal: JOURNAL0, journalSeen: Date.UTC(2026, 10, 12, 20, 0), jFilter: "tout", nextJ: 6, sfxOn: true, sfxVol: 1, sfxNight: true, missDet: null, missDetDraft: "", litBags: 6, mealDemo: false, missBig: false, cEdit: null, cDraft: null, gmailAddr: "", missCats: [], catInfo: CATINFO0, catEdit: null, catDraft: null, missDate: (REEL ? addDaysIso(7) : "2026-11-24"), missTime: "09:00", nextMiss: 6, notif: null, musicOn: false, soirActs: ACTS0, soirSel: null, soirDay: 0, soirees: {2: {act:"jeu", name:"Jeu de société", item:"jeu", by:"E", status:"accepte"}}, soirDraft: "", nextAct: 1, taskDraft: "", draftWho: ME, whoFilter: "all", session: null, sessionDone: 0, nextTask: 1, fireOn: true, board: "mots", notes: NOTES0, noteDraft: "", noteColor: "#F7E27A", nextNote: 3, tasks: TASKS0, storeMode: false, screen: "salon", items: ITEMS0, nextId: 9, draft: "", photo: null, portions: 4, ingOff: {muscade: true}, xp: {nahla:60, bao:45, tsunky:10}, lvl: {nahla:5, bao:4, tsunky:2}, finished: false, treeOn: false, saison: "hiver", event: "anniv", eventShown: true, wishTab: "her", reserved: {}, myWishes: MY_WISHES, wishDraft: "", nextWish: 3, tick: 0, sheet: null, anim: {nahla:"repos", bao:"queue", tsunky:"sieste"}};
  }
  componentDidMount() {
    var self = this;
    this._t = setInterval(function () {
      var st = self.state, upd = {tick: st.tick + 1};
      if (st.zoom && st.tick - st.zoom.start >= ZOOM_LEN) { upd.zoom = null; upd.zoomLock = {cat: st.zoom.cat, until: (Math.floor(st.tick / SLOT) + 2) * SLOT}; }
      if (st.event === "anniv" && st.eventShown && st.tick === st.bdayStart) { upd.toast = "C'est l'anniversaire de " + CATS[st.bdayCat].name + " aujourd'hui !"; upd.toastHead = "Notification du matin"; clearTimeout(self._tt); self._tt = setTimeout(function () { self.setState({toast: null}); }, 3500); }
      var startZ = function () { var sc = self._salonCats || ORDER; if (!sc.length) return; upd.zoom = {cat: sc[Math.floor(Math.random() * sc.length)], start: st.tick + 1}; upd.zoomedOnce = true; };
      if (!st.zoom && st.zoomAuto && st.screen === "salon" && !st.sheet && !self.busy(st, true) && !((st.event === "annivE" || st.event === "annivC") && st.eventShown && st.tick - st.personStart < 70)) {
        if (!st.zoomedOnce) { if (st.tick >= 40) startZ(); }
        else if (Math.random() < 1 / (300 * RARE)) startZ();
      }
      var lvSum = ORDER.reduce(function (a, k) { return a + st.lvl[k]; }, 0);
      if (self._lvSum != null && lvSum > self._lvSum) SFX.play("niveau");
      if (self._lvPrev) ORDER.forEach(function (k) { if (st.lvl[k] > self._lvPrev[k]) self._log("chat", CATS[k].name + " passe au niveau " + st.lvl[k], CATS[k].domain || ""); });
      self._lvSum = lvSum; self._lvPrev = Object.assign({}, st.lvl);
      if (st.purr && st.purr !== self._purrSeen) { self._purrSeen = st.purr; SFX.play("ronron", Math.min(4, Math.max(1.5, (st.purr.until - st.tick) / 10))); }
      if (self._hfq && !st.hf[self._hfq]) { SFX.play("hautfait"); (function (h) { if (h) self._log("hf", h.n, REEL ? NAME[ME] + " · " + h.d : h.d, REEL ? {hfId: h.id, who: ME} : null); })(HF.concat(HF_PROG).filter(function (h) { return h.id === self._hfq; })[0]); var hfn = HF.concat(HF_PROG).filter(function (h) { return h.id === self._hfq; })[0]; if (self._spreadXp) setTimeout(function () { self._spreadXp(20, 1); }, 0); var o = Object.assign({}, st.hf); o[self._hfq] = true; upd.hf = o; upd.toast = "Haut fait débloqué : " + hfn.n + " · +20 XP pour le foyer"; upd.toastHead = "Animation rare"; clearTimeout(self._tt); self._tt = setTimeout(function () { self.setState({toast: null}); }, 3800); }
      self._hfq = null;
      if ((st.event === "annivE" || st.event === "annivC") && st.eventShown && st.tick === st.personStart) { upd.toast = "Joyeux anniversaire " + (st.event === "annivE" ? "Emie" : "Co") + " ! Les chats t'attendent au salon, et un petit mot est sur le pense-bête. XP ×2 aujourd'hui."; upd.toastHead = "Notification du matin"; clearTimeout(self._tt); self._tt = setTimeout(function () { self.setState({toast: null}); }, 4500); }
      if (st.event === "couple" && st.eventShown && st.tick === st.coupleStart) { upd.toast = "Joyeux anniversaire à nous deux ! Toute l'XP du jour compte double."; upd.toastHead = "22 avril · notification du matin"; clearTimeout(self._tt); self._tt = setTimeout(function () { self.setState({toast: null}); }, 4200); }
      if (st.birdEv && st.tick - st.birdEv.start > 80) upd.birdEv = null;
      else if (!st.birdEv && st.room === "veranda" && !st.sheet && !self.busy(st, true) && Math.random() < 1 / (600 * RARE)) upd.birdEv = {start: st.tick + 1};
      if (st.duckEv && st.tick - st.duckEv.start > 26) upd.duckEv = null;
      else if (!st.duckEv && st.room === "sdb" && !st.sheet && !self.busy(st, true) && Math.random() < 1 / (350 * RARE)) upd.duckEv = {start: st.tick + 1, auto: true};
      if (st.mouse && st.tick > st.mouse.until) upd.mouse = null;
      else if (!st.mouse && st.screen === "salon" && !st.sheet && Math.random() < 1 / (300 * RARE)) {
        var okR = ROOMS.filter(function (r) { return r.lvl <= (st.demoUnlock ? 99 : FOYER_LVL); }), rr = okR[Math.floor(Math.random() * okR.length)].id, sps = MOUSE_SPOTS[rr], spp = sps[Math.floor(Math.random() * sps.length)];
        upd.mouse = {room: rr, x: spp[0], y: spp[1], until: st.tick + 400};
      }
      if (st.bedEv && st.tick - st.bedEv.start > 70) upd.bedEv = null;
      else if (!st.bedEv && st.room === "chambre" && !st.sheet && !self.busy(st, true) && Math.random() < 1 / (450 * RARE)) upd.bedEv = {start: st.tick + 1, cat: null};
      self.setState(upd);
    }, 100);
  }
  componentWillUnmount() { clearInterval(this._t); }
  _catHistory(st, k) {
    if (k === "nahla") return st.tasks.filter(function (t) { return t.done; }).slice(0, 4).map(function (t) { return {t: t.t, xp: "+" + (t.pts || 5) + " XP"}; });
    if (k === "tsunky") return st.missions.filter(function (m) { return m.done; }).slice(0, 4).map(function (m) { return {t: m.t, xp: "+" + m.pts + " XP"}; });
    return st.items.filter(function (i) { return i.done; }).slice(0, 4).map(function (i) { return {t: i.n + " (coché aux courses)", xp: ""}; });
  }
  _realWeek(st) {
    var col = {rdv: "#B23A48", achat: "#9A5B12", sortie: "#3E6FB0", papiers: "#4A7034"};
    return [0, 1, 2, 3, 4, 5, 6].map(function (n) {
      var d = new Date(TODAY_Y, TODAY_M, TODAY_D + n), iso = isoD(d), jl = JOURS_L[d.getDay()], its = [];
      st.missions.forEach(function (m) { if (!m.done && m.date === iso) its.push({t: m.t + (m.time ? " · " + m.time.replace(":", "h") : ""), c: col[m.type] || "#4A7034"}); });
      if (n === 0) st.tasks.forEach(function (t) { if (!t.done && freqOf(t) === "jour") its.push({t: t.t, c: "#3E6FB0"}); });
      (st.agenda || []).forEach(function (a) { if (a.d === iso) its.push({t: a.t + (a.h ? " · " + a.h.replace(":", "h") : ""), c: "#2E4A7A"}); });
      var mi = MEAL_ISO.indexOf(iso); if (mi >= 0 && st.meals[mi] && st.recipes[st.meals[mi]]) its.push({t: "Repas : " + st.recipes[st.meals[mi]].n, c: "#9A5B12"});
      return {short: jl.slice(0, 3), long: jl.charAt(0).toUpperCase() + jl.slice(1, 3) + ". " + d.getDate(), num: d.getDate(), idx: n, today: n === 0, items: its};
    });
  }
  busy(st, inclBday) {
    st = st || this.state; var t = st.tick;
    if (st.event === "anniv" && st.eventShown && (inclBday || (t - st.bdayStart >= -5 && t - st.bdayStart < 70))) return true;
    if ((st.event === "annivE" || st.event === "annivC") && st.eventShown && t - st.personStart >= -5 && t - st.personStart < 70) return true;
    if (st.zoom) return true;
    if (st.birdEv && t - st.birdEv.start >= -5 && t - st.birdEv.start <= 80) return true;
    if (st.bedEv && t - st.bedEv.start <= 70) return true;
    if (st.duckEv && t - st.duckEv.start <= 26) return true;
    if (st.purr && t < st.purr.until) return true;
    if (st.play && t < st.play.until) return true;
    return false;
  }
  effAnim(key) {
    var st = this.state, a = st.anim[key];
    if (st.event === "anniv" && st.eventShown && st.tick - st.bdayStart >= -5 && st.tick - st.bdayStart < 70) return a === "pompon" ? "repos" : a;
    if ((st.event === "annivE" || st.event === "annivC") && st.eventShown && st.tick - st.personStart >= -5 && st.tick - st.personStart < 70) return a === "sieste" ? "repos" : a;
    if (st.purr && st.purr.cat === key && st.tick < st.purr.until) return "ronron";
    if (st.play && st.play.cat === key && st.tick < st.play.until) return "pompon";
    if (st.night) return "sieste";
    if (this.busy(st, true)) return a;
    if (key === "nahla" && a === "repos" && st.tick % 400 < 80) return "chant";
    if (key === "nahla" && a === "repos" && st.tick % 900 >= 500 && st.tick % 900 < 560) return "pain";
    if (key === "bao" && (a === "repos" || a === "queue") && st.tick % 800 >= 600 && st.tick % 800 < 660) return "pain";
    if (key === "tsunky" && (a === "repos" || a === "sieste") && st.tick % 500 >= 200 && st.tick % 500 < 270) return "pain";
    if (key === "bao" && (a === "repos" || a === "queue") && st.tick % 450 >= 100 && st.tick % 450 < 160) return "pompon";
    return a;
  }
  frameSrc(key) {
    var a = ANIMS[this.effAnim(key)];
    var i = Math.floor(this.state.tick * 100 / a.ms) % a.frames.length;
    return "/_blob/" + IMG[key][a.frames[i]];
  }
  open(s) { this.setState({sheet: s}); }
  renderVals() {
    var self = this;
    var st = this.state;
    var bday = st.event === "anniv" && st.eventShown, bk = st.bdayCat, be = st.tick - st.bdayStart;
    var personBday = st.eventShown && (st.event === "annivE" || st.event === "annivC"), pwho = st.event === "annivE" ? "Emie" : "Co", pkey = st.event === "annivE" ? "E" : "C", pe = st.tick - st.personStart;
    // les chats échangent leurs places dans chaque pièce (tous les quarts d'heure dans l'appli, toutes les 30 s en démo)
    var ROT = REEL ? Math.floor(Date.now() / (15 * 60e3)) : Math.floor(st.tick / (SLOT * 2));
    var slotK = function (k) { return ORDER[(ORDER.indexOf(k) + ROT) % 3]; };
    var sj3 = function (i) { return (i + ROT) % 3; };
    var LVD = st.demoUnlock ? 99 : FOYER_LVL, OWN = (st.stats || {}).owned || {};
    var DECO = {bol: st.lvl.bao >= 5, perch: st.lvl.nahla >= 6, tsu: st.lvl.tsunky >= 3, plante: LVD >= 8, tapis: LVD >= 9, lampe: LVD >= 10, coussins: LVD >= 12, etoile: !!OWN.coussin, bougie: !!OWN.bougie, cabas: !!OWN.cabas};
    var perched = DECO.perch && ROT % 3 === 0 && !st.treeOn;   // Nahla sur son étagère, un quart d'heure sur trois
    var home = function (k) { if (k === "nahla" && perched) return {x: 15, y: 249}; var c = CATS[slotK(k)]; return {x: parseInt(st.treeOn ? TREE_POS[slotK(k)].x : c.x, 10), y: parseInt(st.treeOn ? TREE_POS[slotK(k)].y : c.y, 10)}; };
    var givers = ORDER.filter(function (k) { return k !== bk; });
    var lvlNow0 = st.demoUnlock ? 99 : FOYER_LVL;
    var mv = st.demoUnlock && !st.night, slot = mv ? Math.floor(st.tick / SLOT) : 5, ph = mv ? st.tick % SLOT : 999;
    var nightPres = function () { var r = {}; ORDER.forEach(function (k, i) { r[k] = (lvlNow0 >= 4 && rnd(i * 13 + 5) < 0.5) ? "chambre" : "salon"; }); return r; };
    var holds = function (P, t, now) {
      if (st.bedHold && t < st.bedHold.until) P[st.bedHold.cat] = "chambre";
      if (st.vHold && t < st.vHold) ORDER.forEach(function (k) { P[k] = "veranda"; });
      if (st.zoomLock && t < st.zoomLock.until) P[st.zoomLock.cat] = "salon";
      if (now && st.zoom) P[st.zoom.cat] = "salon";
      if ((st.event === "anniv" || st.event === "annivE" || st.event === "annivC") && st.eventShown) ORDER.forEach(function (k) { P[k] = "salon"; });
      return P;
    };
    var pres = holds(st.night ? nightPres() : presence(slot, lvlNow0), st.tick, true);
    var presPrev = mv ? holds(presence(slot - 1, lvlNow0), slot * SLOT - 1, false) : pres;
    var transit = {};
    if (mv && ph < 2 * WALK) ORDER.forEach(function (k) { if (presPrev[k] !== pres[k] && !(st.zoom && st.zoom.cat === k)) transit[k] = {from: presPrev[k], to: pres[k]}; });
    self._salonCats = ORDER.filter(function (k) { return pres[k] === "salon" && !transit[k]; });
    var cats = ORDER.map(function (k) {
      var c = CATS[k]; var a = ANIMS[self.effAnim(k)];
      var h = home(k), x = h.x, y = h.y, carry = false, css = a.css, src = self.frameSrc(k), bubble = a.bubble;
      if (bday && k === bk) {
        if (st.anim[k] === "sieste" || st.anim[k] === "etire" || (be >= -5 && be < 60) || self.effAnim(k) !== st.anim[k]) { src = "/_blob/" + IMG[k][(be >= 15 && be < 40) ? "happy" : ((st.tick % 40 < 3) ? "blink" : "sit")]; css = "calm"; bubble = ""; }
      }
      if (bday && k !== bk && be >= 0 && be < 40) {
        var hb = home(bk), side = givers.indexOf(k) === 0 ? -1 : 1;
        var tx = Math.max(0, Math.min(300, hb.x + side * 74)), ty = hb.y;
        if (be < 15) { x = lerp(h.x, tx, be / 15); y = lerp(h.y, ty, be / 15); carry = true; css = "happy"; }
        else if (be < 25) { x = tx; y = ty; carry = be < 20; css = "calm"; }
        else { x = lerp(tx, h.x, (be - 25) / 15); y = lerp(ty, h.y, (be - 25) / 15); css = "happy"; }
        src = "/_blob/" + IMG[k][be < 25 ? "happy" : "sit"]; bubble = "";
      }
      var gr = !bday && !personBday && self._salonCats && self._salonCats[0] === k && st.tick >= 5 && st.tick < 52 && !st.night;
      if (gr) {
        var fx = 150, fy = 690;
        if (st.tick < 15) { x = lerp(h.x, fx, (st.tick - 5) / 10); y = lerp(h.y, fy, (st.tick - 5) / 10); src = "/_blob/" + IMG[k]["sit"]; css = "happy"; }
        else if (st.tick < 42) { x = fx; y = fy; src = "/_blob/" + IMG[k][st.tick % 8 < 4 ? "happy" : "happyT"]; css = "calm"; bubble = "Miaou !"; }
        else { x = lerp(fx, h.x, (st.tick - 42) / 10); y = lerp(fy, h.y, (st.tick - 42) / 10); src = "/_blob/" + IMG[k]["sit"]; css = "happy"; bubble = ""; }
      }
      if (personBday && pe >= 0 && pe < 56) {
        var pi = ORDER.indexOf(k), fx2 = [60, 150, 240][pi], fy2 = 690;
        if (pe < 12) { x = lerp(h.x, fx2, pe / 12); y = lerp(h.y, fy2, pe / 12); css = "happy"; src = "/_blob/" + IMG[k].sit; carry = true; }
        else if (pe < 44) { x = fx2; y = fy2; css = "calm"; src = "/_blob/" + IMG[k][(pe + pi * 3) % 8 < 4 ? "happy" : "happyT"]; carry = pe < 30; bubble = pe >= 30 ? "♥" : ""; }
        else { x = lerp(fx2, h.x, (pe - 44) / 12); y = lerp(fy2, h.y, (pe - 44) / 12); css = "happy"; src = "/_blob/" + IMG[k].sit; }
      }
      var purring = st.purr && st.purr.cat === k && st.tick < st.purr.until && !(personBday && pe >= -5 && pe < 70);
      if (purring) bubble = "♥ rrr";
      return {
        pompom: self.effAnim(k) === "pompon" && !(personBday && pe >= -5 && pe < 70), hearts: purring,
        pressStart: function () { clearTimeout(self._lpT); if (self.busy()) return; self._lpT = setTimeout(function () { if (self.busy()) return; self._lp = k; self.setState({purr: {cat: k, until: self.state.tick + 45}}); }, 550); },
        pressEnd: function () { clearTimeout(self._lpT); },
        x: Math.round(x) + "px", y: Math.round(y) + "px", color: c.color, src: src, css: css,
        hat: (bday && k === bk) || personBday, hatSrc: HATS[k], hatTop: k === "bao" ? "2px" : "-4px",
        carry: carry, giftSrc: GIFTS[givers.indexOf(k) < 0 ? 0 : givers.indexOf(k)],
        bubble: bubble, bubbleCss: (bubble === "♪ ♫" || bubble === "♥ rrr") ? "note1" : (bubble === "Miaou !" ? "calm" : (bubble ? "zzz" : "calm")),
        visible: pres[k] === "salon" && !transit[k] && !(st.zoom && st.zoom.cat === k && st.tick - st.zoom.start >= 5),
        aria: c.name + " : ouvrir sa fiche",
        open: function () {
          if (self._lp === k) { self._lp = null; return; }
          if (self.state.event === "anniv" && self.state.eventShown && self.state.bdayCat === k && self.state.candleLit) {
            var an = Object.assign({}, self.state.anim); an[k] = "ronron";
            self.setState({candleLit: false, confStart: self.state.tick, confGen: self.state.confGen + 1, anim: an});
            return;
          }
          self.open({type:"cat", key:k});
        }
      };
    });
    var sh = st.sheet;
    var zv = false, zx = 0, zy = 0, zf = 1, zb = false, zbx = "0px", zby = "0px", zbt = "", zex = false, zrot = "0deg", zd = false, zdx = "0px", zdy = "0px", zsrc = "";
    if (st.zoom) {
      var zk = st.zoom.cat, e = st.tick - st.zoom.start, cc = CATS[slotK(zk)];
      var px = parseInt(st.treeOn ? TREE_POS[slotK(zk)].x : cc.x, 10), py = parseInt(st.treeOn ? TREE_POS[slotK(zk)].y : cc.y, 10);
      var y0 = Math.min(770, py + 105 - 55), x0 = px - 10;
      var zr = ROOMS.filter(function (r) { return r.id !== "salon" && r.lvl <= lvlNow0; }).map(function (r) { return ROOM_DE[r.id]; }); if (!zr.length) zr = ["le couloir"];
      var room1 = zr[(st.zoom.start) % zr.length], room2 = zr[(st.zoom.start + 1) % zr.length];
      var hop = 0, run = false, seg = 0, t = 0;
      if (e < 5) { zex = true; zbx = (px + 36) + "px"; zby = (py - 24) + "px"; }
      else if (e < 16) { run = true; seg = 1; t = (e - 5) / 11; zx = lerp(x0, 420, t); zy = y0; zf = 1; }
      else if (e < 26) { zb = true; zbx = "236px"; zby = (y0 - 34) + "px"; zbt = "→ " + room1; }
      else if (e < 40) { run = true; seg = 2; t = (e - 26) / 14; zx = lerp(-120, 420, t); zy = 776; zf = 1; }
      else if (e < 48) { zb = true; zbx = "216px"; zby = "752px"; zbt = "→ " + room2; }
      else if (e < ZOOM_LEN) { run = true; seg = 3; t = (e - 48) / 13; zx = lerp(420, x0, t); zy = y0; zf = -1; }
      if (run) {
        zv = true;
        var air = false;
        if (zk === "tsunky") {
          hop = Math.abs(Math.sin(e * 0.75)) * 34; air = hop > 8;
          zrot = air ? (Math.cos(e * 0.75) * (zf === 1 ? -1 : 1) > 0 ? "-10deg" : "10deg") : "0deg";
        } else if (zk === "bao") {
          hop = Math.abs(Math.sin(e * 1.1)) * 9; air = hop > 5;
          if (!air) { zd = true; zdx = (Math.round(zx) + (zf === 1 ? 4 : 86)) + "px"; zdy = (zy + 44) + "px"; }
        } else {
          if (seg === 3 && t < 0.25) { zd = true; zdx = (Math.round(zx) + 92) + "px"; zdy = (zy + 44) + "px"; zrot = "-6deg"; }
        }
        zy = Math.round(zy - hop);
        zsrc = RUN[zk][air ? 0 : st.tick % 2];
      }
    }
    var out_zoom = {v: zv, x: Math.round(zx) + "px", y: zy + "px", f: zf, src: zsrc, b: zb, bx: zbx, by: zby, bt: zbt};
    var out = {deco: DECO,
      zoomExcl: zex, zoomRot: zrot, zoomDust: zd, zoomDustX: zdx, zoomDustY: zdy,
      zoomVisible: out_zoom.v, zoomX: out_zoom.x, zoomY: out_zoom.y, zoomFlip: out_zoom.f, zoomSrc: out_zoom.src,
      zoomBubbleOn: out_zoom.b, zoomBubbleX: out_zoom.bx, zoomBubbleY: out_zoom.by, zoomBubbleText: out_zoom.bt,
      cats: cats, salonSrc: (st.event === "noel" && st.eventShown) ? SALONS.noel : SALONS[st.saison], isNoel: st.event === "noel" && st.eventShown, sheetOpen: !!sh, isWish: false,
      setClassique: function () { self.setState({saison: "classique"}); },
      setNoel: function () { self.setState({saison: "noel"}); },
      bgClassique: st.saison === "classique" ? "#2B2A30" : "#FFFFFF", fgClassique: st.saison === "classique" ? "#F7F3EE" : "#2B2A30",
      bgNoel: st.saison === "noel" ? "#9E2F2F" : "#FFFFFF", fgNoel: st.saison === "noel" ? "#FFFFFF" : "#2B2A30",
      pClassique: st.saison === "classique" ? "true" : "false", pNoel: st.saison === "noel" ? "true" : "false", isCat: false, isFoyer: false, isCal: false, isTab: false,
      sheetTitle: "", sheetColor: "#2B2A30", sc: {anims: [], history: []}, tabText: "", tabItems: [],
      close: function () { self.setState({sheet: null, catEdit: null, catDraft: null}); },
      openFoyer: function () { self.open({type:"foyer"}); },
      openJournal: function () { self._jSeenPending = true; self.open({type:"journal"}); },
      openCal: function () { self.open({type:"cal"}); },
      openCourses: function () { self.setState({screen: "courses", sheet: null, finished: false}); },
      openTaches: function () { self.open({type:"board"}); },
      openBasket: function () { self.setState({screen: "taches", sheet: null}); },
      openBoard: function () {
        self.setState({sheet: {type:"board"}, board: "mots", notes: self.state.notes.map(function (n) { return Object.assign({}, n, {read: true}); })});
      },
      openDemarches: function () { self.open({type:"tab", key:"demarches"}); },
      openInfos: function () { self.setState({screen: "infos", sheet: null}); },
      decos: DECOS.map(function (d) {
        var okD = REEL ? FOYER_LVL >= d.lvl : d.ok;
        return {name: d.name, state: okD ? "Débloqué · niv. " + d.lvl : "Niveau " + d.lvl, bg: okD ? "#E4EEDC" : "#ECE6DD", fg: okD ? "#36532A" : "#5E5864"};
      }),
      week: (REEL ? self._realWeek(st) : WEEK).map(function (d) {
        var sv = REEL ? st.soirees[d.idx] : st.soirees[d.num - 13];
        var its = (sv && sv.status !== "refuse") ? d.items.concat([{t: "Soirée : " + sv.name, c: "#7A4E9E"}]) : d.items;
        return {short: d.short, long: d.long, num: d.num, items: its, empty: its.length === 0,
          dots: its.slice(0, 3).map(function (i) { return {c: i.c}; }),
          bg: d.today ? "#2B2A30" : "#FFFFFF", fg: d.today ? "#F7F3EE" : "#2B2A30"};
      })
    };
    if (sh && sh.type === "cat") {
      var k = sh.key; var c = CATS[k]; var cur = st.anim[k];
      out.isCat = true; out.sheetTitle = c.name; out.sheetColor = c.color;
      out.sc = {
        domain: c.domain, level: st.lvl[k], xp: st.xp[k], pct: st.xp[k] + "%", color: c.color, status: (st.event === "anniv" && st.eventShown && st.bdayCat === k) ? "C'est son anniversaire ! XP ×2 aujourd'hui" : (REEL ? (catSleeping(st, k) ? "Elle dort : sa prochaine tâche comptera ×1,5" : self._catHistory(st, k).length ? "Dernière : " + self._catHistory(st, k)[0].t : "Elle attend sa première tâche") : c.status),
        history: REEL ? self._catHistory(st, k) : c.history, noHistory: REEL && !self._catHistory(st, k).length, next: c.next,
        isBday: st.event === "anniv" && st.eventShown && st.bdayCat === k,
        bedTest: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "chambre", bedEv: {start: self.state.tick + 1, cat: k}, bedHold: {cat: k, until: self.state.tick + 400}}); },
        pet: function () { if (self.busy()) { self._toast("Pas maintenant : une animation est en cours"); return; } var r = pres[k]; self.setState({sheet: null, screen: "salon", room: r, purr: {cat: k, until: self.state.tick + 45}}); },
        playWith: function () { if (self.busy()) { self._toast("Pas maintenant : une animation est en cours"); return; } var r = pres[k]; self.setState({sheet: null, screen: "salon", room: r, play: {cat: k, until: self.state.tick + 60}}); },
        playLabel: "Jouer au pompon",
        editing: st.catEdit === k, notEditing: st.catEdit !== k,
        infoRows: CATINFO_F.map(function (f) {
          var v = st.catInfo[k][f.id] || "";
          if (f.id === "anniv" && parseJM(v)) { var nd = nextJM(parseJM(v)); v += nd === 0 ? " · c'est aujourd'hui !" : " · dans " + nd + " jour" + (nd > 1 ? "s" : ""); }
          return {l: f.l, v: v || "À compléter", fg: v ? "#2B2A30" : "#8A8290", w: v ? "600" : "400"};
        }),
        missing: CATINFO_F.filter(function (f) { return !st.catInfo[k][f.id]; }).length,
        startEdit: function () { self.setState({catEdit: k, catDraft: Object.assign({}, self.state.catInfo[k])}); },
        cancelEdit: function () { self.setState({catEdit: null, catDraft: null}); },
        saveEdit: function () {
          var ci = Object.assign({}, self.state.catInfo), d = self.state.catDraft || {};
          Object.keys(d).forEach(function (x) { d[x] = String(d[x] || "").trim(); });
          ci[k] = d; self.setState({catInfo: ci, catEdit: null, catDraft: null}); self._toast("Fiche de " + c.name + " enregistrée");
        },
        fields: st.catEdit === k ? CATINFO_F.map(function (f) {
          return {id: "ci-" + f.id, l: f.l, ph: f.ph, v: (st.catDraft || {})[f.id] || "", long: f.id === "notes" || f.id === "alim", short: !(f.id === "notes" || f.id === "alim"),
            on: function (e) { var d = Object.assign({}, self.state.catDraft); d[f.id] = e.target.value; self.setState({catDraft: d}); }};
        }) : [],
        rdvs: st.missions.filter(function (m) { return m.type === "rdv" && !m.done && m.cats && m.cats.indexOf(k) >= 0; }).sort(function (a, b) { return (a.date + a.time) < (b.date + b.time) ? -1 : 1; }).map(function (m) {
          var dd = daysBetween(TODAY, parseD(m.date));
          return {t: m.t, d: fmtD(parseD(m.date)) + (m.time ? " à " + m.time.replace(":", "h") : "") + " · " + (dd === 0 ? "aujourd'hui" : (dd === 1 ? "demain" : "dans " + dd + " j")), who: m.who === "2" ? "E&C" : m.who, whoBg: WHO[m.who].bg};
        }),
        addRdv: function () { self.setState({sheet: null, catEdit: null, screen: "missions", missType: "rdv", missCats: [k], missDraft: "Vétérinaire : " + c.name + " "}); },
        addRdvLabel: "+ Rendez-vous pour " + c.name,
        noRdv: !st.missions.some(function (m) { return m.type === "rdv" && !m.done && m.cats && m.cats.indexOf(k) >= 0; }),
        liveNote: c.name + " vit sa vie toute seule. Tu peux la caresser ou jouer avec elle" + (pres[k] !== "salon" ? " : elle est dans " + ROOM_DE[pres[k]] + "." : "."),
        zoomTest: function () { if (self.busy()) return; self.setState({sheet: null, zoom: {cat: k, start: self.state.tick}, zoomedOnce: true}); }, src: self.frameSrc(k), css: ANIMS[cur].css,
        anims: ANIM_ORDER.concat(ANIM_EXTRA[k] || []).map(function (id) {
          var on = id === cur;
          return {label: ANIMS[id].label, pressed: on ? "true" : "false", bg: on ? c.color : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30",
            pick: function () { var a = Object.assign({}, self.state.anim); a[k] = id; self.setState({anim: a}); }};
        })
      };
    } else if (sh && sh.type === "journal") {
      out.isJournal = true; out.sheetTitle = "Succès récents"; out.sheetColor = "#D9A441";
    } else if (sh && sh.type === "foyer") {
      out.isFoyer = true; out.sheetTitle = "Foyer · niveau " + FOYER_LVL; out.sheetColor = "#2B2A30";
    } else if (sh && sh.type === "cal") {
      out.isCal = true; out.sheetTitle = REEL ? "Les 7 prochains jours" : "Semaine du 9 nov."; out.sheetColor = "#2B2A30";
    } else if (sh && sh.type === "tab") {
      var t = TABS[sh.key];
      out.isTab = true; out.sheetTitle = t.title; out.sheetColor = t.color; out.tabText = t.text;
      out.tabItems = t.items.map(function (x) { return {t: x}; });
    }
    out.fireOn = st.fireOn && st.bSel.schem !== 3; out.fireSrc = FIRE[Math.floor(st.tick / 2) % 3];
    out.pFire = st.fireOn ? "true" : "false"; out.fireLabel = st.fireOn ? "Éteindre le feu" : "Allumer le feu";
    out.toggleFire = function () { self.setState({fireOn: !self.state.fireOn}); };
    out.treeOn = st.treeOn; out.noTree = !st.treeOn;
    out.treeLabel = st.treeOn ? "Aperçu niveau 11 : activé" : "Aperçu niveau 11 : désactivé";
    out.pTree = st.treeOn ? "true" : "false"; out.treeBg = st.treeOn ? "#E4EEDC" : "#FFFFFF";
    out.toggleTree = function () { self.setState({treeOn: !self.state.treeOn}); };
    var wk = (st.event === "noel" && st.eventShown) ? "snow" : ({hiver:"snow", automne:"leaves", printemps:"petals", ete:"sea", classique:"leaves"})[st.saison];
    if (MTO === "pluie") wk = "rain"; else if (MTO === "neige") wk = "snow"; else if (MTO === "soleil") wk = "none"; else if (MTO === "nuageux" && wk === "snow") wk = "none";
    out.winParts = winParticles(wk);
    out.hasEvent = !!st.event;
    out.bday = bday; out.bannerOn = bday || personBday;
    // Nouvelle année
    var nyOn = st.event === "nouvelan" && st.eventShown, nyY = TODAY_M === 11 ? TODAY_Y + 1 : TODAY_Y, nyLeft = TODAY_M === 11 ? 32 - TODAY_D : 0;
    out.nyOn = nyOn && !bday && !personBday;
    out.nyText = nyLeft > 1 ? "Plus que " + nyLeft + " jours avant " + nyY + " !" : nyLeft === 1 ? "Ce soir, on passe en " + nyY + " !" : "Bonne année " + nyY + " !";
    out.nyFlags = []; for (var nf = 0; nf < 24; nf++) out.nyFlags.push({x: (12 + nf * 15.5) + "px", c: ["#F2C14E", "#C9CED6", "#2B2A30", "#E8B84A"][nf % 4]});
    out.nyReplay = function () { var t = self.state.tick + 2; self.setState({confStart: t, confGen: self.state.confGen + 1, sheet: null}); };
    var replay = function () { var t = self.state.tick + 2, an = Object.assign({}, self.state.anim); an[self.state.bdayCat] = "repos"; self.setState({bdayStart: t, confStart: t, confGen: self.state.confGen + 1, candleLit: true, anim: an, sheet: null, zoom: null}); };
    out.replayBday = personBday ? function () { var t = self.state.tick + 2; self.setState({personStart: t, confStart: t, confGen: self.state.confGen + 1, sheet: null, zoom: null, purr: null, play: null}); } : replay;
    out.bdayText = "Joyeux anniversaire " + (personBday ? pwho : CATS[bk].name) + " !"; out.bdayColor = personBday ? WHO[pkey].bg : CAT_COL[bk];
    var fc = [out.bdayColor, "#F2C14E", "#F6C1C7", "#FFFFFF"];
    out.flags = []; for (var fi = 0; fi < 24; fi++) out.flags.push({x: (12 + fi * 15.5) + "px", c: fc[fi % 4]});
    out.balA = BALS[bk];
    var hb2 = home(bk);
    var cakeLeft = hb2.x > 240;
    out.cakeX = (cakeLeft ? hb2.x - 40 : hb2.x + 76) + "px"; out.cakeY = (hb2.y + 105 - 40) + "px";
    out.cakeSrc = st.candleLit ? CAKE.on : CAKE.off;
    out.droppedGifts = (bday && be >= 20) ? givers.map(function (g, i) { return {src: GIFTS[i], x: (hb2.x - 4 + i * 66) + "px", y: (hb2.y + 105 - 24) + "px"}; }) : [];
    var ce = st.tick - st.confStart;
    out.confOn = (bday || personBday || out.nyOn) && ce >= 0 && ce < 45;
    var cc2 = out.nyOn ? ["#F2C14E", "#C9CED6", "#FFFFFF", "#E8B84A", "#8A8F99", "#F7E27A"] : [CAT_COL[bk], "#F2C14E", "#F6C1C7", "#E04848", "#FFFFFF", "#6FBF5A"];
    out.confetti = []; for (var ci = 0; ci < 40; ci++) out.confetti.push({cls: "wconf" + (st.confGen % 2), x: Math.round(rnd(ci + 50) * 380) + "px", w: (rnd(ci + 51) > 0.5 ? 6 : 4) + "px", h: (rnd(ci + 52) > 0.5 ? 8 : 5) + "px", c: cc2[ci % 6], dur: (2.4 + rnd(ci + 53) * 1.6).toFixed(1) + "s", delay: (rnd(ci + 54) * 0.6).toFixed(2) + "s"});
    out.bareme = [{t:"Tâche quotidienne, par passage (2 par jour)", v:"2 XP"}, {t:"Tâche deux fois par semaine, par passage", v:"4 XP"}, {t:"Tâche hebdomadaire (renouvelée le lundi)", v:"5 XP"}, {t:"Tâche mensuelle (renouvelée le 1er) ou ponctuelle", v:"10 XP"}, {t:"Courses faites (bouton en bas de la liste)", v:"15 XP"}, {t:"Planning repas de la semaine rempli", v:"5 XP"}, {t:"Soin des chats (vaccin, vermifuge, antipuces)", v:"10 XP"}, {t:"Mission : achat, sortie ou rendez-vous", v:"50 XP"}, {t:"Mission : papiers", v:"80 XP"}, {t:"Grosse mission", v:"100 XP"}, {t:"Soirée proposée et acceptée", v:"10 XP au chat le moins avancé"}, {t:"Grand projet : étape franchie", v:"10 XP par chat"}, {t:"Haut fait débloqué", v:"20 XP"}, {t:"Défi de la semaine", v:"80 à 150 XP"}];
    out.gardeFous = ["Une tâche quotidienne rapporte au plus 2 passages par jour", "Tâches quotidiennes plafonnées à 25 XP par jour et par personne", "Une mission rapporte une fois cochée ; un rendez-vous à partir du jour J", "Papiers faits avant l'échéance (date à mettre dans la mission) : +50 %", "Décocher retire l'XP", "Un chat sans XP depuis 3 jours dort : sa prochaine tâche compte ×1,5"];
    out.paliers = []; for (var pn = 2; pn <= 35; pn++) { var pc = FOYER_COST(pn), rm = ROOMS.filter(function (r) { return r.lvl === pn; })[0]; out.paliers.push({t: "Niv. " + pn + " · " + pc + (rm ? " ★" : ""), c: pn <= FOYER_LVL ? "#36532A" : "#2B2A30", w: rm ? "700" : "400"}); }
    out.isAnnivEvent = st.event === "anniv";
    out.bdayBtns = ORDER.map(function (k) {
      var on = st.bdayCat === k;
      return {label: CATS[k].name + (st.catInfo[k].anniv ? " · " + st.catInfo[k].anniv : ""), pressed: on ? "true" : "false", bg: on ? CATS[k].color : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30",
        pick: function () { var t = self.state.tick + 5; self.setState({bdayCat: k, bdayStart: t, confStart: t, confGen: self.state.confGen + 1, candleLit: true, sheet: null}); }};
    });
    out.eventShownP = st.eventShown ? "true" : "false";
    out.switchKnobTop = st.eventShown ? "3px" : "13px";
    out.switchKnobBg = st.eventShown ? "#D9A441" : "#9AA2B0";
    out.switchLabel = st.eventShown ? "Interrupteur : décor de l'événement allumé, toucher pour revenir à la saison" : "Interrupteur : décor de saison, toucher pour remettre l'événement";
    out.toggleEvent = function () { self.setState({eventShown: !self.state.eventShown}); };
    out.trackBg = st.eventShown ? "#9E2F2F" : "#C9C2B5";
    out.knobLeft = st.eventShown ? "24px" : "2px";
    out.seasonBtns = [{id:"printemps", label:"Printemps"}, {id:"ete", label:"Été"}, {id:"automne", label:"Automne"}, {id:"hiver", label:"Hiver"}].map(function (b) {
      var on = st.saison === b.id;
      return {label: b.label, pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#F7F3EE" : "#2B2A30", pick: function () { self.setState({saison: b.id, fireOn: b.id === "automne" || b.id === "hiver"}); }};
    });
    out.eventBtns = [{id:null, label:"Aucun"}, {id:"noel", label:"Noël"}, {id:"nouvelan", label:"Nouvel an"}, {id:"anniv", label:"Anniv. des chats"}, {id:"annivE", label:"10 janv. · anniv. d'Emie"}, {id:"annivC", label:"29 sept. · anniv. de Co"}, {id:"couple", label:"22 avril · nous deux"}, {id:"valentin", label:"Saint-Valentin"}, {id:"paques", label:"Pâques"}, {id:"halloween", label:"Halloween"}].map(function (b) {
      var on = st.event === b.id;
      return {id: b.id, label: b.label, pressed: on ? "true" : "false", bg: on ? (b.id ? "#9E2F2F" : "#2B2A30") : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { var t = self.state.tick + 5; if (b.id === "anniv") self.setState({event: b.id, eventShown: true, bdayStart: t, confStart: t, confGen: self.state.confGen + 1, candleLit: true, sheet: null}); else if (EV_SEASON[b.id]) self.setState({event: b.id, eventShown: true, saison: EV_SEASON[b.id], fireOn: b.id !== "paques" && b.id !== "couple", coupleStart: t, sheet: b.id === "couple" ? null : self.state.sheet}); else if (b.id === "annivE" || b.id === "annivC") { var from = b.id === "annivE" ? "Co" : "Emie"; self.setState({zoom: null, purr: null, play: null, event: b.id, eventShown: true, saison: b.id === "annivE" ? "hiver" : "automne", personStart: t, confStart: t, confGen: self.state.confGen + 1, sheet: null, notes: [{id: self.state.nextNote, by: from, text: "Joyeux anniversaire ! Les chats et moi, on t'a préparé une petite surprise ♥", color: "#F6C1C7", read: false, liked: false}].concat(self.state.notes), nextNote: self.state.nextNote + 1}); }
        else self.setState({event: b.id, eventShown: true}); }};
    });
    if (REEL) FOYER_LVL = foyerLvlOf(st);
    // météo effective : en mode réel, « Auto » suit la météo de Bron (Open-Meteo)
    // paysage de nuit (fenêtres, véranda) : dès la tombée du jour en mode réel ; chats endormis : seulement « night »
    var DARK = REEL ? !!(st.dark || st.night) : st.night;
    var MTO = (REEL && st.meteo === "auto" && st.meteoReel) ? st.meteoReel.kind : st.meteo;
    (function () { var x = foyerXpOf(st), n = 1; while (n < 99 && x >= FOYER_COST(n + 1)) { x -= FOYER_COST(n + 1); n++; }
      if (!REEL) { n = 7; x = 340; } var need = FOYER_COST(n + 1);
      out.fLvl = n; out.fPct = Math.round(x * 100 / need) + "%"; out.fXpTxt = x + " / " + need + " XP avant le niveau " + (n + 1) + "."; out.fXpShort = x + " / " + need + " XP avant le niveau " + (n + 1); })();
    out.demoReel = REEL;
    out.saisonNow = "Maintenant : " + ({printemps: "printemps", ete: "été", automne: "automne", hiver: "hiver", noel: "période de Noël", classique: "classique"})[st.saison] + ((st.event && st.eventShown) ? " · " + ({nouvelan: "Nouvelle année", noel: "Noël", anniv: "anniversaire de " + CATS[st.bdayCat].name, annivE: "anniversaire d'Emie", annivC: "anniversaire de Co", couple: "notre jour", valentin: "Saint-Valentin", paques: "Pâques", halloween: "Halloween"})[st.event] : "");
    out.demoUi = !REEL; out.ceQueOther = OTHER === "E" ? "Ce qu'Emie" : "Ce que Co"; out.deOther = OTHER === "E" ? "d'Emie" : "de Co"; out.otherE = OTHER === "E" ? "e" : ""; out.otherName = NAME[OTHER]; out.meName = NAME[ME];
    // notification à l'autre (envoyée par le service du VPS si ses réglages l'acceptent)
    self._notify = function (kind, to, text) { if (REEL && typeof window !== "undefined" && window.MAISON_NOTIFY) { window.MAISON_NOTIFY(kind, to, text); return true; } return false; };
    // XP donnée à un chat (et donc au foyer)
    var MON_ISO = (function () { var wd = (new Date(TODAY_Y, TODAY_M, TODAY_D).getDay() + 6) % 7; return isoD(new Date(TODAY_Y, TODAY_M, TODAY_D - wd)); })();
    var monOf = function (iso) { var d = parseD(iso), wd = (d.getDay() + 6) % 7; return isoD(new Date(d.getFullYear(), d.getMonth(), d.getDate() - wd)); };
    var isoDiff = function (a, b) { return Math.round((parseD(b) - parseD(a)) / 864e5); };
    // statistiques partagées : semaine en cours (défis), total des tâches, semaines avec soirée, dernière XP de chaque chat
    var STATS0 = function () {
      var x = JSON.parse(JSON.stringify(self.state.stats || {}));
      if (x.week !== MON_ISO) { x.week = MON_ISO; x.tasks = {C: 0, E: 0}; x.sansEcran = false; x.magasin = false; x.defisDone = {}; }
      x.tasks = x.tasks || {C: 0, E: 0}; x.total = x.total || 0; x.soirWeeks = x.soirWeeks || []; x.catLast = x.catLast || {}; x.owned = x.owned || {}; x.defisDone = x.defisDone || {};
      return x;
    };
    var addXp = function (xp, lvl, k, n) { xp[k] += n; while (xp[k] >= 100) { xp[k] -= 100; lvl[k] += 1; } while (xp[k] < 0 && lvl[k] > 1) { xp[k] += 100; lvl[k] -= 1; } if (xp[k] < 0) xp[k] = 0; };
    // un chat sans XP depuis 3 jours dort : sa prochaine tâche compte ×1,5
    var sleeping = function (k) { return catSleeping(self.state, k); };
    var giveXp = function (k, n, opt) {
      if (!n) return 0;
      var boost = opt && opt.boost && sleeping(k); if (boost) n = Math.round(n * 1.5);
      var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), an = Object.assign({}, self.state.anim);
      addXp(xp, lvl, k, n); an[k] = "ronron";
      var S = STATS0(); S.catLast[k] = TODAY_ISO;
      self.setState({xp: xp, lvl: lvl, anim: an, stats: S});
      if (boost) setTimeout(function () { self._toast && self._toast(CATS[k].name + " se réveille : XP ×1,5 sur cette tâche !"); }, 50);
      return n;
    };
    var takeXp = function (k, n) { if (!n) return; var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl); addXp(xp, lvl, k, -n); self.setState({xp: xp, lvl: lvl}); };
    var spreadXp = function (n, sign) { ORDER.forEach(function (k, i) { var part = Math.floor(n / 3) + (i < n % 3 ? 1 : 0); if (sign < 0) takeXp(k, part); else giveXp(k, part); }); };
    var lowestCat = function () { var st2 = self.state; return ORDER.slice().sort(function (a, b) { return (st2.lvl[a] * 100 + st2.xp[a]) - (st2.lvl[b] * 100 + st2.xp[b]); })[0]; };
    self._spreadXp = spreadXp;
    var S0 = STATS0();
    // éditeur générique : chaque fiche passe par lui pour modifier un élément
    var ED = function (key, label, init, spec, onSave, onDel, delText) {
      var open = st.ed === key, D = st.edD || {};
      var sp = typeof spec === "function" ? spec(open ? D : init()) : spec;
      var r = {edOpen: open, edClosed: !open, edLabel: "Modifier " + label,
        edStart: function () { self.setState({ed: key, edD: JSON.parse(JSON.stringify(init()))}); },
        edCancel: function () { self.setState({ed: null, edD: null}); },
        edSave: function () { var d = self.state.edD || {}; if (onSave(d) === false) return; self.setState({ed: null, edD: null}); self._toast && self._toast("Modification enregistrée"); },
        edHasDel: !!onDel, edDelText: delText || "Supprimer", edCols: onDel ? "1fr 1fr 1fr" : "1fr 1fr",
        edDel: function () { if (onDel) onDel(); self.setState({ed: null, edD: null}); }, edFields: [], edGroups: []};
      if (!open) return r;
      var kid = key.replace(/[^a-zA-Z0-9]/g, "-");
      r.edFields = (sp.f || []).map(function (f) {
        var area = f[2] === "area";
        return {id: "ed-" + kid + "-" + f[0], l: f[1], type: area ? "text" : f[2], isArea: area, notArea: !area, ph: f[3] || "", mode: f[2] === "number" ? "decimal" : "text",
          v: D[f[0]] == null ? "" : String(D[f[0]]),
          on: function (e) { var d = Object.assign({}, self.state.edD); d[f[0]] = e.target.value; self.setState({edD: d}); }};
      });
      r.edGroups = (sp.g || []).map(function (g) {
        return {l: g[1], opts: g[2].map(function (o) {
          var cur = D[g[0]], on = g[3] ? (cur || []).indexOf(o[0]) >= 0 : cur === o[0];
          return {label: o[1], pressed: on ? "true" : "false", bg: on ? (o[2] || "#2B2A30") : (o[4] || "#FFFFFF"), fg: on ? (o[3] || "#FFFFFF") : "#2B2A30", bw: on ? "3px" : "2px",
            pick: function () { var d = Object.assign({}, self.state.edD); if (g[3]) { var a = (d[g[0]] || []).slice(), i = a.indexOf(o[0]); if (i >= 0) a.splice(i, 1); else a.push(o[0]); d[g[0]] = a; } else d[g[0]] = o[0]; self.setState({edD: d}); }};
        })};
      });
      return r;
    };
    var num = function (v, dflt) { var n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? dflt : n; };
    var cap = function (t) { t = String(t || "").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
    var WHO_OPTS = [["C", "Co", "#2F7F86"], ["E", "Emie", "#8A4F9E"]], WHO_OPTS2 = WHO_OPTS.concat([["2", "À deux", "#B5653A"]]);
    out.openWish = function () { self.setState({sheet: {type: "wish"}, wishTab: "her"}); };
    if (sh && sh.type === "wish") { out.isWish = true; out.sheetTitle = "Wishlist de Noël"; out.sheetColor = "#9E2F2F"; }
    out.wishHer = st.wishTab === "her"; out.wishMine = st.wishTab === "mine";
    out.pHer = out.wishHer ? "true" : "false"; out.pMine = out.wishMine ? "true" : "false";
    out.bgHer = out.wishHer ? "#9E2F2F" : "#FFFFFF"; out.fgHer = out.wishHer ? "#FFFFFF" : "#2B2A30";
    out.bgMine = out.wishMine ? "#9E2F2F" : "#FFFFFF"; out.fgMine = out.wishMine ? "#FFFFFF" : "#2B2A30";
    out.showHerList = function () { self.setState({wishTab: "her"}); };
    out.showMyList = function () { self.setState({wishTab: "mine"}); };
    out.herWishes = (REEL ? (st.wishOther || []) : HER_WISHES).map(function (w) {
      var r = !!st.reserved[w.id];
      return {t: w.t, note: w.note, pressed: r ? "true" : "false", bg: r ? "#F4E6E6" : "#FFFFFF",
        label: r ? "Réservé ✓" : "Je m'en occupe", btnBg: r ? "#E4EEDC" : "#D9A441", btnFg: r ? "#36532A" : "#2B2A30",
        reserve: function () { var o = Object.assign({}, self.state.reserved); o[w.id] = !o[w.id]; self.setState({reserved: o}); }};
    });
    out.wishDraft = st.wishDraft;
    out.onWishDraft = function (e) { self.setState({wishDraft: e.target.value}); };
    var addWish = function () {
      var t = (self.state.wishDraft || "").trim(); if (!t) return;
      self.setState({myWishes: self.state.myWishes.concat([{id: "m" + self.state.nextWish, t: t}]), nextWish: self.state.nextWish + 1, wishDraft: ""});
    };
    out.addWish = addWish;
    out.onWishKey = function (e) { if (e.key === "Enter") addWish(); };
    out.myWishes = st.myWishes.map(function (w) {
      return Object.assign({t: w.t, hasNote: !!w.note, note: w.note || "", aria: "Retirer " + w.t, remove: function () { self.setState({myWishes: self.state.myWishes.filter(function (x) { return x.id !== w.id; })}); }},
        ED("wish:" + w.id, w.t, function () { return {t: w.t, note: w.note || ""}; }, {f: [["t", "Envie", "text"], ["note", "Précision (taille, lien, couleur…)", "text", "facultatif"]]},
          function (d) { if (!String(d.t || "").trim()) return false; self.setState({myWishes: self.state.myWishes.map(function (x) { return x.id === w.id ? Object.assign({}, x, {t: cap(d.t), note: String(d.note || "").trim()}) : x; })}); },
          function () { self.setState({myWishes: self.state.myWishes.filter(function (x) { return x.id !== w.id; })}); }));
    });
    var unread = st.notes.filter(function (n) { return !n.read; }).length;
    out.hasUnread = unread > 0; out.unreadCount = unread;
    out.isBoard = !!(sh && sh.type === "board");
    out.showBoardTabs = false;
    if (out.isBoard) { out.sheetTitle = st.board === "taches" ? "Ménage & tâches" : "Pense-bête"; out.sheetColor = st.board === "taches" ? "#3E6FB0" : "#2B2A30"; }
    var todo = st.tasks.filter(function (t) { return !t.done && freqOf(t) === "jour"; }).length;
    out.basketSrc = BASKETS[FURN.panier.v[st.furnSel.panier].key][todo >= 3 ? "full" : (todo > 0 ? "half" : "empty")];
    out.basketLabel = "Panier à linge : ménage et tâches, " + (todo ? todo + " à faire" : "tout est fait");
    out.boardMots = st.board === "mots"; out.boardTaches = st.board === "taches";
    out.pMots = out.boardMots ? "true" : "false"; out.pTaches = out.boardTaches ? "true" : "false";
    out.bgMots = out.boardMots ? "#2B2A30" : "#FFFFFF"; out.fgMots = out.boardMots ? "#F7F3EE" : "#2B2A30";
    out.bgTaches = out.boardTaches ? "#2B2A30" : "#FFFFFF"; out.fgTaches = out.boardTaches ? "#F7F3EE" : "#2B2A30";
    out.showMots = function () { self.setState({board: "mots"}); };
    out.showTaches = function () { self.setState({board: "taches"}); };
    out.noteDraft = st.noteDraft; out.noteDraftBg = st.noteColor;
    out.onNoteDraft = function (e) { self.setState({noteDraft: e.target.value}); };
    out.swatches = NOTE_COLORS.map(function (c) {
      var on = c.c === st.noteColor;
      return {c: c.c, label: c.label, pressed: on ? "true" : "false", border: on ? "3px solid #2B2A30" : "2px solid #8C8590",
        pick: function () { self.setState({noteColor: c.c}); }};
    });
    out.pinNote = function () {
      var t = (self.state.noteDraft || "").trim(); if (!t) return;
      var n = {id: self.state.nextNote, by: NAME[ME], text: t, color: self.state.noteColor, read: true, liked: false};
      self.setState({notes: [n].concat(self.state.notes), nextNote: self.state.nextNote + 1, noteDraft: ""});
      if (self._notify("mot", OTHER, "Nouveau petit mot de " + NAME[ME] + " : « " + (t.length > 80 ? t.slice(0, 77) + "…" : t) + " »")) self._toast("Petit mot épinglé · " + NAME[OTHER] + " est prévenu" + (OTHER === "E" ? "e" : ""));
      else if (self.state.notifOn.mot && self._toast) self._toast("Nouveau petit mot de " + NAME[ME] + " sur le pense-bête");
    };
    var rots = ["-2deg", "1.5deg", "-1deg", "2deg", "0.5deg", "-1.5deg"];
    out.notes = st.notes.map(function (n, i) {
      var ne = ED("note:" + n.id, "ce mot", function () { return {text: n.text, color: n.color}; }, {f: [["text", "Le mot", "area"]], g: [["color", "Couleur", NOTE_COLORS.map(function (c) { return [c.c, c.label.replace("Post-it ", ""), c.c, "#2B2A30", c.c]; })]]},
        function (d) { if (!String(d.text || "").trim()) return false; self.setState({notes: self.state.notes.map(function (x) { return x.id === n.id ? Object.assign({}, x, {text: String(d.text).trim(), color: d.color}) : x; })}); });
      return Object.assign(ne, {span: ne.edOpen ? "1 / -1" : "auto", rotE: ne.edOpen ? "0deg" : rots[i % rots.length], editOn: st.editCtx === "board", delLabel: "Supprimer ce mot", remove: function () { self.setState({notes: self.state.notes.filter(function (x) { return x.id !== n.id; })}); },
        text: n.text, by: n.by, color: n.color, rot: rots[i % rots.length], pressed: n.liked ? "true" : "false",
        heartFill: n.liked ? "currentColor" : "none", likeLabel: n.liked ? "Retirer le cœur" : "Mettre un cœur",
        like: function () { self.setState({notes: self.state.notes.map(function (x) { return x.id === n.id ? Object.assign({}, x, {liked: !x.liked}) : x; })}); if (!n.liked && n.by !== NAME[ME]) { if (!self._notify("coeur", n.by === "Co" ? "C" : "E", NAME[ME] + " a mis un cœur à ton petit mot ♥") && self.state.notifOn.coeur && self._toast) self._toast(NAME[ME] + " a mis un cœur à ton petit mot"); } }});
    });
    // qui a coché la tâche (ce jour-là) : C, E ou C&E
    var byOf = function (t) { return t.doneBy ? t.doneBy : (t.done && (t.who === "C" || t.who === "E") ? [t.who] : []); };
    var byLabel2 = function (b) { return b.length === 2 && b[0] === b[1] ? b[0] + "×2" : b.length > 1 ? "C&E" : b.length ? b[0] : ""; };
    var byBg2 = function (b) { return b.length === 2 && b[0] === b[1] ? WHO[b[0]].bg : b.length > 1 ? WHO["2"].bg : b.length ? WHO[b[0]].bg : "transparent"; };
    var byLabel = function (b) { return b.length > 1 ? "C&E" : b.length ? b[0] : ""; };
    var byBg = function (b) { return b.length > 1 ? WHO["2"].bg : b.length ? WHO[b[0]].bg : "transparent"; };
    var tapTask = function (t) {
      var fqT = freqOf(t), daily = fqT === "jour", twice = daily || fqT === "2sem", by = byOf(t).slice(), xpBy = Object.assign({}, t.xpBy || {}), xpL = (t.xpL || []).slice();
      var day = (self.state.xpDay && self.state.xpDay.d === TODAY_ISO) ? JSON.parse(JSON.stringify(self.state.xpDay)) : {d: TODAY_ISO, n: {}, sum: 0};
      var mineIdx = by.indexOf(ME), add, note = "";
      // quotidienne : jusqu'à deux passages ; au-delà, toucher retire ses passages du jour. Sinon : toucher coche ou décoche.
      add = twice ? by.length < 2 : mineIdx < 0;
      if (add) {
        var pts = t.pts || 5;
        if (daily) { if ((day.n[t.id] || 0) >= 2) { pts = 0; note = "déjà comptée 2 fois aujourd'hui"; } else if (day.sum >= 25) { pts = 0; note = "plafond de 25 XP atteint aujourd'hui"; } else pts = Math.min(pts, 25 - day.sum); }
        var got = giveXp("nahla", pts, {boost: true});
        if (daily && got) { day.n[t.id] = (day.n[t.id] || 0) + 1; day.sum += got; }
        by.push(ME); xpL.push({w: ME, x: got}); xpBy[ME] = (xpBy[ME] || 0) + got;
        self._textTitles("task", t.t, ME); SFX.play("ding");
        if (note) self._toast("Tâche cochée, sans XP : " + note);
        else if (twice && by.length === 1) self._toast(t.t + " : faite 1 fois sur 2 " + (daily ? "aujourd'hui" : "cette semaine"));
      } else {
        if (mineIdx < 0) { self._toast(t.t + " : déjà faite 2 fois " + (daily ? "aujourd'hui" : "cette semaine")); return; }
        var removed = 0;
        xpL = xpL.filter(function (e) { if (e.w === ME) { takeXp("nahla", e.x || 0); if (daily && e.x) { day.n[t.id] = Math.max(0, (day.n[t.id] || 0) - 1); day.sum = Math.max(0, day.sum - e.x); } removed++; return false; } return true; });
        if (!removed && xpBy[ME]) takeXp("nahla", xpBy[ME]);
        removed = Math.max(removed, by.filter(function (w) { return w === ME; }).length);
        by = by.filter(function (w) { return w !== ME; }); delete xpBy[ME];
      }
      var S = STATS0(), dn = add ? 1 : -(removed || 1);
      S.tasks[ME] = Math.max(0, (S.tasks[ME] || 0) + dn); S.total = Math.max(0, S.total + dn);
      self.setState({stats: S, xpDay: day, sessionDone: self.state.sessionDone + (add ? 1 : 0),
        tasks: self.state.tasks.map(function (x) { if (x.id !== t.id) return x; var y = Object.assign({}, x, {freq: freqOf(x), done: by.length > 0, doneBy: by, xpBy: xpBy, xpL: xpL}); delete y.who; if (!by.length) { delete y.doneBy; delete y.xpBy; delete y.xpL; } return y; })});
    };
    out.tasks = st.tasks.map(function (t) {
      return {t: t.t, done: !!t.done, hasWho: byOf(t).length > 0, pressed: t.done ? "true" : "false", seasonal: !!t.seasonal,
        bg: t.done ? "#F1ECE4" : "#FFFFFF", box: t.done ? "#3E6FB0" : "#FFFFFF", deco: t.done ? "line-through" : "none", fg: t.done ? "#6B6470" : "#2B2A30",
        who: byLabel(byOf(t)), whoBg: byBg(byOf(t)),
        toggle: function () { tapTask(t); }};
    });
    out.entretienTitre = "Entretien de " + MOIS_L[TODAY_M];
    var SEAS_BY = {hiver: [{id:"sh1", t:"Dégivrer le congélateur", why:"Une fois l'hiver"}, {id:"sh2", t:"Aérer chaque matin 10 minutes", why:"Contre l'humidité"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}],
      printemps: [{id:"sp1", t:"Nettoyer les vitres", why:"Le grand ménage de printemps"}, {id:"sp2", t:"Laver les rideaux", why:"Une fois au printemps"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}],
      ete: [{id:"se1", t:"Nettoyer le filtre de la clim", why:"Avant les fortes chaleurs"}, {id:"se2", t:"Nettoyer les moustiquaires", why:"Une fois l'été"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}]};
    var seasonal0 = REEL ? (SEAS_BY[{noel: "hiver", classique: "automne"}[st.saison] || st.saison] || SEASONAL) : SEASONAL;
    out.seasonal = seasonal0.map(function (se) {
      var added = st.tasks.some(function (t) { return t.id === se.id; });
      return {t: se.t, why: se.why, label: added ? "Ajoutée" : "+ Ajouter", bg: added ? "#E4EEDC" : "#D9A441", fg: added ? "#36532A" : "#2B2A30",
        add: function () { if (self.state.tasks.some(function (t) { return t.id === se.id; })) return;
          self.setState({tasks: self.state.tasks.concat([{id: se.id, t: se.t, done: false, seasonal: true, freq: "une", rec: "une fois cette saison", pts: 10}])}); }};
    });
    out.storeMode = st.storeMode; out.notStore = !st.storeMode; out.pStore = st.storeMode ? "true" : "false";
    out.storeBtnBg = st.storeMode ? "#F2D35B" : "#F7F3EE";
    out.toggleStore = function () { var on = !self.state.storeMode; self.setState({storeMode: on}); if (on) { if (!self._notify("magasin", OTHER, NAME[ME] + " est aux courses : besoin de quelque chose ? Ajoute-le à la liste.") && self.state.notifOn.magasin && self._toast) self._toast(NAME[ME] + " est aux courses : besoin de quelque chose ?"); } };
    out.favs = FAVS.map(function (f) {
      var on = st.items.some(function (i) { return i.n === f.n && !i.done; });
      return {label: (on ? "✓ " : "+ ") + f.n, aria: on ? f.n + " : déjà sur la liste" : "Ajouter " + f.n,
        bg: on ? "#E4EEDC" : "#FFFFFF", fg: on ? "#36532A" : "#2B2A30",
        add: function () {
          if (self.state.items.some(function (i) { return i.n === f.n && !i.done; })) return;
          self.setState({items: self.state.items.concat([{id: self.state.nextId, n: f.n, q: f.q, r: f.r, by: ME}]), nextId: self.state.nextId + 1});
        }};
    });
    out.openMissions = function () { self.setState({screen: "missions", sheet: null}); };
    out.tsuLevel = st.lvl.tsunky; out.tsuPct = st.xp.tsunky + "%";
    out.tsuSrc = self.frameSrc("tsunky"); out.tsuCss = ANIMS[st.anim.tsunky].css; out.tsuHappySrc = "/_blob/" + IMG.tsunky.happy;
    var openM = st.missions.filter(function (m) { return !m.done; });
    var nextRdv = openM.filter(function (m) { return m.type === "rdv"; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0];
    out.missSummary = openM.length + " en cours" + (nextRdv ? " · prochain RDV : " + nextRdv.t.split(" :")[0] + ", " + fmtD(parseD(nextRdv.date)) : "");
    out.missDraft = st.missDraft;
    out.onMissDraft = function (e) { self.setState({missDraft: e.target.value}); };
    out.missDate = st.missDate; out.missTime = st.missTime;
    out.onMissDate = function (e) { self.setState({missDate: e.target.value}); };
    out.onMissTime = function (e) { self.setState({missTime: e.target.value}); };
    out.draftIsRdv = st.missType === "rdv";
    out.missTypes = MTYPES.map(function (t) {
      var on = st.missType === t.id;
      return {label: t.l, pressed: on ? "true" : "false", bg: on ? "#4A7034" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({missType: t.id}); }};
    });
    var addMission = function () {
      var t = (self.state.missDraft || "").trim(); if (!t) return;
      var m = {id: "m" + self.state.nextMiss, t: t.charAt(0).toUpperCase() + t.slice(1), type: self.state.missType, who: ME, pts: self.state.missBig ? 100 : MTYPES.filter(function (x) { return x.id === self.state.missType; })[0].pts};
      if (self.state.missBig) m.big = true;
      if (m.type === "rdv") { m.date = self.state.missDate || (REEL ? addDaysIso(7) : "2026-11-24"); m.time = self.state.missTime || "09:00"; } else { m.note = "À planifier"; }
      var mc = self.state.missCats.slice(); ORDER.forEach(function (k) { if (new RegExp(CATS[k].name, "i").test(t) && mc.indexOf(k) < 0) mc.push(k); });
      if (/\bchats\b/i.test(t) && !mc.length) mc = ORDER.slice();
      if (mc.length) m.cats = ORDER.filter(function (k) { return mc.indexOf(k) >= 0; });
      self.setState({missions: self.state.missions.concat([m]), nextMiss: self.state.nextMiss + 1, missDraft: "", missCats: [], missBig: false});
    };
    out.missCatChips = ORDER.map(function (k) {
      var on = st.missCats.indexOf(k) >= 0;
      return {label: CATS[k].name, pressed: on ? "true" : "false", bg: on ? CATS[k].color : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30",
        pick: function () { var a = self.state.missCats.slice(), i = a.indexOf(k); if (i >= 0) a.splice(i, 1); else a.push(k); self.setState({missCats: a}); }};
    });
    out.missBig = !!st.missBig; out.pBig = st.missBig ? "true" : "false"; out.bigBox = st.missBig ? "#D9A441" : "#FFFFFF";
    out.missPtsLabel = "+" + (st.missBig ? 100 : MTYPES.filter(function (x) { return x.id === st.missType; })[0].pts) + " XP";
    out.toggleBig = function () { self.setState({missBig: !self.state.missBig}); };
    out.addMission = addMission; out.onMissKey = function (e) { if (e.key === "Enter") addMission(); };
    out.notifShow = !!st.notif; out.notifTitle = st.notif ? st.notif.title : ""; out.notifBody = st.notif ? st.notif.body : "";
    var mapM = function (m) {
      var ty = MTYPES.filter(function (x) { return x.id === m.type; })[0];
      var rem = [], meta = (m.type === "papiers" && m.due ? "avant le " + fmtD(parseD(m.due)) + (m.note && m.note !== "À planifier" ? " · " + m.note : "") : m.note || ""), pv = null;
      if (m.type === "rdv" && m.date) {
        var d = parseD(m.date);
        meta = fmtD(d) + (m.time ? " · " + m.time.replace(":", "h") : (m.note ? " · " + m.note : ""));
        [{n:7, l:"J-7"}, {n:2, l:"J-2"}, {n:0, l:"Jour J"}].forEach(function (r) {
          var rd = new Date(d.getTime() - r.n * 86400000);
          var past = daysBetween(TODAY, rd) < 0, today = daysBetween(TODAY, rd) === 0;
          rem.push({label: r.l + (past ? (REEL ? " · passé" : " · envoyé") : (today ? " · aujourd'hui" : " · " + rd.getDate() + "/" + (rd.getMonth() + 1))),
            bg: past ? "#ECE6DD" : "#FFF1D6", fg: past ? "#5E5864" : "#6E400C"});
        });
        var dd = daysBetween(TODAY, d);
        var whenTxt = dd === 0 ? "aujourd'hui" : (dd === 1 ? "demain" : "dans " + dd + " jours");
        pv = {title: "Rappel : " + m.t, body: whenTxt.charAt(0).toUpperCase() + whenTxt.slice(1) + ", " + fmtD(d) + (m.time ? " à " + m.time.replace(":", "h") : "")};
      }
      return {editOn: st.editCtx === "missions", delLabel: "Supprimer " + m.t, remove: function () { self.setState({missions: self.state.missions.filter(function (x) { return x.id !== m.id; })}); },
        t: m.t, meta: m.done ? "Fait · +" + m.pts + " XP pour Tsunky" : meta + (meta ? " · " : "") + "+" + m.pts + " XP",
        type: ty.l, typeBg: ty.bg, who: m.who === "2" ? "E&C" : m.who, whoBg: WHO[m.who].bg,
        done: !!m.done, pressed: m.done ? "true" : "false", checkLabel: (m.done ? "Marquer comme à faire : " : "Marquer comme fait : ") + m.t,
        box: m.done ? "#4A7034" : "#FFFFFF", bg: m.done ? "#F1ECE4" : "#FFFFFF", deco: m.done ? "line-through" : "none", fg: m.done ? "#6B6470" : "#2B2A30",
        hasReminders: rem.length > 0 && !m.done, reminders: rem,
        hasDetails: !!m.details && st.missDet !== m.id, details: m.details || "",
        canDetail: st.missDet !== m.id && !m.done, detLabel: m.details ? "Modifier les précisions" : "+ Ajouter des précisions",
        detEditing: st.missDet === m.id, detId: "det-" + m.id, detDraft: st.missDetDraft || "",
        detPh: /d[ée]ch[eè]terie/i.test(m.t) ? "ex. cartons, vieux matelas, déchets verts, pots de peinture · prendre le badge" : "ex. modèle repéré, budget, documents à prévoir",
        onDet: function (e) { self.setState({missDetDraft: e.target.value}); },
        startDet: function () { self.setState({missDet: m.id, missDetDraft: m.details || ""}); },
        cancelDet: function () { self.setState({missDet: null, missDetDraft: ""}); },
        saveDet: function () { var v = (self.state.missDetDraft || "").trim(); self.setState({missions: self.state.missions.map(function (x) { return x.id === m.id ? Object.assign({}, x, {details: v}) : x; }), missDet: null, missDetDraft: ""}); },
        ed: ED("miss:" + m.id, m.t, function () { return {t: m.t, type: m.type, due: m.due || "", date: m.date || (REEL ? addDaysIso(7) : "2026-11-24"), time: m.time || "", who: m.who, cats: (m.cats || []).slice(), big: m.big ? "oui" : "non", note: m.type === "rdv" ? "" : (m.note || "")}; },
          function (D) { var f = [["t", "Intitulé", "text"]]; if (D.type === "rdv") f.push(["date", "Date", "date"], ["time", "Heure", "time"]); else { if (D.type === "papiers") f.push(["due", "Échéance (date) : +50 % d'XP si c'est fait avant", "date"]); f.push(["note", D.type === "papiers" ? "Précision" : "Échéance", "text", "ex. avant le 30 nov., à planifier"]); }
            return {f: f, g: [["type", "Type", MTYPES.map(function (x) { return [x.id, x.l + " · " + x.pts + " XP", "#4A7034"]; })], ["big", "Grosse mission (100 XP)", [["non", "Non"], ["oui", "Oui", "#D9A441", "#2B2A30"]]], ["who", "Qui s'en charge", WHO_OPTS2], ["cats", "Chats concernés", ORDER.map(function (k) { return [k, CATS[k].name, CATS[k].color]; }), true]]}; },
          function (d) { if (!String(d.t || "").trim()) return false; var big = d.big === "oui";
            self.setState({missions: self.state.missions.map(function (x) { if (x.id !== m.id) return x; var y = Object.assign({}, x, {t: cap(d.t), type: d.type, who: d.who, big: big, pts: big ? 100 : MTYPES.filter(function (z) { return z.id === d.type; })[0].pts});
              if (d.type === "rdv") { y.date = d.date || x.date || (REEL ? addDaysIso(7) : "2026-11-24"); y.time = d.time || ""; delete y.note; } else { delete y.date; delete y.time; y.note = String(d.note || "").trim() || "À planifier"; if (d.type === "papiers" && d.due) y.due = d.due; else delete y.due; }
              if (d.cats && d.cats.length) y.cats = ORDER.filter(function (k) { return d.cats.indexOf(k) >= 0; }); else delete y.cats; return y; })}); },
          function () { self.setState({missions: self.state.missions.filter(function (x) { return x.id !== m.id; })}); }),
        hasCats: !!(m.cats && m.cats.length), catTags: (m.cats || []).map(function (k) { return {n: CATS[k].name, c: CATS[k].color}; }),
        preview: function () {
          if (!pv) return; self.setState({notif: pv});
          clearTimeout(self._nt); self._nt = setTimeout(function () { self.setState({notif: null}); }, 3500);
        },
        toggle: function () {
          var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), anim = Object.assign({}, self.state.anim);
          var gotM = 0, noteM = "";
          if (!m.done) {
            var ptsM = m.pts;
            if (m.type === "rdv" && m.date && m.date > TODAY_ISO) { ptsM = 0; noteM = "l'XP d'un rendez-vous arrive à partir du jour J"; }
            else if (m.type === "papiers" && m.due && TODAY_ISO <= m.due) { ptsM = Math.round(ptsM * 1.5); noteM = "fait avant l'échéance : +50 %"; }
            gotM = giveXp("tsunky", ptsM, {boost: true}); SFX.play("mission");
            if (noteM) setTimeout(function () { self._toast(m.t + " · " + noteM); }, 60);
          } else takeXp("tsunky", m.xpGot || 0);
          var upd2 = {missions: self.state.missions.map(function (x) { return x.id === m.id ? Object.assign({}, x, {done: !x.done, xpGot: x.done ? 0 : gotM}) : x; })};
          if (!m.done && m.cats && m.cats.length) {
            var sa = JSON.parse(JSON.stringify(self.state.sante)), dd2 = (m.date && m.date <= TODAY_ISO) ? m.date : TODAY_ISO, hit = [];
            SOINS.forEach(function (so) { if (new RegExp(so.id === "antipuces" ? "anti-?puces" : so.id, "i").test(m.t)) { hit.push(so.n.toLowerCase()); m.cats.forEach(function (k) { sa[k].soins[so.id] = dd2; }); } });
            if (hit.length) { upd2.sante = sa; self._toast("Fiche santé mise à jour : " + hit.join(", ") + " pour " + m.cats.map(function (k) { return CATS[k].name; }).join(", ")); }
          }
          self.setState(upd2);
        }};
    };
    var rdvs = st.missions.filter(function (m) { return m.type === "rdv" && !m.done; }).sort(function (a, b) { return (a.date + a.time) < (b.date + b.time) ? -1 : 1; });
    var todos = st.missions.filter(function (m) { return m.type !== "rdv" && !m.done; });
    var dones = st.missions.filter(function (m) { return m.done; });
    out.missGroups = [{name:"Rendez-vous", list: rdvs}, {name:"À faire", list: todos}, {name:"Faites", list: dones}].filter(function (g) { return g.list.length; }).map(function (g) {
      return {name: g.name, count: g.name === "Faites" ? g.list.length + " faite" + (g.list.length > 1 ? "s" : "") : g.list.length + " en cours", items: g.list.map(mapM)};
    });
    out.doneMissCount = dones.length;
    out.clearDoneMiss = function () { self.setState({missions: self.state.missions.filter(function (m) { return !m.done; })}); };
    out.pZoom = st.zoomAuto ? "true" : "false"; out.zoomTrack = st.zoomAuto ? "#4A7034" : "#C9C2B5"; out.zoomKnob = st.zoomAuto ? "24px" : "2px";
    out.toggleZoom = function () { self.setState({zoomAuto: !self.state.zoomAuto}); };
    var toast = function (text) {
      self.setState({toast: text, toastHead: null}); clearTimeout(self._tt);
      self._tt = setTimeout(function () { self.setState({toast: null}); }, 3200);
    };
    self._toast = toast;
    out.toastShow = !!st.toast; out.toastText = st.toast || ""; out.toastHead = st.toastHead || (REEL ? "Maison" : "Notification envoyée à " + NAME[OTHER]);
    out.openSettings = function () { self.setState({sheet: {type: "settings"}}); };
    out.isSettings = !!(sh && sh.type === "settings");
    if (out.isSettings) { out.sheetTitle = "Réglages"; out.sheetColor = "#2B2A30"; }
    out.sofaSrc = FURN.canape.v[st.furnSel.canape].src; out.tableSrc = FURN.table.v[st.furnSel.table].src;
    var ctx = (sh && sh.type === "board") ? "board" : st.screen;
    var E = st.editCtx === ctx;
    out.editOn = E; out.notEdit = !E; out.pEdit = E ? "true" : "false";
    out.editBg = E ? "#D9A441" : "#F7F3EE"; out.editLabel = E ? "Terminer la modification" : "Modifier : supprimer des éléments";
    out.toggleEdit = function () { self.setState({editCtx: self.state.editCtx === ctx ? null : ctx}); };
    var lvlNow = st.demoUnlock ? 99 : FOYER_LVL;
    var ri = ROOMS.map(function (r) { return r.id; }).indexOf(st.room), R0 = ROOMS[ri];
    var goRoom = function (d) { var n = ri + d; if (n < 0 || n >= ROOMS.length) return; self.setState({room: ROOMS[n].id, sheet: null}); };
    out.inSalonRoom = st.room === "salon"; out.inOtherRoom = st.room !== "salon";
    out.roomName = R0.n; out.roomNameSize = "18px"; out.roomLocked = R0.lvl > lvlNow; out.roomOpen = !out.roomLocked;
    out.roomLockLabel = "Pièce débloquée au niveau " + R0.lvl;
    out.prevRoom = function () { goRoom(-1); }; out.nextRoom = function () { goRoom(1); };
    out.prevColor = ri > 0 ? "#2B2A30" : "#C9C2B5"; out.nextColor = ri < ROOMS.length - 1 ? "#2B2A30" : "#C9C2B5";
    out.prevLabel = ri > 0 ? "Pièce précédente : " + (ROOMS[ri - 1].lvl > lvlNow ? "secrète" : ROOMS[ri - 1].n) : "Pas de pièce avant";
    out.nextLabel = ri < ROOMS.length - 1 ? "Pièce suivante : " + (ROOMS[ri + 1].lvl > lvlNow ? "secrète" : ROOMS[ri + 1].n) : "Pas de pièce après";
    out.roomDots = ROOMS.map(function (r, i) { return {c: i === ri ? "#2B2A30" : (r.lvl > lvlNow ? "#E3DACD" : "#9AA2B0")}; });
    var here = ORDER.filter(function (k) { return pres[k] === st.room && !transit[k]; });
    var rIdx = function (r) { return ROOMS.map(function (x) { return x.id; }).indexOf(r); };
    var spotX = function (room, k, P) {
      if (room === "salon") return parseInt(CATS[slotK(k)].x, 10) - 10;
      var list = ORDER.filter(function (q) { return P[q] === room; }), i = Math.max(0, list.indexOf(k));
      return ((WALK_X[room] || [150, 150, 150])[sj3(i)] || 150) - 10;
    };
    var spotFeet = function (room, k, P) {
      if (room === "salon") return parseInt(st.treeOn ? TREE_POS[slotK(k)].y : CATS[slotK(k)].y, 10) + 85;
      var list = ORDER.filter(function (q) { return P[q] === room; }), i = Math.max(0, list.indexOf(k));
      if (room === "bureau") { var stg = MURAL_STAGES.filter(function (l) { return l <= lvlNow; }).length; return [252, 600, stg >= 2 ? 175 : (stg ? 197 : 612)][sj3(i)] + 85; }
      return ((WALK_Y[room] || [620, 620, 620])[sj3(i)] || 620) + 85;
    };
    var FLOOR = 705, JT = 12, JD = 40;
    out.walkers = [];
    Object.keys(transit).forEach(function (k) {
      var T = transit[k], right = rIdx(T.to) > rIdx(T.from), x = null, f = right ? 1 : -1, dir = right ? 1 : -1, feet = FLOOR, src = null;
      var walkSrc = "/_blob/" + WALKF[k][st.tick % 4];
      if (ph < WALK && st.room === T.from) {
        var x0 = spotX(T.from, k, presPrev) - 15, fy = spotFeet(T.from, k, presPrev);
        if (fy < FLOOR - 20) {
          if (ph < 3) { x = x0; feet = fy; src = JUMPF[k].crouch; }
          else if (ph < 9) { var u = (ph - 3) / 6; x = x0 + dir * JD * u; feet = lerp(fy, FLOOR, u) - Math.sin(Math.PI * u) * 24; src = JUMPF[k].down; }
          else if (ph < JT) { x = x0 + dir * JD; src = JUMPF[k].crouch; }
          else { x = lerp(x0 + dir * JD, right ? 410 : -130, (ph - JT) / (WALK - JT)); }
        } else x = lerp(x0, right ? 410 : -130, ph / WALK);
      } else if (ph >= WALK && st.room === T.to) {
        var x1 = spotX(T.to, k, pres) - 15, ty = spotFeet(T.to, k, pres), q = ph - WALK;
        if (ty < FLOOR - 20) {
          var xs = x1 - dir * JD;
          if (q < WALK - JT) x = lerp(right ? -130 : 410, xs, q / (WALK - JT));
          else if (q < WALK - 9) { x = xs; src = JUMPF[k].crouch; }
          else if (q < WALK - 3) { var u2 = (q - (WALK - 9)) / 6; x = lerp(xs, x1, u2); feet = lerp(FLOOR, ty, u2) - Math.sin(Math.PI * u2) * 24; src = JUMPF[k].up; }
          else { x = x1; feet = ty; src = JUMPF[k].crouch; }
        } else x = lerp(right ? -130 : 410, x1, q / WALK);
      }
      if (x === null) return;
      out.walkers.push({x: Math.round(x) + "px", y: Math.round(feet - 65) + "px", f: f, src: src ? "/_blob/" + src : walkSrc, label: CATS[k].name + (ph < WALK ? " part vers " + ROOM_DE[T.to] : " arrive")});
    });
    out.roomCats = here.map(function (k) { return {name: CATS[k].name, src: "/_blob/" + IMG[k][st.tick % 40 < 3 ? "blink" : "sit"]}; });
    out.roomCatsLabel = here.length ? here.map(function (k) { return CATS[k].name; }).join(", ") + (here.length > 1 ? " sont ici" : " est ici") : "aucun chat ici";
    var awayKey = slot + "|" + st.room + "|" + st.screen;
    if (self._awayKey !== awayKey) { self._awayKey = awayKey; self._awayT = st.tick; }
    var awayShow = st.tick - self._awayT < 100;
    out.awayCats = ORDER.filter(function (k) { return awayShow && pres[k] !== "salon" && !transit[k]; }).map(function (k) {
      return {color: CATS[k].color, label: CATS[k].name + " est dans " + ROOM_DE[pres[k]], go: function () { self.setState({room: pres[k]}); }};
    });
    out.tStart = function (e) { var t = e.touches && e.touches[0]; if (t) { self._tx = t.clientX; self._ty = t.clientY; } };
    out.tEnd = function (e) {
      var t = e.changedTouches && e.changedTouches[0]; if (!t || self._tx == null) return;
      var dx = t.clientX - self._tx, dy = t.clientY - self._ty; self._tx = null;
      if (self.state.screen !== "salon" || self.state.sheet) return;
      if (Math.abs(dx) > 140 && Math.abs(dy) < 70) goRoom(dx < 0 ? 1 : -1);
    };
    var seasonKey = (st.event === "noel" && st.eventShown) ? "noel" : st.saison;
    var rugV = ROOMV.tapis.v[st.roomSel.tapis];
    out.wallSrc = ROOMV.mur.v[st.roomSel.mur].src; out.floorSrc = ROOMV.sol.v[st.roomSel.sol].src;
    out.rugSrc = rugV.season ? SEASON_RUG[seasonKey] : rugV.src;
    out.roomFurn = ["mur", "sol", "tapis"].map(function (k) {
      var F = ROOMV[k], i = st.roomView[k], v = F.v[i], ok = v.lvl <= lvlNow, sel = st.roomSel[k] === i;
      var go = function (d) {
        var nv = (self.state.roomView[k] + d + F.v.length) % F.v.length;
        var rv = Object.assign({}, self.state.roomView); rv[k] = nv;
        var rs = Object.assign({}, self.state.roomSel); if (F.v[nv].lvl <= (self.state.demoUnlock ? 99 : FOYER_LVL)) rs[k] = nv;
        self.setState({roomView: rv, roomSel: rs});
      };
      var src = v.season ? SEASON_RUG[seasonKey] : v.src;
      return {kind: F.kind, pos: (i + 1) + "/" + F.v.length, name: ok ? v.n : "Secret", src: ok ? src : LOCK,
        w: ok ? "92px" : "48px", h: ok ? "64px" : "48px", fit: ok ? "cover" : "fill", objPos: ok ? F.objPos : "50% 50%",
        state: ok ? (sel ? "Dans le salon" : "Débloqué") : "Niveau " + v.lvl, stateFg: ok ? "#36532A" : "#5E5864",
        prevLabel: F.kind + " : version précédente", nextLabel: F.kind + " : version suivante",
        prev: function () { go(-1); }, next: function () { go(1); }};
    });
    out.acc = {};
    ["piece", "meubles", "bureau", "cuisine", "chambre", "sdb", "veranda", "affiches", "saison", "musique", "notifs"].forEach(function (k) {
      var o = !!st.accOpen[k];
      out.acc[k] = {isOpen: o, open: o ? "true" : "false", chev: o ? "▾" : "▸",
        toggle: function () { var a = Object.assign({}, self.state.accOpen); a[k] = !a[k]; self.setState({accOpen: a}); }};
    });
    var fv0 = FURN.frigo.v[st.furnSel.frigo], bv0 = FURN.pensebete.v[st.furnSel.pensebete];
    out.fridgeSrc = fv0.src; out.fridgeW = fv0.fw || "96px"; out.fridgeH = fv0.fh || "252px"; var ftop = fv0.ftop || 300; out.fridgeTop = ftop + "px";
    out.radioTop = (ftop - 38) + "px"; out.noteTop = (ftop - 50) + "px";
    out.boardSrc = bv0.src; out.boardH = bv0.bh || "84px"; out.boardTop = (bv0.btop || 132) + "px";
    out.deskSrc = FURN.bureau.v[st.furnSel.bureau].src;
    out.plaidShow = st.plaidOn; out.plaidSrc = FURN.plaid.v[st.furnSel.plaid].src;
    out.logsShow = st.logsOn && (st.saison === "hiver" || st.saison === "automne" || (st.event === "noel" && st.eventShown));
    out.pDemo = st.demoUnlock ? "true" : "false"; out.demoTrack = st.demoUnlock ? "#4A7034" : "#C9C2B5"; out.demoKnob = st.demoUnlock ? "24px" : "2px";
    out.toggleDemo = function () { self.setState({demoUnlock: !self.state.demoUnlock}); };
    out.furn = ["bureau", "frigo", "panier", "pensebete", "canape", "plaid", "table"].map(function (k) {
      var F = FURN[k], i = st.furnView[k], v = F.v[i], ok = v.lvl <= lvlNow, sel = st.furnSel[k] === i;
      var go = function (d) {
        var nv = (self.state.furnView[k] + d + F.v.length) % F.v.length;
        var fv = Object.assign({}, self.state.furnView); fv[k] = nv;
        var fs = Object.assign({}, self.state.furnSel); if (F.v[nv].lvl <= (self.state.demoUnlock ? 99 : FOYER_LVL)) fs[k] = nv;
        self.setState({furnView: fv, furnSel: fs});
      };
      return {kind: F.kind, pos: (i + 1) + "/" + F.v.length, name: ok ? v.n : "Secret", src: ok ? v.src : LOCK, w: ok ? (v.pw || F.w) : "48px", h: ok ? (v.ph || F.h) : "48px", op: "1",
        state: ok ? (sel ? "Dans le salon" : "Débloqué") : "Niveau " + v.lvl, stateFg: ok ? "#36532A" : "#5E5864",
        prevLabel: F.kind + " : version précédente", nextLabel: F.kind + " : version suivante",
        prev: function () { go(-1); }, next: function () { go(1); }};
    });
    var stageNow = MURAL_STAGES.filter(function (l) { return l <= lvlNow; }).length;
    var bSrc = function (k) { var v = BFURN[k].v[st.bSel[k]]; return k === "murales" ? v[1][Math.max(0, stageNow - 1)] : v[1]; };
    out.inBureau = st.room === "bureau" && !out.roomLocked;
    out.roomPlaceholder = out.roomOpen && ["bureau", "cuisine", "veranda", "chambre", "sdb"].indexOf(st.room) < 0;
    out.bz = {};
    BORDER.concat(KORDER, VORDER, CORDER, SORDER, SALORDER).forEach(function (k) {
      var b = BFURN[k].box;
      out.bz[k] = {src: bSrc(k), x: (b[0] * 6) + "px", y: (b[1] * 6) + "px", w: (b[2] * 6) + "px", h: (b[3] * 6) + "px"};
    });
    out.muralesOn = stageNow > 0;
    ["schem", "setag", "swin", "ccadre", "kwin", "cwin", "sfen"].forEach(function (k) { out.bz[k].on = st.bSel[k] > 0; });
    out.stoveOn = st.bSel.schem === 3; out.chemNoel = CHEM_NOEL; out.chemNoelOn = st.bSel.schem > 0 && st.event === "noel" && st.eventShown;
    out.stoveFire = POELE_FEU[Math.floor(st.tick / 3) % 2]; out.stoveFireOn = out.stoveOn && st.fireOn;
    out.radioSrc = out.bz.sradio.src; out.logsSrc = out.bz.sbuches.src;
    var openBFurn = function () { var a = Object.assign({}, self.state.accOpen); a.bureau = true; self.setState({accOpen: a, sheet: {type: "settings"}}); };
    out.openBFurn = openBFurn;
    out.openProjets = function () { self.setState({sheet: {type: "projets"}}); };
    var spots = [{x: 150, y: 252, sleep: true}, {x: 150, y: 600}, stageNow >= 2 ? {x: 252, y: 175} : (stageNow ? {x: 222, y: 197} : {x: 248, y: 612})];
    out.bureauCats = (out.inBureau ? here : []).map(function (k, i) {
      var sp = spots[sj3(i)], fr = sp.sleep ? (st.tick % 20 < 10 ? "sleepA" : "sleepB") : (st.tick % 40 < 3 ? "blink" : "sit");
      return {name: CATS[k].name, x: sp.x + "px", y: sp.y + "px", src: "/_blob/" + IMG[k][fr], k: k, aria: CATS[k].name + (sp.sleep ? " dort dans son dodo" : " est dans le bureau"), open: function () { self.open({type:"cat", key:k}); }};
    });
    var mkFurn = function (order, here) { return order.map(function (k) {
      var F = BFURN[k], i = st.bView[k], v = F.v[i], ok = v[2] <= lvlNow, sel = st.bSel[k] === i, b = F.box;
      var go = function (d) {
        var nv = (self.state.bView[k] + d + F.v.length) % F.v.length;
        var bv = Object.assign({}, self.state.bView); bv[k] = nv;
        var bs = Object.assign({}, self.state.bSel); if (F.v[nv][2] <= (self.state.demoUnlock ? 99 : FOYER_LVL)) bs[k] = nv;
        self.setState({bView: bv, bSel: bs});
      };
      var sc = Math.min(84 / (b[2] * 6), 58 / (b[3] * 6));
      var src = k === "murales" ? v[1][Math.max(0, stageNow - 1)] : v[1];
      var stTxt = ok ? (sel ? here : "Débloqué") : "Niveau " + v[2];
      if (k === "murales") stTxt = ok ? (sel ? "Au mur · " : "Débloqué · ") + ["", "étagère", "escalier", "pont et cabane"][stageNow] + (stageNow < 3 ? " · suite niv. " + MURAL_STAGES[stageNow] : "") : "Niveau " + v[2] + " · puis " + MURAL_STAGES[1] + " et " + MURAL_STAGES[2];
      return {kind: F.kind, pos: (i + 1) + "/" + F.v.length, name: ok ? v[0] : "Secret", src: ok ? src : LOCK,
        w: ok ? Math.round(b[2] * 6 * sc) + "px" : "48px", h: ok ? Math.round(b[3] * 6 * sc) + "px" : "48px",
        state: stTxt, stateFg: ok ? "#36532A" : "#5E5864",
        prevLabel: F.kind + " : version précédente", nextLabel: F.kind + " : version suivante",
        prev: function () { go(-1); }, next: function () { go(1); }};
    }); };
    out.furn = out.furn.concat(mkFurn(SALORDER, "Dans le salon"));
    out.furnB = mkFurn(BORDER, "Dans le bureau"); out.furnK = mkFurn(KORDER, "Dans la cuisine"); out.furnV = mkFurn(VORDER, "Dans la véranda"); out.furnC = mkFurn(CORDER, "Dans la chambre"); out.furnS = mkFurn(SORDER, "Dans la salle de bain");
    out.bureauNoelOn = seasonKey === "noel"; out.bureauNoel = BNOEL[Math.floor(st.tick / 6) % 2];
    out.inCuisine = st.room === "cuisine" && !out.roomLocked;
    out.kWin = KWIN[seasonKey] || KWIN.jour; out.kSeas = KSEAS[seasonKey] || ""; out.kSeasOn = !!KSEAS[seasonKey];
    out.bSeasOn = !!BSEAS[seasonKey]; out.bSeas = BSEAS[seasonKey] || "";
    out.inVeranda = st.room === "veranda" && !out.roomLocked; out.vBg = VBG[seasonKey] || VBG.ete;
    var VL = out.inVeranda ? verandaLife(seasonKey, st.tick) : {birds: [], parts: []};
    if (out.inVeranda && MTO !== "auto" && MTO !== "nuageux") {
      VL.parts = [];
      var nP = MTO === "pluie" ? 40 : (MTO === "neige" ? 34 : 0);
      for (var ip = 0; ip < nP; ip++) VL.parts.push(MTO === "pluie" ? {cls: "vrain", x: Math.round(rnd(700 + ip) * 400) + "px", w: "2px", h: "10px", c: "rgba(225,235,245,0.8)", dur: (0.9 + rnd(750 + ip) * 0.5).toFixed(2) + "s", delay: (-rnd(790 + ip) * 1.4).toFixed(2) + "s"} : {cls: "vsnow", x: Math.round(rnd(800 + ip) * 380) + "px", w: "5px", h: "5px", c: "#FFFFFF", dur: (9 + rnd(850 + ip) * 5).toFixed(1) + "s", delay: (-rnd(890 + ip) * 13).toFixed(1) + "s"});
      if (MTO === "pluie") VL.birds = [];
    } out.vBirds = VL.birds; out.vParts = VL.parts; out.vFrame = VFRAME;
    out.openVFurn = function () { var a = Object.assign({}, self.state.accOpen); a.veranda = true; self.setState({accOpen: a, sheet: {type: "settings"}}); };
    out.verandaCats = (out.inVeranda ? here : []).map(function (k, i) {
      var fr = (st.tick + i * 7) % 20 < 10 ? "sleepA" : "sleepB";
      return {css: "calm", x: [60, 150, 240][sj3(i)] + "px", y: "503px", src: "/_blob/" + IMG[k][fr], k: k, aria: CATS[k].name + " fait la sieste au soleil", open: function () { self.open({type:"cat", key:k}); }};
    });
    out.verandaAll = here.length === 3 && out.inVeranda;
    out.openKFurn = function () { var a = Object.assign({}, self.state.accOpen); a.cuisine = true; self.setState({accOpen: a, sheet: {type: "settings"}}); };
    out.kOpenCourses = function () { self.setState({screen: "courses", sheet: null, finished: false}); };
    out.kOpenBao = function () { self.setState({sheet: {type: "stocks"}}); };
    out.isStocks = !!(sh && sh.type === "stocks");
    if (out.isStocks) { out.sheetTitle = "Réserves des chats"; out.sheetColor = "#9A5B12"; }
    var lc = st.litBags, LOW = 2;
    var litInList = st.items.some(function (it) { return !it.done && /liti[eè]re/i.test(it.n); });
    out.litCount = lc; out.litLow = lc <= LOW;
    out.kGamLabel = "Gamelles des chats : voir les réserves" + (lc <= LOW ? " · plus que " + lc + " sac" + (lc > 1 ? "s" : "") + " de litière" : "");
    out.litState = lc === 0 ? "Plus de sac !" : lc <= LOW ? "À racheter" : "OK";
    out.litStateFg = lc <= LOW ? "#B23A48" : "#36532A"; out.litBorder = lc <= LOW ? "#B23A48" : "#2B2A30";
    out.litInfo = "Sacs pleins en réserve. Alerte quand il en reste " + LOW + " : notification à vous deux et rappel ici.";
    out.litCanAdd = lc <= LOW && !litInList; out.litInList = litInList;
    var setLit = function (n, opened) {
      n = Math.max(0, n); var was = self.state.litBags; self.setState({litBags: n});
      if (n <= LOW && was > LOW) self._toast("Alerte : plus que " + n + " sac" + (n > 1 ? "s" : "") + " de litière");
      else if (opened) self._toast("Sac ouvert : il en reste " + n);
    };
    out.litMinus = function () { setLit(self.state.litBags - 1, false); };
    out.litPlus = function () { setLit(self.state.litBags + 1, false); };
    out.litOpen = function () { setLit(self.state.litBags - 1, true); };
    out.litAdd = function () { var id = self.state.nextId; self.setState({items: self.state.items.concat([{id: id, n: "Sacs de litière", q: "", r: "Chats", by: "A", tag: "Stock bas"}]), nextId: id + 1}); self._toast("Sacs de litière ajoutés aux courses"); };
    var setStock = function (id, f) { self.setState({stocks: self.state.stocks.map(function (y) { return y.id === id ? Object.assign({}, y, f(y)) : y; })}); };
    out.stockList = st.stocks.map(function (x) {
      var inList = self.state.items.some(function (it) { return !it.done && it.n.toLowerCase() === x.n.toLowerCase(); });
      var isCount = x.kind === "count", pct, state, low, info, label;
      if (isCount) {
        var days = Math.floor(x.qty / x.perDay); low = x.qty <= x.low;
        pct = Math.max(0, Math.min(100, Math.round(days * 100 / x.ref)));
        state = x.qty === 0 ? "Épuisé" : low ? "À racheter" : "OK";
        var u = x.unit + (x.qty > 1 ? "s" : "");
        info = x.qty + " " + u + (x.pack ? " (" + (Math.round(x.qty / x.pack * 10) / 10).toString().replace(".", ",") + " boîte" + (x.qty / x.pack >= 2 ? "s" : "") + ")" : "") + " · " + x.perDay + " par jour · encore ~" + days + " j · alerte à " + x.low;
        label = x.n + " : " + x.qty + " " + u + ", " + state;
      } else {
        var left = Math.max(0, x.dur - x.ago); low = x.ago >= x.warn;
        pct = Math.max(0, Math.min(100, Math.round(left * 100 / x.dur)));
        state = x.blue ? (low ? "À changer" : "Eau filtrée") : (left === 0 ? "Vide" : low ? "À racheter" : "OK");
        info = x.act + " " + (x.ago === 0 ? "aujourd'hui" : "il y a " + x.ago + " j") + " · " + (x.note || "tient " + x.dur + " j") + " · encore ~" + left + " j";
        label = x.n + " : " + pct + " %, " + state;
      }
      var col = x.blue ? (low ? "#8DBDE6" : "#2E6DB4") : (pct > 50 && !low ? "#4A7034" : !low ? "#C9A227" : pct > 0 ? "#D9762B" : "#B23A48");
      return {name: x.name || x.n, pct: pct + "%", col: col, state: state, stateFg: low ? (x.blue ? "#2E6DB4" : "#B23A48") : "#4A4450",
        info: info, label: label, isTime: !isCount, isCount: isCount,
        resetLabel: x.blue ? "Filtre changé aujourd'hui" : (x.act || "Racheté") + " aujourd'hui",
        reset: function () { setStock(x.id, function () { return {ago: 0}; }); giveXp("bao", 5); self._toast(x.n + " : jauge remise à plein · +5 XP pour Bao"); },
        qtyText: isCount ? String(x.qty) : "", unitText: isCount ? x.unit + (x.qty > 1 ? "s" : "") : "",
        minus: function () { setStock(x.id, function (y) { return {qty: Math.max(0, y.qty - 1)}; }); },
        plus: function () { setStock(x.id, function (y) { return {qty: y.qty + 1}; }); },
        hasPack: !!x.pack, packLabel: x.packLabel || "",
        addPack: function () { setStock(x.id, function (y) { return {qty: y.qty + x.pack}; }); giveXp("bao", 5); self._toast(x.n + " : une boîte ajoutée · +5 XP pour Bao"); },
        minusLabel: "Retirer un " + (x.unit || "") + " de " + x.n, plusLabel: "Ajouter un " + (x.unit || "") + " à " + x.n,
        canAdd: !x.blue && low && !inList, inList: !x.blue && low && inList,
        add: function () { var id = self.state.nextId; self.setState({items: self.state.items.concat([{id: id, n: x.n, q: "", r: "Chats", by: "A", tag: "Stock bas"}]), nextId: id + 1}); self._toast(x.n + " ajouté aux courses"); },
        ed: ED("stock:" + x.id, x.n, function () { return isCount ? {n: x.n, qty: x.qty, perDay: x.perDay, low: x.low, pack: x.pack || ""} : {n: x.n, ago: x.ago, dur: x.dur, warn: x.warn, note: x.note || ""}; },
          {f: isCount ? [["n", "Nom", "text"], ["qty", "Stock actuel (" + x.unit + "s)", "number"], ["perDay", "Consommation par jour", "number"], ["low", "Alerte quand il en reste", "number"], ["pack", "Contenu d'une boîte (vide si pas de boîte)", "number"]]
            : [["n", "Nom", "text"], ["ago", "Jours depuis le dernier « " + x.act.toLowerCase() + " »", "number"], ["dur", "Durée d'un plein (jours)", "number"], ["warn", "Alerte à partir du jour", "number"], ["note", "Note", "text", "ex. tient 3,5 semaines à 1 mois"]]},
          function (d) { if (!String(d.n || "").trim()) return false;
            setStock(x.id, function (y) { if (isCount) { var pk = Math.round(num(d.pack, 0)), pd = Math.max(0.1, num(d.perDay, y.perDay)); return {n: cap(d.n), name: null, qty: Math.max(0, Math.round(num(d.qty, y.qty))), perDay: pd, low: Math.max(0, Math.round(num(d.low, y.low))), pack: pk > 0 ? pk : null, packLabel: pk > 0 ? "+ 1 boîte (" + pk + ")" : "", ref: Math.max(7, Math.round(30 * pd))}; }
              var du = Math.max(1, Math.round(num(d.dur, y.dur))); return {n: cap(d.n), name: null, ago: Math.max(0, Math.round(num(d.ago, y.ago))), dur: du, warn: Math.min(du, Math.max(1, Math.round(num(d.warn, y.warn)))), note: String(d.note || "").trim()}; }); })};
    });
    var kspots = [{x: 300, y: 623}, {x: 141, y: 503}, {x: 117, y: 125, sleep: true}];
    var kHere = here.slice().sort(function (a, b) { return (a === "bao" ? -1 : 0) - (b === "bao" ? -1 : 0); });
    out.potOn = out.inCuisine && (st.mealDemo || isMealTime(new Date()));
    out.potSrc = POT[st.bSel.kplaques === 0 ? "induction" : "gaz"][Math.floor(st.tick / 4) % 2];
    out.pMeal = st.mealDemo ? "true" : "false"; out.mealTrack = st.mealDemo ? "#4A7034" : "#C9C2B5"; out.mealKnob = st.mealDemo ? "24px" : "2px";
    out.toggleMeal = function () { self.setState({mealDemo: !self.state.mealDemo}); };
    out.kitchenCats = (out.inCuisine ? kHere : []).map(function (k, i) {
      var sp = kspots[sj3(i)], kfr = (sp.sleep && !out.potOn) || st.night ? ((st.tick + i * 5) % 20 < 10 ? "sleepA" : "sleepB") : (st.tick % 40 < 3 ? "blink" : "sit");
      return {x: sp.x + "px", y: sp.y + "px", src: "/_blob/" + IMG[k][kfr], k: k, aria: CATS[k].name + " est dans la cuisine", open: function () { self.open({type:"cat", key:k}); }};
    });

    out.inChambre = st.room === "chambre" && !out.roomLocked;
    out.cWin = CWIN[seasonKey] || CWIN.ete; out.cSeasOn = !!CSEAS[seasonKey]; out.cSeas = CSEAS[seasonKey] || "";
    out.openCFurn = function () { var a = Object.assign({}, self.state.accOpen); a.chambre = true; self.setState({accOpen: a, sheet: {type: "settings"}}); };
    var cHere = here.slice(), ev = st.bedEv;
    if (ev && ev.cat && cHere.indexOf(ev.cat) > 0) { cHere.splice(cHere.indexOf(ev.cat), 1); cHere.unshift(ev.cat); }
    var et = ev ? st.tick - ev.start : -1, bedCat = cHere[0];
    out.eyesOn = !!(out.inChambre && ev && bedCat && et >= 4 && et < 40);
    var shut = et % 12 < 2, dx = Math.floor(et / 14) % 2 * 8;
    out.eyeC = bedCat ? EYES[bedCat] : "#FFF"; out.eyeH = shut ? "2px" : "6px"; out.eyeY = shut ? "703px" : "700px";
    out.eyeL = (205 + dx) + "px"; out.eyeR = (223 + dx) + "px";
    var cj = function (i) { return ev ? i : sj3(i); };   // pendant le cache-cache, le chat du lit reste au lit
    var cspots = [{x: 177, y: 515, sleep: true}, {x: 300, y: 205}, {x: 15, y: 533}];
    out.chambreCats = (out.inChambre ? cHere : []).map(function (k, i) {
      var sp = cspots[cj(i)], fr = (sp.sleep || st.night) ? ((st.tick + i * 5) % 20 < 10 ? "sleepA" : "sleepB") : ((st.tick + i * 9) % 40 < 3 ? "blink" : "sit"), x = sp.x, y = sp.y, css = "calm", show = true;
      if (cj(i) === 0 && ev && et >= 0) {
        if (et < 40) show = false;
        else if (et < 56) { y = 707; fr = (st.tick % 30 < 3) ? "blink" : "sit"; }
        else if (et < 64) { y = 611; fr = "happy"; css = "hop"; }
      }
      return {show: show, x: x + "px", y: y + "px", css: css, src: "/_blob/" + IMG[k][fr], k: k, aria: CATS[k].name + (cj(i) === 0 ? " est sur le lit" : (cj(i) === 1 ? " est sur l'arbre à chat" : " est dans la penderie")), open: function () { self.open({type:"cat", key:k}); }};
    }).filter(function (c) { return c.show; });

    var evKey = st.eventShown && EVO[st.event] ? st.event : null;
    out.evOn = !!(evKey && st.screen === "salon" && !out.roomLocked && EVO[evKey][st.room]); out.evSrc = evKey ? EVO[evKey][st.room] : "";
    var gl = GRANDES.map(function (g) { return {d: g[0], n: g[1], c: g[2]}; });
    ORDER.forEach(function (k) { var a = st.catInfo[k].anniv; if (parseJM(a)) gl.push({d: a, n: "Anniversaire de " + CATS[k].name + " · fête au salon", c: CATS[k].color}); });
    var gkey = function (g) { var j = parseJM(g.d === "Pâques" ? "5 avril" : g.d); return j ? j.m * 40 + j.d : 999; };
    out.grOpen = !!st.grOpen; out.grExp = st.grOpen ? "true" : "false"; out.grChev = st.grOpen ? "▾" : "▸";
    out.toggleGrandes = function () { self.setState({grOpen: !self.state.grOpen}); };
    out.grandes = gl.sort(function (a, b) { return gkey(a) - gkey(b); });
    var hfSeen = function (id) { if (!st.hf[id]) self._hfq = id; };
    if (st.zoom && st.tick - st.zoom.start === 12) hfSeen("zoomies");
    if (out.eyesOn) hfSeen("cachecache");
    if (out.verandaAll) hfSeen("sieste3");
    // night & noel sky
    var vNight = out.inVeranda && (DARK || seasonKey === "noel");
    out.vNightOn = vNight; out.vTint = out.inVeranda && DARK && seasonKey !== "noel";
    out.vStars = vNight ? STARS.map(function (p, i) { return {x: p[0] + "px", y: p[1] + "px", d: (-(i * 0.37) % 1.8).toFixed(2) + "s", sz: (i % 3 === 0 ? 4 : 2) + "px"}; }) : [];
    out.vFire = out.inVeranda && DARK && (seasonKey === "ete" || seasonKey === "classique") ? [[80,380],[150,360],[230,392],[300,370],[350,400]].map(function (p, i) { return {x: p[0] + "px", y: p[1] + "px", d: (-i * 0.5).toFixed(1) + "s"}; }) : [];
    if (DARK && !(seasonKey === "noel")) { out.vBirds = []; }
    // santa & reindeer
    var noelV = out.inVeranda && seasonKey === "noel";
    var sp = ((st.tick - st.santaT0) % 300 + 300) % 300;
    out.santaOn = noelV && sp < 95; out.santaX = (-130 + sp * 6) + "px"; out.santaY = Math.round(70 + Math.sin(sp / 9) * 10) + "px"; out.santaSrc = SANTA;
    if (out.santaOn && sp > 20 && sp < 70) hfSeen("perenoel");
    var hallV = out.inVeranda && st.event === "halloween" && st.eventShown;
    var wp = ((st.tick - st.witchT0) % 520 + 520) % 520;
    out.witchOn = hallV && wp < 85; out.witchX = (400 - wp * 6) + "px"; out.witchY = Math.round(96 + Math.sin(wp / 7) * 14) + "px"; out.witchSrc = WITCH[Math.floor(wp / 3) % 2];
    if (out.witchOn && wp > 15 && wp < 60) hfSeen("sorciere");
    out.rennesOn = noelV;
    out.rennes = noelV ? [{x: "110px", y: "384px", src: RENNES[0][Math.floor((st.tick + 0) / 30) % 2]}, {x: "236px", y: "392px", src: RENNES[1][Math.floor((st.tick + 17) / 26) % 2]}] : [];
    // bird visit
    var be2 = st.birdEv, bt = be2 ? st.tick - be2.start : -1;
    var lerp2 = function (a, b, f) { return a + (b - a) * Math.max(0, Math.min(1, f)); };
    out.visitBirds = [];
    if (out.inVeranda && be2 && here.length && bt >= 0 && bt <= 72) {
      [[-40, 200, 130, 411, false], [430, 180, 250, 411, true]].forEach(function (b, i) {
        var x, y, flying = bt < 12 || bt >= 60;
        if (bt < 12) { x = lerp2(b[0], b[2], bt / 12); y = lerp2(b[1], b[3], bt / 12); }
        else if (bt < 60) { x = b[2] + (Math.floor((bt + i * 3) / 8) % 2) * 6 * (b[4] ? -1 : 1); y = b[3] - (((bt + i * 2) % 6) < 2 ? 4 : 0); }
        else { x = lerp2(b[2], b[4] ? 450 : -60, (bt - 60) / 12); y = lerp2(b[3], 40, (bt - 60) / 12); }
        out.visitBirds.push({x: Math.round(x) + "px", y: Math.round(y) + "px", src: VSPR.sparrow[flying ? Math.floor(st.tick / 2) % 2 : 0], flip: b[4] ? "scaleX(-1)" : "none"});
      });
      if (bt === 30) hfSeen("oiseaux");
      out.verandaCats = out.verandaCats.map(function (c, i) {
        var k = here[i], fr = null, css = "calm", dy = 0;
        if (bt >= 12 && bt < 24) fr = (bt + i) % 8 < 4 ? "sit" : "tailup";
        else if (bt >= 24 && bt < 60) { fr = ["chaseA", "chaseB", "chaseC"][Math.floor((bt + i * 2) / 3) % 3]; css = (bt + i * 3) % 10 < 5 ? "hop" : "calm"; dy = -16; }
        else if (bt >= 60) fr = "sit";
        if (!fr) return c;
        return Object.assign({}, c, {src: "/_blob/" + IMG[k][fr], css: css, y: (503 + dy) + "px"});
      });
    }
    // salle de bain
    out.inSdb = st.room === "sdb" && !out.roomLocked;
    out.sWin = SWIN[seasonKey] || SWIN.ete; out.sSeasOn = !!SSEAS[seasonKey]; out.sSeas = SSEAS[seasonKey] || "";
    out.openSFurn = function () { var a = Object.assign({}, self.state.accOpen); a.sdb = true; self.setState({accOpen: a, sheet: {type: "settings"}}); };
    var sspots = [{x: 21, y: 397, fr: ["sit", "blink"]}, {x: 267, y: 443, fr: ["groomA", "groomB"]}, {x: 177, y: 610, fr: ["sit", "tailup"]}];
    out.sdbCats = (out.inSdb ? here : []).map(function (k, i) {
      var sp2 = sspots[sj3(i)], fr = sp2.fr[Math.floor((st.tick + i * 7) / 5) % 2];
      if (sp2.fr[0] === "sit" && fr === "blink" && st.tick % 40 >= 3) fr = "sit";
      return {x: sp2.x + "px", y: sp2.y + "px", src: "/_blob/" + IMG[k][fr], k: k, aria: CATS[k].name + (sj3(i) === 0 ? " est dans le lavabo" : (sj3(i) === 1 ? " fait sa toilette sur la baignoire" : " est sur le tapis de bain")), open: function () { self.open({type:"cat", key:k}); }};
    });
    // room-specific settings
    out.roomIs = {salon: st.room === "salon", bureau: st.room === "bureau", cuisine: st.room === "cuisine", chambre: st.room === "chambre", sdb: st.room === "sdb", veranda: st.room === "veranda"};
    out.roomFurnTitle = "Meubles : " + R0.n.toLowerCase();
    out.roomLockedNote = out.roomLocked;
    // night toggle
    out.pNight = st.night ? "true" : "false"; out.nightTrack = st.night ? "#2E3E62" : "#C9C2B5"; out.nightKnob = st.night ? "24px" : "2px";
    out.toggleNight = function () { self.setState({night: !self.state.night}); };
    // music chip
    out.musicChip = st.musicOn && !st.sheet && !(st.screen === "salon" && st.room === "salon");
    out.musicChipLabel = (PLAYLISTS[trackKey(st)] || "Musique") + (MUSIC.key ? " · " + MUSIC.label() : "");
    // hauts faits
    out.hfCount = (HF.filter(function (h) { return !h.prog && st.hf[h.id]; }).length + HF_PROG.filter(function (h) { return REEL ? !!st.hf[h.id] : (h.id === "souris" ? st.mice : h.v) >= h.goal; }).length) + " / " + (HF.length - 1 + HF_PROG.length);
    var testHF = {
      zoomies: function () { self.setState({sheet: null, screen: "salon", room: "salon", zoom: {cat: "tsunky", start: self.state.tick}, zoomedOnce: true}); },
      cachecache: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "chambre", bedEv: {start: self.state.tick + 1, cat: "nahla"}, bedHold: {cat: "nahla", until: self.state.tick + 400}}); },
      oiseaux: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "veranda", vHold: self.state.tick + 500, birdEv: {start: self.state.tick + 5}}); },
      sieste3: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "veranda", vHold: self.state.tick + 300}); },
      perenoel: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "veranda", saison: "noel", santaT0: self.state.tick}); },
      sorciere: function () { self.setState({sheet: null, screen: "salon", demoUnlock: true, room: "veranda", event: "halloween", eventShown: true, witchT0: self.state.tick + 2}); }
    };
    out.hfList = HF.filter(function (h) { return !h.prog; }).map(function (h) {
      var ok = !!st.hf[h.id];
      return {name: ok ? h.n : "???", desc: ok ? h.d : "Animation rare à découvrir", state: ok ? "Débloqué ✓" : "Secret", fg: ok ? "#36532A" : "#5E5864", bg: ok ? "#E4EEDC" : "#FFFFFF", test: testHF[h.id], testLabel: "Voir l'animation " + h.n + " (démo)"};
    });

    // canard
    var dv = st.duckEv, dt = dv ? st.tick - dv.start : -1;
    out.duckHat = st.event === "noel" && st.eventShown;
    out.duckSrc = bSrc("scanard"); out.duckCss = (dv && dt >= 0 && dt < 20) ? "wobble" : "calm"; out.duckSay = !!(dv && dt >= 0 && dt < 18); out.duckText = dv && dv.auto ? "Plouf !" : "Couic !";
    out.squeak = function () { self.setState({duckEv: {start: self.state.tick + 1, auto: false}}); };
    if (out.inSdb && dv && dt >= 0 && dt < 22 && out.sdbCats.length) {
      var di = out.sdbCats.length > 1 ? 1 : 0, dk = here[di];
      out.sdbCats = out.sdbCats.map(function (c, i) { if (i !== di) return c; return Object.assign({}, c, {src: "/_blob/" + IMG[dk][["chaseA", "chaseB", "chaseC"][Math.floor(st.tick / 3) % 3]], css: dt % 8 < 4 ? "hop" : "calm"}); });
    }
    // souris cachée
    out.mouseOn = !!(st.mouse && st.mouse.room === st.room && st.screen === "salon" && !out.roomLocked);
    out.mouseX = st.mouse ? st.mouse.x + "px" : "0"; out.mouseY = st.mouse ? st.mouse.y + "px" : "0"; out.mouseSrc = SOURIS;
    out.findMouse = function () { var n = self.state.mice + 1; self.setState({mouse: null, mice: n}); self._toast("Souris en peluche trouvée ! (" + n + "/5) · +10 XP"); if (n === 5) self._hfq = "souris"; };
    // santé
    out.openSante = function () { self.setState({sheet: {type: "sante"}}); };
    out.isSante = !!(sh && sh.type === "sante"); if (out.isSante) { out.sheetTitle = "Santé des chats"; out.sheetColor = "#3E6FB0"; }
    var SC = st.sante[st.santeCat];
    out.santeCats = ORDER.map(function (k) { var on = st.santeCat === k; return {label: CATS[k].name, pressed: on ? "true" : "false", bg: on ? CATS[k].color : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({santeCat: k}); }}; });
    var dfmt = function (iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; };
    out.soins = SOINS.map(function (so) {
      var last = SC.soins[so.id] || TODAY_ISO, unk = !SC.soins[so.id], d = Math.round((TODAY - Date.UTC(+last.slice(0, 4), +last.slice(5, 7) - 1, +last.slice(8, 10))) / 864e5), left = so.every - d;
      var col = left > so.every * 0.25 ? "#4A7034" : (left > 0 ? "#D9762B" : "#B23A48");
      var ck = st.santeCat;
      return {ed: ED("soin:" + ck + ":" + so.id, so.n, function () { return {d: unk ? "" : last}; }, {f: [["d", "Date du dernier " + so.n.toLowerCase(), "date"]]},
          function (d) { if (!/^\d{4}-\d{2}-\d{2}$/.test(d.d || "")) return false; var sa = JSON.parse(JSON.stringify(self.state.sante)); sa[ck].soins[so.id] = d.d; self.setState({sante: sa}); }),
        name: so.n, last: unk ? "Pas encore noté" : "Dernier : " + dfmt(last), next: unk ? "Date à noter (crayon)" : left > 0 ? "Prochain dans " + left + " j" : (left === 0 ? "À faire aujourd'hui" : "En retard de " + (-left) + " j"), col: unk ? "#8A8490" : col, pct: unk ? "0%" : Math.max(4, Math.min(100, Math.round(left * 100 / so.every))) + "%",
        done: function () { var sa = JSON.parse(JSON.stringify(self.state.sante)); sa[self.state.santeCat].soins[so.id] = TODAY_ISO; self.setState({sante: sa}); giveXp("tsunky", 10); self._toast(so.n + " noté pour " + CATS[self.state.santeCat].name + " · +10 XP pour Tsunky"); }};
    });
    var pw = SC.poids.length ? SC.poids : [0], pmax = Math.max.apply(null, pw), pmin = Math.min.apply(null, pw) - 0.3;
    out.hasPoids = SC.poids.length > 1;
    out.poidsNow = SC.poids.length ? String(pw[pw.length - 1]).replace(".", ",") + " kg" : "Pas encore de pesée";
    (function () { var ck = st.santeCat; out.poidsEd = ED("poids:" + ck, "les pesées", function () { return {p: self.state.sante[ck].poids.map(function (v) { return String(v).replace(".", ","); }).join("  ")}; },
      {f: [["p", "Pesées en kg, de la plus ancienne à la plus récente", "text", "ex. 4,0  4,1  4,1"]]},
      function (d) { var v = String(d.p || "").split(/[\s;\/]+/).map(function (x) { return num(x, NaN); }).filter(function (x) { return x > 0 && x < 20; }); if (!v.length) return false; var sa = JSON.parse(JSON.stringify(self.state.sante)); sa[ck].poids = v.slice(-8); self.setState({sante: sa}); }); })();
    out.poidsTrend = pw[pw.length - 1] > pw[pw.length - 2] ? "en hausse" : (pw[pw.length - 1] < pw[pw.length - 2] ? "en baisse" : "stable");
    out.poidsBars = (SC.poids.length ? pw : []).map(function (v, i) { return {h: Math.round(10 + (v - pmin) / (pmax - pmin || 1) * 34) + "px", c: i === pw.length - 1 ? CATS[st.santeCat].color : "#C9C2B5"}; });
    var catRdvs = function (k) { return st.missions.filter(function (m) { return m.type === "rdv" && !m.done && m.cats && m.cats.indexOf(k) >= 0; }).sort(function (a, b) { return (a.date + a.time) < (b.date + b.time) ? -1 : 1; }); };
    var sr = catRdvs(st.santeCat)[0];
    out.santeRdv = sr ? fmtD(parseD(sr.date)) + (sr.time ? " à " + sr.time.replace(":", "h") : "") + " · " + sr.t : "aucun pour l'instant";
    out.santeAddRdv = function () { var k = self.state.santeCat; self.setState({sheet: null, screen: "missions", missType: "rdv", missCats: [k], missDraft: "Vétérinaire : " + CATS[k].name + " "}); }; out.poidsDraft = st.poidsDraft;
    out.onPoids = function (e) { self.setState({poidsDraft: e.target.value}); };
    out.addPoids = function () { var v = parseFloat(String(self.state.poidsDraft).replace(",", ".")); if (!v) return; var sa = JSON.parse(JSON.stringify(self.state.sante)); sa[self.state.santeCat].poids = sa[self.state.santeCat].poids.slice(-4).concat([v]); self.setState({sante: sa, poidsDraft: ""}); };
    // planning des repas
    out.openRepas = function () { self.setState({sheet: {type: "repas"}, mealPick: null}); };
    out.isRepas = !!(sh && sh.type === "repas"); if (out.isRepas) { out.sheetTitle = "Repas de la semaine"; out.sheetColor = "#9A5B12"; }
    out.mealDays = MEAL_DAYS.map(function (d, i) {
      var r = st.meals[i], open = st.mealPick === i;
      return {day: d, meal: r ? st.recipes[r].n : "Rien de prévu", fg: r ? "#2B2A30" : "#8A8490", isOpen: open, exp: open ? "true" : "false",
        toggle: function () { self.setState({mealPick: self.state.mealPick === i ? null : i}); },
        choices: Object.keys(st.recipes).concat(["none"]).map(function (rk) { var on = (r || "none") === rk; return {label: rk === "none" ? "Rien" : st.recipes[rk].n, bg: on ? "#9A5B12" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pressed: on ? "true" : "false", pick: function () { var m = Object.assign({}, self.state.meals); if (rk === "none") delete m[i]; else m[i] = rk; self.setState({meals: m, mealPick: null}); setTimeout(function () { self._mealsCheck(); }, 0); }}; })};
    });
    var RAY_OPTS = RAYONS.join(", ");
    out.recList = Object.keys(st.recipes).map(function (rk) { var R = st.recipes[rk];
      return Object.assign({n: R.n, meta: R.ing.length ? R.ing.length + " ingrédient" + (R.ing.length > 1 ? "s" : "") + " · " + R.ing.map(function (g) { return g[0]; }).slice(0, 3).join(", ") + (R.ing.length > 3 ? "…" : "") : "Pas d'ingrédients"},
        ED("rec:" + rk, R.n, function () { return {n: R.n, ing: R.ing.map(function (g) { return [g[0], g[1], g[2]].filter(function (x, j) { return j === 0 || x; }).join(" ; "); }).join("\n")}; },
          {f: [["n", "Nom de la recette", "text"], ["ing", "Ingrédients pour 4, un par ligne : nom ; quantité ; rayon (" + RAY_OPTS + ")", "area", "Pommes de terre ; 1 kg ; Fruits & légumes"]]},
          function (d) { if (!String(d.n || "").trim()) return false;
            var ing = String(d.ing || "").split("\n").map(function (l) { var a = l.split(";").map(function (x) { return x.trim(); }); if (!a[0]) return null; var ray = RAYONS.filter(function (r) { return a[2] && r.toLowerCase().indexOf(a[2].toLowerCase().slice(0, 4)) === 0; })[0] || guessRayon(a[0]); return [cap(a[0]), a[1] || "", ray]; }).filter(Boolean);
            var rr = Object.assign({}, self.state.recipes); rr[rk] = {n: cap(d.n), ing: ing}; self.setState({recipes: rr}); },
          function () { var rr = Object.assign({}, self.state.recipes); delete rr[rk]; var m = Object.assign({}, self.state.meals); Object.keys(m).forEach(function (i) { if (m[i] === rk) delete m[i]; }); self.setState({recipes: rr, meals: m}); }));
    });
    out.recCount = out.recList.length + " recette" + (out.recList.length > 1 ? "s" : "");
    out.recDraft = st.recDraft; out.onRecDraft = function (e) { self.setState({recDraft: e.target.value}); };
    out.addRec = function () { var t = (self.state.recDraft || "").trim(); if (!t) return; var id = "r" + self.state.nextRec, rr = Object.assign({}, self.state.recipes); rr[id] = {n: cap(t), ing: []};
      self.setState({recipes: rr, nextRec: self.state.nextRec + 1, recDraft: "", ed: "rec:" + id, edD: {n: cap(t), ing: ""}}); };
    out.mealWeekTxt = REEL ? "Semaine du " + MEAL_MON.getDate() + " " + MOIS_L[MEAL_MON.getMonth()] + "." : "Semaine du 16 novembre.";
    self._mealsCheck = function () {
      var ms = self.state.meals, full = [0, 1, 2, 3, 4, 5, 6].every(function (i) { return ms[i] != null; }), S = STATS0();
      if (full && S.mealsWeek !== MEAL_ISO[0]) { giveXp("bao", 5); S = STATS0(); S.mealsWeek = MEAL_ISO[0]; self.setState({stats: S}); self._toast("Planning de la semaine rempli · +5 XP pour Bao"); }
    };
    out.mealsToCourses = function () {
      var items = self.state.items.slice(), id = self.state.nextId, n = 0;
      Object.keys(self.state.meals).forEach(function (i) { (self.state.recipes[self.state.meals[i]] || {ing: []}).ing.forEach(function (g) {
        if (items.some(function (it) { return !it.done && it.n.toLowerCase() === g[0].toLowerCase(); })) return;
        items.push({id: id++, n: g[0], q: g[1], r: g[2], by: ME, tag: "Repas"}); n++;
      }); });
      self.setState({items: items, nextId: id}); self._toast(n ? n + " ingrédients ajoutés à la liste de courses" : "Tout est déjà dans la liste");
    };
    out.mealsPropose = function () { self._notify("soiree", OTHER, NAME[ME] + " propose le planning des repas de la semaine : à valider ou changer dans la cuisine."); self._toast("Planning proposé à " + NAME[OTHER] + " · " + (OTHER === "E" ? "elle" : "il") + " peut valider ou changer un repas"); };
    // vacances
    out.vacOn = st.vacances; out.pVac = st.vacances ? "true" : "false"; out.vacTrack = st.vacances ? "#3E6FB0" : "#C9C2B5"; out.vacKnob = st.vacances ? "24px" : "2px";
    GMAIL_SHARED.addr = (st.gmailAddr || "").trim(); out.gmailAddr = st.gmailAddr; out.onGmailAddr = function (e) { self.setState({gmailAddr: e.target.value}); };
    SFX.on = st.sfxOn; SFX.vol = SFX_VOLS[st.sfxVol].v; SFX.mute = st.sfxNight && st.night;
    out.pSfx = st.sfxOn ? "true" : "false"; out.sfxTrack = st.sfxOn ? "#4A7034" : "#C9C2B5"; out.sfxKnob = st.sfxOn ? "24px" : "2px";
    out.toggleSfx = function () { self.setState({sfxOn: !self.state.sfxOn}); };
    out.pSfxNight = st.sfxNight ? "true" : "false"; out.sfxNTrack = st.sfxNight ? "#4A7034" : "#C9C2B5"; out.sfxNKnob = st.sfxNight ? "24px" : "2px";
    out.toggleSfxNight = function () { self.setState({sfxNight: !self.state.sfxNight}); };
    out.sfxVolBtns = SFX_VOLS.map(function (v) { var on = st.sfxVol === v.id; return {label: v.l, pressed: on ? "true" : "false", bg: on ? "#4A7034" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({sfxVol: v.id}); SFX.vol = v.v; SFX.play("ding"); }}; });
    out.sfxTests = SFX_LIST.map(function (x) { return {label: x.l, aria: "Écouter : " + x.l, play: function () { var m = SFX.mute, o = SFX.on; SFX.mute = false; SFX.on = true; SFX.play(x.id, 2.4); SFX.mute = m; SFX.on = o; }}; });
    out.sfxNote = st.sfxOn ? "" : "Bruitages coupés : les boutons d'écoute marchent quand même.";
    out.toggleVac = function () { self.setState({vacances: !self.state.vacances}); };
    out.vacBanner = st.vacances && st.screen === "salon";
    out.openGarde = function () { self.setState({sheet: {type: "garde"}}); };
    out.isGarde = !!(sh && sh.type === "garde"); if (out.isGarde) { out.sheetTitle = "Fiche garde des chats"; out.sheetColor = "#3E6FB0"; }
    var veto = st.contacts.filter(function (c) { return c.id === "k5"; })[0];
    var gl = st.garde.map(function (g) { return g.t; });
    out.gardeLines = st.garde.map(function (g) { return Object.assign({t: g.t}, ED("garde:" + g.id, "cette consigne", function () { return {t: g.t}; }, {f: [["t", "Consigne", "area"]]},
      function (d) { if (!String(d.t || "").trim()) return false; self.setState({garde: self.state.garde.map(function (x) { return x.id === g.id ? {id: g.id, t: cap(d.t)} : x; })}); },
      function () { self.setState({garde: self.state.garde.filter(function (x) { return x.id !== g.id; })}); })); });
    out.gardeDraft = st.gardeDraft; out.onGardeDraft = function (e) { self.setState({gardeDraft: e.target.value}); };
    out.addGarde = function () { var t = (self.state.gardeDraft || "").trim(); if (!t) return; self.setState({garde: self.state.garde.concat([{id: "g" + self.state.nextGarde, t: cap(t)}]), nextGarde: self.state.nextGarde + 1, gardeDraft: ""}); };
    out.gardeMail = gmailUrl("", "Garde des chats", gl.join("\n")); out.gardeMailTarget = isIOS() ? "_self" : "_blank";
    // défis
    var DEFI_RW = [{xp: 150, item: "coussin"}, {xp: 80, item: "cabas"}];
    var defiV = function (d, i) { if (!REEL) return d.two ? {c: d.c, e: d.e, v: Math.min(d.c, d.e)} : {v: d.v}; if (i === 0) return {c: S0.tasks.C || 0, e: S0.tasks.E || 0, v: Math.min(S0.tasks.C || 0, S0.tasks.E || 0)}; return {v: S0.magasin ? 1 : 0}; };
    if (REEL && !self._defiBusy) DEFIS.forEach(function (d, i) { if (defiV(d, i).v >= d.goal && !S0.defisDone[i]) {
      self._defiBusy = true;
      setTimeout(function () { var S = STATS0(); if (S.defisDone[i]) { self._defiBusy = false; return; } S.defisDone[i] = true; S.owned[DEFI_RW[i].item] = true; self.setState({stats: S}); spreadXp(DEFI_RW[i].xp, 1); self._log("hf", "Défi réussi : " + d.n, d.rw); self._toast("Défi réussi : " + d.n + " · " + d.rw); self._defiBusy = false; }, 0);
    } });
    out.defis = DEFIS.map(function (d, i) {
      var dv = defiV(d, i), v = dv.v; d = Object.assign({}, d, dv);
      return {name: d.n + (REEL && S0.defisDone[i] ? " ✓" : ""), rw: d.rw, prog: d.two ? "Co " + d.c + "/" + d.goal + " · Emie " + d.e + "/" + d.goal : v + " / " + d.goal, pct: Math.round(v * 100 / d.goal) + "%"};
    });
    // hauts faits de progression
    var soirRun = (function () { var w = S0.soirWeeks.slice().sort(), best = 0, run = 0, prev = null; w.forEach(function (x) { run = prev && isoDiff(prev, x) === 7 ? run + 1 : 1; best = Math.max(best, run); prev = x; }); return best; })();
    var progV = function (h) { return h.id === "souris" ? st.mice : h.id === "cent" ? S0.total : h.id === "japonais" ? st.projets.reduce(function (a, p) { return Math.max(a, p.streak || 0); }, 0) : h.id === "soirees" ? soirRun : (REEL ? 0 : h.v); };
    HF_PROG.forEach(function (h) { if (REEL && progV(h) >= h.goal && !st.hf[h.id] && !self._hfq) self._hfq = h.id; });
    out.hfProg = HF_PROG.map(function (h) {
      var v = progV(h), ok = v >= h.goal;
      return {name: h.n, desc: h.d, prog: Math.min(v, h.goal) + " / " + h.goal, pct: Math.round(Math.min(v, h.goal) * 100 / h.goal) + "%", state: ok ? "Débloqué ✓" : "En cours", fg: ok ? "#36532A" : "#5E5864", bg: ok ? "#E4EEDC" : "#FFFFFF"};
    });
    out.spawnMouse = function () { var sps = MOUSE_SPOTS[self.state.room] || MOUSE_SPOTS.salon, spp = sps[0]; self.setState({sheet: null, screen: "salon", mouse: {room: self.state.room, x: spp[0], y: spp[1], until: self.state.tick + 400}}); };
    // météo
    out.weathers = WEATHER.map(function (w) { var on = st.meteo === w.id; return {label: w.l, pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#F7F3EE" : "#2B2A30", pick: function () { self.setState({meteo: w.id}); }}; });
    out.meteoNote = st.meteo === "auto" ? (REEL ? (st.meteoReel ? "Auto : à Bron, " + st.meteoReel.txt + " (" + st.meteoReel.t + " °C), mis à jour à " + st.meteoReel.h + "." : "Auto : météo de Bron en cours de chargement.") : "Auto : météo réelle de Bron (ex. 6 °C, nuageux). Démo : la saison décide.") : REEL ? "Météo forcée sur les fenêtres et la véranda" : "Démo : météo forcée sur les fenêtres et la véranda";
    out.nightTint = st.night && st.screen === "salon";
    if (st.vacances) { out.stockList = out.stockList.map(function (x) { return Object.assign({}, x, {state: "En pause", info: "Mode vacances : la jauge ne descend plus", canAdd: false}); }); }
    if (evKey) { out.bSeasOn = false; out.kSeasOn = false; out.cSeasOn = false; out.sSeasOn = false; }
    out.candleLit2 = !st.candleOff; out.candleSmoke = st.candleOff && st.tick - st.candleBlow < 18;
    out.candleLabel = st.candleOff ? "Bougie : la rallumer" : "Bougie : la souffler";
    out.toggleCandle = function () { var off = !self.state.candleOff; self.setState({candleOff: off, candleBlow: self.state.tick}); };
    out.openWardrobe = function () { self.setState({sheet: {type: "ward"}}); };
    out.isWard = !!(sh && sh.type === "ward"); if (out.isWard) { out.sheetTitle = "Garde-robe"; out.sheetColor = "#8A4F9E"; }
    out.wardTabs = ["C", "E"].map(function (w) { var on = st.wardWho === w, n = st.ward.filter(function (x) { return x.who === w && !x.done; }).length; return {label: NAME[w] + " · " + n + " à acheter", pressed: on ? "true" : "false", bg: on ? WHO[w].bg : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({wardWho: w}); }}; });
    var wl = st.ward.filter(function (x) { return x.who === st.wardWho; });
    var prioOrd = {urgent: 0, bientot: 1, unjour: 2};
    wl = wl.filter(function (x) { return !x.done; }).sort(function (a, b) { return prioOrd[a.prio] - prioOrd[b.prio]; }).concat(wl.filter(function (x) { return x.done; }));
    out.wardList = wl.map(function (x) {
      var P = WPRIO[x.prio];
      return {n: x.n, meta: x.cat + " · " + P.l, pc: x.done ? "#8A8490" : P.c, on: x.done ? "true" : "false", box: x.done ? "#4A7034" : "#FFFFFF", tick: x.done ? "✓" : "", deco: x.done ? "line-through" : "none", fg: x.done ? "#8A8490" : "#2B2A30",
        toggle: function () { self.setState({ward: self.state.ward.map(function (y) { return y.id === x.id ? Object.assign({}, y, {done: !y.done}) : y; })}); if (!x.done) self._toast(x.n + " : acheté ✓"); },
        remove: function () { self.setState({ward: self.state.ward.filter(function (y) { return y.id !== x.id; })}); }, delLabel: "Retirer " + x.n,
        ed: ED("ward:" + x.id, x.n, function () { return {n: x.n, cat: x.cat, prio: x.prio, who: x.who}; },
          {f: [["n", "Besoin", "text"]], g: [["cat", "Catégorie", WCATS.map(function (c) { return [c, c]; })], ["prio", "Priorité", Object.keys(WPRIO).map(function (k) { return [k, WPRIO[k].l, WPRIO[k].c]; })], ["who", "Pour", WHO_OPTS]]},
          function (d) { if (!String(d.n || "").trim()) return false; self.setState({ward: self.state.ward.map(function (y) { return y.id === x.id ? Object.assign({}, y, {n: cap(d.n), cat: d.cat, prio: d.prio, who: d.who}) : y; })}); })};
    });
    out.wardEmpty = !wl.length;
    out.wardDraft = st.wardDraft; out.onWardDraft = function (e) { self.setState({wardDraft: e.target.value}); };
    out.wardCats = WCATS.map(function (c) { var on = st.wardCat === c; return {label: c, pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#F7F3EE" : "#2B2A30", pick: function () { self.setState({wardCat: c}); }}; });
    out.wardPrios = Object.keys(WPRIO).map(function (k) { var on = st.wardPrio === k; return {label: WPRIO[k].l, pressed: on ? "true" : "false", bg: on ? WPRIO[k].c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({wardPrio: k}); }}; });
    out.addWard = function () { var t = (self.state.wardDraft || "").trim(); if (!t) return; self.setState({ward: self.state.ward.concat([{id: "w" + self.state.nextWard, who: self.state.wardWho, n: t.charAt(0).toUpperCase() + t.slice(1), cat: self.state.wardCat, prio: self.state.wardPrio, done: false}]), nextWard: self.state.nextWard + 1, wardDraft: ""}); };
    var SZ = st.sizes[st.wardWho];
    out.sizeFields = [["haut", "Taille haut"], ["bas", "Taille bas"], ["pointure", "Pointure"]].map(function (f) { return {id: "sz-" + f[0], label: f[1], val: SZ[f[0]], ph: "—", on: function (e) { var z = JSON.parse(JSON.stringify(self.state.sizes)); z[self.state.wardWho][f[0]] = e.target.value; self.setState({sizes: z}); }}; });
    out.wardWhoName = NAME[st.wardWho];
    var wkind = MTO === "pluie" ? "rain" : (MTO === "neige" ? "snow" : (MTO === "soleil" ? null : (MTO === "nuageux" ? ({automne: "leaf", printemps: "petal"})[seasonKey] || null : ({hiver: "snow", noel: "snow", automne: "leaf", printemps: "petal"})[seasonKey] || null)));
    var paneList = (st.screen === "salon" && !out.roomLocked && NIGHT_PANES[st.room]) ? NIGHT_PANES[st.room] : [];
    if (st.room === "salon" && !DARK) paneList = [];
    out.nightPanes = paneList.map(function (q, i) {
      var low = q[4] === "bas", st2 = []; if (DARK && !low) for (var j = 0; j < 4; j++) st2.push({x: Math.round(4 + rnd(i * 10 + j + (st.room.length * 7)) * (q[2] - 10)) + "px", y: Math.round(4 + rnd(i * 10 + j + 40 + st.room.length) * (q[3] - 12)) + "px", d: (-(j * 0.45 + i * 0.3)).toFixed(2) + "s", sz: (j % 2 ? 2 : 3) + "px", c: "#FFF3B0", cls: "twinkle"});
      // bas des fenêtres la nuit : paysage sombre avec l'horizon et quelques fenêtres éclairées au loin
      if (DARK && low) for (var j2 = 0; j2 < 2; j2++) st2.push({x: Math.round(3 + rnd(i * 17 + j2 + 500 + st.room.length) * (q[2] - 8)) + "px", y: Math.round(q[3] * 0.42 + rnd(i * 17 + j2 + 560) * q[3] * 0.4) + "px", d: "0s", sz: "3px", c: "#F2C14E", cls: ""});
      var parts = [];
      if (wkind && (st.room !== "salon" || DARK)) {
        var n = Math.max(3, Math.round(q[2] / (wkind === "rain" ? 5 : 9)));
        for (var k2 = 0; k2 < n; k2++) {
          var r1 = rnd(i * 31 + k2 + 300), r2 = rnd(i * 31 + k2 + 350), r3 = rnd(i * 31 + k2 + 390);
          var cfg = wkind === "rain" ? {cls: "wrain", w: "2px", h: "8px", c: "rgba(225,235,245,0.85)", dur: (0.5 + r2 * 0.3).toFixed(2)} :
            wkind === "snow" ? {cls: "wsnow", w: "4px", h: "4px", c: "#FFFFFF", dur: (5 + r2 * 3).toFixed(1)} :
            wkind === "leaf" ? {cls: "wleaf", w: "5px", h: "4px", c: ["#D9762B", "#B23A48", "#E0A53A"][k2 % 3], dur: (5 + r2 * 3).toFixed(1)} :
            {cls: "wpetal", w: "4px", h: "3px", c: k2 % 2 ? "#F4B6C8" : "#FFFFFF", dur: (5 + r2 * 3).toFixed(1)};
          parts.push({cls: cfg.cls, x: Math.round(r1 * (q[2] - 4)) + "px", w: cfg.w, h: cfg.h, c: cfg.c, dur: cfg.dur + "s", delay: (-r3 * 6).toFixed(2) + "s"});
        }
      }
      var fws = [];
      if (DARK && !low && st.event === "nouvelan" && st.eventShown) for (var f3 = 0; f3 < 2; f3++) {
        var fc3 = ["#F2C14E", "#F6C1C7", "#9DC9EA", "#CDE8C1", "#FFFFFF"][(i + f3 * 2) % 5], u = 3;
        var pts3 = [[0, -2], [1.4, -1.4], [2, 0], [1.4, 1.4], [0, 2], [-1.4, 1.4], [-2, 0], [-1.4, -1.4]].map(function (p) { return Math.round(p[0] * u) + "px " + Math.round(p[1] * u) + "px 0 1px " + fc3; }).join(", ");
        fws.push({x: Math.round(8 + rnd(i * 23 + f3 + 900) * (q[2] - 16)) + "px", y: Math.round(8 + rnd(i * 23 + f3 + 950) * (q[3] * 0.6)) + "px", sh: pts3, d: (-(i * 0.7 + f3 * 1.1)).toFixed(2) + "s"});
      }
      return {fw: fws, x: q[0] + "px", y: q[1] + "px", w: q[2] + "px", h: q[3] + "px", bg: DARK ? (low ? "linear-gradient(#24305C 0%, #2A3664 30%, #1B2242 30%, #121730 100%)" : "linear-gradient(#141C40, #24305C)") : "transparent", stars: st2, moon: DARK && !low && i === paneList.filter(function (z) { return z[4] !== "bas"; }).length - 1, parts: parts};
    }).filter(function (q) { return DARK || q.parts.length; });
    out.openFfC = function () { self.setState({sheet: {type: "ffxiv"}, ffWho: "C"}); };
    out.openFfE = function () { self.setState({sheet: {type: "ffxiv"}, ffWho: "E"}); };
    out.isFf = !!(sh && sh.type === "ffxiv"); if (out.isFf) { out.sheetTitle = "To-do FFXIV"; out.sheetColor = "#2E4A7A"; }
    out.ffTabs = ["C", "E"].map(function (w) { var on = st.ffWho === w; return {label: "PC " + deN(w), pressed: on ? "true" : "false", bg: on ? WHO[w].bg : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({ffWho: w}); }}; });
    var setFf = function (fn) { var f = JSON.parse(JSON.stringify(self.state.ff)); fn(f[self.state.ffWho]); self.setState({ff: f}); };
    out.ffSecs = FF_SECS.map(function (sc3) {
      var items = st.ff[st.ffWho].filter(function (x) { return x.sec === sc3.id; });
      return {label: sc3.l, note: sc3.note, empty: !items.length, count: items.filter(function (x) { return x.d; }).length + " / " + items.length,
        items: items.map(function (x) { return {t: x.t, on: x.d ? "true" : "false", box: x.d ? "#2E4A7A" : "#FFFFFF", tick: x.d ? "✓" : "", deco: x.d ? "line-through" : "none", fg: x.d ? "#8A8490" : "#2B2A30", hasLink: !!x.link, link: x.link || "", linkLabel: "Ouvrir le lien pour " + x.t,
          toggle: function () { if (!x.d) self._textTitles("ff", x.t, self.state.ffWho); setFf(function (L) { L.forEach(function (y) { if (y.id === x.id) y.d = !y.d; }); }); },
          remove: function () { setFf(function (L) { var i2 = L.map(function (y) { return y.id; }).indexOf(x.id); L.splice(i2, 1); }); }, delLabel: "Supprimer " + x.t,
          editing: st.ffEdit === x.id, notEditing: st.ffEdit !== x.id, editLabel: "Modifier " + x.t,
          edit: function () { self.setState({ffEdit: x.id, ffEditT: x.t, ffEditL: x.link || ""}); },
          editT: st.ffEditT, editL: st.ffEditL,
          onEditT: function (e) { self.setState({ffEditT: e.target.value}); }, onEditL: function (e) { self.setState({ffEditL: e.target.value}); },
          save: function () { var t = (self.state.ffEditT || "").trim(); if (!t) return; var l = (self.state.ffEditL || "").trim(); if (l && !/^https?:\/\//.test(l)) l = "https://" + l; setFf(function (L) { L.forEach(function (y) { if (y.id === x.id) { y.t = t; y.link = l; } }); }); self.setState({ffEdit: null}); },
          cancel: function () { self.setState({ffEdit: null}); }}; })};
    });
    out.ffSecBtns = FF_SECS.map(function (sc3) { var on = st.ffSec === sc3.id; return {label: sc3.l, pressed: on ? "true" : "false", bg: on ? "#2E4A7A" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({ffSec: sc3.id}); }}; });
    out.ffDraft = st.ffDraft; out.onFfDraft = function (e) { self.setState({ffDraft: e.target.value}); };
    out.ffLink = st.ffLink; out.onFfLink = function (e) { self.setState({ffLink: e.target.value}); };
    out.addFf = function () { var t = (self.state.ffDraft || "").trim(); if (!t) return; var l = (self.state.ffLink || "").trim(); if (l && !/^https?:\/\//.test(l)) l = "https://" + l; var id = "f" + self.state.nextFf; setFf(function (L) { L.push({id: id, sec: self.state.ffSec, t: t.charAt(0).toUpperCase() + t.slice(1), d: false, link: l}); }); self.setState({ffDraft: "", ffLink: "", nextFf: self.state.nextFf + 1}); };
    out.ffReset = function () { setFf(function (L) { L.forEach(function (y) { if (y.sec === "jour") y.d = false; }); }); };
    out.ffLinks = (st.ffWho === "C" ? FF_LINKS.slice(0, 1).concat([["Fiches persos de Nono", "https://nonomisu.github.io/fiches-rp/"]], FF_LINKS.slice(1)) : FF_LINKS).map(function (l) { return {label: l[0], href: l[1]}; });
    var interact = function (list) { return (list || []).map(function (c) {
      var k = c.k, o = Object.assign({css: c.css || "calm"}, c);
      if (st.purr && st.purr.cat === k && st.tick < st.purr.until) { o.src = "/_blob/" + IMG[k][st.tick % 8 < 4 ? "happy" : "happyT"]; o.css = "calm"; }
      else if (st.play && st.play.cat === k && st.tick < st.play.until) { o.src = "/_blob/" + IMG[k][["chaseA", "chaseB", "chaseC"][Math.floor(st.tick / 3) % 3]]; o.css = st.tick % 8 < 4 ? "hop" : "calm"; }
      return o; }); };
    out.bureauCats = interact(out.bureauCats); out.kitchenCats = interact(out.kitchenCats); out.chambreCats = interact(out.chambreCats); out.sdbCats = interact(out.sdbCats); out.verandaCats = interact(out.verandaCats);
    out.demoAnims = st.demoUnlock && !REEL; out.demoAnimsTest = st.demoUnlock && !REEL;
    self._log = function (kind, text, sub, extra) { var n = self.state.nextJ; self.setState({journal: [Object.assign({id: "j" + n, ts: Date.now(), kind: kind, text: text, sub: sub || ""}, extra || {})].concat(self.state.journal).slice(0, 200), nextJ: n + 1}); };
    if (self._jSeenPending && st.sheet && st.sheet.type === "journal") { self._jSeenPending = false; var seenAt = st.journalSeen; setTimeout(function () { self.setState({journalSeen: Date.now(), journalSeenShown: seenAt}); }, 0); }
    var seenRef = (st.sheet && st.sheet.type === "journal" && st.journalSeenShown != null) ? st.journalSeenShown : st.journalSeen;
    var newCount = st.journal.filter(function (e) { return e.ts > st.journalSeen; }).length;
    out.journalNew = newCount > 0; out.journalNewCount = newCount > 9 ? "9+" : String(newCount);
    out.journalLabel = "Niveau " + FOYER_LVL + " du foyer : voir les succès récents" + (newCount ? " (" + newCount + " nouveau" + (newCount > 1 ? "x" : "") + ")" : "");
    out.journalFilters = [["tout", "Tout"], ["hf", "Hauts faits"], ["titre", "Titres"], ["niveaux", "Niveaux"]].map(function (f) { var on = st.jFilter === f[0]; return {label: f[1], pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({jFilter: f[0]}); }}; });
    var jl = st.journal.filter(function (e) { return st.jFilter === "tout" || e.kind === st.jFilter || (st.jFilter === "niveaux" && (e.kind === "chat" || e.kind === "foyer")); });
    var dayOf = function (ts) { var d = new Date(ts), t0 = new Date(); var a = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()), b = Date.UTC(t0.getFullYear(), t0.getMonth(), t0.getDate()); var n = Math.round((b - a) / 864e5); return n === 0 ? "Aujourd'hui" : n === 1 ? "Hier" : d.getDate() + " " + MOIS_L[d.getMonth()]; };
    var groups = [];
    jl.forEach(function (e) { var k = dayOf(e.ts), g = groups[groups.length - 1]; var K = JKINDS[e.kind], d = new Date(e.ts);
      var locked = REEL && e.kind === "hf" && e.hfId && e.who && e.who !== ME && !st.hf[e.hfId];
      if (locked) K = {l: "Haut fait verrouillé", icon: "🔒", bg: "#ECE6DD", ibg: "#C9C2B5", fg: "#5E5864"};
      var item = {kind: K.l, icon: K.icon, bg: K.bg, iconBg: K.ibg, kindFg: K.fg, text: locked ? "Haut fait secret" : e.text, sub: locked ? NAME[e.who] + " l'a débloqué · à toi de le trouver !" : e.sub, isNew: e.ts > seenRef, time: ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)};
      if (!g || g.day !== k) groups.push({day: k, items: [item]}); else g.items.push(item); });
    out.journalDays = groups; out.journalEmpty = !jl.length;
    self._bumpTitle = function (id, w) {
      var cat = TITLE_CATS.filter(function (c) { return c.id === id; })[0], T = JSON.parse(JSON.stringify(self.state.titles)), msgs = [];
      (w === "2" ? ["C", "E"] : [w]).forEach(function (k) { if (!T[id] || !T[id].hasOwnProperty(k)) return; var b4 = tierOf(cat, T[id][k]); T[id][k] += 1; var af = tierOf(cat, T[id][k]); if (af > b4) msgs.push(titleOf(cat, k, af) + " (" + NAME[k] + ")"); });
      self.setState({titles: T});
      msgs.forEach(function (m) { var mm = m.match(/^(.*) \((.*)\)$/); self._log("titre", mm ? mm[1] : m, cat.n + (mm ? " · " + mm[2] : "")); });
      if (msgs.length) setTimeout(function () { self.setState({toast: "Titre débloqué : " + msgs.join(" · "), toastHead: cat.n}); clearTimeout(self._tt); self._tt = setTimeout(function () { self.setState({toast: null}); }, 4200); }, 60);
    };
    self._textTitles = function (src, text, who) { TITLE_CATS.forEach(function (c) { if (c.src === src && c.re && c.re.test(text)) self._bumpTitle(c.id, who); }); };
    self._taskTitles = function (t) { self._textTitles("task", t.t, t.who); };
    out.titleCats = TITLE_CATS.map(function (cat) {
      return {name: cat.n, rows: ["C", "E"].map(function (k) {
        var n = st.titles[cat.id][k], ti = tierOf(cat, n), nx = ti + 1 < cat.t.length ? cat.t[ti + 1] : null, prev = ti >= 0 ? cat.t[ti][0] : 0;
        return {name: NAME[k], bg: WHO[k].bg, title: ti >= 0 ? titleOf(cat, k, ti) : "Pas encore de titre", meta: n + " · " + (nx ? "prochain à " + nx[0] + " : " + titleOf(cat, k, ti + 1) : "tous les titres obtenus"), pct: nx ? Math.round((n - prev) * 100 / (nx[0] - prev)) + "%" : "100%"};
      })};
    });
    // agenda des jeux et du RP (bureau)
    out.openAgenda = function () { self.setState({sheet: {type: "agenda"}}); };
    out.isAgenda = !!(sh && sh.type === "agenda");
    if (out.isAgenda) { out.sheetTitle = "Agenda des jeux & du RP"; out.sheetColor = "#2E4A7A"; }
    var agCat = function (id) { return AGCATS.filter(function (c) { return c.id === id; })[0] || AGCATS[AGCATS.length - 1]; };
    var MOIS_C = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    var agRow = function (a) {
      var C = agCat(a.cat), d = parseD(a.d), n = Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - TODAY_UTC) / 864e5);
      var when = n === 0 ? "aujourd'hui" : n === 1 ? "demain" : n > 1 ? "dans " + n + " jours" : n === -1 ? "hier" : "il y a " + (-n) + " jours";
      var isUrl = /^https?:\/\//.test(a.note || "");
      return Object.assign({t: a.t, day: String(d.getDate()), mon: MOIS_C[d.getMonth()], wd: JOURS[d.getDay()], cat: C.l, catBg: C.c,
        meta: (a.h ? a.h.replace(":", "h") + " · " : "") + when, hasNote: !!a.note && !isUrl, note: a.note || "", hasLink: isUrl, link: a.note || "", linkLabel: "Ouvrir le lien : " + a.t, soon: n >= 0 && n <= 2},
        ED("ag:" + a.id, a.t, function () { return {t: a.t, d: a.d, h: a.h || "", cat: a.cat, note: a.note || ""}; },
          {f: [["t", "Événement", "text"], ["d", "Date", "date"], ["h", "Heure", "time"], ["note", "Précision ou lien", "text", "facultatif : lieu, serveur, lien du patch…"]], g: [["cat", "Type", AGCATS.map(function (c) { return [c.id, c.l, c.c]; })]]},
          function (x) { if (!String(x.t || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test(x.d || "")) return false; self.setState({agenda: self.state.agenda.map(function (y) { return y.id === a.id ? Object.assign({}, y, {t: cap(x.t), d: x.d, h: x.h || "", cat: x.cat, note: String(x.note || "").trim()}) : y; })}); },
          function () { self.setState({agenda: self.state.agenda.filter(function (y) { return y.id !== a.id; })}); }));
    };
    var agSorted = st.agenda.slice().sort(function (a, b) { return (a.d + (a.h || "")) < (b.d + (b.h || "")) ? -1 : 1; });
    var agUp = agSorted.filter(function (a) { return a.d >= TODAY_ISO; }), agOld = agSorted.filter(function (a) { return a.d < TODAY_ISO; }).reverse();
    out.agUp = agUp.map(agRow); out.agEmpty = !agUp.length; out.agOld = st.agPast ? agOld.slice(0, 20).map(agRow) : [];
    out.agHasOld = agOld.length > 0; out.agOldLabel = st.agPast ? "Masquer les événements passés" : "Voir les événements passés (" + agOld.length + ")";
    out.agTogglePast = function () { self.setState({agPast: !self.state.agPast}); };
    out.agDraft = st.agDraft; out.onAgDraft = function (e) { self.setState({agDraft: e.target.value}); };
    out.agDate = st.agDate || TODAY_ISO; out.onAgDate = function (e) { self.setState({agDate: e.target.value}); };
    out.agTime = st.agTime; out.onAgTime = function (e) { self.setState({agTime: e.target.value}); };
    out.agCats = AGCATS.map(function (c) { var on = st.agCat === c.id; return {label: c.l, pressed: on ? "true" : "false", bg: on ? c.c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({agCat: c.id}); }}; });
    out.addAg = function () { var t = (self.state.agDraft || "").trim(), d = self.state.agDate || TODAY_ISO; if (!t) return;
      self.setState({agenda: self.state.agenda.concat([{id: "ag" + self.state.nextAg, d: d, h: self.state.agTime || "", t: cap(t), cat: self.state.agCat, note: "", by: ME}]), nextAg: self.state.nextAg + 1, agDraft: "", agTime: ""});
      if (self._toast) { self._toast("Ajouté à l'agenda · " + fmtD(parseD(d))); self.setState({toastHead: "Agenda des jeux & du RP"}); } };
    out.isProjets = !!(sh && sh.type === "projets");
    if (out.isProjets) { out.sheetTitle = "Grands projets"; out.sheetColor = "#4A7034"; }
    var setP = function (id, fn) { self.setState({projets: self.state.projets.map(function (p) { return p.id === id ? fn(Object.assign({}, p)) : p; })}); };
    out.projList = st.projets.map(function (p) {
      var done = p.steps.filter(function (x) { return x.d; }).length, tot = p.steps.length, pct = tot ? Math.round(done * 100 / tot) : 0, open = st.projOpen === p.id, W = WHO_P[p.who];
      return {title: p.t, who: W.l, whoBg: W.c, pct: pct + "%", count: done + " / " + tot + " étapes", isOpen: open, exp: open ? "true" : "false", chev: open ? "▾" : "▸",
        toggle: function () { self.setState({projOpen: self.state.projOpen === p.id ? null : p.id}); },
        ed: ED("proj:" + p.id, p.t, function () { return {t: p.t, who: p.who, habit: p.habit || ""}; },
          {f: [["t", "Nom du projet", "text"], ["habit", "Habitude quotidienne (vide = aucune)", "text", "ex. 10 minutes de japonais"]], g: [["who", "Pour qui", [["C", "Co", "#3E6FB0"], ["E", "Emie", "#B4527A"], ["N", "À deux", "#4A7034"]]]]},
          function (d) { if (!String(d.t || "").trim()) return false; setP(p.id, function (q) { q.t = cap(d.t); q.who = d.who; q.habit = String(d.habit || "").trim(); return q; }); },
          function () { self.setState({projets: self.state.projets.filter(function (q) { return q.id !== p.id; })}); }, "Supprimer le projet"),
        hasHabit: !!p.habit, habit: p.habit, streak: "Série : " + p.streak + " jour" + (p.streak > 1 ? "s" : ""),
        todayDone: p.today, todayTodo: !p.today,
        practice: function () { setP(p.id, function (q) { q.today = true; q.streak += 1; return q; }); giveXp("nahla", 5); self._toast("+5 XP pour Nahla · série de " + (p.streak + 1) + " jours"); },
        steps: p.steps.map(function (x, j) {
          return {ed: ED("step:" + p.id + ":" + j, x.t, function () { return {t: x.t}; }, {f: [["t", "Étape", "text"]]},
              function (d) { if (!String(d.t || "").trim()) return false; setP(p.id, function (q) { q.steps = q.steps.map(function (y, jj) { return jj === j ? Object.assign({}, y, {t: cap(d.t)}) : y; }); return q; }); },
              function () { setP(p.id, function (q) { q.steps = q.steps.filter(function (y, jj) { return jj !== j; }); return q; }); }),
            t: x.t, on: x.d ? "true" : "false", box: x.d ? "#4A7034" : "#FFFFFF", tick: x.d ? "✓" : "", fg: x.d ? "#5E5864" : "#2B2A30", deco: x.d ? "line-through" : "none",
            toggle: function () { setP(p.id, function (q) { q.steps = q.steps.map(function (y, jj) { return jj === j ? Object.assign({}, y, {d: !y.d}) : y; }); return q; }); if (!x.d) { spreadXp(30, 1); self._toast("Étape franchie : +10 XP pour chaque chat"); } else spreadXp(30, -1); }};
        }),
        stepDraft: st.stepDraft, onStepDraft: function (e) { self.setState({stepDraft: e.target.value}); },
        addStep: function () { var t = (self.state.stepDraft || "").trim(); if (!t) return; setP(p.id, function (q) { q.steps = q.steps.concat([{t: t, d: false}]); return q; }); self.setState({stepDraft: ""}); }};
    });
    out.projDraft = st.projDraft; out.onProjDraft = function (e) { self.setState({projDraft: e.target.value}); };
    out.projWhos = ["C", "E", "N"].map(function (w) { var on = st.projWho === w; return {label: WHO_P[w].l, pressed: on ? "true" : "false", bg: on ? WHO_P[w].c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({projWho: w}); }}; });
    out.addProj = function () { var t = (self.state.projDraft || "").trim(); if (!t) return; var id = "p" + self.state.nextProj; self.setState({projets: self.state.projets.concat([{id: id, who: self.state.projWho, t: t, habit: "", streak: 0, today: false, steps: []}]), projOpen: id, projDraft: "", nextProj: self.state.nextProj + 1}); };
    var PS = st.pushState || "chargement";
    out.pushTxt = {chargement: "Vérification…", unsupported: "Ce navigateur ne reçoit pas les notifications. Sur iPhone : ouvre l'appli depuis l'écran d'accueil (Safari › Partager › Sur l'écran d'accueil).", denied: "Les notifications sont bloquées pour ce site : autorise-les dans les réglages du navigateur ou du téléphone.", off: "Les notifications ne sont pas activées sur cet appareil.", on: "Notifications activées sur cet appareil.", erreur: "L'activation n'a pas marché. Réessaie, ou envoie une capture à Claude."}[PS] || "";
    out.pushCan = PS === "off" || PS === "on" || PS === "erreur"; out.pushLabel = PS === "on" ? "Désactiver sur cet appareil" : "Activer les notifications";
    out.pushBg = PS === "on" ? "#FFFFFF" : "#4A7034"; out.pushFg = PS === "on" ? "#2B2A30" : "#FFFFFF";
    out.pushBtn = function () { var P = typeof window !== "undefined" && window.MAISON_PUSH; if (!P) return; (PS === "on" ? P.disable() : P.enable()).then(function () { return P.state(); }).then(function (x) { self.setState({pushState: x}); if (x === "on") self._toast("Notifications activées : une notification de bienvenue arrive."); }, function () { self.setState({pushState: "erreur"}); }); };
    out.notifPrefs = NOTIF_PREFS.map(function (p) {
      var on = !!st.notifOn[p.id];
      return {label: p.l, on: on ? "true" : "false", track: on ? "#4A7034" : "#C9C2B5", knob: on ? "24px" : "2px",
        toggle: function () { var o = Object.assign({}, self.state.notifOn); o[p.id] = !o[p.id]; self.setState({notifOn: o}); }};
    });
    out.contactsSummary = st.contacts.length + " contacts partagés · un toucher pour appeler";
    out.contactQuery = st.contactQuery;
    out.onContactQuery = function (e) { self.setState({contactQuery: e.target.value}); };
    out.contactCats = [{id:"all", l:"Tous"}].concat(CCATS).map(function (c) {
      var on = st.contactCat === c.id;
      return {label: c.l, pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#F7F3EE" : "#2B2A30", pick: function () { self.setState({contactCat: c.id}); }};
    });
    var q = (st.contactQuery || "").toLowerCase();
    out.contactGroups = CCATS.filter(function (c) { return st.contactCat === "all" || st.contactCat === c.id; }).map(function (c) {
      var list = st.contacts.filter(function (k) { return k.cat === c.id && (!q || (k.n + " " + k.r + " " + c.l + " " + (k.e || "")).toLowerCase().indexOf(q) >= 0); });
      return {name: c.l, color: c.c, items: list.map(function (k) {
        return {editOn: st.editCtx === "infos", notEdit: st.editCtx !== "infos", delLabel: "Supprimer " + k.n, remove: function () { self.setState({contacts: self.state.contacts.filter(function (x) { return x.id !== k.id; })}); },
          hasMail: !!k.e, mail: k.e || "", mailto: gmailUrl(k.e || "", "", ""), mailTarget: isIOS() ? "_self" : "_blank", mailLabel: "Écrire à " + k.n + " depuis Gmail",
          editing: st.cEdit === k.id, editLabel: "Modifier " + k.n,
          startEdit: function () { self.setState({cEdit: k.id, cDraft: {n: k.n, r: k.r || "", p: k.p || "", e: k.e || "", cat: k.cat}}); },
          cancelEdit: function () { self.setState({cEdit: null, cDraft: null}); },
          saveEdit: function () { var d = self.state.cDraft; if (!d || !d.n.trim()) return; self.setState({contacts: self.state.contacts.map(function (x) { return x.id === k.id ? Object.assign({}, x, {n: d.n.trim(), r: d.r.trim(), p: d.p.trim(), e: d.e.trim(), cat: d.cat}) : x; }), cEdit: null, cDraft: null}); self._toast("Contact enregistré"); },
          fields: st.cEdit === k.id ? [["n", "Nom", "text", ""], ["r", "Rôle", "text", "ex. vétérinaire traitant"], ["p", "Numéro", "tel", "facultatif"], ["e", "Adresse mail", "email", "facultatif"]].map(function (f) {
            return {id: "ce-" + f[0], l: f[1], type: f[2], ph: f[3], v: (st.cDraft || {})[f[0]] || "", on: function (e) { var d = Object.assign({}, self.state.cDraft); d[f[0]] = e.target.value; self.setState({cDraft: d}); }};
          }) : [],
          catBtns: st.cEdit === k.id ? CCATS.map(function (cc) { var on = (st.cDraft || {}).cat === cc.id; return {label: cc.l, pressed: on ? "true" : "false", bg: on ? cc.c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { var d = Object.assign({}, self.state.cDraft); d.cat = cc.id; self.setState({cDraft: d}); }}; }) : [],
          hasPhone: !!k.p, noPhone: !k.p, name: k.n, role: k.r, phone: k.p, tel: "tel:" + (k.p || "").replace(/\s/g, ""), callLabel: "Appeler " + k.n + " au " + k.p, callBg: c.id === "urgences" ? "#B23A48" : "#4A7034"};
      })};
    }).filter(function (g) { return g.items.length; });
    out.cName = st.cName; out.cPhone = st.cPhone; out.cMail = st.cMail;
    var newCat = st.cNewCat || (st.contactCat === "all" ? "divers" : st.contactCat);
    out.cNewCats = CCATS.map(function (c) { var on = newCat === c.id; return {label: c.l, pressed: on ? "true" : "false", bg: on ? c.c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({cNewCat: c.id}); }}; });
    out.onCMail = function (e) { self.setState({cMail: e.target.value}); };
    out.onCName = function (e) { self.setState({cName: e.target.value}); };
    out.onCPhone = function (e) { self.setState({cPhone: e.target.value}); };
    out.addContact = function () {
      var n = (self.state.cName || "").trim(), p = (self.state.cPhone || "").trim(); if (!n) return;
      var cat = self.state.cNewCat || (self.state.contactCat === "all" ? "divers" : self.state.contactCat);
      self.setState({contacts: self.state.contacts.concat([{id: "k" + self.state.nextContact, cat: cat, n: n, r: "Ajouté par " + NAME[ME], p: p, e: (self.state.cMail || "").trim()}]), nextContact: self.state.nextContact + 1, cName: "", cPhone: "", cMail: "", contactCat: self.state.contactCat === "all" || self.state.contactCat === cat ? self.state.contactCat : cat});
    };
    out.showRadio = st.radioOn;
    out.optFurn = [
      REEL && FOYER_LVL < 11 ? null : {id:"treeOn", l:"Arbre à chat", sub:REEL ? "Débloqué au niveau 11" : "Aperçu : débloqué au niveau 11"},
      {id:"radioOn", l:"Radio", sub:"La musique reste réglable ici"},
      {id:"plaidOn", l:"Plaid sur le canapé", sub:"Motif à choisir dans les meubles"},
      {id:"logsOn", l:"Panier de bûches", sub:"Près de la cheminée, en automne et en hiver"},
      {id:"tableDecoOn", l:"Jeu et console sur la table basse", sub:"L'objet de la soirée s'affiche quand même"}
    ].filter(Boolean).map(function (f) {
      var on = !!st[f.id];
      return {label: f.l, sub: f.sub, on: on ? "true" : "false", op: "1", track: on ? "#4A7034" : "#C9C2B5", knob: on ? "24px" : "2px",
        toggle: function () { var u = {}; u[f.id] = !self.state[f.id]; self.setState(u); }};
    });
    out.musicOn = st.musicOn; out.pMusic = st.musicOn ? "true" : "false";
    out.musicLabel = st.musicOn ? "Radio : couper la musique" : "Radio : lancer la musique";
    out.toggleMusic = function () { var on = !self.state.musicOn; self.setState({musicOn: on}); MUSIC.sync(on, trackKey(self.state)); };
    MUSIC.sync(st.musicOn, trackKey(st));
    out.playlistName = (st.saison === "classique" && trackKey(st) !== "noel" ? PLAYLISTS.base : PLAYLISTS[trackKey(st) === "base" ? st.saison : trackKey(st)]) + (st.musicOn ? " · " + MUSIC.label() + " (en lecture)" : "");
    out.musicTrack = st.musicOn ? "#7A4E9E" : "#C9C2B5"; out.musicKnob = st.musicOn ? "24px" : "2px";
    out.openSoiree = function () { self.setState({screen: "soiree", sheet: null, soirDay: 0}); };
    var tonight = st.soirees[0];
    out.hasTableItem = !!(tonight && tonight.status === "accepte" && tonight.item);
    out.tableItemSrc = out.hasTableItem ? ITEMS_IMG[tonight.item] : "";
    out.tableOther = out.hasTableItem && tonight.item !== "jeu" && tonight.item !== "manette";
    out.tableDeco = !out.tableOther && st.tableDecoOn;
    out.soireeAria = "Table basse : nos soirées" + (tonight ? ", ce soir : " + tonight.name : "");
    out.soirSummary = tonight ? "Ce soir : " + tonight.name + " · " + SOIR_STATUS[tonight.status].l : "Rien de prévu ce soir";
    out.soirDays = SOIR_DAYS.map(function (d, i) {
      var on = st.soirDay === i, ev = st.soirees[i];
      return {short: d.s, num: d.n, aria: d.l + (ev ? " : " + ev.name : ""), pressed: on ? "true" : "false",
        bg: on ? "#7A4E9E" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30",
        dot: ev ? (ev.status === "accepte" ? "#4A7034" : (ev.status === "refuse" ? "transparent" : "#D9A441")) : "transparent",
        pick: function () { self.setState({soirDay: i}); }};
    });
    var cur = st.soirees[st.soirDay];
    out.soirDayLong = SOIR_DAYS[st.soirDay].l;
    out.hasSoir = !!cur; out.noSoir = !cur;
    out.soirName = cur ? cur.name : ""; out.soirBy = cur ? (cur.by === ME ? "Proposé par toi" : "Proposé par " + NAME[cur.by]) : "";
    var stt = cur ? SOIR_STATUS[cur.status] : SOIR_STATUS.attente;
    out.soirStatus = stt.l; out.soirStatusBg = stt.bg; out.soirStatusFg = stt.fg;
    out.soirPending = !!(cur && cur.status === "attente" && (!REEL || cur.by !== ME));
    out.soirWaiting = !!(REEL && cur && cur.status === "attente" && cur.by === ME);
    (function () { var day = st.soirDay;
      out.soirEd = ED("soir:" + day, "la soirée", function () { var c = self.state.soirees[day] || {}; return {act: c.act, status: c.status || "attente", by: c.by || ME}; },
        {g: [["act", "Activité", st.soirActs.map(function (a) { return [a.id, a.n, "#7A4E9E"]; }).concat(cur && st.soirActs.every(function (a) { return a.id !== cur.act; }) ? [[cur.act, cur.name, "#7A4E9E"]] : [])],
             ["status", "Réponse", Object.keys(SOIR_STATUS).map(function (k) { return [k, SOIR_STATUS[k].l, SOIR_STATUS[k].bg, SOIR_STATUS[k].fg]; })], ["by", "Proposée par", WHO_OPTS]]},
        function (d) { var c = self.state.soirees[day]; if (!c) return false; var a = self.state.soirActs.filter(function (x) { return x.id === d.act; })[0];
          var o = Object.assign({}, self.state.soirees); o[day] = Object.assign({}, c, {by: d.by, status: d.status}, a ? {act: a.id, name: a.n, item: a.item} : {}); self.setState({soirees: o}); },
        function () { var o = Object.assign({}, self.state.soirees); delete o[day]; self.setState({soirees: o}); }, "Annuler la soirée"); })();
    var answer = function (status) { var cs = self.state.soirees[self.state.soirDay];
      if (cs && cs.by && cs.by !== ME) self._notify("soiree", cs.by, NAME[ME] + ({accepte: " accepte « " + cs.name + " » pour ", autre: " a une autre idée que « " + cs.name + " » pour ", refuse: " ne peut pas pour « " + cs.name + " » "})[status] + (SOIR_DAYS[self.state.soirDay] || {l: ""}).l.toLowerCase().replace("ce soir · ", "ce soir, ") + "."); if (status === "accepte" && cs && cs.status !== "accepte") { self._bumpTitle("soirees", cs.by);
        giveXp(lowestCat(), 10);
        var S = STATS0(), sd = (SOIR_DAYS[self.state.soirDay] || {}).iso || TODAY_ISO, wk = monOf(sd);
        if (S.soirWeeks.indexOf(wk) < 0) S.soirWeeks = S.soirWeeks.concat([wk]).slice(-60);
        if (["popcorn", "manette", "de"].indexOf(cs.item) < 0 && monOf(sd) === MON_ISO) S.sansEcran = true;
        self.setState({stats: S}); } var o = Object.assign({}, self.state.soirees); o[self.state.soirDay] = Object.assign({}, o[self.state.soirDay], {status: status}); self.setState({soirees: o}); };
    out.answerYes = function () { answer("accepte"); }; out.answerOther = function () { answer("autre"); }; out.answerNo = function () { answer("refuse"); };
    out.soirActs = st.soirActs.map(function (a) {
      var on = st.soirSel === a.id;
      return {editOn: st.editCtx === "soiree", notEdit: st.editCtx !== "soiree", delLabel: "Supprimer l'activité " + a.n, remove: function () { self.setState({soirActs: self.state.soirActs.filter(function (x) { return x.id !== a.id; }), soirSel: self.state.soirSel === a.id ? null : self.state.soirSel}); },
        renameLabel: "Renommer l'activité " + a.n,
        rename: function (e) { var v = e.target.value; self.setState({soirActs: self.state.soirActs.map(function (x) { return x.id === a.id ? Object.assign({}, x, {n: v}) : x; })}); },
        n: a.n, pressed: on ? "true" : "false", bg: on ? "#7A4E9E" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({soirSel: a.id}); }};
    });
    out.randomAct = function () { var l = self.state.soirActs; self.setState({soirSel: l[Math.floor(Math.random() * l.length)].id}); };
    out.soirDraft = st.soirDraft;
    out.onSoirDraft = function (e) { self.setState({soirDraft: e.target.value}); };
    var addAct = function () {
      var t = (self.state.soirDraft || "").trim(); if (!t) return;
      var id = "c" + self.state.nextAct;
      self.setState({soirActs: self.state.soirActs.concat([{id: id, n: t.charAt(0).toUpperCase() + t.slice(1), item: "bougie"}]), soirSel: id, nextAct: self.state.nextAct + 1, soirDraft: ""});
    };
    out.addSoirAct = addAct; out.onSoirKey = function (e) { if (e.key === "Enter") addAct(); };
    var selAct = st.soirActs.filter(function (a) { return a.id === st.soirSel; })[0];
    out.proposeLabel = selAct ? "Proposer « " + selAct.n + " » · " + SOIR_DAYS[st.soirDay].s + " " + SOIR_DAYS[st.soirDay].n : "Choisis une activité";
    out.proposeBg = selAct ? "#D9A441" : "#E3DACD";
    out.proposeSoir = function () {
      var a = self.state.soirActs.filter(function (x) { return x.id === self.state.soirSel; })[0]; if (!a) return;
      var o = Object.assign({}, self.state.soirees); o[self.state.soirDay] = {act: a.id, name: a.n, item: a.item, by: ME, status: "attente"};
      self.setState({soirees: o, soirSel: null});
      var quand = SOIR_DAYS[self.state.soirDay].l.toLowerCase();
      if (self._notify("soiree", OTHER, NAME[ME] + " propose « " + a.n + " » pour " + quand + ". Tu réponds dans Nos soirées ?")) self._toast("Proposition envoyée à " + NAME[OTHER]);
      else if (self.state.notifOn.soiree && self._toast) self._toast(NAME[ME] + " propose « " + a.n + " » pour " + quand);
    };
    out.soirWeek = SOIR_DAYS.map(function (d, i) {
      var ev = st.soirees[i];
      return {label: d.s + " " + d.n, text: ev ? ev.name + " · " + SOIR_STATUS[ev.status].l : "Libre", fg: ev ? "#2B2A30" : "#6B6470",
        dot: ev ? (ev.status === "accepte" ? "#4A7034" : (ev.status === "refuse" ? "#B23A48" : "#D9A441")) : "#E3DACD"};
    });
    var inSess = st.session !== null;
    out.inSession = inSess; out.notSession = !inSess;
    out.nahlaLevel = st.lvl.nahla; out.nahlaPct = st.xp.nahla + "%";
    out.nahlaSrc = self.frameSrc("nahla"); out.nahlaCss = ANIMS[st.anim.nahla].css;
    var todayLeft = st.tasks.filter(function (t) { return freqOf(t) === "jour" && !t.done; }).length;
    var weekLeft = st.tasks.filter(function (t) { return freqOf(t) === "semaine" && !t.done; }).length;
    out.tachesSummary = todayLeft + " du jour · " + weekLeft + " de la semaine";
    out.taskDraft = st.taskDraft;
    out.onTaskDraft = function (e) { self.setState({taskDraft: e.target.value}); };
    var addTask = function () {
      var t = (self.state.taskDraft || "").trim(); if (!t) return;
      var fq = self.state.taskFreq || "jour", F = FREQS.filter(function (f) { return f.id === fq; })[0];
      var nt = {id: "n" + self.state.nextTask, t: t.charAt(0).toUpperCase() + t.slice(1), freq: fq, rec: "", pts: F.pts};
      self.setState({tasks: self.state.tasks.concat([nt]), nextTask: self.state.nextTask + 1, taskDraft: ""});
    };
    out.addTask = addTask;
    out.taskFreqs = FREQS.filter(function (f) { return f.id !== "une"; }).map(function (f) { var on = (st.taskFreq || "jour") === f.id; return {label: f.n, pressed: on ? "true" : "false", bg: on ? "#3E6FB0" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({taskFreq: f.id}); }}; });
    out.onTaskKey = function (e) { if (e.key === "Enter") addTask(); };
    var whoLabel = function (w) { return w === "2" ? "E&C" : w; };
    out.draftWho = whoLabel(st.draftWho); out.draftWhoBg = WHO[st.draftWho].bg;
    out.draftWhoAria = "Pour qui : " + (st.draftWho === "2" ? "à deux" : st.draftWho + ".") + ", toucher pour changer";
    out.cycleWho = function () { var o = ["C", "E", "2"]; self.setState({draftWho: o[(o.indexOf(self.state.draftWho) + 1) % 3]}); };
    out.quickTasks = QUICK.map(function (q) {
      var on = st.tasks.some(function (t) { return t.t === q.t && !t.done; });
      return {label: (on ? "✓ " : "+ ") + q.t, aria: on ? q.t + " : déjà prévue" : "Ajouter " + q.t + " (" + FREQS.filter(function (f) { return f.id === (q.freq || freqOf(q)); })[0].n.toLowerCase() + ")",
        bg: on ? "#DCE6F4" : "#FFFFFF", fg: on ? "#23324A" : "#2B2A30",
        add: function () {
          if (self.state.tasks.some(function (t) { return t.t === q.t && !t.done; })) return;
          self.setState({tasks: self.state.tasks.concat([{id: "n" + self.state.nextTask, t: q.t, freq: q.freq || freqOf(q), rec: "", pts: q.pts}]), nextTask: self.state.nextTask + 1});
        }};
    });
    out.whoFilters = [{id:"all", label:"Tout"}, {id:ME, label:"Moi (" + NAME[ME] + ")"}, {id:OTHER, label:NAME[OTHER]}].map(function (f) {
      var on = st.whoFilter === f.id;
      return {label: f.label, pressed: on ? "true" : "false", bg: on ? "#2B2A30" : "#FFFFFF", fg: on ? "#F7F3EE" : "#2B2A30",
        pick: function () { self.setState({whoFilter: f.id}); }};
    });
    out.taskGroups = FREQS.map(function (w) {
      var list = st.tasks.filter(function (t) {
        if (freqOf(t) !== w.id) return false;
        if (inSess && (t.done || w.id === "mois" || w.id === "une")) return false;
        return true;
      });
      list = list.filter(function (t) { return !t.done; }).concat(list.filter(function (t) { return t.done; }));
      var left = list.filter(function (t) { return !t.done; }).length;
      return {name: w.g, sub: w.sub, count: left ? left + " à faire" : "tout est fait",
        items: list.map(function (t) {
          var by = byOf(t), fq = freqOf(t);
          return {t: t.t, done: !!t.done, hasWho: by.length > 0, pressed: t.done ? "true" : "false", seasonal: !!t.seasonal,
            editOn: st.editCtx === "taches", notEdit: st.editCtx !== "taches", delLabel: "Supprimer " + t.t,
            remove: function () { self.setState({tasks: self.state.tasks.filter(function (x) { return x.id !== t.id; })}); },
            meta: fq === "jour" || fq === "2sem" ? (by.length ? "Faite " + by.length + " fois sur 2 " + (fq === "jour" ? "aujourd'hui" : "cette semaine") + " · " : "") + "+" + (t.pts || 2) + " XP par passage" : (t.done ? "Faite · revient " + {semaine: "lundi", mois: "le 1er du mois", une: "jamais"}[fq] : "+" + (t.pts || 5) + " XP"),
            bg: t.done ? "#F1ECE4" : "#FFFFFF", deco: t.done && !((fq === "jour" || fq === "2sem") && by.length < 2) ? "line-through" : "none", fg: t.done ? "#6B6470" : "#2B2A30",
            h: inSess ? "66px" : "48px", fs: inSess ? "20px" : "15px", boxSize: inSess ? "30px" : "20px",
            who: byLabel2(by), whoBg: byBg2(by), box: t.done ? ((fq === "jour" || fq === "2sem") && by.length < 2 ? "#9DB4D6" : "#3E6FB0") : "#FFFFFF",
            ed: ED("task:" + t.id, t.t, function () { return {t: t.t, freq: fq, pts: t.pts || 5}; },
              {f: [["t", "Tâche", "text"], ["pts", "XP par passage", "number"]],
               g: [["freq", "Fréquence", FREQS.map(function (f) { return [f.id, f.n, "#3E6FB0"]; })]]},
              function (d) { if (!String(d.t || "").trim()) return false; self.setState({tasks: self.state.tasks.map(function (x) { return x.id === t.id ? Object.assign({}, x, {t: cap(d.t), freq: d.freq, rec: "", pts: Math.max(1, Math.min(30, Math.round(num(d.pts, 5))))}) : x; })}); }),
            toggle: function () { tapTask(t); }};
        })};
    }).filter(function (g) { return g.items.length > 0; });
    // seules les tâches ponctuelles faites sont rangées : les récurrentes reviennent toutes seules
    out.doneTaskCount = st.tasks.filter(function (t) { return t.done && freqOf(t) === "une"; }).length;
    out.clearDoneTasks = function () { self.setState({tasks: self.state.tasks.filter(function (t) { return !(t.done && freqOf(t) === "une"); })}); };
    var endSession = function () {
      var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl);
      if (self.state.sessionDone > 0) { xp.nahla += 10; if (xp.nahla >= 100) { xp.nahla -= 100; lvl.nahla += 1; } }
      self.setState({session: null, sessionDone: 0, xp: xp, lvl: lvl});
    };
    out.endSession = endSession;
    var left = inSess ? Math.max(0, 9000 - (st.tick - st.session)) : 9000;
    var secs = Math.ceil(left / 10);
    out.sessionClock = Math.floor(secs / 60) + ":" + ("0" + (secs % 60)).slice(-2);
    out.sessionInfo = left === 0 ? "Temps écoulé ! Bravo" : (st.sessionDone ? st.sessionDone + " faite" + (st.sessionDone > 1 ? "s" : "") + " · bonus +10 XP à la fin" : "15 minutes, on s'y met à deux");
    out.sessionBtnLabel = inSess ? "Terminer la session" : "Session 15 min";
    out.sessionBtn = function () { if (self.state.session !== null) endSession(); else self.setState({session: self.state.tick, sessionDone: 0}); };
    var items = st.items;
    var doneCount = items.filter(function (i) { return i.done; }).length;
    var remaining = items.length - doneCount;
    out.onSalon = st.screen === "salon";
    out.onCourses = st.screen === "courses";
    out.goSalon = function () { self.setState({screen: "salon", photo: null}); };
    out.onTaches = st.screen === "taches";
    out.onSoiree = st.screen === "soiree";
    out.onInfos = st.screen === "infos";
    out.onMissions = st.screen === "missions";
    out.coursesSummary = remaining + " à prendre · Bao niv. " + st.lvl.bao;
    out.baoLevel = st.lvl.bao; out.baoPct = st.xp.bao + "%";
    out.baoSrc = self.frameSrc("bao"); out.baoCss = ANIMS[st.anim.bao].css;
    out.baoReadSrc = "/_blob/" + IMG.bao.happy;
    out.draft = st.draft;
    out.onDraft = function (e) { self.setState({draft: e.target.value}); };
    var addDraft = function () {
      var n = (self.state.draft || "").trim();
      if (!n) return;
      var it = {id: self.state.nextId, n: n.charAt(0).toUpperCase() + n.slice(1), q: "", r: guessRayon(n), by: ME};
      self.setState({items: self.state.items.concat([it]), nextId: self.state.nextId + 1, draft: ""});
    };
    out.addDraft = addDraft;
    out.onDraftKey = function (e) { if (e.key === "Enter") addDraft(); };
    out.rayons = RAYONS.map(function (r) {
      var list = items.filter(function (i) { return i.r === r && !(st.storeMode && i.done); });
      list = list.filter(function (i) { return !i.done; }).concat(list.filter(function (i) { return i.done; }));
      var left = list.filter(function (i) { return !i.done; }).length;
      return {
        name: r, count: left ? left + " à prendre" : "tout est pris",
        items: list.map(function (i) {
          var w = WHO[i.by];
          return {
            h: st.storeMode ? "66px" : "48px", fs: st.storeMode ? "20px" : "15px", boxSize: st.storeMode ? "30px" : "20px",
            editOn: st.editCtx === "courses", notEdit: st.editCtx !== "courses", delLabel: "Supprimer " + i.n,
            remove: function () { self.setState({items: self.state.items.filter(function (x) { return x.id !== i.id; })}); },
            name: i.n, meta: (i.q ? i.q + " · " : "") + w.label, done: !!i.done, pressed: i.done ? "true" : "false",
            bg: i.done ? "#F1ECE4" : "#FFFFFF", box: i.done ? "#4A7034" : "#FFFFFF",
            deco: i.done ? "line-through" : "none", fg: i.done ? "#6B6470" : "#2B2A30",
            hasTag: !!i.tag, tag: i.tag || "", who: i.by, whoBg: w.bg,
            ed: ED("item:" + i.id, i.n, function () { return {n: i.n, q: i.q || "", r: i.r, by: i.by === "E" ? "E" : "C"}; },
              {f: [["n", "Article", "text"], ["q", "Quantité", "text", "facultatif"]], g: [["r", "Rayon", RAYONS.map(function (r) { return [r, r]; })], ["by", "Ajouté par", WHO_OPTS]]},
              function (d) { if (!String(d.n || "").trim()) return false; self.setState({items: self.state.items.map(function (x) { return x.id === i.id ? Object.assign({}, x, {n: cap(d.n), q: String(d.q || "").trim(), r: d.r, by: d.by}) : x; })}); }),
            toggle: function () {
              if (!i.done) SFX.play("bloup");
              self.setState({items: self.state.items.map(function (x) { return x.id === i.id ? Object.assign({}, x, {done: !x.done}) : x; })});
            }
          };
        })
      };
    }).filter(function (r) { return r.items.length > 0; });
    out.doneCount = doneCount;
    out.clearDone = function () { self.setState({items: self.state.items.filter(function (i) { return !i.done; })}); };
    out.finishLabel = st.finished ? "Bravo ! +15 XP" : "Courses faites · +15 XP";
    out.finishCourses = function () {
      if (self.state.finished) return;
      var emptied = self.state.storeMode && self.state.items.every(function (i) { return i.done; });
      giveXp("bao", 15, {boost: true});
      var S = STATS0(); if (emptied) S.magasin = true;
      self.setState({stats: S, finished: true, items: self.state.items.filter(function (i) { return !i.done; })});
    };
    out.photoOpen = !!st.photo; out.photoReading = st.photo === "reading"; out.photoReview = st.photo === "review";
    out.startPhoto = function () {
      self.setState({photo: "reading", portions: 4, ingOff: {muscade: true}});
      setTimeout(function () { if (self.state.photo === "reading") self.setState({photo: "review"}); }, 1500);
    };
    out.closePhoto = function () { self.setState({photo: null}); };
    out.portions = st.portions;
    out.lessPortions = function () { self.setState({portions: Math.max(1, self.state.portions - 1)}); };
    out.morePortions = function () { self.setState({portions: Math.min(12, self.state.portions + 1)}); };
    var scale = st.portions / 4;
    var selCount = 0;
    out.ingredients = ING.map(function (g) {
      var sel = !st.ingOff[g.id]; if (sel) selCount++;
      return {
        name: g.n, qty: fmtQty(g.q * scale, g.u), sel: sel, pressed: sel ? "true" : "false", box: sel ? "#4A7034" : "#FFFFFF",
        meta: g.merge ? "Déjà sur la liste : sera regroupé" : (g.off ? "Souvent au placard" : g.r),
        toggle: function () { var o = Object.assign({}, self.state.ingOff); o[g.id] = !o[g.id]; self.setState({ingOff: o}); }
      };
    });
    out.addIngLabel = selCount ? "Ajouter " + selCount + " ingrédient" + (selCount > 1 ? "s" : "") + " à la liste" : "Rien à ajouter";
    out.addIngredients = function () {
      var s2 = self.state, sc = s2.portions / 4, list = s2.items.slice(), next = s2.nextId;
      ING.forEach(function (g) {
        if (s2.ingOff[g.id]) return;
        var qty = fmtQty(g.q * sc, g.u);
        var ex = null;
        for (var k = 0; k < list.length; k++) { if (list[k].n === g.n && !list[k].done) ex = k; }
        if (ex !== null) { list[ex] = Object.assign({}, list[ex], {q: list[ex].q + " + " + qty, tag: "Gratin"}); }
        else { list.push({id: next++, n: g.n, q: qty, r: g.r, by: "R", tag: "Gratin"}); }
      });
      var anim = Object.assign({}, s2.anim); anim.bao = "ronron";
      self.setState({items: list, nextId: next, photo: null, anim: anim});
    };
    return out;
  }
}

export { Component, SOIR_DAYS, MEAL_ISO, CATINFO0, SFX };
