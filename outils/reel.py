#!/usr/bin/env python3
"""Ajoute le mode « réel » à la logique de la maquette (src/Main.dc.html).

La maquette garde son comportement de démo ; quand la page définit window.MAISON_REEL,
la logique utilise la vraie date, le compte connecté (Co ou Emie) et masque les réglages de démo.
Ce script ne s'applique qu'une fois (il s'arrête si le mode réel est déjà présent).
"""
import os, re, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'var REEL =' in s:
    sys.exit('mode réel déjà présent')

def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt:
        sys.exit('trouvé %d fois au lieu de %d : %s' % (n, cnt, old[:110]))
    s = s.replace(old, new)

# ------------------------------------------------------------------ en-tête de la logique
rep('<script type="text/x-dc" data-dc-script data-props=\'{"$preview":{"width":390,"height":844}}\'>\n',
'''<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
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
''')

# dates fixes du 13 novembre 2026
rep('var TODAY = new Date(2026, 10, 13);', 'var TODAY = new Date(TODAY_Y, TODAY_M, TODAY_D);')
rep('var TODAY = Date.UTC(2026, 10, 13);', 'var TODAY = TODAY_UTC;')
s = s.replace('Date.UTC(2026, 10, 13)', 'TODAY_UTC')
rep('"2026-11-13"', 'TODAY_ISO', 3)
rep('"2026-11-24"', '(REEL ? addDaysIso(7) : "2026-11-24")', 4)
rep('missDate: (REEL ? addDaysIso(7) : "2026-11-24")', 'missDate: (REEL ? addDaysIso(7) : "2026-11-24")', 1)
s = re.sub(r'function nextJM\(jm\) \{ var y = 2026,', 'function nextJM(jm) { var y = TODAY_Y,', s)

# soirées : les 7 prochains jours
rep('var SOIR_DAYS = [', 'var SOIR_DAYS0 = [')
i = s.index('var SOIR_DAYS0 = ['); j = s.index('\n', i)
s = s[:j + 1] + '''var SOIR_DAYS = !REEL ? SOIR_DAYS0 : [0, 1, 2, 3, 4, 5, 6].map(function (n) { var d = new Date(TODAY_Y, TODAY_M, TODAY_D + n), jl = JOURS_L[d.getDay()];
  return {s: jl.slice(0, 3), n: d.getDate(), l: n === 0 ? "Ce soir · " + jl + " " + d.getDate() : jl.charAt(0).toUpperCase() + jl.slice(1) + " " + d.getDate(), iso: isoD(d)}; });
''' + s[j + 1:]

# repas : semaine en cours (ou suivante à partir du vendredi)
rep('var MEAL_DAYS = [', 'var MEAL_DAYS0 = [')
i = s.index('var MEAL_DAYS0 = ['); j = s.index('\n', i)
s = s[:j + 1] + '''var MEAL_MON = (function () { var d = new Date(TODAY_Y, TODAY_M, TODAY_D), wd = (d.getDay() + 6) % 7; return new Date(TODAY_Y, TODAY_M, TODAY_D - wd + (wd >= 4 ? 7 : 0)); })();
var MEAL_ISO = [0, 1, 2, 3, 4, 5, 6].map(function (n) { return isoD(new Date(MEAL_MON.getFullYear(), MEAL_MON.getMonth(), MEAL_MON.getDate() + n)); });
var MEAL_DAYS = !REEL ? MEAL_DAYS0 : MEAL_ISO.map(function (iso) { var d = new Date(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)), jl = JOURS_L[d.getDay()]; return jl.charAt(0).toUpperCase() + jl.slice(1, 3) + ". " + d.getDate(); });
''' + s[j + 1:]

# animations surprises plus rares
for n in ['300', '600', '350', '450']:
    s = s.replace('Math.random() < 1 / %s)' % n, 'Math.random() < 1 / (%s * RARE))' % n)

