#!/usr/bin/env python3
"""Tâches du ménage rangées par fréquence : quotidiennes (cochables deux fois par jour, remises à zéro à minuit),
hebdomadaires (lundi 0 h), mensuelles (le 1er à 0 h), ponctuelles. Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'freqOf' in s: sys.exit('déjà appliqué')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:100]))
    s = s.replace(o, n)

# fréquence d'une tâche (les anciennes tâches la déduisent de leur texte de répétition)
rep('function catSleeping(st, k) {', '''var FREQS = [{id: "jour", n: "Quotidienne", g: "Chaque jour", sub: "deux passages possibles par jour · remises à zéro à minuit", pts: 2},
  {id: "semaine", n: "Hebdomadaire", g: "Chaque semaine", sub: "renouvelées le lundi à 0 h", pts: 5},
  {id: "mois", n: "Mensuelle", g: "Chaque mois", sub: "renouvelées le 1er à 0 h", pts: 10},
  {id: "une", n: "Ponctuelle", g: "Ponctuelles", sub: "une seule fois", pts: 10}];
function freqOf(t) { if (t.freq) return t.freq; var r = String(t.rec || "").toLowerCase(); if (t.seasonal || /une fois|saison/.test(r)) return "une"; if (/mois/.test(r)) return "mois"; if (/semaine|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/.test(r)) return "semaine"; if (/jour/.test(r)) return "jour"; return "semaine"; }
function catSleeping(st, k) {''')
# données de départ
for old, f in [('{id:"a", t:"Passer l\'aspirateur", who:"C", when:"today", rec:"chaque semaine", pts:5}', 'semaine'),
               ('{id:"b", t:"Faire les litières", who:"2", when:"today", rec:"tous les 2 jours", pts:2}', 'jour'),
               ('{id:"d", t:"Sortir les poubelles", who:"C", when:"week", rec:"mardi et vendredi", pts:5}', 'semaine'),
               ('{id:"e", t:"Changer les draps", who:"2", when:"week", rec:"toutes les 2 semaines", pts:5}', 'semaine'),
               ('{id:"f", t:"Nettoyer la salle de bain", who:"E", when:"week", rec:"chaque semaine", pts:5}', 'semaine'),
               ('{id:"g", t:"Détartrer la bouilloire", who:"C", when:"later", rec:"chaque mois", pts:10}', 'mois'),
               ('{id:"h", t:"Faire la vaisselle", who:"C", when:"today", rec:"chaque jour", pts:2}', 'jour'),
               ('{id:"i", t:"Faire la cuisine", who:"E", when:"today", rec:"chaque jour", pts:2}', 'jour')]:
    rep(old, old[:-1] + ', freq:"%s"}' % f)
rep('{t:"Faire les litières", rec:"tous les 2 jours", pts:2}, {t:"Vaisselle", rec:"chaque jour", pts:2}, {t:"Lessive", rec:"2 fois par semaine", pts:5},',
    '{t:"Faire les litières", rec:"chaque jour", freq:"jour", pts:2}, {t:"Vaisselle", rec:"chaque jour", freq:"jour", pts:2}, {t:"Lessive", rec:"chaque semaine", freq:"semaine", pts:5},')
rep('{t:"Aspirateur", rec:"chaque semaine", pts:5}, {t:"Poubelles", rec:"mardi et vendredi", pts:5}, {t:"Serpillière", rec:"chaque semaine", pts:5}',
    '{t:"Aspirateur", rec:"chaque semaine", freq:"semaine", pts:5}, {t:"Poubelles", rec:"chaque semaine", freq:"semaine", pts:5}, {t:"Serpillière", rec:"chaque semaine", freq:"semaine", pts:5}')

# qui a coché : pour les quotidiennes, jusqu'à deux passages (C, E, C&E, C×2, E×2)
rep('    var byOf = function (t) { return t.doneBy ? t.doneBy : (t.done && (t.who === "C" || t.who === "E") ? [t.who] : []); };',
    '    var byOf = function (t) { return t.doneBy ? t.doneBy : (t.done && (t.who === "C" || t.who === "E") ? [t.who] : []); };\n    var byLabel2 = function (b) { return b.length === 2 && b[0] === b[1] ? b[0] + "×2" : b.length > 1 ? "C&E" : b.length ? b[0] : ""; };\n    var byBg2 = function (b) { return b.length === 2 && b[0] === b[1] ? WHO[b[0]].bg : b.length > 1 ? WHO["2"].bg : b.length ? WHO[b[0]].bg : "transparent"; };')

# toucher une tâche
i = s.index('    var tapTask = function (t) {'); j = s.index('\n    };\n', i) + len('\n    };\n')
s = s[:i] + '''    var tapTask = function (t) {
      var daily = freqOf(t) === "jour", by = byOf(t).slice(), xpBy = Object.assign({}, t.xpBy || {}), xpL = (t.xpL || []).slice();
      var day = (self.state.xpDay && self.state.xpDay.d === TODAY_ISO) ? JSON.parse(JSON.stringify(self.state.xpDay)) : {d: TODAY_ISO, n: {}, sum: 0};
      var mineIdx = by.indexOf(ME), add, note = "";
      // quotidienne : jusqu'à deux passages ; au-delà, toucher retire ses passages du jour. Sinon : toucher coche ou décoche.
      add = daily ? by.length < 2 : mineIdx < 0;
      if (add) {
        var pts = t.pts || 5;
        if (daily) { if ((day.n[t.id] || 0) >= 2) { pts = 0; note = "déjà comptée 2 fois aujourd'hui"; } else if (day.sum >= 25) { pts = 0; note = "plafond de 25 XP atteint aujourd'hui"; } else pts = Math.min(pts, 25 - day.sum); }
        var got = giveXp("nahla", pts, {boost: true});
        if (daily && got) { day.n[t.id] = (day.n[t.id] || 0) + 1; day.sum += got; }
        by.push(ME); xpL.push({w: ME, x: got}); xpBy[ME] = (xpBy[ME] || 0) + got;
        self._textTitles("task", t.t, ME); SFX.play("ding");
        if (note) self._toast("Tâche cochée, sans XP : " + note);
        else if (daily && by.length === 1) self._toast(t.t + " : faite 1 fois sur 2 aujourd'hui");
      } else {
        if (mineIdx < 0) { self._toast(t.t + " : déjà faite 2 fois aujourd'hui"); return; }
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
''' + s[j:]

# groupes par fréquence
rep('''    out.taskGroups = WHEN.map(function (w) {
      var list = st.tasks.filter(function (t) {
        if (t.when !== w.id) return false;
        if (inSess && (t.done || w.id === "later")) return false;
        return true;
      });''', '''    out.taskGroups = FREQS.map(function (w) {
      var list = st.tasks.filter(function (t) {
        if (freqOf(t) !== w.id) return false;
        if (inSess && (t.done || w.id === "mois" || w.id === "une")) return false;
        return true;
      });''')
rep('''      return {name: w.name, count: left ? left + " à faire" : "tout est fait",''', '''      return {name: w.g, sub: w.sub, count: left ? left + " à faire" : "tout est fait",''')
rep('''          var by = byOf(t);
          return {t: t.t, done: !!t.done, hasWho: by.length > 0,''', '''          var by = byOf(t), fq = freqOf(t);
          return {t: t.t, done: !!t.done, hasWho: by.length > 0,''')
rep('''            meta: (t.done && t.rec ? "Fait · revient " + t.rec : (t.rec ? t.rec + " · " : "") + "+" + (t.pts || 5) + " XP"),''',
    '''            meta: fq === "jour" ? (by.length ? "Faite " + by.length + " fois sur 2 aujourd'hui · " : "") + "+" + (t.pts || 2) + " XP par passage" : (t.done ? "Faite · revient " + {semaine: "lundi", mois: "le 1er du mois", une: "jamais"}[fq] : "+" + (t.pts || 5) + " XP"),''')
rep('''            who: byLabel(by), whoBg: byBg(by),
            ed: ED("task:" + t.id, t.t, function () { return {t: t.t, when: t.when, rec: t.rec || "", pts: t.pts || 5}; },
              {f: [["t", "Tâche", "text"], ["rec", "Répétition", "text", "ex. chaque semaine, tous les 15 jours (vide = une fois)"], ["pts", "XP", "number"]],
               g: [["when", "Quand", WHEN.map(function (w3) { return [w3.id, w3.name]; })]]},''',
    '''            who: byLabel2(by), whoBg: byBg2(by), box: t.done ? (fq === "jour" && by.length < 2 ? "#9DB4D6" : "#3E6FB0") : "#FFFFFF",
            ed: ED("task:" + t.id, t.t, function () { return {t: t.t, freq: fq, pts: t.pts || 5}; },
              {f: [["t", "Tâche", "text"], ["pts", "XP par passage", "number"]],
               g: [["freq", "Fréquence", FREQS.map(function (f) { return [f.id, f.n, "#3E6FB0"]; })]]},''')
i = s.index('function (d) { if (!String(d.t || "").trim()) return false; self.setState({tasks: self.state.tasks.map(function (x) { return x.id === t.id ? Object.assign({}, x, {t: cap(d.t), when: d.when, rec: String(d.rec || "").trim(),')
j = s.index('}) : x; })}); }', i)
s = s[:i] + 'function (d) { if (!String(d.t || "").trim()) return false; self.setState({tasks: self.state.tasks.map(function (x) { return x.id === t.id ? Object.assign({}, x, {t: cap(d.t), freq: d.freq, rec: "", pts: Math.max(1, Math.min(30, Math.round(num(d.pts, 5))))' + s[j:]
# la case cochée : le champ « box » est désormais défini plus haut
rep('''            bg: t.done ? "#F1ECE4" : "#FFFFFF", box: t.done ? "#3E6FB0" : "#FFFFFF", deco: t.done ? "line-through" : "none", fg: t.done ? "#6B6470" : "#2B2A30",
            h: inSess ? "66px" : "48px",''', '''            bg: t.done ? "#F1ECE4" : "#FFFFFF", deco: t.done && !(fq === "jour" && by.length < 2) ? "line-through" : "none", fg: t.done ? "#6B6470" : "#2B2A30",
            h: inSess ? "66px" : "48px",''')

# ajout : fréquence obligatoire
rep('''      var nt = {id: "n" + self.state.nextTask, t: t.charAt(0).toUpperCase() + t.slice(1), when: "today", rec: "", pts: 2};''',
    '''      var fq = self.state.taskFreq || "jour", F = FREQS.filter(function (f) { return f.id === fq; })[0];
      var nt = {id: "n" + self.state.nextTask, t: t.charAt(0).toUpperCase() + t.slice(1), freq: fq, rec: "", pts: F.pts};''')
rep('    out.addTask = addTask;', '''    out.addTask = addTask;
    out.taskFreqs = FREQS.filter(function (f) { return f.id !== "une"; }).map(function (f) { var on = (st.taskFreq || "jour") === f.id; return {label: f.n, pressed: on ? "true" : "false", bg: on ? "#3E6FB0" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({taskFreq: f.id}); }}; });''')
rep('self.setState({tasks: self.state.tasks.concat([{id: "n" + self.state.nextTask, t: q.t, when: "today", rec: q.rec, pts: q.pts}]), nextTask: self.state.nextTask + 1});',
    'self.setState({tasks: self.state.tasks.concat([{id: "n" + self.state.nextTask, t: q.t, freq: q.freq || freqOf(q), rec: "", pts: q.pts}]), nextTask: self.state.nextTask + 1});')
rep('aria: on ? q.t + " : déjà prévue" : "Ajouter " + q.t + " (" + q.rec + ")",', 'aria: on ? q.t + " : déjà prévue" : "Ajouter " + q.t + " (" + FREQS.filter(function (f) { return f.id === (q.freq || freqOf(q)); })[0].n.toLowerCase() + ")",')
rep('{id: se.id, t: se.t, done: false, seasonal: true, when: "week", rec: "une fois cette saison", pts: 10}', '{id: se.id, t: se.t, done: false, seasonal: true, freq: "une", rec: "une fois cette saison", pts: 10}')
# résumés
rep('''    var todayLeft = st.tasks.filter(function (t) { return t.when === "today" && !t.done; }).length;
    var weekLeft = st.tasks.filter(function (t) { return t.when === "week" && !t.done; }).length;
    out.tachesSummary = todayLeft + " aujourd'hui · " + weekLeft + " cette semaine";''',
    '''    var todayLeft = st.tasks.filter(function (t) { return freqOf(t) === "jour" && !t.done; }).length;
    var weekLeft = st.tasks.filter(function (t) { return freqOf(t) === "semaine" && !t.done; }).length;
    out.tachesSummary = todayLeft + " du jour · " + weekLeft + " de la semaine";''')
rep('    var todo = st.tasks.filter(function (t) { return !t.done && t.when === "today"; }).length;', '    var todo = st.tasks.filter(function (t) { return !t.done && freqOf(t) === "jour"; }).length;')
rep('if (n === 0) st.tasks.forEach(function (t) { if (!t.done && t.when === "today") its.push', 'if (n === 0) st.tasks.forEach(function (t) { if (!t.done && freqOf(t) === "jour") its.push')

# gabarit : choix de la fréquence sous le champ d'ajout, sous-titre des groupes
k = s.index('<sc-for list="{{ quickTasks }}" as="qt"')
a = s.rindex('<div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px">', 0, k)
s = s[:a] + '''<div role="group" aria-label="Fréquence de la nouvelle tâche" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px">
<sc-for list="{{ taskFreqs }}" as="tf" hint-placeholder-count="3"><button type="button" onClick="{{ tf.pick }}" aria-pressed="{{ tf.pressed }}" style="min-height: 36px; background: {{ tf.bg }}; color: {{ tf.fg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{ tf.label }}</button></sc-for>
</div>
''' + s[a:]
rep('''<h2 style="margin: 0; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 17px; font-weight: 700; color: #2B2A30">{{ tg.name }}</h2>''',
    '''<h2 style="margin: 0; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 17px; font-weight: 700; color: #2B2A30">{{ tg.name }} <span style="font-family: Inter, sans-serif; font-size: 11px; font-weight: 500; color: #5E5864">{{ tg.sub }}</span></h2>''')
rep('{t:"Tâche quotidienne (vaisselle, litière, machine)", v:"2 XP"}, {t:"Tâche hebdomadaire (poubelles, aspirateur, Bain)", v:"5 XP"}, {t:"Tâche mensuelle ou saisonnière", v:"10 XP"}',
    '{t:"Tâche quotidienne, par passage (2 par jour)", v:"2 XP"}, {t:"Tâche hebdomadaire (renouvelée le lundi)", v:"5 XP"}, {t:"Tâche mensuelle (renouvelée le 1er) ou ponctuelle", v:"10 XP"}')
rep('"Une même tâche répétable ne rapporte que 2 fois par jour"', '"Une tâche quotidienne rapporte au plus 2 passages par jour"')
rep('"Tâches répétables plafonnées à 25 XP par jour et par personne"', '"Tâches quotidiennes plafonnées à 25 XP par jour et par personne"')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
