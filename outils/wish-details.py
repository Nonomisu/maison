# Détails sous une envie (ex. « Jeu Switch 2 » → la liste des jeux), réservables un par un.
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "hw.subs" in s: print("déjà appliqué"); sys.exit()
L = s.split("\n")
BTN = "min-height: 32px; padding: 0 8px; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600"
# liste de l'autre : détails réservables
a = next(i for i, l in enumerate(L) if 'list="{{ herWishes }}"' in l)
r = next(i for i in range(a, len(L)) if 'onClick="{{ hw.reserve }}"' in L[i])
e = next(i for i in range(r, len(L)) if L[i] == "</div>")
L[e + 1:e + 1] = ['''<sc-for list="{{ hw.subs }}" as="hs" hint-placeholder-count="0">
<div style="margin-left: 18px; display: flex; align-items: center; gap: 8px; padding: 4px 6px 4px 10px; background: {{ hs.bg }}; border: 2px solid #2B2A30; border-left-width: 5px">
<span style="flex: 1; min-width: 0; font-size: 14px">{{ hs.t }}</span>
<button type="button" onClick="{{ hs.reserve }}" aria-pressed="{{ hs.pressed }}" aria-label="{{ hs.aria }}" style="min-width: 86px; background: {{ hs.btnBg }}; color: {{ hs.btnFg }}; ''' + BTN + '''">{{ hs.label }}</button>
</div>
</sc-for>''']
# ma liste : détails + ajout
b = next(i for i, l in enumerate(L) if 'list="{{ myWishes }}"' in l)
r = next(i for i in range(b, len(L)) if 'onClick="{{ mw.remove }}"' in L[i])
e = next(i for i in range(r, len(L)) if L[i] == "</div>")
L[e + 1:e + 1] = ['''<sc-for list="{{ mw.subs }}" as="ms" hint-placeholder-count="0">
<div style="margin-left: 18px; display: flex; align-items: center; gap: 8px; padding: 4px 6px 4px 10px; background: #FFFFFF; border: 2px solid #2B2A30; border-left-width: 5px">
<span style="flex: 1; min-width: 0; font-size: 14px">{{ ms.t }}</span>
<button type="button" onClick="{{ ms.remove }}" aria-label="{{ ms.aria }}" style="width: 32px; height: 32px; flex-shrink: 0; background: #FFFFFF; color: #2B2A30; border: 2px solid #2B2A30; cursor: pointer; font-size: 16px; font-weight: 700; padding: 0">×</button>
</div>
</sc-for>
<sc-if value="{{ mw.subOpen }}" hint-placeholder-val="{{ false }}">
<div style="margin-left: 18px; display: flex; gap: 6px">
<input type="text" value="{{ mw.subDraft }}" onChange="{{ mw.onSub }}" onKeyDown="{{ mw.onSubKey }}" aria-label="{{ mw.subAria }}" placeholder="ex. un jeu, une taille, un modèle…" style="flex: 1; min-width: 0; height: 40px; box-sizing: border-box; padding: 0 8px; background: #FFFFFF; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; border-radius: 0">
<button type="button" onClick="{{ mw.subAdd }}" style="min-width: 70px; background: #D9A441; color: #2B2A30; ''' + BTN + '''">Ajouter</button>
<button type="button" onClick="{{ mw.subClose }}" aria-label="Fermer" style="width: 40px; background: #FFFFFF; color: #2B2A30; ''' + BTN + '''">×</button>
</div>
</sc-if>
<sc-if value="{{ mw.subClosed }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ mw.subStart }}" style="margin-left: 18px; align-self: flex-start; background: none; color: #9E2F2F; border: 2px dashed #C9A0A0; ''' + BTN.replace("border: 2px solid #2B2A30; ", "") + '''">+ Ajouter un détail</button></sc-if>''']
s = "\n".join(L)
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
# logique : liste de l'autre
rep('''      return {head: wHead(HW, wi), hasHead: !!wHead(HW, wi), t: w.t,''', '''      var subs = (w.sub || []).map(function (x) {
        var rk = w.id + ":" + x.id, rr = !!st.reserved[rk];
        return {t: x.t, pressed: rr ? "true" : "false", bg: rr ? "#F4E6E6" : "#FFFFFF", label: rr ? "Réservé ✓" : "Je le prends", btnBg: rr ? "#E4EEDC" : "#F7F3EE", btnFg: rr ? "#36532A" : "#2B2A30", aria: (rr ? "Annuler la réservation de " : "Réserver ") + x.t,
          reserve: function () { var o = Object.assign({}, self.state.reserved); o[rk] = !o[rk]; self.setState({reserved: o}); }};
      });
      return {subs: subs, head: wHead(HW, wi), hasHead: !!wHead(HW, wi), t: w.t,''')
# logique : ma liste
rep('''      return Object.assign({head: wHead(MW, wi), hasHead: !!wHead(MW, wi), t: w.t,''', '''      var setSub = function (fn) { self.setState({myWishes: self.state.myWishes.map(function (x) { return x.id === w.id ? Object.assign({}, x, {sub: fn((x.sub || []).slice())}) : x; })}); };
      var subOn = st.subDraft && st.subDraft.id === w.id;
      var subAdd = function () { var t = cap((self.state.subDraft || {}).t); if (!t) return; setSub(function (S) { return S.concat([{id: "s" + Date.now().toString(36), t: t}]); }); self.setState({subDraft: {id: w.id, t: ""}}); };
      return Object.assign({subs: (w.sub || []).map(function (x) { return {t: x.t, aria: "Retirer " + x.t, remove: function () { setSub(function (S) { return S.filter(function (y) { return y.id !== x.id; }); }); }}; }),
        subOpen: subOn, subClosed: !subOn, subDraft: subOn ? st.subDraft.t : "", subAria: "Détail pour " + w.t,
        subStart: function () { self.setState({subDraft: {id: w.id, t: ""}}); }, subClose: function () { self.setState({subDraft: null}); },
        onSub: function (e) { self.setState({subDraft: {id: w.id, t: e.target.value}}); }, onSubKey: function (e) { if (e.key === "Enter") subAdd(); }, subAdd: subAdd,
        head: wHead(MW, wi), hasHead: !!wHead(MW, wi), t: w.t,''')
rep("this.state = {mig: {},", "this.state = {subDraft: null, mig: {},")
open(p, "w", encoding="utf-8").write(s)
print("ok")
