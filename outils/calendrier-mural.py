# Bureau : le bocal des victoires prend la place de la boîte bleue (le haut de l'étagère reste aux chats) ;
# l'agenda devient un calendrier au mur, en trois formats au choix (feuille du jour, planning du mois, ruban).
import sys
p = "src/Main.dc.html"; s = open(p, encoding="utf-8").read()
if "calFmt" in s: print("déjà appliqué"); sys.exit()
L = s.split("\n")
iv = next(i for i, l in enumerate(L) if 'onClick="{{ openVict }}"' in l)
ia = next(i for i, l in enumerate(L) if 'onClick="{{ openAgenda }}"' in l)
ja = next(i for i in range(ia, len(L)) if L[i] == "</button>")
assert ia == iv + 1
H = "font-family: 'Pixelify Sans', Inter, sans-serif"
new = [
 # cache de la boîte bleue, puis le bocal dans le cube
 '<div aria-hidden="true" style="position: absolute; left: 170px; top: 444px; width: 49px; height: 42px; background: #DDE1E5; pointer-events: none"></div>',
 '<button type="button" onClick="{{ openVict }}" class="hot" aria-label="{{ victAria }}" style="position: absolute; left: 168px; top: 440px; width: 54px; height: 46px; padding: 0; background: none; border: 0; cursor: pointer; display: flex; align-items: flex-end; justify-content: center"><img src="{{ victBocal }}" alt="" style="width: 30px; height: 41px; display: block; image-rendering: pixelated"></button>',
 # calendrier mural : feuille du jour
 '<sc-if value="{{ calFeuille }}" hint-placeholder-val="{{ true }}"><button type="button" onClick="{{ openAgenda }}" class="hot" aria-label="{{ calAria }}" style="position: absolute; left: 166px; top: 200px; width: 46px; height: 48px; padding: 0; background: none; border: 0; cursor: pointer">'
 '<span aria-hidden="true" style="position: absolute; left: 21px; top: 2px; width: 4px; height: 4px; background: #2B2A30"></span>'
 '<span aria-hidden="true" style="position: absolute; left: 6px; top: 6px; width: 30px; height: 36px; box-sizing: border-box; border: 2px solid #2B2A30; background: #FFFFFF; display: flex; flex-direction: column; box-shadow: 2px 2px 0 rgba(43,42,48,.25)">'
 '<span style="height: 11px; background: #B23A48; color: #FFFFFF; ' + H + '; font-size: 8px; line-height: 11px; text-align: center; letter-spacing: .5px">{{ calMois }}</span>'
 '<span style="flex: 1; display: flex; align-items: center; justify-content: center; ' + H + '; font-size: 16px; font-weight: 700; color: #2B2A30">{{ calJour }}</span></span>'
 '<sc-if value="{{ calDot }}" hint-placeholder-val="{{ false }}"><span aria-hidden="true" style="position: absolute; left: 32px; top: 2px; width: 9px; height: 9px; border-radius: 50%; background: #D9A441; border: 2px solid #2B2A30"></span></sc-if></button></sc-if>',
 # planning du mois
 '<sc-if value="{{ calPlanning }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ openAgenda }}" class="hot" aria-label="{{ calAria }}" style="position: absolute; left: 142px; top: 202px; width: 102px; height: 46px; padding: 0; background: none; border: 0; cursor: pointer">'
 '<span aria-hidden="true" style="position: absolute; left: 3px; top: 3px; width: 96px; height: 40px; box-sizing: border-box; border: 2px solid #2B2A30; background: #FFFFFF; padding: 2px 3px; display: flex; flex-direction: column; gap: 1px; box-shadow: 2px 2px 0 rgba(43,42,48,.25)">'
 '<span style="' + H + '; font-size: 7px; line-height: 8px; color: #2E4A7A; font-weight: 700">{{ calMoisLong }}</span>'
 '<span style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; flex: 1">'
 '<sc-for list="{{ calCases }}" as="cc" hint-placeholder-count="28"><span style="background: {{ cc.bg }}; border: 1px solid {{ cc.bd }}"></span></sc-for></span></span></button></sc-if>',
 # ruban suspendu à la passerelle
 '<sc-if value="{{ calRuban }}" hint-placeholder-val="{{ false }}"><button type="button" onClick="{{ openAgenda }}" class="hot" aria-label="{{ calAria }}" style="position: absolute; left: 212px; top: 196px; width: 44px; height: 70px; padding: 0; background: none; border: 0; cursor: pointer">'
 '<span aria-hidden="true" style="position: absolute; left: 21px; top: 2px; width: 2px; height: 6px; background: #8A5A2B"></span>'
 '<span aria-hidden="true" style="position: absolute; left: 12px; top: 8px; width: 20px; height: 58px; box-sizing: border-box; border: 2px solid #2B2A30; background: #F2E3C6; display: flex; flex-direction: column; align-items: center; gap: 2px; padding-top: 2px; box-shadow: 2px 2px 0 rgba(43,42,48,.25)">'
 '<span style="' + H + '; font-size: 6px; line-height: 7px; color: #B23A48; font-weight: 700">{{ calMois }}</span>'
 '<sc-for list="{{ calRubanJ }}" as="rj" hint-placeholder-count="5"><span style="width: 12px; height: 7px; background: {{ rj.bg }}; ' + H + '; font-size: 6px; line-height: 7px; text-align: center; color: {{ rj.fg }}">{{ rj.n }}</span></sc-for></span></button></sc-if>',
]
L = L[:iv] + new + L[ja + 1:]
s = "\n".join(L)
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (c, a[:90]); s = s.replace(a, b)
# choix du format dans la fiche de l'agenda
rep('<sc-if value="{{ isAgenda }}" hint-placeholder-val="{{ false }}">\n<div style="display: flex; flex-direction: column; gap: 8px">\n',
    '<sc-if value="{{ isAgenda }}" hint-placeholder-val="{{ false }}">\n<div style="display: flex; flex-direction: column; gap: 8px">\n'
    '<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap"><span style="font-size: 12px; font-weight: 600; color: #5E5864">Calendrier au mur :</span>'
    '<sc-for list="{{ calFmts }}" as="cf" hint-placeholder-count="3"><button type="button" onClick="{{ cf.pick }}" aria-pressed="{{ cf.pressed }}" style="min-height: 34px; padding: 0 10px; background: {{ cf.bg }}; color: {{ cf.fg }}; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{ cf.label }}</button></sc-for></div>\n')
