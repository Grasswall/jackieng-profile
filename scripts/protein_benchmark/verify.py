#!/usr/bin/env python3
"""Independently compare every mirror target with the original eLife supplement.
Recalculate held-out metrics directly from exported browser weights.
"""
import hashlib,io,json,urllib.request,zipfile,xml.etree.ElementTree as ET
from pathlib import Path
import numpy as np
from scipy.stats import spearmanr
from sklearn.metrics import r2_score
import train
URL='https://cdn.elifesciences.org/articles/16965/elife-16965-supp1-v4.xlsx'
EXPECTED='ac9a16295cd24110ad3ef4bcc57741f023ff9f3f5c3d9f5fdc0a94b996dca9b7'
p=train.CACHE/'gb1-official.xlsx'
if not p.exists():p.write_bytes(train.get(URL))
assert hashlib.sha256(p.read_bytes()).hexdigest()==EXPECTED,'Original supplement changed'
ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
original={}
with zipfile.ZipFile(p) as z:
    shared=[''.join(e.itertext()) for e in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',ns)]
    header=None
    for event,row in ET.iterparse(io.BytesIO(z.read('xl/worksheets/sheet1.xml')),events=['end']):
        if row.tag!='{'+ns['m']+'}row':continue
        cells=[]
        for c in row.findall('m:c',ns):
            v=c.find('m:v',ns);value='' if v is None else v.text
            cells.append(shared[int(value)] if c.attrib.get('t')=='s' else value)
        if header is None:header=cells;assert header==['Variants','HD','Count input','Count selected','Fitness']
        else:
            d=dict(zip(header,cells));seq=d['Variants'];assert seq not in original
            original[seq]=(float(d['Fitness']),int(d['HD']))
        row.clear()
lock=json.loads(Path(__file__).with_name('source-lock.json').read_text())
with zipfile.ZipFile(train.CACHE/'gb1-pinned.zip') as z:
    import csv
    mirror=list(csv.DictReader(io.StringIO(z.read(next(n for n in z.namelist() if n.endswith('four_mutations_full_data.csv'))).decode())))
assert len(original)==len(mirror)==149361
max_difference=max(abs(original[r['Variants']][0]-float(r['Fitness'])) for r in mirror)
assert max_difference<1e-10
assert all(original[r['Variants']][1]==int(r['HD']) for r in mirror)
model=json.loads((train.OUT/'model.json').read_text())
meta=json.loads((train.OUT/'metadata.json').read_text())
tests=[(s,v[0]) for s,v in original.items() if v[1]==4]
y=np.log1p([v for s,v in tests]);checks={}
for key in ['additive','pairwise']:
    pred=np.array([train.predict(s,model['models'][key]) for s,v in tests])
    m=model['models'][key]['metrics']['test']
    rmse=float(np.sqrt(np.mean((pred-y)**2)));r2=float(r2_score(y,pred));rho=float(spearmanr(y,pred).statistic)
    assert abs(rmse-m['rmse_log1p'])<1e-10 and abs(r2-m['r2_log1p'])<1e-10 and abs(rho-m['spearman'])<1e-10
    checks[key]={'rmse_log1p':rmse,'r2_log1p':r2,'spearman':rho}
report={'original_url':URL,'original_sha256':EXPECTED,'matched_records':len(original),'max_target_difference':max_difference,'heldout_browser_weights_verified':checks}
meta['original_source_verification']=report
train.save('metadata.json',meta)
train.save('verification.json',report)
print('ORIGINAL_SOURCE_AND_ALL_TEST_PREDICTIONS_PASS',json.dumps(report))
