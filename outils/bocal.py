#!/usr/bin/env python3
"""Bocal à étoiles du bureau (petites victoires) : a/deco-bocal-0.svg … deco-bocal-5.svg, du vide au plein."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location("deco", os.path.join(os.path.dirname(os.path.abspath(__file__)), "deco.py"))
src = open(spec.origin).read().split("sizes = {}")[0]
ns = {"__file__": spec.origin}; exec(src, ns)
svg, O = ns["svg"], ns["O"]
STAR = ["gygggYggyg", "gYgygggYgy", "ggygYgyggY", "yggYggygYg"]
for lvl in range(6):
    filled = [0, 2, 3, 5, 7, 9][lvl]
    body = []
    for i in range(9):                       # 9 lignes de verre, du haut vers le bas
        fromBottom = 8 - i
        inner = list("hggggggggg"[:9]) if i < 2 else list("ggggggggg")
        if fromBottom < filled: inner = list(STAR[i % 4][:9])
        if i < 2 and fromBottom >= filled: inner[1] = "h"
        body.append("O" + "".join(inner) + "O")
    rows = ["...kkkkk...", "..KkkkkkK..", "..OOOOOOO..", "...OgggO...", ".OOgggggOO."] + body + [".OOOOOOOOO."]
    svg("bocal-%d" % lvl, rows, {"O": O, "k": "#B5864F", "K": "#8A5A2B", "g": "#CFE3EA", "h": "#FFFFFF", "y": "#F2C94C", "Y": "#E08A2E"})
print("ok")