# niveau du foyer calculé à partir de l'XP des chats (mode réel)
rep('var FOYER_LVL = 7;', '''var FOYER_LVL = 7;
function foyerXpOf(st) { return ["nahla", "bao", "tsunky"].reduce(function (a, k) { return a + Math.max(0, (st.lvl[k] - 1) * 100 + st.xp[k]); }, 0); }
function foyerLvlOf(st) { var x = foyerXpOf(st), n = 1; while (n < 99 && x >= FOYER_COST(n + 1)) { x -= FOYER_COST(n + 1); n++; } return n; }''')

# ------------------------------------------------------------------ dans renderVals
rep('    // éditeur générique : chaque fiche passe par lui pour modifier un élément\n',
'''    if (REEL) FOYER_LVL = foyerLvlOf(st);
    out.demoUi = !REEL; out.otherName = NAME[OTHER]; out.meName = NAME[ME];
    // éditeur générique : chaque fiche passe par lui pour modifier un élément
''')

# qui fait l'action : le compte connecté
rep('by: "Co", text: t, color: self.state.noteColor', 'by: NAME[ME], text: t, color: self.state.noteColor')
rep('if (!n.liked && n.by !== "Co" && self.state.notifOn.coeur', 'if (!n.liked && n.by !== NAME[ME] && self.state.notifOn.coeur')
rep('who: "C", done: false, seasonal: true', 'who: ME, done: false, seasonal: true')
rep('n: f.n, q: f.q, r: f.r, by: "C"}]), nextId', 'n: f.n, q: f.q, r: f.r, by: ME}]), nextId')
rep('type: self.state.missType, who: "C", pts:', 'type: self.state.missType, who: ME, pts:')
rep('items.push({id: id++, n: g[0], q: g[1], r: g[2], by: "C", tag: "Repas"});', 'items.push({id: id++, n: g[0], q: g[1], r: g[2], by: ME, tag: "Repas"});')
rep('q: "", r: guessRayon(n), by: "C"};', 'q: "", r: guessRayon(n), by: ME};')
rep('out.toastHead = st.toastHead || "Notification envoyée à Emie";', 'out.toastHead = st.toastHead || "Notification envoyée à " + NAME[OTHER];')
rep('self._toast("Planning proposé à Emie · elle peut valider ou changer un repas");', 'self._toast("Planning proposé à " + NAME[OTHER] + " · " + (OTHER === "E" ? "elle" : "il") + " peut valider ou changer un repas");')
rep('out.soirBy = cur ? (cur.by === "C" ? "Proposé par toi" : "Proposé par Emie") : "";', 'out.soirBy = cur ? (cur.by === ME ? "Proposé par toi" : "Proposé par " + NAME[cur.by]) : "";')
rep('o[self.state.soirDay] = {act: a.id, name: a.n, item: a.item, by: "C", status: "attente"};', 'o[self.state.soirDay] = {act: a.id, name: a.n, item: a.item, by: ME, status: "attente"};')
rep('return {act: c.act, status: c.status || "attente", by: c.by || "C"};', 'return {act: c.act, status: c.status || "attente", by: c.by || ME};')
rep('self._toast("Co propose « " + a.n + " » pour "', 'self._toast(NAME[ME] + " propose « " + a.n + " » pour "')
rep('out.soirPending = !!(cur && cur.status === "attente");', 'out.soirPending = !!(cur && cur.status === "attente" && (!REEL || cur.by !== ME));\n    out.soirWaiting = !!(REEL && cur && cur.status === "attente" && cur.by === ME);')
rep('[{id:"all", label:"Tout"}, {id:"C", label:"Moi (Co)"}, {id:"E", label:"Emie"}]', '[{id:"all", label:"Tout"}, {id:ME, label:"Moi (" + NAME[ME] + ")"}, {id:OTHER, label:NAME[OTHER]}]')
rep('draftWho: "C",', 'draftWho: ME,')
rep('wardWho: "C",', 'wardWho: ME,')
rep('ffWho: "C",', 'ffWho: ME,')
rep('projWho: "C",', 'projWho: ME,')
for old in ['"Co a mis un c', '"Nouveau petit mot de Co sur le pense-bête"', '"Co est aux courses : besoin de quelque chose ?"']:
    pass
