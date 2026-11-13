#!/usr/bin/env python3
"""Construit l'appli à partir de la maquette src/Main.dc.html.

- app/template.js : le gabarit <x-dc> compilé en appels Preact
- app/logic.js    : la logique (classe Component) telle quelle, en module
- app/head.html   : polices et styles du gabarit (insérés dans index.html)
- a/              : images et musiques (copiées depuis le dossier des visuels)
"""
import html, json, os, re, shutil, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'Main.dc.html')
s = open(SRC, encoding='utf-8').read()

tpl = s[s.index('<x-dc>') + len('<x-dc>'):s.index('</x-dc>')]
helm = tpl[tpl.index('<helmet>') + 8:tpl.index('</helmet>')]
tpl = tpl[tpl.index('</helmet>') + 9:]
script = re.search(r'<script type="text/x-dc"[^>]*>([\s\S]*?)</script>', s).group(1)

VOID = {'img', 'input', 'link', 'br', 'meta', 'hr', 'path', 'rect', 'circle'}

class Node:
    def __init__(self, tag, attrs):
        self.tag, self.attrs, self.kids = tag, attrs, []

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('#root', [])
        self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].kids.append(n)
        if tag not in VOID:
            self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        self.stack[-1].kids.append(Node(tag, attrs))
    def handle_endtag(self, tag):
        if tag in VOID:
            return
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return
        sys.exit('balise fermante orpheline : ' + tag)
    def handle_data(self, d):
        self.stack[-1].kids.append(d)

p = P(); p.feed(tpl); p.close()

# HTMLParser met les noms d'attributs en minuscules : on retrouve la casse d'origine.
CASE = {}
for a in re.findall(r'\s([a-zA-Z][\w:-]*)=', tpl):
    CASE.setdefault(a.lower(), a)
HOLE = re.compile(r'\{\{\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)*)\s*\}\}')

def path(expr, scope):
    parts = expr.split('.')
    head = ('L_' + parts[0]) if parts[0] in scope else ('v?.' + parts[0])
    return head + ''.join('?.' + q for q in parts[1:])

def val(text, scope, raw=False):
    m = HOLE.fullmatch(text.strip()) if raw else None
    if m:
        return path(m.group(1), scope)
    out, last = [], 0
    for m in HOLE.finditer(text):
        if m.start() > last:
            out.append(json.dumps(text[last:m.start()]))
        out.append('S(' + path(m.group(1), scope) + ')')
        last = m.end()
    if last < len(text):
        out.append(json.dumps(text[last:]))
    return ' + '.join(out) if out else '""'

def gen(node, scope, ind):
    if isinstance(node, str):
        t = re.sub(r'\s+', ' ', node)
        if not t.strip():
            return 'SP' if t else None
        return val(t, scope)
    tag = node.tag
    A = {CASE.get(k, k): (v if v is not None else '') for k, v in node.attrs}
    if tag == 'sc-if':
        kids = kidlist(node, scope, ind + 1)
        return '(%s ? %s : null)' % (path(HOLE.fullmatch(A['value'].strip()).group(1), scope), kids)
    if tag == 'sc-for':
        var = A['as']
        kids = kidlist(node, scope | {var}, ind + 1)
        return '(%s || []).map(function (L_%s) { return %s; })' % (path(HOLE.fullmatch(A['list'].strip()).group(1), scope), var, kids)
    props = []
    for k, v in A.items():
        if k.startswith('hint-'):
            continue
        name = k
        if k == 'onChange' and tag in ('input', 'textarea'):
            name = 'onInput'
        if tag == 'textarea' and k == 'value':
            pass
        props.append('%s: %s' % (json.dumps(name), val(v, scope, raw=True)))
    if tag == 'style':
        return 'h("style", null, %s)' % json.dumps(''.join(k for k in node.kids if isinstance(k, str)))
    return 'h(%s, {%s}%s)' % (json.dumps(tag), ', '.join(props), (', ' + kidlist(node, scope, ind + 1)) if node.kids else '')

def kidlist(node, scope, ind):
    parts = [g for g in (gen(k, scope, ind) for k in node.kids) if g is not None]
    # espaces de tête et de queue inutiles
    while parts and parts[0] == 'SP': parts.pop(0)
    while parts and parts[-1] == 'SP': parts.pop()
    return '[' + ', '.join(parts) + ']'

body = kidlist(p.root, frozenset(), 0)
os.makedirs(os.path.join(ROOT, 'app'), exist_ok=True)
open(os.path.join(ROOT, 'app', 'template.js'), 'w', encoding='utf-8').write(
    '// Fichier généré par outils/build.py à partir de src/Main.dc.html : ne pas modifier à la main.\n'
    'var SP = " ";\nfunction S(x) { return x == null ? "" : String(x); }\n'
    'export function template(h, v) { return ' + body + '; }\n')

# --- logique
manifest = json.load(open(os.path.join(ROOT, 'outils', 'blobs-manifest.json')))
ids = set(manifest)
logic = script.replace('this.el.src = "/_blob/" +', 'this.el.src = blobUrl("/_blob/" +')
logic = re.sub(r'this\.el\.src = blobUrl\("/_blob/" \+ ([^;]*);', r'this.el.src = blobUrl("/_blob/" + \1);', logic)
open(os.path.join(ROOT, 'app', 'logic.js'), 'w', encoding='utf-8').write(
    '// Fichier généré par outils/build.py à partir de src/Main.dc.html : ne pas modifier à la main.\n'
    'import { DCLogic, blobUrl } from "./runtime.js";\n' + logic + '\nexport { Component, SOIR_DAYS, MEAL_ISO, CATINFO0, SFX };\n')

# --- en-tête
head = re.sub(r'\n+', '\n', helm.strip())
pass
ix = os.path.join(ROOT, 'index.html')
if os.path.exists(ix):
    t = open(ix, encoding='utf-8').read()
    t = re.sub(r'<!-- gabarit:debut -->[\s\S]*?<!-- gabarit:fin -->', '<!-- gabarit:debut -->\n' + head.replace('\\', '\\\\') + '\n<!-- gabarit:fin -->', t)
    open(ix, 'w', encoding='utf-8').write(t)

# --- visuels : a/<id>.<ext>
used = set(re.findall(r'[0-9a-f]{32}', s)) & ids
srcdir = os.environ.get('VISUELS', '')
blobs = {}
for i in sorted(used):
    ext = os.path.splitext(manifest[i])[1]
    blobs[i] = 'a/' + i + ext
    dst = os.path.join(ROOT, blobs[i])
    if not os.path.exists(dst):
        if not srcdir:
            sys.exit('visuel manquant ' + dst + ' : définir VISUELS=<dossier de l\'export>')
        shutil.copy(os.path.join(srcdir, manifest[i]), dst)
open(os.path.join(ROOT, 'app', 'blobs.js'), 'w').write('// Généré par outils/build.py\nexport const BLOBS = ' + json.dumps(blobs, indent=0) + ';\n')
print('gabarit', len(body), 'car. ·', len(blobs), 'visuels')
