# Petites victoires (bocal à étoiles du bureau) et XP de la to-do FFXIV.
import sys
sys.path.insert(0, "outils")
from editeur import editor, pencil
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "isVict" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)

# --- bocal dans le bureau (sur le haut de l'étagère à cubes)
rep('<button type="button" onClick="{{ openAgenda }}" class="hot"',
    '<button type="button" onClick="{{ openVict }}" class="hot" aria-label="{{ victAria }}" style="position: absolute; left: 172px; top: 280px; width: 47px; height: 56px; padding: 0; background: none; border: 0; cursor: pointer; display: flex; align-items: flex-end; justify-content: center"><img src="{{ victBocal }}" alt="" style="width: 33px; height: 45px; display: block; image-rendering: pixelated"></button>\n<button type="button" onClick="{{ openAgenda }}" class="hot"')

# --- fiche
BADGE = '<span style="align-self: flex-start; padding: 1px 6px; background: {{ %s.sizeBg }}; color: #FFFFFF; font-size: 11px; font-weight: 700">{{ %s.size }}</span>'
fiche = '''<sc-if value="{{ isVict }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 8px">
<div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #FFF8E6; border: 2px solid #2B2A30">
<img src="{{ victBocal }}" alt="" style="width: 33px; height: 45px; image-rendering: pixelated">
<span style="flex: 1; font-size: 13px; color: #4A4450">Des objectifs importants, fixés par vous pour vous motiver. Petite victoire 15 XP, moyenne 40 XP, grande 100 XP, répartis entre les trois chats. {{ victStarsTxt }}</span>
</div>
<h3 style="margin: 4px 0 0; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 17px; font-weight: 700">En cours</h3>
<sc-if value="{{ victTodoEmpty }}" hint-placeholder-val="{{ false }}"><span style="padding: 10px; background: #FFFFFF; border: 2px dashed #C9C2B5; font-size: 13px; color: #5E5864">Aucune victoire en cours : fixez-en une !</span></sc-if>
<sc-for list="{{ victTodo }}" as="vt" hint-placeholder-count="2">
<div style="display: flex; flex-direction: column; gap: 4px">
<div style="display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; background: #FFFFFF; border: 2px solid #2B2A30">
<span style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px">
''' + BADGE % ("vt", "vt") + '''
<span style="font-size: 14px; font-weight: 600">{{ vt.t }}</span>
<sc-if value="{{ vt.hasNote }}" hint-placeholder-val="{{ false }}"><span style="font-size: 12px; color: #5E5864">{{ vt.note }}</span></sc-if>
</span>
<button type="button" onClick="{{ vt.win }}" aria-label="{{ vt.winLabel }}" style="min-width: 76px; min-height: 40px; padding: 0 8px; background: #D9A441; color: #2B2A30; border: 2px solid #2B2A30; cursor: pointer; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 14px; font-weight: 700">Gagnée !</button>
''' + pencil("vt") + '''
</div>
''' + editor("vt") + '''
</div>
</sc-for>
<sc-if value="{{ victNew.edClosed }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ victNew.edStart }}" style="min-height: 44px; background: #FFFFFF; color: #2B2A30; border: 2px dashed #B8862A; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">+ Nouvelle victoire</button></sc-if>
''' + editor("victNew") + '''
<sc-if value="{{ victHasDone }}" hint-placeholder-val="{{ false }}">
<h3 style="margin: 6px 0 0; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 17px; font-weight: 700">Gagnées</h3>
<sc-for list="{{ victDone }}" as="vd" hint-placeholder-count="2">
<div style="display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; background: #F1ECE4; border: 2px solid #2B2A30">
<span style="font-size: 18px; color: #E08A2E" aria-hidden="true">★</span>
<span style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px">
''' + BADGE % ("vd", "vd") + '''
<span style="font-size: 14px; font-weight: 600">{{ vd.t }}</span>
<span style="font-size: 12px; color: #5E5864">{{ vd.meta }}</span>
</span>
<button type="button" onClick="{{ vd.undo }}" aria-label="{{ vd.undoLabel }}" style="min-height: 36px; padding: 0 8px; background: #FFFFFF; color: #2B2A30; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">Annuler</button>
</div>
</sc-for>
</sc-if>
</div>
</sc-if>
'''
rep('<sc-if value="{{ isAgenda }}" hint-placeholder-val="{{ false }}">', fiche + '<sc-if value="{{ isAgenda }}" hint-placeholder-val="{{ false }}">')

# --- note dans la to-do FFXIV
rep('''<sc-if value="{{ isFf }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 10px">''', '''<sc-if value="{{ isFf }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 12px; color: #5E5864">+2 XP par case cochée pour le chat le moins avancé, jusqu'à 20 XP par jour et par personne.</span>''')

