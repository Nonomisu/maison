#!/usr/bin/env python3
"""Événement « Nouvelle année » (30 décembre – 5 janvier) : guirlande dorée et bandeau au salon,
compte à rebours puis « Bonne année », confettis le 1er janvier, feux d'artifice aux fenêtres la nuit. Une seule fois."""
import os, sys
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'Main.dc.html')
s = open(P, encoding='utf-8').read()
if 'nouvelan' in s: sys.exit('déjà présent')
def rep(o, n, c=1):
    global s
    if s.count(o) != c: sys.exit('trouvé %d fois : %s' % (s.count(o), o[:90]))
    s = s.replace(o, n)
# animations
rep('.sway{animation:sway 2.6s ease-in-out infinite;transform-origin:50% 100%}',
    '.sway{animation:sway 2.6s ease-in-out infinite;transform-origin:50% 100%}\n@keyframes fw{0%{transform:scale(.15);opacity:0}12%{opacity:1}70%{opacity:1}100%{transform:scale(1.3);opacity:0}}\n.fw{animation:fw 2.2s ease-out infinite}')
rep('var EV_SEASON = {halloween: "automne",', 'var EV_SEASON = {nouvelan: "hiver", halloween: "automne",')
rep('{id:"noel", label:"Noël"}, {id:"anniv", label:"Anniv. des chats"},', '{id:"noel", label:"Noël"}, {id:"nouvelan", label:"Nouvel an"}, {id:"anniv", label:"Anniv. des chats"},')
rep('({noel: "Noël", anniv:', '({nouvelan: "Nouvelle année", noel: "Noël", anniv:')
rep('<span><b>Halloween</b> du 20 au 31 octobre</span>', '<span><b>Nouvelle année</b> du 30 décembre au 5 janvier</span>\n<span><b>Halloween</b> du 20 au 31 octobre</span>')
# logique : bandeau, confettis, feux d'artifice
rep('    out.bday = bday; out.bannerOn = bday || personBday;', '''    out.bday = bday; out.bannerOn = bday || personBday;
    // Nouvelle année
    var nyOn = st.event === "nouvelan" && st.eventShown, nyY = TODAY_M === 11 ? TODAY_Y + 1 : TODAY_Y, nyLeft = TODAY_M === 11 ? 32 - TODAY_D : 0;
    out.nyOn = nyOn && !bday && !personBday;
    out.nyText = nyLeft > 0 ? "Plus que " + nyLeft + " jour" + (nyLeft > 1 ? "s" : "") + " avant " + nyY + " !" : "Bonne année " + nyY + " !";
    out.nyFlags = []; for (var nf = 0; nf < 24; nf++) out.nyFlags.push({x: (12 + nf * 15.5) + "px", c: ["#F2C14E", "#C9CED6", "#2B2A30", "#E8B84A"][nf % 4]});
    out.nyReplay = function () { var t = self.state.tick + 2; self.setState({confStart: t, confGen: self.state.confGen + 1, sheet: null}); };''')
rep('    out.confOn = (bday || personBday) && ce >= 0 && ce < 45;', '    out.confOn = (bday || personBday || out.nyOn) && ce >= 0 && ce < 45;')
rep('    var cc2 = [CAT_COL[bk], "#F2C14E", "#F6C1C7", "#E04848", "#FFFFFF", "#6FBF5A"];', '    var cc2 = out.nyOn ? ["#F2C14E", "#C9CED6", "#FFFFFF", "#E8B84A", "#8A8F99", "#F7E27A"] : [CAT_COL[bk], "#F2C14E", "#F6C1C7", "#E04848", "#FFFFFF", "#6FBF5A"];')
rep('      return {x: q[0] + "px", y: q[1] + "px", w: q[2] + "px", h: q[3] + "px", bg: DARK ?', '''      var fws = [];
      if (DARK && !low && st.event === "nouvelan" && st.eventShown) for (var f3 = 0; f3 < 2; f3++) {
        var fc3 = ["#F2C14E", "#F6C1C7", "#9DC9EA", "#CDE8C1", "#FFFFFF"][(i + f3 * 2) % 5], u = 3;
        var pts3 = [[0, -2], [1.4, -1.4], [2, 0], [1.4, 1.4], [0, 2], [-1.4, 1.4], [-2, 0], [-1.4, -1.4]].map(function (p) { return Math.round(p[0] * u) + "px " + Math.round(p[1] * u) + "px 0 1px " + fc3; }).join(", ");
        fws.push({x: Math.round(8 + rnd(i * 23 + f3 + 900) * (q[2] - 16)) + "px", y: Math.round(8 + rnd(i * 23 + f3 + 950) * (q[3] * 0.6)) + "px", sh: pts3, d: (-(i * 0.7 + f3 * 1.1)).toFixed(2) + "s"});
      }
      return {fw: fws, x: q[0] + "px", y: q[1] + "px", w: q[2] + "px", h: q[3] + "px", bg: DARK ?''')
# gabarit
rep('<sc-for list="{{ np.stars }}" as="ns">', '<sc-for list="{{ np.fw }}" as="fwk"><div class="fw" style="position: absolute; left: {{ fwk.x }}; top: {{ fwk.y }}; width: 2px; height: 2px; box-shadow: {{ fwk.sh }}; animation-delay: {{ fwk.d }}"></div></sc-for>\n<sc-for list="{{ np.stars }}" as="ns">')
rep('<sc-if value="{{ bannerOn }}" hint-placeholder-val="{{ false }}">', '''<sc-if value="{{ nyOn }}" hint-placeholder-val="{{ false }}">
<div aria-hidden="true" style="position: absolute; left: 10px; right: 10px; top: 80px; height: 2px; background: #8E6F4E; pointer-events: none"></div>
<sc-for list="{{ nyFlags }}" as="nf"><div aria-hidden="true" style="position: absolute; left: {{ nf.x }}; top: 82px; width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 12px solid {{ nf.c }}; pointer-events: none"></div></sc-for>
<button type="button" onClick="{{ nyReplay }}" aria-label="Lancer les confettis de la nouvelle année" style="position: absolute; left: 62px; width: 266px; top: 92px; height: 28px; padding: 0; display: flex; align-items: center; justify-content: center; gap: 8px; background: #2B2A30; border: 3px solid #F2C14E; box-sizing: border-box; cursor: pointer">
<span style="width: 6px; height: 6px; background: #F2C14E"></span>
<span style="font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 14px; font-weight: 700; color: #F2C14E; white-space: nowrap">{{ nyText }}</span>
<span style="width: 6px; height: 6px; background: #F2C14E"></span>
</button>
<div aria-hidden="true" style="position: absolute; left: 66px; top: 80px; width: 2px; height: 14px; background: #8E6F4E; pointer-events: none"></div>
<div aria-hidden="true" style="position: absolute; left: 322px; top: 80px; width: 2px; height: 14px; background: #8E6F4E; pointer-events: none"></div>
</sc-if>
<sc-if value="{{ bannerOn }}" hint-placeholder-val="{{ false }}">''')
open(P, 'w', encoding='utf-8').write(s)
print('ok')
