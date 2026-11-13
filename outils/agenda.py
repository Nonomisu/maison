#!/usr/bin/env python3
"""Ajoute l'agenda des jeux et du RP (bureau, boîte de l'étagère à cubes) à src/Main.dc.html. Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'AGCATS' in s: sys.exit('agenda déjà présent')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:90]))
    s = s.replace(o, n)
PEN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"></path><path d="M14 6l4 4"></path></svg>'
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editeur.py'), encoding='utf-8').read())

# ---- constantes
rep('var WHO_P = {C:', '''var AGCATS = [{id:"patch", l:"Patch", c:"#3E6FB0"}, {id:"sortie", l:"Sortie de jeu", c:"#8A4F9E"}, {id:"rp", l:"Événement RP", c:"#B4527A"}, {id:"groupe", l:"Soirée en groupe", c:"#4A7034"}, {id:"autre", l:"Autre", c:"#6B6470"}];
var AGENDA0 = REEL ? [] : [{id:"g1", d:"2026-11-18", h:"", t:"Patch Overwatch : nouvelle saison", cat:"patch", note:""}, {id:"g2", d:"2026-11-21", h:"20:30", t:"Soirée Baldur en groupe", cat:"groupe", note:"Discord du groupe"}, {id:"g3", d:"2026-11-28", h:"21:00", t:"Bal masqué à Ul'dah", cat:"rp", note:""}, {id:"g4", d:"2026-12-04", h:"", t:"Mise à jour Minecraft", cat:"patch", note:""}];
var WHO_P = {C:''')
# ---- état
rep('this.state = {ed: null,', 'this.state = {agenda: AGENDA0, nextAg: 5, agDraft: "", agDate: "", agTime: "", agCat: "patch", agPast: false, ed: null,')
# ---- logique
rep('    out.isProjets = !!(sh && sh.type === "projets");', r'''    // agenda des jeux et du RP (bureau)
    out.openAgenda = function () { self.setState({sheet: {type: "agenda"}}); };
    out.isAgenda = !!(sh && sh.type === "agenda");
    if (out.isAgenda) { out.sheetTitle = "Agenda des jeux & du RP"; out.sheetColor = "#2E4A7A"; }
    var agCat = function (id) { return AGCATS.filter(function (c) { return c.id === id; })[0] || AGCATS[AGCATS.length - 1]; };
    var MOIS_C = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    var agRow = function (a) {
      var C = agCat(a.cat), d = parseD(a.d), n = Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - TODAY_UTC) / 864e5);
      var when = n === 0 ? "aujourd'hui" : n === 1 ? "demain" : n > 1 ? "dans " + n + " jours" : n === -1 ? "hier" : "il y a " + (-n) + " jours";
      var isUrl = /^https?:\/\//.test(a.note || "");
      return Object.assign({t: a.t, day: String(d.getDate()), mon: MOIS_C[d.getMonth()], wd: JOURS[d.getDay()], cat: C.l, catBg: C.c,
        meta: (a.h ? a.h.replace(":", "h") + " · " : "") + when, hasNote: !!a.note && !isUrl, note: a.note || "", hasLink: isUrl, link: a.note || "", linkLabel: "Ouvrir le lien : " + a.t, soon: n >= 0 && n <= 2},
        ED("ag:" + a.id, a.t, function () { return {t: a.t, d: a.d, h: a.h || "", cat: a.cat, note: a.note || ""}; },
          {f: [["t", "Événement", "text"], ["d", "Date", "date"], ["h", "Heure", "time"], ["note", "Précision ou lien", "text", "facultatif : lieu, serveur, lien du patch…"]], g: [["cat", "Type", AGCATS.map(function (c) { return [c.id, c.l, c.c]; })]]},
          function (x) { if (!String(x.t || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test(x.d || "")) return false; self.setState({agenda: self.state.agenda.map(function (y) { return y.id === a.id ? Object.assign({}, y, {t: cap(x.t), d: x.d, h: x.h || "", cat: x.cat, note: String(x.note || "").trim()}) : y; })}); },
          function () { self.setState({agenda: self.state.agenda.filter(function (y) { return y.id !== a.id; })}); }));
    };
    var agSorted = st.agenda.slice().sort(function (a, b) { return (a.d + (a.h || "")) < (b.d + (b.h || "")) ? -1 : 1; });
    var agUp = agSorted.filter(function (a) { return a.d >= TODAY_ISO; }), agOld = agSorted.filter(function (a) { return a.d < TODAY_ISO; }).reverse();
    out.agUp = agUp.map(agRow); out.agEmpty = !agUp.length; out.agOld = st.agPast ? agOld.slice(0, 20).map(agRow) : [];
    out.agHasOld = agOld.length > 0; out.agOldLabel = st.agPast ? "Masquer les événements passés" : "Voir les événements passés (" + agOld.length + ")";
    out.agTogglePast = function () { self.setState({agPast: !self.state.agPast}); };
    out.agDraft = st.agDraft; out.onAgDraft = function (e) { self.setState({agDraft: e.target.value}); };
    out.agDate = st.agDate || TODAY_ISO; out.onAgDate = function (e) { self.setState({agDate: e.target.value}); };
    out.agTime = st.agTime; out.onAgTime = function (e) { self.setState({agTime: e.target.value}); };
    out.agCats = AGCATS.map(function (c) { var on = st.agCat === c.id; return {label: c.l, pressed: on ? "true" : "false", bg: on ? c.c : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({agCat: c.id}); }}; });
    out.addAg = function () { var t = (self.state.agDraft || "").trim(), d = self.state.agDate || TODAY_ISO; if (!t) return;
      self.setState({agenda: self.state.agenda.concat([{id: "ag" + self.state.nextAg, d: d, h: self.state.agTime || "", t: cap(t), cat: self.state.agCat, note: "", by: ME}]), nextAg: self.state.nextAg + 1, agDraft: "", agTime: ""});
      self._toast && self._toast("Ajouté à l'agenda · " + fmtD(parseD(d))); };
    out.isProjets = !!(sh && sh.type === "projets");''')
# calendrier des 7 jours
rep('      var mi = MEAL_ISO.indexOf(iso);', '      (st.agenda || []).forEach(function (a) { if (a.d === iso) its.push({t: a.t + (a.h ? " · " + a.h.replace(":", "h") : ""), c: "#2E4A7A"}); });\n      var mi = MEAL_ISO.indexOf(iso);')

# ---- bureau : la boîte bleue de l'étagère à cubes ouvre l'agenda
rep('<img src="{{ bz.dodo.src }}" alt=""', '''<button type="button" onClick="{{ openAgenda }}" class="hot" aria-label="Boîte de l'étagère : agenda des jeux et du RP" style="position: absolute; left: 164px; top: 434px; width: 62px; height: 62px; padding: 0; background: none; border: 0; cursor: pointer">
<svg width="20" height="20" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true" style="position: absolute; left: 21px; top: 6px"><rect x="0" y="1" width="10" height="9" fill="#2B2A30"></rect><rect x="1" y="2" width="8" height="7" fill="#FFFFFF"></rect><rect x="1" y="2" width="8" height="2" fill="#B23A48"></rect><rect x="2" y="0" width="1" height="2" fill="#2B2A30"></rect><rect x="7" y="0" width="1" height="2" fill="#2B2A30"></rect><rect x="2" y="5" width="1" height="1" fill="#2B2A30"></rect><rect x="4" y="5" width="1" height="1" fill="#2B2A30"></rect><rect x="6" y="5" width="1" height="1" fill="#2B2A30"></rect><rect x="2" y="7" width="1" height="1" fill="#2B2A30"></rect><rect x="4" y="7" width="1" height="1" fill="#B23A48"></rect></svg>
</button>
<img src="{{ bz.dodo.src }}" alt=""''')

# ---- feuille
row = lambda x: f'''<div style="display: flex; flex-direction: column; gap: 4px">
<div style="display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; background: #FFFFFF; border: 2px solid #2B2A30">
<span style="width: 46px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding: 2px 0; background: #F7F3EE; border: 2px solid #2B2A30"><span style="font-size: 10px; font-weight: 600; color: #5E5864">{{{{ {x}.wd }}}}</span><span style="font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 20px; font-weight: 700; line-height: 1">{{{{ {x}.day }}}}</span><span style="font-size: 10px; font-weight: 600; color: #5E5864">{{{{ {x}.mon }}}}</span></span>
<span style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px">
<span style="align-self: flex-start; padding: 1px 6px; background: {{{{ {x}.catBg }}}}; color: #FFFFFF; font-size: 11px; font-weight: 700">{{{{ {x}.cat }}}}</span>
<span style="font-size: 14px; font-weight: 600">{{{{ {x}.t }}}}</span>
<span style="font-size: 12px; color: #4A4450">{{{{ {x}.meta }}}}</span>
<sc-if value="{{{{ {x}.hasNote }}}}" hint-placeholder-val="{{{{ false }}}}"><span style="font-size: 12px; color: #5E5864">{{{{ {x}.note }}}}</span></sc-if>
</span>
<sc-if value="{{{{ {x}.hasLink }}}}" hint-placeholder-val="{{{{ false }}}}"><a href="{{{{ {x}.link }}}}" target="_blank" rel="noopener" aria-label="{{{{ {x}.linkLabel }}}}" style="width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #3E6FB0; border: 2px solid #2B2A30; color: #FFFFFF; text-decoration: none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M14 4h6v6"></path><path d="M20 4l-9 9"></path><path d="M18 14v6H4V6h6"></path></svg></a></sc-if>
{pencil(x, 40)}
</div>
{editor(x)}
</div>'''
sheet = f'''<sc-if value="{{{{ isAgenda }}}}" hint-placeholder-val="{{{{ false }}}}">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 13px; color: #4A4450">Patchs, sorties de jeux, événements RP, soirées en groupe : à remplir vous-mêmes. Les événements de la semaine apparaissent aussi dans le calendrier.</span>
<sc-if value="{{{{ agEmpty }}}}" hint-placeholder-val="{{{{ false }}}}"><span style="padding: 10px; background: #FFFFFF; border: 2px dashed #C9C2B5; font-size: 13px; color: #5E5864">Rien de prévu pour l'instant.</span></sc-if>
<sc-for list="{{{{ agUp }}}}" as="ag" hint-placeholder-count="3">
{row('ag')}
</sc-for>
<sc-if value="{{{{ agHasOld }}}}" hint-placeholder-val="{{{{ false }}}}"><button type="button" onClick="{{{{ agTogglePast }}}}" style="min-height: 40px; background: #F7F3EE; color: #2B2A30; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">{{{{ agOldLabel }}}}</button></sc-if>
<sc-for list="{{{{ agOld }}}}" as="ao">
{row('ao')}
</sc-for>
<h3 style="margin: 6px 0 0; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 17px; font-weight: 700">Ajouter un événement</h3>
<div style="display: flex; flex-wrap: wrap; gap: 4px">
<sc-for list="{{{{ agCats }}}}" as="agc" hint-placeholder-count="5"><button type="button" onClick="{{{{ agc.pick }}}}" aria-pressed="{{{{ agc.pressed }}}}" style="min-height: 36px; padding: 0 10px; background: {{{{ agc.bg }}}}; color: {{{{ agc.fg }}}}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{{{ agc.label }}}}</button></sc-for>
</div>
<input type="text" value="{{{{ agDraft }}}}" onChange="{{{{ onAgDraft }}}}" placeholder="Ex. : patch Overwatch, soirée Baldur…" aria-label="Nom de l'événement" style="height: 44px; box-sizing: border-box; padding: 0 8px; background: #FFFFFF; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; border-radius: 0">
<div style="display: flex; gap: 6px">
<input type="date" value="{{{{ agDate }}}}" onChange="{{{{ onAgDate }}}}" aria-label="Date de l'événement" style="flex: 1; min-width: 0; height: 44px; box-sizing: border-box; padding: 0 8px; background: #FFFFFF; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; border-radius: 0">
<input type="time" value="{{{{ agTime }}}}" onChange="{{{{ onAgTime }}}}" aria-label="Heure (facultatif)" style="width: 110px; height: 44px; box-sizing: border-box; padding: 0 8px; background: #FFFFFF; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; border-radius: 0">
<button type="button" onClick="{{{{ addAg }}}}" style="min-height: 44px; padding: 0 12px; flex-shrink: 0; background: #2E4A7A; color: #FFFFFF; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 14px; font-weight: 600">Ajouter</button>
</div>
</div>
</sc-if>

'''
rep('<sc-if value="{{ isProjets }}" hint-placeholder-val="{{ false }}">', sheet + '<sc-if value="{{ isProjets }}" hint-placeholder-val="{{ false }}">')
open(P, 'w', encoding='utf-8').write(s)
print('agenda ajouté')
