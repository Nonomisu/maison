# Soirées : plusieurs propositions pour le même soir ; l'autre choisit parmi elles.
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "soirChoices" in s: print("déjà appliqué"); sys.exit()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
rep('''<span style="font-size: 12px; color: #5E5864">Ta réponse</span>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px">
<button type="button" onClick="{{ answerYes }}" style="min-height: 44px; background: #E4EEDC; color: #36532A; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">Partante</button>''',
'''<span style="font-size: 12px; color: #5E5864">{{ soirAskTxt }}</span>
<sc-for list="{{ soirChoices }}" as="sch" hint-placeholder-count="0"><button type="button" onClick="{{ sch.pick }}" style="min-height: 44px; background: #E4EEDC; color: #36532A; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 14px; font-weight: 600">{{ sch.label }}</button></sc-for>
<div style="display: grid; grid-template-columns: {{ soirAnsCols }}; gap: 6px">
<sc-if value="{{ soirSingle }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ answerYes }}" style="min-height: 44px; background: #E4EEDC; color: #36532A; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">Partante</button></sc-if>''')
rep('''    var tonight = st.soirees[0];''', '''    var soirLab = function (ev) { return ev && ev.alts && ev.alts.length > 1 ? ev.alts.map(function (a) { return a.name; }).join(" ou ") : (ev ? ev.name : ""); };
    var tonight = st.soirees[0];''')
rep('''out.soireeAria = "Table basse : nos soirées" + (tonight ? ", ce soir : " + tonight.name : "");''', '''out.soireeAria = "Table basse : nos soirées" + (tonight ? ", ce soir : " + soirLab(tonight) : "");''')
rep('''out.soirSummary = tonight ? "Ce soir : " + tonight.name + " · "''', '''out.soirSummary = tonight ? "Ce soir : " + soirLab(tonight) + " · "''')
rep('''aria: d.l + (ev ? " : " + ev.name : ""), pressed''', '''aria: d.l + (ev ? " : " + soirLab(ev) : ""), pressed''')
rep('''    out.soirName = cur ? cur.name : ""; out.soirBy = cur ? (cur.by === ME ? "Proposé par toi" : "Proposé par " + NAME[cur.by]) : "";''',
'''    var multi = !!(cur && cur.alts && cur.alts.length > 1 && cur.status === "attente");
    out.soirName = soirLab(cur); out.soirBy = cur ? (cur.by === ME ? (multi ? "Tes propositions : " + NAME[OTHER] + " choisira" : "Proposé par toi") : (multi ? NAME[cur.by] + " propose plusieurs choix" : "Proposé par " + NAME[cur.by])) : "";
    out.soirSingle = !multi; out.soirAnsCols = multi ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))";
    out.soirAskTxt = multi ? "Choisis une des propositions :" : "Ta réponse";
    out.soirChoices = multi ? cur.alts.map(function (a) { return {label: "Choisir « " + a.name + " »", pick: function () {
      var o = Object.assign({}, self.state.soirees), c = Object.assign({}, o[self.state.soirDay], {act: a.act, name: a.name, item: a.item}); delete c.alts; o[self.state.soirDay] = c;
      self.setState({soirees: o}); answer("accepte"); }}; }) : [];''')
rep('''      var o = Object.assign({}, self.state.soirees); o[self.state.soirDay] = {act: a.id, name: a.n, item: a.item, by: ME, status: "attente"};
      self.setState({soirees: o, soirSel: null});
      var quand = SOIR_DAYS[self.state.soirDay].l.toLowerCase();
      if (self._notify("soiree", OTHER, NAME[ME] + " propose « " + a.n + " » pour " + quand + ". Tu réponds dans Nos soirées ?")) self._toast("Proposition envoyée à " + NAME[OTHER]);''',
'''      var o = Object.assign({}, self.state.soirees), prev = o[self.state.soirDay], quand = SOIR_DAYS[self.state.soirDay].l.toLowerCase();
      // déjà une proposition en attente de ma part ce soir-là : on ajoute un choix au lieu de la remplacer
      if (REEL && prev && prev.status === "attente" && prev.by === ME && prev.act !== a.id) {
        var alts = (prev.alts && prev.alts.length ? prev.alts : [{act: prev.act, name: prev.name, item: prev.item}]).filter(function (x) { return x.act !== a.id; }).concat([{act: a.id, name: a.n, item: a.item}]);
        o[self.state.soirDay] = Object.assign({}, prev, {alts: alts});
        self.setState({soirees: o, soirSel: null});
        if (self._notify("soiree", OTHER, NAME[ME] + " propose " + alts.map(function (x) { return "« " + x.name + " »"; }).join(" ou ") + " pour " + quand + ". Tu choisis dans Nos soirées ?")) self._toast("Choix ajouté : " + NAME[OTHER] + " choisira entre " + alts.length);
        else self._toast("Choix ajouté (" + alts.length + " propositions)");
        return;
      }
      o[self.state.soirDay] = {act: a.id, name: a.n, item: a.item, by: ME, status: "attente"};
      self.setState({soirees: o, soirSel: null});
      if (self._notify("soiree", OTHER, NAME[ME] + " propose « " + a.n + " » pour " + quand + ". Tu réponds dans Nos soirées ?")) self._toast("Proposition envoyée à " + NAME[OTHER]);''')
rep('''      return {label: d.s + " " + d.n, text: ev ? ev.name + " · "''', '''      return {label: d.s + " " + d.n, text: ev ? soirLab(ev) + " · "''')
# libellé du bouton : ajouter un choix
rep('''    out.proposeLabel = selAct ? "Proposer « " + selAct.n + " » · " + SOIR_DAYS[st.soirDay].s + " " + SOIR_DAYS[st.soirDay].n : "Choisis une activité";''',
'''    var addMode = REEL && cur && cur.status === "attente" && cur.by === ME;
    out.proposeLabel = selAct ? (addMode ? "Ajouter « " + selAct.n + " » aux choix" : "Proposer « " + selAct.n + " » · " + SOIR_DAYS[st.soirDay].s + " " + SOIR_DAYS[st.soirDay].n) : (addMode ? "Choisis une autre activité à proposer" : "Choisis une activité");''')
open(p, "w", encoding="utf-8").write(s)
print("ok")
