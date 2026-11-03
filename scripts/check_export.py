#!/usr/bin/env python3
"""Check the real static export: local links/assets, IDs, anchors and privacy."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'out'
BASE = '/jackieng-profile'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            self.ids.append(a['id'])
        for key in ('href', 'src', 'poster'):
            if a.get(key):
                self.refs.append(a[key])


def resolve(path):
    raw = unquote(path)
    if raw == BASE:
        raw = '/'
    elif raw.startswith(BASE + '/'):
        raw = raw[len(BASE):]
    p = OUT / raw.lstrip('/')
    return p / 'index.html' if p.is_dir() else p


def main():
    assert (OUT / 'index.html').is_file(), 'Build first: out/index.html missing'
    pages = {}
    errors = []
    for p in OUT.rglob('*.html'):
        parser = Page()
        parser.feed(p.read_text())
        pages[p] = parser
        for ident, count in Counter(parser.ids).items():
            if count > 1:
                errors.append(f'{p.relative_to(OUT)}: duplicate id {ident}')
    for page, parser in pages.items():
        for ref in parser.refs:
            u = urlsplit(ref)
            if u.scheme or u.netloc:
                continue
            target = page if not u.path else resolve(u.path) if u.path.startswith('/') else page.parent / unquote(u.path)
            if target.is_dir():
                target /= 'index.html'
            if not target.exists():
                errors.append(f'{page.relative_to(OUT)}: missing {ref}')
            elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:
                errors.append(f'{page.relative_to(OUT)}: missing anchor {ref}')
    for scope in (ROOT / 'public', OUT):
        for p in scope.rglob('*'):
            if p.suffix.lower() in ('.pdb', '.cif', '.mmcif'):
                errors.append(f'Forbidden coordinate file: {p}')
    result = {'pages_checked': len(pages), 'errors': sorted(set(errors)), 'pass': not errors}
    print(json.dumps(result, indent=2))
    return 1 if errors else 0

if __name__ == '__main__':
    raise SystemExit(main())
