# Wishlist toute l'année (de Noël pendant l'événement), catégories de cadeaux, boîte à cadeaux sur l'étagère du salon.
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "wishCats" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
HEAD = '<sc-if value="{{ %s.hasHead }}" hint-placeholder-val="{{ false }}"><span style="margin-top: 4px; font-family: \'Pixelify Sans\', Inter, sans-serif; font-size: 16px; font-weight: 700; color: #9E2F2F">{{ %s.head }}</span></sc-if>\n'
# boîte jaune de l'étagère du salon : ouvre la wishlist toute l'année (ruban rouge dessus)
rep('<sc-if value="{{ fireOn }}" hint-placeholder-val="{{ true }}">',
    '<button type="button" onClick="{{ openWish }}" class="hot" aria-label="Boîte à cadeaux de l\'étagère : wishlist" style="position: absolute; left: 334px; top: 176px; width: 40px; height: 44px; background: none; border: 0; padding: 0; cursor: pointer"><svg width="24" height="30" viewBox="0 0 8 10" shape-rendering="crispEdges" aria-hidden="true" style="position: absolute; left: 8px; top: 10px"><rect x="1" y="0" width="2" height="2" fill="#B23A48"></rect><rect x="5" y="0" width="2" height="2" fill="#B23A48"></rect><rect x="3" y="1" width="2" height="1" fill="#8E2A36"></rect><rect x="3.5" y="2" width="1" height="8" fill="#B23A48"></rect><rect x="0" y="5" width="8" height="1" fill="#B23A48"></rect></svg></button>\n<sc-if value="{{ fireOn }}" hint-placeholder-val="{{ true }}">')
# titre
rep('if (sh && sh.type === "wish") { out.isWish = true; out.sheetTitle = "Wishlist de Noël"; out.sheetColor = "#9E2F2F"; }',
    'if (sh && sh.type === "wish") { out.isWish = true; out.sheetTitle = (st.event === "noel" && st.eventShown) ? "Wishlist de Noël" : "Wishlist"; out.sheetColor = "#9E2F2F"; }')
# en-têtes de catégorie dans les deux listes
rep('<sc-for list="{{ herWishes }}" as="hw" hint-placeholder-count="4">\n', '<sc-for list="{{ herWishes }}" as="hw" hint-placeholder-count="4">\n' + HEAD % ("hw", "hw"))
rep('<sc-for list="{{ myWishes }}" as="mw" hint-placeholder-count="3">\n<div style="display: flex; flex-direction: column; gap: 4px">\n',
    '<sc-for list="{{ myWishes }}" as="mw" hint-placeholder-count="3">\n<div style="display: flex; flex-direction: column; gap: 4px">\n' + HEAD % ("mw", "mw"))
rep('<sc-if value="{{ wishHer }}" hint-placeholder-val="{{ true }}">\n<div style="display: flex; flex-direction: column; gap: 8px">\n',
    '<sc-if value="{{ wishHer }}" hint-placeholder-val="{{ true }}">\n<div style="display: flex; flex-direction: column; gap: 8px">\n<sc-if value="{{ herEmpty }}" hint-placeholder-val="{{ false }}"><span style="padding: 10px; background: #FFFFFF; border: 2px dashed #C9C2B5; font-size: 13px; color: #5E5864">{{ otherName }} n\'a encore rien mis dans sa liste.</span></sc-if>\n')
# choix de la catégorie à l'ajout (sous le champ)
i = s.index('<sc-for list="{{ myWishes }}" as="mw"')
s = s[:i] + '''<div style="display: flex; flex-wrap: wrap; gap: 4px">
<sc-for list="{{ wishCats }}" as="wc" hint-placeholder-count="3"><button type="button" onClick="{{ wc.pick }}" aria-pressed="{{ wc.pressed }}" style="min-height: 36px; padding: 0 10px; background: {{ wc.bg }}; color: {{ wc.fg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{ wc.label }}</button></sc-for>
</div>
''' + s[i:]
# logique
rep('''    out.herWishes = (REEL ? (st.wishOther || []) : HER_WISHES).map(function (w) {
      var r = !!st.reserved[w.id];
      return {t: w.t,''', '''    var WCAT = [["gros", "Gros cadeau"], ["moyen", "Moyen cadeau"], ["petit", "Petit cadeau"]], wcOf = function (w) { return WCAT.some(function (c) { return c[0] === w.cat; }) ? w.cat : "moyen"; };
    var wSort = function (L) { return L.slice().sort(function (a, b) { return WCAT.map(function (c) { return c[0]; }).indexOf(wcOf(a)) - WCAT.map(function (c) { return c[0]; }).indexOf(wcOf(b)); }); };
    var wHead = function (L, i) { var c = wcOf(L[i]); return i === 0 || wcOf(L[i - 1]) !== c ? WCAT.filter(function (x) { return x[0] === c; })[0][1] : ""; };
    out.wishCats = WCAT.map(function (c) { var on = (st.wishCat || "moyen") === c[0]; return {label: c[1], pressed: on ? "true" : "false", bg: on ? "#9E2F2F" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({wishCat: c[0]}); }}; });
    var HW = wSort(REEL ? (st.wishOther || []) : HER_WISHES);
    out.herEmpty = !HW.length;
    out.herWishes = HW.map(function (w, wi) {
      var r = !!st.reserved[w.id];
      return {head: wHead(HW, wi), hasHead: !!wHead(HW, wi), t: w.t,''')