# logique
rep('    out.isAgenda = !!(sh && sh.type === "agenda");', '''    // calendrier mural du bureau
    var MC = ["JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];
    var MCL = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var CF = st.calFmt || "feuille", tY = +TODAY_ISO.slice(0, 4), tM = +TODAY_ISO.slice(5, 7) - 1, tD = +TODAY_ISO.slice(8, 10);
    var AGL = st.agenda || [], evOn = function (iso) { return AGL.some(function (a) { return a.d === iso; }); };
    var isoD = function (d) { return tY + "-" + String(tM + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0"); };
    out.calFeuille = CF === "feuille"; out.calPlanning = CF === "planning"; out.calRuban = CF === "ruban";
    out.calMois = MC[tM]; out.calMoisLong = MCL[tM] + " " + tY; out.calJour = String(tD); out.calDot = evOn(TODAY_ISO);
    var nbJ = new Date(tY, tM + 1, 0).getDate(), dec = (new Date(tY, tM, 1).getDay() + 6) % 7, cases = [];
    for (var ci = 0; ci < dec; ci++) cases.push({bg: "transparent", bd: "transparent"});
    for (var cd = 1; cd <= nbJ; cd++) cases.push({bg: cd === tD ? "#B23A48" : evOn(isoD(cd)) ? "#D9A441" : "#EEF0F2", bd: cd === tD ? "#B23A48" : "#C9CED5"});
    out.calCases = cases;
    out.calRubanJ = [0, 1, 2, 3, 4].map(function (o) { var d = new Date(tY, tM, tD + o), iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); return {n: String(d.getDate()), bg: o === 0 ? "#B23A48" : evOn(iso) ? "#D9A441" : "#FFFFFF", fg: o === 0 ? "#FFFFFF" : "#2B2A30"}; });
    var nbUp = AGL.filter(function (a) { return a.d >= TODAY_ISO; }).length;
    out.calAria = "Calendrier au mur : agenda des jeux et du RP" + (nbUp ? " (" + nbUp + " à venir)" : "");
    out.calFmts = [["feuille", "Feuille du jour"], ["planning", "Planning du mois"], ["ruban", "Ruban de la semaine"]].map(function (f) { var on = CF === f[0]; return {label: f[1], pressed: on ? "true" : "false", bg: on ? "#2E4A7A" : "#FFFFFF", fg: on ? "#FFFFFF" : "#2B2A30", pick: function () { self.setState({calFmt: f[0]}); }}; });
    out.isAgenda = !!(sh && sh.type === "agenda");''')
rep('this.state = {shopMag: "",', 'this.state = {calFmt: "feuille", shopMag: "",')
open(p, "w", encoding="utf-8").write(s)
t = open("app/store.js", encoding="utf-8").read()
t = t.replace('"stats", "annuels", "victoires"];', '"stats", "annuels", "victoires", "calFmt"];', 1); assert '"calFmt"]' in t
open("app/store.js", "w", encoding="utf-8").write(t)
print("ok")
