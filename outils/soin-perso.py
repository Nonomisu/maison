# Onglet « Soin perso » (privé, propre à chaque compte) dans la fiche de la salle de bain ; le miroir l'ouvre.
import sys
sys.path.insert(0, "outils")
from editeur import editor, pencil
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "santeIsPerso" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
# miroir cliquable
rep('<div aria-hidden="true" style="pointer-events: none; position: absolute; left: {{ bz.smiroir.x }}; top: {{ bz.smiroir.y }}; width: {{ bz.smiroir.w }}; height: {{ bz.smiroir.h }}; padding: 0; background: none; border: 0; cursor: pointer"><img src="{{ bz.smiroir.src }}" alt="" style="width: 100%; height: 100%; display: block; image-rendering: pixelated"></div>',
    '<button type="button" onClick="{{ openSoinPerso }}" class="hot" aria-label="Miroir : mes soins perso" style="position: absolute; left: {{ bz.smiroir.x }}; top: {{ bz.smiroir.y }}; width: {{ bz.smiroir.w }}; height: {{ bz.smiroir.h }}; padding: 0; background: none; border: 0; cursor: pointer"><img src="{{ bz.smiroir.src }}" alt="" style="width: 100%; height: 100%; display: block; image-rendering: pixelated"></button>')
L = s.split("\n")
a = next(i for i, l in enumerate(L) if l.startswith('<sc-if value="{{ isSante }}"'))
t = next(i for i in range(a, a + 8) if L[i] == "</div>")          # fin de la rangée d'onglets
e = next(i for i in range(t, len(L)) if L[i] == "</sc-if>" and L[i - 1] == "</div>" and "santeAddRdv" in L[i - 2])
perso = '''<sc-if value="{{ santeIsPerso }}" hint-placeholder-val="{{ false }}">
<span style="font-size: 12px; color: #5E5864">{{ spIntro }}</span>
<sc-if value="{{ spEmpty }}" hint-placeholder-val="{{ false }}"><span style="padding: 10px; background: #FFFFFF; border: 2px dashed #C9C2B5; font-size: 13px; color: #5E5864">Rien pour l'instant : ajoute un soin (coiffeur, gommage, masque…).</span></sc-if>
<sc-for list="{{ spList }}" as="sp" hint-placeholder-count="2">
<div style="display: flex; flex-direction: column; gap: 6px; padding: 10px; background: #FFFFFF; border: 2px solid #2B2A30">
<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px">
<span style="font-size: 15px; font-weight: 700">{{ sp.name }}</span>
<span style="font-size: 13px; font-weight: 700; color: {{ sp.col }}">{{ sp.next }}</span>
</div>
<div style="height: 10px; background: #E3DACD; border: 2px solid #2B2A30"><div style="height: 100%; width: {{ sp.pct }}; background: {{ sp.col }}"></div></div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 8px">
<span style="font-size: 12px; color: #5E5864">{{ sp.last }}</span>
<button type="button" onClick="{{ sp.done }}" style="min-height: 40px; padding: 0 10px; background: #F7F3EE; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">Fait aujourd'hui</button>
''' + pencil("sp") + '''
</div>
''' + editor("sp") + '''
</div>
</sc-for>
<sc-if value="{{ spNew.edClosed }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ spNew.edStart }}" style="min-height: 44px; background: #FFFFFF; color: #2B2A30; border: 2px dashed #3E6FB0; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">+ Ajouter un soin</button></sc-if>
''' + editor("spNew") + '''
</sc-if>'''
L = L[:t + 1] + [perso, '<sc-if value="{{ santeIsCat }}" hint-placeholder-val="{{ true }}">', '<div style="display: flex; flex-direction: column; gap: 10px">'] + L[t + 1:e - 1] + ["</div>", "</sc-if>"] + L[e - 1:]
s = "\n".join(L)

