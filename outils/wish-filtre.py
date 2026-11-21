# Wishlist : filtre par catégorie (gros, moyen, petit) et catégories pliables.
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "wishFilters" in s: print("déjà appliqué"); sys.exit()
L = s.split("\n")
OLDH = lambda v: '<sc-if value="{{ %s.hasHead }}" hint-placeholder-val="{{ false }}"><span style="margin-top: 4px; font-family: \'Pixelify Sans\', Inter, sans-serif; font-size: 16px; font-weight: 700; color: #9E2F2F">{{ %s.head }}</span></sc-if>' % (v, v)
NEWH = lambda v: ('<sc-if value="{{ %s.hasHead }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ %s.headToggle }}" aria-expanded="{{ %s.headExp }}" style="margin-top: 4px; display: flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 4px; background: none; border: 0; border-bottom: 2px solid #E3C9C9; cursor: pointer; text-align: left; font-family: \'Pixelify Sans\', Inter, sans-serif; font-size: 16px; font-weight: 700; color: #9E2F2F">'
                  '<span aria-hidden="true" style="width: 14px; font-size: 12px">{{ %s.headArrow }}</span><span style="flex: 1">{{ %s.head }}</span><span style="font-family: Inter, sans-serif; font-size: 12px; font-weight: 600; color: #8A6A6A">{{ %s.headCount }}</span></button></sc-if>') % ((v,) * 6)
for v in ("hw", "mw"):
    i = next(k for k, l in enumerate(L) if l == OLDH(v)); L[i] = NEWH(v)
# liste de l'autre : envelopper la ligne et ses détails
a = next(k for k, l in enumerate(L) if 'list="{{ herWishes }}"' in l)
r0 = a + 2; e = next(k for k in range(r0, len(L)) if L[k] == "</sc-for>" and L[k - 1] == "</sc-for>")
L[r0:e] = ['<sc-if value="{{ hw.show }}" hint-placeholder-val="{{ true }}">', '<div style="display: flex; flex-direction: column; gap: 4px">'] + L[r0:e] + ["</div>", "</sc-if>"]
# ma liste
b = next(k for k, l in enumerate(L) if 'list="{{ myWishes }}"' in l)
r0 = b + 3; e = next(k for k in range(r0, len(L)) if L[k:k + 4] == ["</div>", "</sc-for>", "</div>", "</sc-if>"])
L[r0:e] = ['<sc-if value="{{ mw.show }}" hint-placeholder-val="{{ true }}">', '<div style="display: flex; flex-direction: column; gap: 4px">'] + L[r0:e] + ["</div>", "</sc-if>"]
# filtre au-dessus des deux listes
h = next(k for k, l in enumerate(L) if l.startswith('<sc-if value="{{ wishHer }}"'))
L.insert(h, '<div style="display: flex; align-items: center; gap: 6px; overflow-x: auto"><span style="flex-shrink: 0; font-size: 12px; font-weight: 600; color: #5E5864">Voir :</span><sc-for list="{{ wishFilters }}" as="wf" hint-placeholder-count="4"><button type="button" onClick="{{ wf.pick }}" aria-pressed="{{ wf.pressed }}" style="flex-shrink: 0; min-height: 34px; padding: 0 10px; background: {{ wf.bg }}; color: {{ wf.fg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{ wf.label }}</button></sc-for></div>')
s = "\n".join(L)
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
rep('''    var wHead = function (L, i) {''', '''    var WF = st.wishFilter || "tout", WFOLD = st.wishFold || {};
    out.wishFilters = [["tout", "Tout"]].concat([["gros", "Gros"], ["moyen", "Moyens"], ["petit", "Petits"]]).map(function (f) { var on = WF === f[0]; return {label: f[1], pressed: on ? "true" : "false", bg: on ? "#9E2F2F" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({wishFilter: f[0]}); }}; });
    var wFilt = function (L) { return WF === "tout" ? L : L.filter(function (w) { return wcOf(w) === WF; }); };
    var wFold = function (L, w, wi) { var c = wcOf(w), n = L.filter(function (x) { return wcOf(x) === c; }).length, f = !!WFOLD[c];
      return {show: !f, headArrow: f ? "▶" : "▼", headExp: f ? "false" : "true", headCount: n + (n > 1 ? " envies" : " envie"),
        headToggle: function () { var o = Object.assign({}, self.state.wishFold || {}); o[c] = !o[c]; self.setState({wishFold: o}); }}; };
    var wHead = function (L, i) {''')
rep('''    var HW = wSort(REEL ? (st.wishOther || []) : HER_WISHES);''', '''    var HW = wFilt(wSort(REEL ? (st.wishOther || []) : HER_WISHES));''')
rep('''      return {subs: subs, head: wHead(HW, wi), hasHead: !!wHead(HW, wi), t: w.t,''', '''      return Object.assign(wFold(HW, w, wi), {subs: subs, head: wHead(HW, wi), hasHead: !!wHead(HW, wi), t: w.t,''')
a = '''        reserve: function () { var o = Object.assign({}, self.state.reserved); o[w.id] = !o[w.id]; self.setState({reserved: o}); }};
    });
    out.wishDraft'''
rep(a, a.replace("self.setState({reserved: o}); }};", "self.setState({reserved: o}); }});"))
rep('    var MW = wSort(st.myWishes);', '    var MW = wFilt(wSort(st.myWishes));')
n = s.index('    out.myWishes = MW.map(function (w, wi) {'); seg = s[n:n + 3000]
a2 = '      return Object.assign({subs: (w.sub || [])'
assert a2 in seg
s = s[:n] + seg.replace(a2, '      return Object.assign(wFold(MW, w, wi), {subs: (w.sub || [])', 1) + s[n + 3000:]
open(p, "w", encoding="utf-8").write(s)
print("ok")
