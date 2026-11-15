# Missions : catégorie « Autres ». Courses : magasin (Drive, Grand Frais) par article, choix à l'ajout et filtre.
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "shopMags" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
# --- missions
rep('{id:"papiers", l:"Papiers", bg:"#CDE8C1", pts:80}];', '{id:"papiers", l:"Papiers", bg:"#CDE8C1", pts:80}, {id:"autre", l:"Autres", bg:"#E3DACD", pts:50}];')
rep('var col = {rdv: "#B23A48", achat: "#9A5B12", sortie: "#3E6FB0", papiers: "#4A7034"};', 'var col = {rdv: "#B23A48", achat: "#9A5B12", sortie: "#3E6FB0", papiers: "#4A7034", autre: "#6B6470"};')
rep('<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px">\n<sc-for list="{{ missTypes }}"', '<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px">\n<sc-for list="{{ missTypes }}"')
# --- courses : choix du magasin sous le champ, filtre au-dessus des rayons
CHIP = '<button type="button" onClick="{{ %s.pick }}" aria-pressed="{{ %s.pressed }}" style="flex-shrink: 0; min-height: 34px; padding: 0 10px; background: {{ %s.bg }}; color: {{ %s.fg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{ %s.label }}</button>'
rep('<sc-if value="{{ demoUi }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ startPhoto }}"',
    '<div style="display: flex; align-items: center; gap: 6px; overflow-x: auto"><span style="flex-shrink: 0; font-size: 12px; font-weight: 600; color: #5E5864">Où ?</span>\n<sc-for list="{{ shopMags }}" as="sm" hint-placeholder-count="3">' + CHIP % (("sm",) * 5) + '</sc-for>\n</div>\n<sc-if value="{{ demoUi }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ startPhoto }}"')
rep('<sc-for list="{{ rayons }}" as="ray" hint-placeholder-count="4">',
    '<div style="display: flex; align-items: center; gap: 6px; overflow-x: auto; padding: 0 0 2px"><span style="flex-shrink: 0; font-size: 12px; font-weight: 600; color: #5E5864">Voir :</span>\n<sc-for list="{{ shopFilters }}" as="sf" hint-placeholder-count="4">' + CHIP % (("sf",) * 5) + '</sc-for>\n</div>\n<sc-if value="{{ shopFilterEmpty }}" hint-placeholder-val="{{ false }}"><span style="padding: 10px; background: #FFFFFF; border: 2px dashed #C9C2B5; font-size: 13px; color: #5E5864">{{ shopFilterEmptyTxt }}</span></sc-if>\n<sc-for list="{{ rayons }}" as="ray" hint-placeholder-count="4">')
# logique
rep('''      var it = {id: self.state.nextId, n: n.charAt(0).toUpperCase() + n.slice(1), q: "", r: guessRayon(n), by: ME};''',
    '''      var it = {id: self.state.nextId, n: n.charAt(0).toUpperCase() + n.slice(1), q: "", r: guessRayon(n), by: ME};
      if (self.state.shopMag) it.mag = self.state.shopMag;''')
rep('''    out.rayons = RAYONS.map(function (r) {
      var list = items.filter(function (i) { return i.r === r && !(st.storeMode && i.done); });''', '''    var MAGS = [["", "Partout"], ["drive", "Drive"], ["gf", "Grand Frais"]], magN = {drive: "Drive", gf: "Grand Frais"};
    var chip = function (on) { return {pressed: on ? "true" : "false", bg: on ? "#9A5B12" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30"}; };
    out.shopMags = MAGS.map(function (m) { return Object.assign(chip((st.shopMag || "") === m[0]), {label: m[1], pick: function () { self.setState({shopMag: m[0]}); }}); });
    var SF = st.shopFilter || "tout";
    out.shopFilters = [["tout", "Tout"], ["drive", "Drive"], ["gf", "Grand Frais"], ["sans", "Sans magasin"]].map(function (f) { return Object.assign(chip(SF === f[0]), {label: f[1], pick: function () { self.setState({shopFilter: f[0]}); }}); });
    var magOk = function (i) { return SF === "tout" || (SF === "sans" ? !i.mag : i.mag === SF); };
    out.shopFilterEmpty = SF !== "tout" && items.length > 0 && !items.some(magOk);
    out.shopFilterEmptyTxt = "Aucun article " + (SF === "sans" ? "sans magasin" : "pour " + magN[SF]) + " dans la liste.";
    out.rayons = RAYONS.map(function (r) {
      var list = items.filter(function (i) { return i.r === r && !(st.storeMode && i.done) && magOk(i); });''')
rep('''            name: i.n, meta: (i.q ? i.q + " · " : "") + w.label, done: !!i.done,''', '''            name: i.n, meta: (i.mag ? magN[i.mag] + " · " : "") + (i.q ? i.q + " · " : "") + w.label, done: !!i.done,''')
rep('''            ed: ED("item:" + i.id, i.n, function () { return {n: i.n, q: i.q || "", r: i.r, by: i.by === "E" ? "E" : "C"}; },
              {f: [["n", "Article", "text"], ["q", "Quantité", "text", "facultatif"]], g: [["r", "Rayon", RAYONS.map(function (r) { return [r, r]; })], ["by", "Ajouté par", WHO_OPTS]]},
              function (d) { if (!String(d.n || "").trim()) return false; self.setState({items: self.state.items.map(function (x) { return x.id === i.id ? Object.assign({}, x, {n: cap(d.n), q: String(d.q || "").trim(), r: d.r, by: d.by}) : x; })}); }),''',
'''            ed: ED("item:" + i.id, i.n, function () { return {n: i.n, q: i.q || "", r: i.r, by: i.by === "E" ? "E" : "C", mag: i.mag || ""}; },
              {f: [["n", "Article", "text"], ["q", "Quantité", "text", "facultatif"]], g: [["mag", "Où ?", MAGS.map(function (m) { return [m[0], m[1], "#9A5B12"]; })], ["r", "Rayon", RAYONS.map(function (r) { return [r, r]; })], ["by", "Ajouté par", WHO_OPTS]]},
              function (d) { if (!String(d.n || "").trim()) return false; self.setState({items: self.state.items.map(function (x) { if (x.id !== i.id) return x; var y = Object.assign({}, x, {n: cap(d.n), q: String(d.q || "").trim(), r: d.r, by: d.by}); if (d.mag) y.mag = d.mag; else delete y.mag; return y; })}); }),''')
rep("this.state = {soinsPerso: [],", 'this.state = {shopMag: "", shopFilter: "tout", soinsPerso: [],')
open(p, "w", encoding="utf-8").write(s)
print("ok")