# --- logique
rep('    out.openAgenda = function () { self.setState({sheet: {type: "agenda"}}); };', '''    // ---------- petites victoires
    var VSZ = {petite: {n: "Petite victoire", xp: 15, bg: "#4A7034"}, moyenne: {n: "Moyenne victoire", xp: 40, bg: "#3E6FB0"}, grande: {n: "Grande victoire", xp: 100, bg: "#B5653A"}};
    var VL = st.victoires || [], vDone = VL.filter(function (v) { return v.done; }), nStar = vDone.length;
    var setV = function (fn) { self.setState({victoires: fn(JSON.parse(JSON.stringify(self.state.victoires || [])))}); };
    var vSpec = {f: [["t", "Victoire", "text", "ex. Finir le dossier de la mutuelle"], ["note", "Détail (facultatif)", "text"]],
      g: [["size", "Taille", [["petite", "Petite · 15 XP", "#4A7034"], ["moyenne", "Moyenne · 40 XP", "#3E6FB0"], ["grande", "Grande · 100 XP", "#B5653A"]]]]};
    out.openVict = function () { self.setState({sheet: {type: "victoires"}}); };
    out.isVict = !!(sh && sh.type === "victoires");
    if (out.isVict) { out.sheetTitle = "Petites victoires"; out.sheetColor = "#B8862A"; }
    out.victBocal = "a/deco-bocal-" + (nStar === 0 ? 0 : nStar < 3 ? 1 : nStar < 6 ? 2 : nStar < 10 ? 3 : nStar < 15 ? 4 : 5) + ".svg";
    out.victAria = "Bocal à étoiles : petites victoires (" + nStar + " étoile" + (nStar > 1 ? "s" : "") + ")";
    out.victStarsTxt = nStar ? nStar + " étoile" + (nStar > 1 ? "s" : "") + " dans le bocal." : "Chaque victoire gagnée ajoute une étoile dans le bocal.";
    out.victTodo = VL.filter(function (v) { return !v.done; }).map(function (v) {
      var z = VSZ[v.size] || VSZ.petite;
      return Object.assign(ED("vict:" + v.id, v.t, function () { return {t: v.t, note: v.note || "", size: v.size || "petite"}; }, vSpec,
        function (d) { var t = cap(d.t); if (!t) return false; setV(function (L) { L.forEach(function (x) { if (x.id === v.id) { x.t = t; x.note = String(d.note || "").trim(); x.size = d.size || "petite"; } }); return L; }); },
        function () { setV(function (L) { return L.filter(function (x) { return x.id !== v.id; }); }); }), {
        t: v.t, note: v.note || "", hasNote: !!v.note, size: z.n + " · " + z.xp + " XP", sizeBg: z.bg, winLabel: "Victoire gagnée : " + v.t,
        win: function () {
          spreadXp(z.xp, 1); SFX.play("mission");
          setV(function (L) { L.forEach(function (x) { if (x.id === v.id) { x.done = true; x.doneOn = TODAY_ISO; x.doneBy = ME; } }); return L; });
          self._toast && self._toast("Victoire ! +" + z.xp + " XP pour les trois chats · une étoile de plus dans le bocal");
          self._notify && self._notify("mot", OTHER, NAME[ME] + " a remporté une victoire : « " + v.t + " » !");
        }});
    });
    out.victTodoEmpty = !out.victTodo.length;
    out.victHasDone = nStar > 0;
    out.victDone = vDone.slice().sort(function (a, b) { return (b.doneOn || "").localeCompare(a.doneOn || ""); }).map(function (v) {
      var z = VSZ[v.size] || VSZ.petite;
      return {t: v.t, size: z.n + " · " + z.xp + " XP", sizeBg: z.bg, meta: "Gagnée le " + (v.doneOn ? fmtD(parseD(v.doneOn)) : "?") + (v.doneBy ? " · validée par " + NAME[v.doneBy] : ""),
        undoLabel: "Annuler la victoire " + v.t,
        undo: function () { spreadXp(z.xp, -1); setV(function (L) { L.forEach(function (x) { if (x.id === v.id) { x.done = false; delete x.doneOn; delete x.doneBy; } }); return L; }); }};
    });
    out.victNew = ED("vict:new", "victoire", function () { return {t: "", note: "", size: "petite"}; }, vSpec,
      function (d) { var t = cap(d.t); if (!t) return false; setV(function (L) { return L.concat([{id: "v" + Date.now().toString(36), t: t, note: String(d.note || "").trim(), size: d.size || "petite", by: ME}]); }); });
    out.openAgenda = function () { self.setState({sheet: {type: "agenda"}}); };''')

# --- XP de la to-do FFXIV : +2 au chat le moins avancé, 20 par jour et par personne
rep('''          toggle: function () { if (!x.d) self._textTitles("ff", x.t, self.state.ffWho); setFf(function (L) { L.forEach(function (y) { if (y.id === x.id) y.d = !y.d; }); }); },''',
'''          toggle: function () {
            var on = !x.d, k = null, g = 0, day = (self.state.xpDay && self.state.xpDay.d === TODAY_ISO) ? JSON.parse(JSON.stringify(self.state.xpDay)) : {d: TODAY_ISO, n: {}, sum: 0};
            day.ff = day.ff || 0;
            if (on) { self._textTitles("ff", x.t, self.state.ffWho); if (day.ff < 20) { k = lowestCat(); g = giveXp(k, Math.min(2, 20 - day.ff)); day.ff += g; } }
            else if (x.xpOn === TODAY_ISO && x.xpG && x.xpBy === ME) { takeXp(x.xpK, x.xpG); day.ff = Math.max(0, day.ff - x.xpG); }
            setFf(function (L) { L.forEach(function (y) { if (y.id === x.id) { y.d = on; if (on && g) { y.xpOn = TODAY_ISO; y.xpK = k; y.xpG = g; y.xpBy = ME; } else if (!on) { delete y.xpOn; delete y.xpK; delete y.xpG; delete y.xpBy; } } }); });
            self.setState({xpDay: day});
          },''')
rep("this.state = {annuels: [],", "this.state = {victoires: [], annuels: [],")
open(p, "w", encoding="utf-8").write(s)
t = open("app/store.js", encoding="utf-8").read()
t = t.replace('"stats", "annuels"];', '"stats", "annuels", "victoires"];', 1); assert '"victoires"]' in t
open("app/store.js", "w", encoding="utf-8").write(t)
print("ok")