rep('''self.setState({myWishes: self.state.myWishes.concat([{id: "m" + self.state.nextWish, t: t}]), nextWish: self.state.nextWish + 1, wishDraft: ""});''',
    '''self.setState({myWishes: self.state.myWishes.concat([{id: "m" + self.state.nextWish, t: t, cat: self.state.wishCat || "moyen"}]), nextWish: self.state.nextWish + 1, wishDraft: ""});''')
rep('''    out.myWishes = st.myWishes.map(function (w) {
      return Object.assign({t: w.t,''', '''    var MW = wSort(st.myWishes);
    out.myWishes = MW.map(function (w, wi) {
      return Object.assign({head: wHead(MW, wi), hasHead: !!wHead(MW, wi), t: w.t,''')
rep('''ED("wish:" + w.id, w.t, function () { return {t: w.t, note: w.note || ""}; }, {f: [["t", "Envie", "text"], ["note", "Précision (taille, lien, couleur…)", "text", "facultatif"]]},
          function (d) { if (!String(d.t || "").trim()) return false; self.setState({myWishes: self.state.myWishes.map(function (x) { return x.id === w.id ? Object.assign({}, x, {t: cap(d.t), note: String(d.note || "").trim()}) : x; })}); },''',
'''ED("wish:" + w.id, w.t, function () { return {t: w.t, note: w.note || "", cat: wcOf(w)}; }, {f: [["t", "Envie", "text"], ["note", "Précision (taille, lien, couleur…)", "text", "facultatif"]], g: [["cat", "Catégorie", WCAT.map(function (c) { return [c[0], c[1], "#9E2F2F"]; })]]},
          function (d) { if (!String(d.t || "").trim()) return false; self.setState({myWishes: self.state.myWishes.map(function (x) { return x.id === w.id ? Object.assign({}, x, {t: cap(d.t), note: String(d.note || "").trim(), cat: d.cat || "moyen"}) : x; })}); },''')
rep("this.state = {victoires: [],", "this.state = {mig: {}, wishCat: \"moyen\", victoires: [],")
open(p, "w", encoding="utf-8").write(s)

t = open("app/store.js", encoding="utf-8").read()
t = t.replace('export const PERSO = ["notifOn", "reserved", "journalSeen", "hf", "mice", "xpDay"];', 'export const PERSO = ["notifOn", "reserved", "journalSeen", "hf", "mice", "xpDay", "mig"];', 1)
t = t.replace('''    // passage des jours
    const merged''', '''    // première envie de Co dans sa wishlist (une seule fois)
    let migPerso = false;
    if (ctx.me === "C" && !(patch.mig || {}).switch2) {
      const L = patch.myWishes || [];
      if (!L.some((w) => /switch 2/i.test(w.t || ""))) { patch.myWishes = [{ id: "w-switch2", t: "Nintendo Switch 2 Pokémon", cat: "gros" }].concat(L); missing.push("wishes"); }
      patch.mig = { ...(patch.mig || {}), switch2: true }; migPerso = true;
    }
    // passage des jours
    const merged''', 1)
t = t.replace('''    if (dirty.size) await flush();
    logic.onChange(onLocal);''', '''    if (dirty.size) await flush();
    if (migPerso) schedulePerso();
    logic.onChange(onLocal);''', 1)
assert '"mig"]' in t and "migPerso) schedulePerso" in t
open("app/store.js", "w", encoding="utf-8").write(t)
print("ok")
