#!/usr/bin/env python3
"""Retire les restes de la démo dans l'appli réelle (src/Main.dc.html). Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'giveXp' in s: sys.exit('déjà appliqué')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:90]))
    s = s.replace(o, n)
def wrap(marker, cond='demoUi', back=1):
    """Entoure l'élément <button> qui contient `marker` d'un sc-if."""
    global s
    k = s.index(marker); a = s.rindex('<button', 0, k); b = s.index('</button>', k) + len('</button>')
    s = s[:a] + '<sc-if value="{{ %s }}" hint-placeholder-val="{{ false }}">' % cond + s[a:b] + '</sc-if>' + s[b:]

# 1. boutons de test qui débloqueraient les hauts faits sans les voir
wrap('onClick="{{ hf.test }}"')
rep('<sc-if value="{{ demoAnims }}" hint-placeholder-val="{{ false }}">\n<button type="button" onClick="{{ sc.zoomTest }}"', '<sc-if value="{{ demoAnimsTest }}" hint-placeholder-val="{{ false }}">\n<button type="button" onClick="{{ sc.zoomTest }}"')
rep('    out.demoAnims = st.demoUnlock;', '    out.demoAnims = st.demoUnlock; out.demoAnimsTest = st.demoUnlock && !REEL;')
# 2. photo de recette : c'était une démo (gratin fixe) ; les photos HelloFresh viendront plus tard
wrap('onClick="{{ startPhoto }}"')
# 3. arbre à chat : pas d'aperçu avant le niveau 11 dans l'appli
rep('      {id:"treeOn", l:"Arbre à chat", sub:"Aperçu : débloqué au niveau 11"},', '      REEL && FOYER_LVL < 11 ? null : {id:"treeOn", l:"Arbre à chat", sub:REEL ? "Débloqué au niveau 11" : "Aperçu : débloqué au niveau 11"},')
i = s.index('    out.optFurn = ['); j = s.index('].map(function (f) {', i)
s = s[:j] + '].filter(Boolean).map(function (f) {' + s[j + len('].map(function (f) {'):]
# 4. XP annoncée mais jamais donnée : soins (+10 Tsunky), réserves (+5 Bao)
rep('    // éditeur générique : chaque fiche passe par lui pour modifier un élément\n', '''    // XP donnée à un chat (et donc au foyer)
    var giveXp = function (k, n) { var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), an = Object.assign({}, self.state.anim); xp[k] += n; while (xp[k] >= 100) { xp[k] -= 100; lvl[k] += 1; } an[k] = "ronron"; self.setState({xp: xp, lvl: lvl, anim: an}); };
    // éditeur générique : chaque fiche passe par lui pour modifier un élément
''')
rep('reset: function () { setStock(x.id, function () { return {ago: 0}; }); self._toast(', 'reset: function () { setStock(x.id, function () { return {ago: 0}; }); giveXp("bao", 5); self._toast(')
rep('addPack: function () { setStock(x.id, function (y) { return {qty: y.qty + x.pack}; }); self._toast(', 'addPack: function () { setStock(x.id, function (y) { return {qty: y.qty + x.pack}; }); giveXp("bao", 5); self._toast(')
rep('sa[self.state.santeCat].soins[so.id] = TODAY_ISO; self.setState({sante: sa}); self._toast(', 'sa[self.state.santeCat].soins[so.id] = TODAY_ISO; self.setState({sante: sa}); giveXp("tsunky", 10); self._toast(')
# 5. textes
rep("Ce que {{ otherName }} aimerait recevoir.", "{{ ceQueOther }} aimerait recevoir.")
rep("out.deOther = OTHER", "out.ceQueOther = OTHER === \"E\" ? \"Ce qu'Emie\" : \"Ce que Co\"; out.deOther = OTHER")
rep('Préparée à partir des réserves, de la santé et des contacts. Chaque consigne', 'Les consignes pour la personne qui garde les chats. Chacune')
rep('<span style="font-size: 12px; color: #5E5864">{{ poidsTrend }} sur les dernières pesées</span>', '<sc-if value="{{ hasPoids }}" hint-placeholder-val="{{ true }}"><span style="font-size: 12px; color: #5E5864">{{ poidsTrend }} sur les dernières pesées</span></sc-if>')
rep('    out.poidsNow = SC.poids.length ?', '    out.hasPoids = SC.poids.length > 1;\n    out.poidsNow = SC.poids.length ?')
# 6. entretien de saison : le mois courant et une liste par saison
rep('Entretien de novembre</h3>', '{{ entretienTitre }}</h3>')
rep('Entretien de novembre</h2>', '{{ entretienTitre }}</h2>')
rep('    out.seasonal = SEASONAL.map(function (se) {', '''    out.entretienTitre = "Entretien de " + MOIS_L[TODAY_M];
    var SEAS_BY = {hiver: [{id:"sh1", t:"Dégivrer le congélateur", why:"Une fois l'hiver"}, {id:"sh2", t:"Aérer chaque matin 10 minutes", why:"Contre l'humidité"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}],
      printemps: [{id:"sp1", t:"Nettoyer les vitres", why:"Le grand ménage de printemps"}, {id:"sp2", t:"Laver les rideaux", why:"Une fois au printemps"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}],
      ete: [{id:"se1", t:"Nettoyer le filtre de la clim", why:"Avant les fortes chaleurs"}, {id:"se2", t:"Nettoyer les moustiquaires", why:"Une fois l'été"}, {id:"dfm", t:"Tester le détecteur de fumée", why:"Une fois par saison"}]};
    var seasonal0 = REEL ? (SEAS_BY[{noel: "hiver", classique: "automne"}[st.saison] || st.saison] || SEASONAL) : SEASONAL;
    out.seasonal = seasonal0.map(function (se) {''')
# 7. rappels et notifications : pas encore envoyés tant que les notifications push ne sont pas branchées
rep('rem.push({label: r.l + (past ? " · envoyé" :', 'rem.push({label: r.l + (past ? (REEL ? " · passé" : " · envoyé") :')
rep('out.toastHead = st.toastHead || "Notification envoyée à " + NAME[OTHER];', 'out.toastHead = st.toastHead || (REEL ? "Maison" : "Notification envoyée à " + NAME[OTHER]);')
# 8. barème : courses
rep('{t:"Liste de courses vidée en mode magasin", v:"8 XP"}', '{t:"Courses faites (bouton en bas de la liste)", v:"15 XP"}')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
