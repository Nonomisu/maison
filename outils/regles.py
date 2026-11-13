#!/usr/bin/env python3
"""Règles du barème programmées : plafonds, décocher retire l'XP, chat endormi ×1,5, papiers en avance +50 %,
rendez-vous à partir du jour J, XP du planning repas, des soirées, des projets et des hauts faits ;
défis de la semaine et hauts faits de progression qui comptent vraiment. Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'STATS0' in s: sys.exit('déjà appliqué')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:100]))
    s = s.replace(o, n)

# ------------------------------------------------ état
rep('this.state = {agenda: AGENDA0,', 'this.state = {stats: {}, xpDay: null, agenda: AGENDA0,')

# ------------------------------------------------ moteur d'XP
rep('''    var giveXp = function (k, n) { var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), an = Object.assign({}, self.state.anim); xp[k] += n; while (xp[k] >= 100) { xp[k] -= 100; lvl[k] += 1; } an[k] = "ronron"; self.setState({xp: xp, lvl: lvl, anim: an}); };''',
'''    var MON_ISO = (function () { var wd = (new Date(TODAY_Y, TODAY_M, TODAY_D).getDay() + 6) % 7; return isoD(new Date(TODAY_Y, TODAY_M, TODAY_D - wd)); })();
    var monOf = function (iso) { var d = parseD(iso), wd = (d.getDay() + 6) % 7; return isoD(new Date(d.getFullYear(), d.getMonth(), d.getDate() - wd)); };
    var isoDiff = function (a, b) { return Math.round((parseD(b) - parseD(a)) / 864e5); };
    // statistiques partagées : semaine en cours (défis), total des tâches, semaines avec soirée, dernière XP de chaque chat
    var STATS0 = function () {
      var x = JSON.parse(JSON.stringify(self.state.stats || {}));
      if (x.week !== MON_ISO) { x.week = MON_ISO; x.tasks = {C: 0, E: 0}; x.sansEcran = false; x.magasin = false; x.defisDone = {}; }
      x.tasks = x.tasks || {C: 0, E: 0}; x.total = x.total || 0; x.soirWeeks = x.soirWeeks || []; x.catLast = x.catLast || {}; x.owned = x.owned || {}; x.defisDone = x.defisDone || {};
      return x;
    };
    var addXp = function (xp, lvl, k, n) { xp[k] += n; while (xp[k] >= 100) { xp[k] -= 100; lvl[k] += 1; } while (xp[k] < 0 && lvl[k] > 1) { xp[k] += 100; lvl[k] -= 1; } if (xp[k] < 0) xp[k] = 0; };
    // un chat sans XP depuis 3 jours dort : sa prochaine tâche compte ×1,5
    var sleeping = function (k) { var l = ((self.state.stats || {}).catLast || {})[k]; return !!l && isoDiff(l, TODAY_ISO) >= 3; };
    var giveXp = function (k, n, opt) {
      if (!n) return 0;
      var boost = opt && opt.boost && sleeping(k); if (boost) n = Math.round(n * 1.5);
      var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), an = Object.assign({}, self.state.anim);
      addXp(xp, lvl, k, n); an[k] = "ronron";
      var S = STATS0(); S.catLast[k] = TODAY_ISO;
      self.setState({xp: xp, lvl: lvl, anim: an, stats: S});
      if (boost) setTimeout(function () { self._toast && self._toast(CATS[k].name + " se réveille : XP ×1,5 sur cette tâche !"); }, 50);
      return n;
    };
    var takeXp = function (k, n) { if (!n) return; var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl); addXp(xp, lvl, k, -n); self.setState({xp: xp, lvl: lvl}); };
    var spreadXp = function (n, sign) { ORDER.forEach(function (k, i) { var part = Math.floor(n / 3) + (i < n % 3 ? 1 : 0); if (sign < 0) takeXp(k, part); else giveXp(k, part); }); };
    var lowestCat = function () { var st2 = self.state; return ORDER.slice().sort(function (a, b) { return (st2.lvl[a] * 100 + st2.xp[a]) - (st2.lvl[b] * 100 + st2.xp[b]); })[0]; };
    self._spreadXp = spreadXp;''')

# ------------------------------------------------ tâches : plafonds, décocher retire l'XP, ×1,5
i = s.index('    var tapTask = function (t) {'); j = s.index('\n    };\n', i) + len('\n    };\n')
s = s[:i] + '''    var tapTask = function (t) {
      var by = byOf(t).slice(), mine = by.indexOf(ME) >= 0, xpBy = Object.assign({}, t.xpBy || {});
      var day = (self.state.xpDay && self.state.xpDay.d === TODAY_ISO) ? JSON.parse(JSON.stringify(self.state.xpDay)) : {d: TODAY_ISO, n: {}, sum: 0};
      var rep = !!t.rec && !/une fois|saison/i.test(t.rec), gain = !mine, note = "";
      if (mine) {
        by.splice(by.indexOf(ME), 1);
        var back = xpBy[ME] || 0; takeXp("nahla", back);
        if (rep && back) { day.n[t.id] = Math.max(0, (day.n[t.id] || 0) - 1); day.sum = Math.max(0, day.sum - back); }
        delete xpBy[ME];
      } else {
        by.push(ME);
        var pts = t.pts || 5;
        if (rep) { if ((day.n[t.id] || 0) >= 2) { pts = 0; note = "déjà comptée 2 fois aujourd'hui"; } else if (day.sum >= 25) { pts = 0; note = "plafond de 25 XP atteint aujourd'hui"; } else pts = Math.min(pts, 25 - day.sum); }
        var got = giveXp("nahla", pts, {boost: true});
        if (rep && got) { day.n[t.id] = (day.n[t.id] || 0) + 1; day.sum += got; }
        xpBy[ME] = got;
        self._textTitles("task", t.t, ME); SFX.play("ding");
        if (note) self._toast("Tâche cochée, sans XP : " + note);
      }
      var S = STATS0(); S.tasks[ME] = Math.max(0, (S.tasks[ME] || 0) + (gain ? 1 : -1)); S.total = Math.max(0, S.total + (gain ? 1 : -1));
      by = ["C", "E"].filter(function (k) { return by.indexOf(k) >= 0; });
      self.setState({stats: S, xpDay: day, sessionDone: self.state.sessionDone + (gain ? 1 : 0),
        tasks: self.state.tasks.map(function (x) { if (x.id !== t.id) return x; var y = Object.assign({}, x, {done: by.length > 0, doneBy: by, xpBy: xpBy}); delete y.who; if (!by.length) { delete y.doneBy; delete y.xpBy; } return y; })});
    };
''' + s[j:]

# ------------------------------------------------ missions : jour J, +50 % papiers, décocher retire
i = s.index('          if (!m.done) { xp.tsunky += m.pts;'); j = s.index('          var upd2 = {xp: xp, lvl: lvl, anim: anim, missions:', i)
k = s.index('\n', j)
s = s[:i] + '''          var gotM = 0, noteM = "";
          if (!m.done) {
            var ptsM = m.pts;
            if (m.type === "rdv" && m.date && m.date > TODAY_ISO) { ptsM = 0; noteM = "l'XP d'un rendez-vous arrive à partir du jour J"; }
            else if (m.type === "papiers" && m.due && TODAY_ISO <= m.due) { ptsM = Math.round(ptsM * 1.5); noteM = "fait avant l'échéance : +50 %"; }
            gotM = giveXp("tsunky", ptsM, {boost: true}); SFX.play("mission");
            if (noteM) setTimeout(function () { self._toast(m.t + " · " + noteM); }, 60);
          } else takeXp("tsunky", m.xpGot || 0);
          var upd2 = {missions: self.state.missions.map(function (x) { return x.id === m.id ? Object.assign({}, x, {done: !x.done, xpGot: x.done ? 0 : gotM}) : x; })};''' + s[k:]
# échéance des papiers
rep('''if (D.type === "rdv") f.push(["date", "Date", "date"], ["time", "Heure", "time"]); else f.push(["note", "Échéance", "text", "ex. avant le 30 nov., à planifier"]);''',
    '''if (D.type === "rdv") f.push(["date", "Date", "date"], ["time", "Heure", "time"]); else { if (D.type === "papiers") f.push(["due", "Échéance (date) : +50 % d'XP si c'est fait avant", "date"]); f.push(["note", D.type === "papiers" ? "Précision" : "Échéance", "text", "ex. avant le 30 nov., à planifier"]); }''')
rep('return {t: m.t, type: m.type, date: m.date || (REEL ? addDaysIso(7) : "2026-11-24"), time: m.time || "",', 'return {t: m.t, type: m.type, due: m.due || "", date: m.date || (REEL ? addDaysIso(7) : "2026-11-24"), time: m.time || "",')
rep('else { delete y.date; delete y.time; y.note = String(d.note || "").trim() || "À planifier"; }', 'else { delete y.date; delete y.time; y.note = String(d.note || "").trim() || "À planifier"; if (d.type === "papiers" && d.due) y.due = d.due; else delete y.due; }')
rep('      var rem = [], meta = m.note || "", pv = null;', '      var rem = [], meta = (m.type === "papiers" && m.due ? "avant le " + fmtD(parseD(m.due)) + (m.note && m.note !== "À planifier" ? " · " + m.note : "") : m.note || ""), pv = null;')

# ------------------------------------------------ courses
rep('''      var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl);
      xp.bao += 15; if (xp.bao >= 100) { xp.bao -= 100; lvl.bao += 1; }
      var anim = Object.assign({}, self.state.anim); anim.bao = "ronron";
      self.setState({xp: xp, lvl: lvl, anim: anim, finished: true, items: self.state.items.filter(function (i) { return !i.done; })});''',
'''      var emptied = self.state.storeMode && self.state.items.every(function (i) { return i.done; });
      giveXp("bao", 15, {boost: true});
      var S = STATS0(); if (emptied) S.magasin = true;
      self.setState({stats: S, finished: true, items: self.state.items.filter(function (i) { return !i.done; })});''')

# ------------------------------------------------ soirées acceptées
rep('''    var answer = function (status) { var cs = self.state.soirees[self.state.soirDay]; if (status === "accepte" && cs && cs.status !== "accepte") self._bumpTitle("soirees", cs.by);''',
'''    var answer = function (status) { var cs = self.state.soirees[self.state.soirDay]; if (status === "accepte" && cs && cs.status !== "accepte") { self._bumpTitle("soirees", cs.by);
        giveXp(lowestCat(), 10);
        var S = STATS0(), sd = (SOIR_DAYS[self.state.soirDay] || {}).iso || TODAY_ISO, wk = monOf(sd);
        if (S.soirWeeks.indexOf(wk) < 0) S.soirWeeks = S.soirWeeks.concat([wk]).slice(-60);
        if (["popcorn", "manette", "de"].indexOf(cs.item) < 0 && monOf(sd) === MON_ISO) S.sansEcran = true;
        self.setState({stats: S}); }''')

# ------------------------------------------------ planning repas rempli
rep('    out.mealsToCourses = function () {', '''    self._mealsCheck = function () {
      var ms = self.state.meals, full = [0, 1, 2, 3, 4, 5, 6].every(function (i) { return ms[i] != null; }), S = STATS0();
      if (full && S.mealsWeek !== MEAL_ISO[0]) { giveXp("bao", 5); S = STATS0(); S.mealsWeek = MEAL_ISO[0]; self.setState({stats: S}); self._toast("Planning de la semaine rempli · +5 XP pour Bao"); }
    };
    out.mealsToCourses = function () {''')
i = s.index('choices: Object.keys(st.recipes).concat(["none"]).map(function (rk)'); j = s.index('self.setState({meals: m', i); k = s.index('});', j) + 3
s = s[:k] + ' setTimeout(function () { self._mealsCheck(); }, 0);' + s[k:]

# ------------------------------------------------ grands projets
rep('practice: function () { setP(p.id, function (q) { q.today = true; q.streak += 1; return q; }); self._toast("+5 XP foyer · série de " + (p.streak + 1) + " jours"); },',
    'practice: function () { setP(p.id, function (q) { q.today = true; q.streak += 1; return q; }); giveXp("nahla", 5); self._toast("+5 XP pour Nahla · série de " + (p.streak + 1) + " jours"); },')
rep('if (!x.d) self._toast("Étape franchie : +30 XP pour le foyer"); }};', 'if (!x.d) { spreadXp(30, 1); self._toast("Étape franchie : +10 XP pour chaque chat"); } else spreadXp(30, -1); }};')
rep('Chaque étape franchie fait gagner de l\'XP au foyer.', 'Chaque étape franchie donne 10 XP à chaque chat ; chaque jour d\'habitude, 5 XP à Nahla.')

# ------------------------------------------------ hauts faits : +20 XP vraiment donnés, progression réelle
rep('var hfn = HF.filter(function (h) { return h.id === self._hfq; })[0];', 'var hfn = HF.concat(HF_PROG).filter(function (h) { return h.id === self._hfq; })[0]; if (self._spreadXp) setTimeout(function () { self._spreadXp(20, 1); }, 0);')
rep('(HF.filter(function (h) { return h.id === self._hfq; })[0]); var hfn', '(HF.concat(HF_PROG).filter(function (h) { return h.id === self._hfq; })[0]); var hfn')
rep('''    out.hfProg = HF_PROG.map(function (h) {
      var v = h.id === "souris" ? st.mice : h.v, ok = v >= h.goal;''', '''    var S0 = STATS0();
    var soirRun = (function () { var w = S0.soirWeeks.slice().sort(), best = 0, run = 0, prev = null; w.forEach(function (x) { run = prev && isoDiff(prev, x) === 7 ? run + 1 : 1; best = Math.max(best, run); prev = x; }); return best; })();
    var progV = function (h) { return h.id === "souris" ? st.mice : h.id === "cent" ? S0.total : h.id === "japonais" ? st.projets.reduce(function (a, p) { return Math.max(a, p.streak || 0); }, 0) : h.id === "soirees" ? soirRun : (REEL ? 0 : h.v); };
    HF_PROG.forEach(function (h) { if (REEL && progV(h) >= h.goal && !st.hf[h.id] && !self._hfq) self._hfq = h.id; });
    out.hfProg = HF_PROG.map(function (h) {
      var v = progV(h), ok = v >= h.goal;''')
rep('HF_PROG.filter(function (h) { return (h.id === "souris" ? st.mice : h.v) >= h.goal; }).length', 'HF_PROG.filter(function (h) { return REEL ? !!st.hf[h.id] : (h.id === "souris" ? st.mice : h.v) >= h.goal; }).length')

# ------------------------------------------------ défis de la semaine
rep('''    out.defis = DEFIS.map(function (d) {
      var v = d.two ? Math.min(d.c, d.e) : d.v;''', '''    var DEFI_RW = [{xp: 150, item: "coussin"}, {xp: 100, item: "bougie"}, {xp: 80, item: "cabas"}];
    var defiV = function (d, i) { if (!REEL) return d.two ? {c: d.c, e: d.e, v: Math.min(d.c, d.e)} : {v: d.v}; if (i === 0) return {c: S0.tasks.C || 0, e: S0.tasks.E || 0, v: Math.min(S0.tasks.C || 0, S0.tasks.E || 0)}; return {v: i === 1 ? (S0.sansEcran ? 1 : 0) : (S0.magasin ? 1 : 0)}; };
    if (REEL && !self._defiBusy) DEFIS.forEach(function (d, i) { if (defiV(d, i).v >= d.goal && !S0.defisDone[i]) {
      self._defiBusy = true;
      setTimeout(function () { var S = STATS0(); if (S.defisDone[i]) { self._defiBusy = false; return; } S.defisDone[i] = true; S.owned[DEFI_RW[i].item] = true; self.setState({stats: S}); spreadXp(DEFI_RW[i].xp, 1); self._log("hf", "Défi réussi : " + d.n, d.rw); self._toast("Défi réussi : " + d.n + " · " + d.rw); self._defiBusy = false; }, 0);
    } });
    out.defis = DEFIS.map(function (d, i) {
      var dv = defiV(d, i), v = dv.v; d = Object.assign({}, d, dv);''')
rep('return {name: d.n, rw: d.rw, prog: d.two ? "Co " + d.c', 'return {name: d.n + (REEL && S0.defisDone[i] ? " ✓" : ""), rw: d.rw, prog: d.two ? "Co " + d.c')

# ------------------------------------------------ fiche du chat : endormi
rep('''(REEL ? (self._catHistory(st, k).length ? "Dernière : "''', '''(REEL ? (sleeping(k) ? "Elle dort : sa prochaine tâche comptera ×1,5" : self._catHistory(st, k).length ? "Dernière : "''')

# ------------------------------------------------ textes du barème
rep('{t:"Soirée proposée et acceptée", v:"5 XP chacun"}, {t:"Défi", v:"50 à 150 XP"}', '{t:"Soirée proposée et acceptée", v:"10 XP au chat le moins avancé"}, {t:"Grand projet : étape franchie", v:"10 XP par chat"}, {t:"Haut fait débloqué", v:"20 XP"}, {t:"Défi de la semaine", v:"80 à 150 XP"}')
rep('"Un chat qui dort donne ×1,5 sur sa prochaine tâche"', '"Un chat sans XP depuis 3 jours dort : sa prochaine tâche compte ×1,5"')
rep('"Papiers faits avant l\'échéance : +50 %"', '"Papiers faits avant l\'échéance (date à mettre dans la mission) : +50 %"')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
