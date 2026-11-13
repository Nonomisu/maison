#!/usr/bin/env python3
"""Dessine les récompenses de niveau et de défis (pixel art) dans a/deco-*.svg.
Chaque dessin est une grille de caractères ; un caractère = un pixel de 3 px à l'écran."""
import os
R = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'a')
O = '#2B2A30'
def svg(name, rows, pal, u=3):
    h = len(rows); w = max(len(r) for r in rows)
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" shape-rendering="crispEdges">' % (w, h, w * u, h * u)]
    for y, r in enumerate(rows):
        x = 0
        while x < len(r):
            c = r[x]
            if c in pal:
                n = 1
                while x + n < len(r) and r[x + n] == c: n += 1
                out.append('<rect x="%d" y="%d" width="%d.02" height="1.02" fill="%s"/>' % (x, y, n, pal[c]))
                x += n
            else: x += 1
    out.append('</svg>')
    open(os.path.join(R, 'deco-%s.svg' % name), 'w').write(''.join(out))
    return w * u, h * u

sizes = {}
# Bol en céramique de Bao (niveau 5) : bol couleur caramel avec croquettes
sizes['bol'] = svg('bol', [
 "...kkkkkkkkk...",
 "..kbkbkbkbkbk..",
 ".OOOOOOOOOOOOO.",
 ".OcccccccccccO.",
 ".OcwwcccccwwcO.",
 "..OcccccccccO..",
 "...OOOOOOOOO...",
 ], {'O': O, 'c': '#C98A4B', 'w': '#E8C08A', 'k': '#8A5A2B', 'b': '#B07038'})
# Étagère perchée de Nahla (niveau 6) : planche et deux équerres
sizes['perchoir'] = svg('perchoir', [
 "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
 "OwwwwwwwwwwwwwwwwwwwwwwwwwwwwO",
 "OddddddddddddddddddddddddddddO",
 "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
 "...OO..................OO.....",
 "...OdO.................OdO....",
 "...OddO................OddO...",
 "...OdddO...............OdddO..",
 "...OOOOO...............OOOOO..",
 ], {'O': O, 'w': '#C9A06B', 'd': '#8E6F4E'})
# Coussin de Tsunky (niveau 3) : gros coussin vert sauge capitonné
sizes['coussin-tsunky'] = svg('coussin-tsunky', [
 "...OOOOOOOOOOOOOOOOOOOO...",
 ".OOggggggggggggggggggggOO.",
 "OggggllggggggggggllggggggO",
 "OggggggggggOOggggggggggggO",
 "OglggggggggOOgggggggggglgO",
 "OggggggggggggggggggggggggO",
 "OGGGGGGGGGGGGGGGGGGGGGGGGO",
 ".OOGGGGGGGGGGGGGGGGGGGGOO.",
 "...OOOOOOOOOOOOOOOOOOOO...",
 ], {'O': O, 'g': '#7FA36A', 'l': '#A9C79A', 'G': '#5E8350'})
# Plante du salon (niveau 8) : sansevieria en pot terre cuite
sizes['plante'] = svg('plante', [
 "....O.....O...",
 "...OgO...OgO..",
 "...OgO..OgO...",
 "..OglgO.OgO...",
 "..OglgO.OglO..",
 "..OgggOOgglO..",
 ".OglgOgOgggO..",
 ".OgggOgOglgO..",
 ".OglgOlOgggO..",
 ".OgggOgOglgO..",
 "..OgglgggggO..",
 "..OgggggglgO..",
 ".OOOOOOOOOOOO.",
 ".OttttttttttO.",
 ".OTTTTTTTTTTO.",
 "..OttttttttO..",
 "..OttttttttO..",
 "...OOOOOOOO...",
 ], {'O': O, 'g': '#4A7034', 'l': '#8BB86A', 't': '#C4693A', 'T': '#A9552C'})
# Tapis devant la cheminée (niveau 9) : tapis tissé à franges
sizes['tapis'] = svg('tapis', [
 ".w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.",
 "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
 "OrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrO",
 "OryyyyyyyyyyyyyyyyyyyyyyyyyyyyyrO",
 "OryrrryrrryrrryrrryrrryrrryrrryrO",
 "OryyyyyyyyyyyyyyyyyyyyyyyyyyyyyrO",
 "OrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrO",
 "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
 ".w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.",
 ], {'O': O, 'r': '#B5653A', 'y': '#E8C07A', 'w': '#E9DCC2'})
# Lampe sur pied (niveau 10)
sizes['lampe'] = svg('lampe', [
 "...OOOOOO...",
 "..OyyyyyyO..",
 ".OyyyyyyyyO.",
 "OyyYyyyyYyyO",
 "OOOOOOOOOOOO",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 ".....OO.....",
 "...OOOOOO...",
 "..OOOOOOOO..",
 ], {'O': O, 'y': '#F2D35B', 'Y': '#FFF1B0'})
# Coussins du canapé (niveau 12) : deux coussins, moutarde et rose
sizes['coussins'] = svg('coussins', [
 ".OOOOOOOO..........OOOOOOOO.",
 "OmmmmmmmmO........OppppppppO",
 "OmMmmmmMmO........OpPppppPpO",
 "OmmmmmmmmO........OppppppppO",
 "OmMmmmmMmO........OpPppppPpO",
 "OmmmmmmmmO........OppppppppO",
 ".OOOOOOOO..........OOOOOOOO.",
 ], {'O': O, 'm': '#D9A441', 'M': '#F2C14E', 'p': '#E8A0B0', 'P': '#F6C1C7'})
# Défi « 5 tâches chacun » : coussin étoilé (exclusif)
sizes['etoile'] = svg('etoile', [
 ".OOOOOOOOOOO.",
 "OnnnnnnnnnnnO",
 "OnnnnnynnnnnO",
 "OnnnnyyynnnnO",
 "OnyyyyyyyyynO",
 "OnnnyyyyynnnO",
 "OnnnyynyynnnO",
 "OnnynnnnnynnO",
 "OnnnnnnnnnnnO",
 ".OOOOOOOOOOO.",
 ], {'O': O, 'n': '#2E3E62', 'y': '#F2C14E'})
# Défi « soirée sans écran » : bougie « soirée cosy »
sizes['bougie'] = svg('bougie', [
 "...f...",
 "..fFf..",
 "...F...",
 "...O...",
 ".OOOOO.",
 ".OcccO.",
 ".OcccO.",
 ".OclcO.",
 ".OcccO.",
 ".OcccO.",
 "OOOOOOO",
 "OgggggO",
 "OOOOOOO",
 ], {'O': O, 'f': '#F2A33A', 'F': '#FFF1B0', 'c': '#F6E7D0', 'l': '#E8C9A0', 'g': '#D9A441'})
# Défi « liste vidée en mode magasin » : cabas brodé pour le frigo
sizes['cabas'] = svg('cabas', [
 "...OOOO.OOOO...",
 "...O..O.O..O...",
 "..OOOOOOOOOOO..",
 "..OcccccccccO..",
 "..OcccrcrcccO..",
 "..OccrrrrrccO..",
 "..OcccrrrcccO..",
 "..OccccrccccO..",
 "..OcccccccccO..",
 "..OcgcgcgcgcO..",
 "..OOOOOOOOOOO..",
 ], {'O': O, 'c': '#E9DCC2', 'r': '#C0392B', 'g': '#4A7034'})
print(sizes)