# logique : onglet en plus, fiche des chats sur le chat choisi
a = s.index("    var SC = st.sante[st.santeCat];"); b = s.index("    // planning des repas", a)
blk = s[a:b].replace("st.santeCat", "SCK")
blk = blk.replace("    var SC = st.sante[SCK];", '''    var SCK = st.santeCat === "perso" ? ORDER[0] : st.santeCat, SC = st.sante[SCK];''', 1)
blk = blk.replace("var on = SCK === k;", "var on = st.santeCat === k;")
s = s[:a] + blk + s[b:]
rep('''    out.isSante = !!(sh && sh.type === "sante"); if (out.isSante) { out.sheetTitle = "Santé des chats"; out.sheetColor = "#3E6FB0"; }''',
'''    out.isSante = !!(sh && sh.type === "sante"); if (out.isSante) { out.sheetTitle = st.santeCat === "perso" ? "Soin perso" : "Santé des chats"; out.sheetColor = "#3E6FB0"; }
    out.openSante = function () { self.setState({sheet: {type: "sante"}, santeCat: self.state.santeCat === "perso" ? ORDER[0] : self.state.santeCat}); };
    out.openSoinPerso = function () { self.setState({sheet: {type: "sante"}, santeCat: "perso"}); };
    out.santeIsPerso = st.santeCat === "perso"; out.santeIsCat = !out.santeIsPerso;
    // soins perso : enregistrés dans le profil de chacun, jamais montrés à l'autre
    var SPL = st.soinsPerso || [], setSP = function (fn) { self.setState({soinsPerso: fn(JSON.parse(JSON.stringify(self.state.soinsPerso || [])))}); };
    var spSpec = {f: [["n", "Soin", "text", "ex. Coiffeur"], ["every", "Tous les combien de jours ?", "number", "ex. 42"], ["last", "Fait la dernière fois le (facultatif)", "date"]]};
    var spSave = function (id) { return function (d) {
      var n = cap(d.n), ev = Math.round(num(d.every, 0)); if (!n || !(ev > 0)) return false;
      var last = /^\\d{4}-\\d{2}-\\d{2}$/.test(d.last || "") ? d.last : "";
      setSP(function (Lp) { if (!id) return Lp.concat([{id: "p" + Date.now().toString(36), n: n, every: ev, last: last}]); Lp.forEach(function (x) { if (x.id === id) { x.n = n; x.every = ev; x.last = last; } }); return Lp; });
    }; };
    out.spIntro = "Visible seulement par toi, " + NAME[ME] + " : " + NAME[OTHER] + " ne voit pas cet onglet.";
    out.spEmpty = !SPL.length;
    out.spList = SPL.map(function (x) {
      var d = x.last ? Math.round((TODAY - Date.UTC(+x.last.slice(0, 4), +x.last.slice(5, 7) - 1, +x.last.slice(8, 10))) / 864e5) : null, left = d === null ? null : x.every - d;
      var col = left === null ? "#8A8490" : left > x.every * 0.25 ? "#4A7034" : (left > 0 ? "#D9762B" : "#B23A48");
      var df = function (iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; };
      return Object.assign(ED("sp:" + x.id, x.n, function () { return {n: x.n, every: String(x.every), last: x.last || ""}; }, spSpec, spSave(x.id),
        function () { setSP(function (Lp) { return Lp.filter(function (y) { return y.id !== x.id; }); }); }), {
        name: x.n, col: col, pct: left === null ? "0%" : Math.max(0, Math.min(100, Math.round(left / x.every * 100))) + "%",
        next: left === null ? "Tous les " + x.every + " j" : left > 0 ? "Prochain dans " + left + " j" : left === 0 ? "Aujourd'hui" : "En retard de " + (-left) + " j",
        last: x.last ? "Dernier : " + df(x.last) : "Pas encore noté",
        done: function () { setSP(function (Lp) { Lp.forEach(function (y) { if (y.id === x.id) y.last = TODAY_ISO; }); return Lp; }); self._toast(x.n + " : noté pour aujourd'hui"); }});
    });
    out.spNew = ED("sp:new", "soin", function () { return {n: "", every: "", last: ""}; }, spSpec, spSave(null));''')
rep('''    out.openSante = function () { self.setState({sheet: {type: "sante"}}); };\n''', '')
# onglet « Soin perso » dans la rangée des chats
rep('''    out.santeCats = ORDER.map(function (k) { var on = st.santeCat === k;''', '''    out.santeCats = ORDER.concat(["perso"]).map(function (k) { if (k === "perso") { var onP = st.santeCat === "perso"; return {label: "Soin perso", pressed: onP ? "true" : "false", bg: onP ? "#3E6FB0" : "#FFFFFF", fg: onP ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({santeCat: "perso"}); }}; } var on = st.santeCat === k;''')
rep("this.state = {subDraft: null,", "this.state = {soinsPerso: [], subDraft: null,")
open(p, "w", encoding="utf-8").write(s)
t = open("app/store.js", encoding="utf-8").read()
t = t.replace('"xpDay", "mig"];', '"xpDay", "mig", "soinsPerso"];', 1); assert '"soinsPerso"]' in t
open("app/store.js", "w", encoding="utf-8").write(t)
print("ok")
