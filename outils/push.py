#!/usr/bin/env python3
"""Notifications : la logique prépare les messages à envoyer à l'autre (window.MAISON_NOTIFY),
et les réglages permettent d'activer les notifications sur l'appareil (window.MAISON_PUSH). Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if '_notify' in s: sys.exit('déjà appliqué')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:100]))
    s = s.replace(o, n)
rep('    // XP donnée à un chat (et donc au foyer)\n', '''    // notification à l'autre (envoyée par le service du VPS si ses réglages l'acceptent)
    self._notify = function (kind, to, text) { if (REEL && typeof window !== "undefined" && window.MAISON_NOTIFY) { window.MAISON_NOTIFY(kind, to, text); return true; } return false; };
    // XP donnée à un chat (et donc au foyer)
''')
# petit mot
rep('''      if (self.state.notifOn.mot && self._toast) self._toast("Nouveau petit mot de " + NAME[ME] + " sur le pense-bête");''',
    '''      if (self._notify("mot", OTHER, "Nouveau petit mot de " + NAME[ME] + " : « " + (t.length > 80 ? t.slice(0, 77) + "…" : t) + " »")) self._toast("Petit mot épinglé · " + NAME[OTHER] + " est prévenu" + (OTHER === "E" ? "e" : ""));
      else if (self.state.notifOn.mot && self._toast) self._toast("Nouveau petit mot de " + NAME[ME] + " sur le pense-bête");''')
# cœur
rep('''if (!n.liked && n.by !== NAME[ME] && self.state.notifOn.coeur && self._toast) self._toast(NAME[ME] + " a mis un cœur à ton petit mot"); }});''',
    '''if (!n.liked && n.by !== NAME[ME]) { if (!self._notify("coeur", n.by === "Co" ? "C" : "E", NAME[ME] + " a mis un cœur à ton petit mot ♥") && self.state.notifOn.coeur && self._toast) self._toast(NAME[ME] + " a mis un cœur à ton petit mot"); } }});''')
# mode magasin
rep('''out.toggleStore = function () { var on = !self.state.storeMode; self.setState({storeMode: on}); if (on && self.state.notifOn.magasin && self._toast) self._toast(NAME[ME] + " est aux courses : besoin de quelque chose ?"); };''',
    '''out.toggleStore = function () { var on = !self.state.storeMode; self.setState({storeMode: on}); if (on) { if (!self._notify("magasin", OTHER, NAME[ME] + " est aux courses : besoin de quelque chose ? Ajoute-le à la liste.") && self.state.notifOn.magasin && self._toast) self._toast(NAME[ME] + " est aux courses : besoin de quelque chose ?"); } };''')
# planning des repas
rep('''    out.mealsPropose = function () { self._toast(''', '''    out.mealsPropose = function () { self._notify("soiree", OTHER, NAME[ME] + " propose le planning des repas de la semaine : à valider ou changer dans la cuisine."); self._toast(''')
# soirées
rep('''      if (self.state.notifOn.soiree && self._toast) self._toast(NAME[ME] + " propose « " + a.n + " » pour " + SOIR_DAYS[self.state.soirDay].l.toLowerCase());''',
    '''      var quand = SOIR_DAYS[self.state.soirDay].l.toLowerCase();
      if (self._notify("soiree", OTHER, NAME[ME] + " propose « " + a.n + " » pour " + quand + ". Tu réponds dans Nos soirées ?")) self._toast("Proposition envoyée à " + NAME[OTHER]);
      else if (self.state.notifOn.soiree && self._toast) self._toast(NAME[ME] + " propose « " + a.n + " » pour " + quand);''')
rep('''    var answer = function (status) { var cs = self.state.soirees[self.state.soirDay];''', '''    var answer = function (status) { var cs = self.state.soirees[self.state.soirDay];
      if (cs && cs.by && cs.by !== ME) self._notify("soiree", cs.by, NAME[ME] + ({accepte: " accepte « " + cs.name + " » pour ", autre: " a une autre idée que « " + cs.name + " » pour ", refuse: " ne peut pas pour « " + cs.name + " » "})[status] + (SOIR_DAYS[self.state.soirDay] || {l: ""}).l.toLowerCase().replace("ce soir · ", "ce soir, ") + ".");''')
# réglages : activer les notifications sur cet appareil
rep('''<sc-if value="{{ acc.notifs.isOpen }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 10px; padding: 2px 2px 8px">
''', '''<sc-if value="{{ acc.notifs.isOpen }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 10px; padding: 2px 2px 8px">
<sc-if value="{{ demoReel }}" hint-placeholder-val="{{ false }}">
<div style="display: flex; flex-direction: column; gap: 6px; padding: 10px; background: #FFFFFF; border: 2px solid #2B2A30">
<span style="font-size: 14px; font-weight: 600">Sur cet appareil</span>
<span style="font-size: 12px; color: #5E5864">{{ pushTxt }}</span>
<sc-if value="{{ pushCan }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ pushBtn }}" style="min-height: 44px; background: {{ pushBg }}; color: {{ pushFg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 14px; font-weight: 600">{{ pushLabel }}</button></sc-if>
</div>
<span style="font-size: 12px; color: #5E5864">Les réglages ci-dessous choisissent ce que tu reçois, sur tous tes appareils.</span>
</sc-if>
''')
rep('    out.notifPrefs = NOTIF_PREFS.map(function (p) {', '''    var PS = st.pushState || "chargement";
    out.pushTxt = {chargement: "Vérification…", unsupported: "Ce navigateur ne reçoit pas les notifications. Sur iPhone : ouvre l'appli depuis l'écran d'accueil (Safari › Partager › Sur l'écran d'accueil).", denied: "Les notifications sont bloquées pour ce site : autorise-les dans les réglages du navigateur ou du téléphone.", off: "Les notifications ne sont pas activées sur cet appareil.", on: "Notifications activées sur cet appareil.", erreur: "L'activation n'a pas marché. Réessaie, ou envoie une capture à Claude."}[PS] || "";
    out.pushCan = PS === "off" || PS === "on" || PS === "erreur"; out.pushLabel = PS === "on" ? "Désactiver sur cet appareil" : "Activer les notifications";
    out.pushBg = PS === "on" ? "#FFFFFF" : "#4A7034"; out.pushFg = PS === "on" ? "#2B2A30" : "#FFFFFF";
    out.pushBtn = function () { var P = typeof window !== "undefined" && window.MAISON_PUSH; if (!P) return; (PS === "on" ? P.disable() : P.enable()).then(function () { return P.state(); }).then(function (x) { self.setState({pushState: x}); if (x === "on") self._toast("Notifications activées : une notification de bienvenue arrive."); }, function () { self.setState({pushState: "erreur"}); }); };
    out.notifPrefs = NOTIF_PREFS.map(function (p) {''')
rep('var NOTIF_PREFS = [{id:"rdv", l:"Rappels de rendez-vous"},', 'var NOTIF_PREFS = [{id:"rdv", l:"Rappels (rendez-vous, anniversaires, réserves)"},')
rep('{id:"soiree", l:"Proposition de soirée"}, {id:"taches", l:"Tâches du jour"}];', '{id:"soiree", l:"Soirées et planning des repas"}, {id:"taches", l:"Tâches du jour pas faites (18 h)"}];')
# niveau 30
rep('★ Niveau 30 · Récompense à définir</span>', '★ Niveau 30 · Le Clos des Trois Chats</span>')
rep('Une grande récompense arrive au niveau 30 : elle reste à choisir.', 'Un jardin derrière la maison, un arbre à chat géant dans le salon, le titre « Gardiens du Clos des Trois Chats », les titres de Maître et Maîtresse de maison, et un accessoire pour chaque chat.')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
