# Retouches du 14 nov. : sous-titre des bruitages retiré, dates retirées des événements,
# entretien saisonnier remplacé par des tâches annuelles (même mois chaque année).
import re, sys
sys.path.insert(0, "outils")
from editeur import editor
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "annuelNew" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert c == n, (c, a[:80])
    s = s.replace(a, b)

# 1. bruitages
rep('<span style="font-size: 14px; font-weight: 600">Bruitages</span><span style="font-size: 12px; color: #5E5864">Petits sons créés par l\'appli, sans droits</span>',
    '<span style="font-size: 14px; font-weight: 600">Bruitages</span>')
# 2. événements sans dates
rep('label:"10 janv. · anniv. d\'Emie"', 'label:"Anniv. d\'Emie"')
rep('label:"29 sept. · anniv. de Co"', 'label:"Anniv. de Co"')
rep('label:"22 avril · nous deux"', 'label:"Nous deux"')
# 3. entretien : tâches annuelles
old_t = re.compile(r'(<h[23] style="margin: [^"]*">\{\{ entretienTitre \}\}</h[23]>)\n<span style="font-size: 12px; color: #5E5864">Proposé automatiquement selon la saison\.</span>\n<sc-for list="\{\{ seasonal \}\}" as="se".*?</sc-for>', re.S)
new_body = r'''\1
<span style="font-size: 12px; color: #5E5864">Ce qui revient chaque année le même mois : la tâche s'ajoute toute seule au ménage le 1er du mois.</span>
<sc-for list="{{ annuels }}" as="an" hint-placeholder-count="2">
<div style="display: flex; align-items: center; gap: 10px; padding: 6px 6px 6px 10px; background: {{ an.bg }}; border: 2px solid #2B2A30">
<span style="min-width: 72px; font-size: 12px; font-weight: 700; color: #36532A">{{ an.mois }}</span>
<span style="flex: 1; min-width: 0; font-size: 14px; font-weight: 600">{{ an.t }}</span>
<button type="button" onClick="{{ an.del }}" aria-label="{{ an.delLabel }}" style="width: 36px; height: 36px; flex-shrink: 0; background: #FFFFFF; color: #B23A48; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 18px; font-weight: 700">×</button>
</div>
</sc-for>
<sc-if value="{{ annuelVide }}" hint-placeholder-val="{{ false }}"><span style="font-size: 13px; color: #5E5864">Aucune tâche annuelle pour l'instant.</span></sc-if>
<sc-if value="{{ annuelNew.edClosed }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ annuelNew.edStart }}" style="min-height: 44px; background: #FFFFFF; color: #2B2A30; border: 2px dashed #4A7034; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">+ Ajouter une tâche annuelle</button></sc-if>
''' + editor("annuelNew").replace("\\", "\\\\")
s, n = old_t.subn(new_body, s); assert n == 2, n
rep('color: #36532A">Saison</span></sc-if>', 'color: #36532A">Annuel</span></sc-if>', 2)
# logique
a = s.index("    var SEAS_BY = {"); b = s.index("    out.storeMode = st.storeMode;")
s = s[:a] + '''    var MOIS_C = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var ANN = (st.annuels || []).slice().sort(function (x, y) { return ((x.m - TODAY_M + 12) % 12) - ((y.m - TODAY_M + 12) % 12); });
    out.annuels = ANN.map(function (a) {
      return {t: a.t, mois: MOIS_C[a.m], bg: a.m === TODAY_M ? "#E4EEDC" : "#FFFFFF", delLabel: "Supprimer " + a.t,
        del: function () { self.setState({annuels: (self.state.annuels || []).filter(function (x) { return x.id !== a.id; })}); }};
    });
    out.annuelVide = !ANN.length;
    out.annuelNew = ED("annuel:new", "tâche annuelle", function () { return {t: "", m: TODAY_M}; },
      {f: [["t", "Tâche", "text", "ex. Purger les radiateurs"]], g: [["m", "Mois", MOIS_C.map(function (n, i) { return [i, n, "#4A7034"]; })]]},
      function (d) {
        var t = cap(d.t); if (!t) return false;
        var id = "a" + Date.now().toString(36), m = typeof d.m === "number" ? d.m : TODAY_M, an = {id: id, t: t, m: m}, patch = {};
        if (m === TODAY_M) { an.y = TODAY_Y; patch.tasks = self.state.tasks.concat([{id: "an-" + id + "-" + TODAY_Y, t: t, freq: "une", seasonal: true, rec: "", pts: 10}]); }
        patch.annuels = (self.state.annuels || []).concat([an]);
        self.setState(patch);
      });
''' + s[b:]
a = s.index("var SEASONAL = ["); b = s.index("];", a) + 3
s = s[:a] + s[b:]
rep("this.state = {stats: {},", "this.state = {annuels: [], stats: {},")
open(p, "w", encoding="utf-8").write(s)

# store : clé partagée, passage des jours, suppression des 3 tâches d'entretien
p = "app/store.js"; t = open(p, encoding="utf-8").read()
t = t.replace('"agenda", "stats"];', '"agenda", "stats", "annuels"];', 1)
t = t.replace('''  // réserves
  if (Array.isArray(st.stocks)) {''', '''  // tâches annuelles : ajoutées au ménage le 1er de leur mois (une fois par an)
  if (Array.isArray(st.annuels) && Array.isArray(st.tasks)) {
    const y = +today.slice(0, 4), m = +today.slice(5, 7) - 1;
    const due = st.annuels.filter((a) => a.m === m && a.y !== y);
    if (due.length) {
      const base = out.tasks || st.tasks;
      out.annuels = st.annuels.map((a) => (due.includes(a) ? { ...a, y } : a));
      out.tasks = base.concat(due.filter((a) => !base.some((x) => x.id === `an-${a.id}-${y}`)).map((a) => ({ id: `an-${a.id}-${y}`, t: a.t, freq: "une", seasonal: true, rec: "", pts: 10 })));
    }
  }
  // réserves
  if (Array.isArray(st.stocks)) {''', 1)
t = t.replace('''    // poubelles et litières''', '''    // entretien saisonnier retiré (détecteur de fumée, VMC, joints)
    if (Array.isArray(patch.tasks) && patch.tasks.some((x) => ["dfm", "vmc", "joint"].includes(x.id))) {
      patch.tasks = patch.tasks.filter((x) => !["dfm", "vmc", "joint"].includes(x.id)); missing.push("tasks");
    }
    // poubelles et litières''', 1)
assert t.count("annuels") >= 5 and "dfm" in t
open(p, "w", encoding="utf-8").write(t)
print("ok")
