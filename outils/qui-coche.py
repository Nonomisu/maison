#!/usr/bin/env python3
"""Tâches sans affectation : la pastille C, E ou C&E indique qui l'a cochée. Retire « Arroser la plante ». Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'doneBy' in s: sys.exit('déjà appliqué')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:90]))
    s = s.replace(o, n)
rep('  {id:"c", t:"Arroser la plante", who:"C", when:"today", rec:"chaque semaine", pts:5, done:true},\n', '')
rep('{t:"Serpillière", rec:"chaque semaine", pts:5}, {t:"Plantes", rec:"chaque semaine", pts:5}', '{t:"Serpillière", rec:"chaque semaine", pts:5}')

# pastille : qui a coché
rep('''    out.taskGroups = WHEN.map(function (w) {''', '''    // qui a coché la tâche (ce jour-là) : C, E ou C&E
    var byOf = function (t) { return t.doneBy ? t.doneBy : (t.done && (t.who === "C" || t.who === "E") ? [t.who] : []); };
    var byLabel = function (b) { return b.length > 1 ? "C&E" : b.length ? b[0] : ""; };
    var byBg = function (b) { return b.length > 1 ? WHO["2"].bg : b.length ? WHO[b[0]].bg : "transparent"; };
    var tapTask = function (t) {
      var by = byOf(t).slice(), mine = by.indexOf(ME) >= 0, gain = !mine;
      if (mine) by.splice(by.indexOf(ME), 1); else by.push(ME);
      by = ["C", "E"].filter(function (k) { return by.indexOf(k) >= 0; });
      var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), anim = Object.assign({}, self.state.anim), pts = t.pts || 5;
      if (gain) { xp.nahla += pts; while (xp.nahla >= 100) { xp.nahla -= 100; lvl.nahla += 1; } anim.nahla = "ronron"; self._textTitles("task", t.t, ME); SFX.play("ding"); }
      self.setState({xp: xp, lvl: lvl, anim: anim, sessionDone: self.state.sessionDone + (gain ? 1 : 0),
        tasks: self.state.tasks.map(function (x) { if (x.id !== t.id) return x; var y = Object.assign({}, x, {done: by.length > 0, doneBy: by}); delete y.who; if (!by.length) delete y.doneBy; return y; })});
    };
    out.taskGroups = WHEN.map(function (w) {''')
rep('        if (st.whoFilter !== "all" && !(t.who === st.whoFilter || t.who === "2")) return false;\n', '')
rep('''          var w2 = WHO[t.who];
          return {t: t.t, done: !!t.done,''', '''          var by = byOf(t);
          return {t: t.t, done: !!t.done, hasWho: by.length > 0,''')
rep('            who: whoLabel(t.who), whoBg: w2.bg,\n            ed: ED("task:" + t.id, t.t, function () { return {t: t.t, who: t.who, when: t.when, rec: t.rec || "", pts: t.pts || 5}; },',
    '            who: byLabel(by), whoBg: byBg(by),\n            ed: ED("task:" + t.id, t.t, function () { return {t: t.t, when: t.when, rec: t.rec || "", pts: t.pts || 5}; },')
rep('               g: [["who", "Pour qui", WHO_OPTS2], ["when", "Quand",', '               g: [["when", "Quand",')
rep('Object.assign({}, x, {t: cap(d.t), who: d.who, when: d.when,', 'Object.assign({}, x, {t: cap(d.t), when: d.when,')
i = s.index('            toggle: function () {\n              var xp = Object.assign({}, self.state.xp), lvl = Object.assign({}, self.state.lvl), anim = Object.assign({}, self.state.anim);\n              var pts = t.pts || 5;')
j = s.index('            }};\n        })};', i)
s = s[:i] + '            toggle: function () { tapTask(t); }' + s[j + len('            }'):]
# tableau des tâches du panier (même règle)
i = s.index('    out.tasks = st.tasks.map(function (t) {')
j = s.index('\n    });', i)
blk = s[i:j]
blk = blk.replace('who: t.who, whoBg: WHO[t.who].bg,', 'who: byLabel(byOf(t)), whoBg: byBg(byOf(t)),')
a = blk.index('        toggle: function () {'); b = blk.rindex('}};')
blk = blk[:a] + '        toggle: function () { tapTask(t); }' + blk[b + 1:]
s = s[:i] + blk + s[j:]
# déplacer les fonctions avant le tableau du panier : on les définit tôt
fn_start = s.index('    // qui a coché la tâche (ce jour-là)'); fn_end = s.index('    out.taskGroups = WHEN.map(function (w) {')
fns = s[fn_start:fn_end]; s = s[:fn_start] + s[fn_end:]
rep('    out.tasks = st.tasks.map(function (t) {', fns + '    out.tasks = st.tasks.map(function (t) {')
# ajout : plus de « pour qui »
rep('who: self.state.draftWho, when: "today", rec: "", pts: 2};', 'when: "today", rec: "", pts: 2};')
rep('t: q.t, who: self.state.draftWho, when: "today", rec: q.rec, pts: q.pts}', 't: q.t, when: "today", rec: q.rec, pts: q.pts}')
rep('{id: se.id, t: se.t, who: ME, done: false, seasonal: true,', '{id: se.id, t: se.t, done: false, seasonal: true,')
# gabarit : bouton « pour qui » et filtres retirés, pastille seulement si cochée
i = s.index('<button type="button" onClick="{{ cycleWho }}"'); j = s.index('</button>', i) + len('</button>\n')
s = s[:i] + s[j:]
i = s.index('<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px">\n<sc-for list="{{ whoFilters }}"')
j = s.index('</div>\n', i) + len('</div>\n')
s = s[:i] + s[j:]
for x in ['tk', 't']:
    k = s.index('background: {{ %s.whoBg }}' % x)
    a = s.rindex('<span', 0, k); b = s.index('</span>', k) + len('</span>')
    s = s[:a] + '<sc-if value="{{ %s.hasWho }}" hint-placeholder-val="{{ false }}">' % x + s[a:b] + '</sc-if>' + s[b:]
rep('    out.tasks = st.tasks.map(function (t) {\n      return {t: t.t, done: !!t.done,', '    out.tasks = st.tasks.map(function (t) {\n      return {t: t.t, done: !!t.done, hasWho: byOf(t).length > 0,')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