s = s.replace('self._toast("Nouveau petit mot de Co sur le pense-bête")', 'self._toast("Nouveau petit mot de " + NAME[ME] + " sur le pense-bête")')
s = s.replace('self._toast("Co est aux courses : besoin de quelque chose ?")', 'self._toast(NAME[ME] + " est aux courses : besoin de quelque chose ?")')
s = re.sub(r'self\._toast\("Co a mis un c', 'self._toast(NAME[ME] + " a mis un c', s)

# statuts de soirée neutres
rep('attente:{l:"En attente d\'Emie"', 'attente:{l:REEL ? "En attente de réponse" : "En attente d\'Emie"')
rep('autre:{l:"Emie a une autre idée"', 'autre:{l:REEL ? "Une autre idée est proposée" : "Emie a une autre idée"')

# wishlist : celle de l'autre vient des données partagées
rep('out.herWishes = HER_WISHES.map(function (w) {', 'out.herWishes = (REEL ? (st.wishOther || []) : HER_WISHES).map(function (w) {')

# santé : soins jamais notés, pesées vides
rep('var last = SC.soins[so.id], d = Math.round(', 'var last = SC.soins[so.id] || TODAY_ISO, unk = !SC.soins[so.id], d = Math.round(')
rep('return {ed: ED("soin:" + ck + ":" + so.id, so.n, function () { return {d: last}; },', 'return {ed: ED("soin:" + ck + ":" + so.id, so.n, function () { return {d: unk ? "" : last}; },')
rep('name: so.n, last: "Dernier : " + dfmt(last),', 'name: so.n, last: unk ? "Pas encore noté" : "Dernier : " + dfmt(last),')
i = s.index('name: so.n, last: unk ?'); j = s.index('\n', i)
line = s[i:j]
line = line.replace('next: left > 0', 'next: unk ? "Date à noter (crayon)" : left > 0').replace('col: col,', 'col: unk ? "#8A8490" : col,')
s = s[:i] + line + s[j:]
rep('var pw = SC.poids, pmax = Math.max.apply(null, pw), pmin = Math.min.apply(null, pw) - 0.3;', 'var pw = SC.poids.length ? SC.poids : [0], pmax = Math.max.apply(null, pw), pmin = Math.min.apply(null, pw) - 0.3;')
rep('out.poidsNow = String(pw[pw.length - 1]).replace(".", ",") + " kg";', 'out.poidsNow = SC.poids.length ? String(pw[pw.length - 1]).replace(".", ",") + " kg" : "Pas encore de pesée";')

# calendrier : construit à partir des vraies données
rep('      week: WEEK.map(function (d) {', '      week: (REEL ? self._realWeek(st) : WEEK).map(function (d) {')
rep('        var sv = st.soirees[d.num - 13];', '        var sv = REEL ? st.soirees[d.idx] : st.soirees[d.num - 13];')
rep('out.isCal = true; out.sheetTitle = "Semaine du 9 nov.";', 'out.isCal = true; out.sheetTitle = REEL ? "Les 7 prochains jours" : "Semaine du 9 nov.";')
rep('  busy(st, inclBday) {', '''  _realWeek(st) {
    var col = {rdv: "#B23A48", achat: "#9A5B12", sortie: "#3E6FB0", papiers: "#4A7034"};
    return [0, 1, 2, 3, 4, 5, 6].map(function (n) {
      var d = new Date(TODAY_Y, TODAY_M, TODAY_D + n), iso = isoD(d), jl = JOURS_L[d.getDay()], its = [];
      st.missions.forEach(function (m) { if (!m.done && m.date === iso) its.push({t: m.t + (m.time ? " · " + m.time.replace(":", "h") : ""), c: col[m.type] || "#4A7034"}); });
      if (n === 0) st.tasks.forEach(function (t) { if (!t.done && t.when === "today") its.push({t: t.t, c: "#3E6FB0"}); });
      var mi = MEAL_ISO.indexOf(iso); if (mi >= 0 && st.meals[mi] && st.recipes[st.meals[mi]]) its.push({t: "Repas : " + st.recipes[st.meals[mi]].n, c: "#9A5B12"});
      return {short: jl.slice(0, 3), long: jl.charAt(0).toUpperCase() + jl.slice(1, 3) + ". " + d.getDate(), num: d.getDate(), idx: n, today: n === 0, items: its};
    });
  }
  busy(st, inclBday) {''')

# défis et hauts faits de progression : départ à zéro
rep('var DEFIS = [{n:"5 tâches chacun", c:3, e:4,', 'var DEFIS = [{n:"5 tâches chacun", c:REEL ? 0 : 3, e:REEL ? 0 : 4,')
rep('var HF_PROG = [', 'var HF_PROG0 = [')
i = s.index('var HF_PROG0 = ['); j = s.index('\n', i)
s = s[:j + 1] + 'var HF_PROG = HF_PROG0.map(function (h) { return REEL ? Object.assign({}, h, {v: 0}) : h; });\n' + s[j + 1:]

# ------------------------------------------------------------------ gabarit : textes et réglages de démo
def tpl(old, new, cnt=1):
    rep(old, new, cnt)
tpl('<span style="font-size: 13px; color: #4A4450">Semaine du 16 novembre. Touche un jour pour choisir le repas du soir.</span>',
    '<span style="font-size: 13px; color: #4A4450">{{ mealWeekTxt }} Touche un jour pour choisir le repas du soir.</span>')
rep('    out.mealsToCourses = function () {', '    out.mealWeekTxt = REEL ? "Semaine du " + MEAL_MON.getDate() + " " + MOIS_L[MEAL_MON.getMonth()] + "." : "Semaine du 16 novembre.";\n    out.mealsToCourses = function () {')
tpl('Proposer le planning à Emie', 'Proposer le planning à {{ otherName }}')
tpl('Ce qu\'Emie aimerait recevoir. Réserve une idée : Emie ne verra jamais ce que tu as pris.', 'Ce que {{ otherName }} aimerait recevoir. Réserve une idée : {{ otherName }} ne verra jamais ce que tu as pris.')
tpl('Emie voit cette liste pour t\'offrir quelque chose.', '{{ otherName }} voit cette liste pour t\'offrir quelque chose.')
tpl('Emie a été prévenue · l\'écran reste allumé', '{{ otherName }} est prévenu{{ otherE }} · l\'écran reste allumé')
rep("out.demoUi = !REEL; out.otherName = NAME[OTHER];", "out.demoUi = !REEL; out.otherE = OTHER === \"E\" ? \"e\" : \"\"; out.otherName = NAME[OTHER];")
tpl('Liste d\'Emie', 'Liste {{ deOther }}')
rep("out.otherE = OTHER", "out.deOther = OTHER === \"E\" ? \"d'Emie\" : \"de Co\"; out.otherE = OTHER")
tpl('Réponse d\'Emie (simulée pour la démo)', 'Ta réponse')
# réglages de démo masqués
def wrap_btn(marker):
    global s
    k = s.index(marker)
    a = s.rindex('<button', 0, k)
    b = s.index('</button>', k) + len('</button>')
    s = s[:a] + '<sc-if value="{{ demoUi }}" hint-placeholder-val="{{ false }}">' + s[a:b] + '</sc-if>' + s[b:]
for m in ['Démo : tout débloquer', 'Démo : heure du repas', 'Démo : nuit', 'Cacher une souris dans cette pièce (démo)', 'Nouvelle journée (démo : décoche l']:
    wrap_btn(m)
tpl('Démo : toutes les 30 s en moyenne (4 h dans l\'appli)', 'De temps en temps, un chat pique un sprint dans la maison')
open(P, 'w', encoding='utf-8').write(s)
print('mode réel ajouté')
