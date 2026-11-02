#!/usr/bin/env python3
"""Real GB1 binding-fitness benchmark. Run using requirements.txt; never fit to HD.
New AI-assisted public study, not prior Jackie/AtomBios research or delivery model.
"""
import argparse, csv, hashlib, io, json, os, platform, urllib.request, zipfile
from pathlib import Path
import numpy as np
import scipy
from scipy.sparse import csr_matrix
from scipy.stats import spearmanr
import sklearn
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error, r2_score
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/data/protein-benchmark'
CACHE=Path(os.environ.get('TMPDIR',str(Path.home()/'.hermes/cache/scratch')))/'protein_benchmark'
AA='ACDEFGHIKLMNPQRSTVWY'; WT='VDGV'
PAIRS=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'protein-benchmark-reproducibility'}),timeout=90).read()
def save(name,obj):
    (OUT/name).write_text(json.dumps(obj,separators=(',',':'),allow_nan=False)+'\n')
def design(seqs,pairwise):
    indices=[]; ptr=[0]
    for seq in seqs:
        a=[AA.index(c) for c in seq]
        indices.extend(20*i+a[i] for i in range(4))
        if pairwise: indices.extend(80+400*k+20*a[i]+a[j] for k,(i,j) in enumerate(PAIRS))
        ptr.append(len(indices))
    return csr_matrix((np.ones(len(indices)),np.array(indices),np.array(ptr)),shape=(len(seqs),2480 if pairwise else 80))
def metrics(y,p):
    return {'rmse_log1p':float(np.sqrt(mean_squared_error(y,p))),'r2_log1p':float(r2_score(y,p)), 'spearman':None if np.std(p)<1e-12 else float(spearmanr(y,p).statistic),'n':len(y)}
def predict(seq,m):
    a=[AA.index(c) for c in seq]; w=m['weights'];p=m['intercept']+sum(w[i*20+a[i]] for i in range(4))
    if m['pairwise']:p+=sum(w[80+k*400+20*a[i]+a[j]] for k,(i,j) in enumerate(PAIRS))
    return p
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--refresh',action='store_true');args=ap.parse_args()
    CACHE.mkdir(parents=True,exist_ok=True);OUT.mkdir(parents=True,exist_ok=True)
    manifest=Path(__file__).with_name('source-lock.json')
    if manifest.exists(): lock=json.loads(manifest.read_text())
    else:
        sha=json.loads(get('https://api.github.com/repos/J-SNACKKB/FLIP/commits/main'))['sha']
        lock={'repo':'https://github.com/J-SNACKKB/FLIP','commit':sha,'url':f'https://raw.githubusercontent.com/J-SNACKKB/FLIP/{sha}/splits/gb1/four_mutations_full_data.csv.zip'}
        manifest.write_text(json.dumps(lock,indent=2)+'\n')
    archive=CACHE/'gb1-pinned.zip'
    if args.refresh or not archive.exists():archive.write_bytes(get(lock['url']))
    sha=hashlib.sha256(archive.read_bytes()).hexdigest()
    if 'archive_sha256' in lock:assert sha==lock['archive_sha256'],'Source changed'
    else:lock['archive_sha256']=sha;manifest.write_text(json.dumps(lock,indent=2)+'\n')
    with zipfile.ZipFile(archive) as z:
        member=next(n for n in z.namelist() if n.endswith('four_mutations_full_data.csv'))
        reader=csv.DictReader(io.StringIO(z.read(member).decode('utf-8-sig')))
        assert reader.fieldnames is not None and {'Variants','Fitness','HD','Count input','Count selected'}.issubset(reader.fieldnames)
        rows=list(reader)
    records=[];seen=set()
    for r in rows:
        seq=r['Variants'];y=float(r['Fitness']);hd=int(r['HD'])
        assert len(seq)==4 and set(seq)<=set(AA) and seq not in seen
        assert np.isfinite(y) and y>=0 and hd==sum(a!=b for a,b in zip(seq,WT))
        seen.add(seq);records.append((seq,y,hd))
    ys={s:y for s,y,h in records}; assert abs(ys[WT]-1)<1e-12
    assert abs(ys['ADGV']-.0619096557142)<1e-12,'Wrong target column'
    assert max(ys.values())>4,'Likely parsing HD instead of Fitness'
    splits={k:[r for r in records if (r[2]<=2 if k=='train' else r[2]==(3 if k=='validation' else 4))] for k in ['train','validation','test']}
    sets={k:{r[0] for r in v} for k,v in splits.items()}
    assert all(not sets[a]&sets[b] for a,b in [('train','validation'),('train','test'),('validation','test')])
    Y={k:np.log1p([r[1] for r in v]) for k,v in splits.items()}
    models={};alphas=[.01,.1,1.,10.,100.]
    mean=float(Y['train'].mean())
    constant={'name':'Training-mean baseline','metrics':{k:metrics(y,np.full(len(y),mean)) for k,y in Y.items()}}
    for name,pairwise in [('additive',False),('pairwise',True)]:
        X={k:design([r[0] for r in v],pairwise) for k,v in splits.items()}
        trials=[];fits=[]
        for alpha in alphas:
            fit=Ridge(alpha=alpha,fit_intercept=True,solver='lsqr',tol=1e-10,max_iter=10000).fit(X['train'],Y['train'])
            score=float(np.sqrt(mean_squared_error(Y['validation'],fit.predict(X['validation']))))
            trials.append({'alpha':alpha,'validation_rmse_log1p':score});fits.append(fit)
        chosen=min(range(len(trials)),key=lambda i:trials[i]['validation_rmse_log1p']);fit=fits[chosen]
        m={'name':name,'pairwise':pairwise,'intercept':float(fit.intercept_),'weights':fit.coef_.tolist(),'alpha':alphas[chosen], 'n_features':X['train'].shape[1], 'target':'log1p experimental Fitness','metrics':{k:metrics(y,fit.predict(X[k])) for k,y in Y.items()},'selection':trials}
        for seq in ['VDGV','ADGV','WWWW','AAAA','VVVV']:
            assert abs(predict(seq,m)-fit.predict(design([seq],pairwise))[0])<1e-9
        models[name]=m
        print(name,json.dumps(m['metrics']),flush=True)
    browser={'schema_version':1,'alphabet':AA,'wild_type':WT,'positions':[39,40,41,54],'pairs':PAIRS,'target_transform':'log1p(Fitness)','models':models,'constant':constant}
    save('model.json',browser)
    vectors=[{'variant':seq,'expected':{k:predict(seq,m) for k,m in models.items()}} for seq in ['VDGV','ADGV','WWWW','AAAA','VVVV']]
    save('parity.json',vectors)
    rng=np.random.default_rng(42);test=splits['test'];idx=rng.choice(len(test),min(160,len(test)),replace=False)
    samples=[]
    for i in idx:
        seq,y,hd=test[i];samples.append({'variant':seq,'fitness':y,'observed':float(np.log1p(y)),'predicted':{k:predict(seq,m) for k,m in models.items()}})
    save('test-sample.json',samples)
    preset_seqs=['VDGV','ADGV','WWWW','AAAA','VVVV']+[samples[i]['variant'] for i in range(3)]
    save('examples.json',[{'variant':seq,'fitness':ys.get(seq),'observed':None if seq not in ys else float(np.log1p(ys[seq])),'split':'train' if seq in sets['train'] else 'validation' if seq in sets['validation'] else 'test' if seq in sets['test'] else 'unmeasured'} for seq in preset_seqs])
    meta={'title':'GB1: do interaction terms help outside the training neighborhood?','attribution':'New AI-assisted public technical study for this profile. Not prior Jackie Ng research or the private AtomBios model.','task':'Predict log1p experimental GB1 IgG-Fc binding fitness for four-site variants, not delivery, stability alone or protein generation.','original':'https://elifesciences.org/articles/16965','supplement':'https://doi.org/10.7554/eLife.16965.024','mirror':lock,'license':'Original article/data: CC BY 4.0; cite Wu et al. (2016), eLife 5:e16965. Mirror adds split and sequence columns; this study uses original Variants and Fitness fields only.','target_column':'Fitness (not HD)','fitness_range':[min(ys.values()),max(ys.values())],'records':len(records),'split_counts':{k:len(v) for k,v in splits.items()},'split':'Custom mutation-distance extrapolation: 0–2 training, 3 validation, 4 test. All finite nonnegative original Fitness rows; no FLIP keep filter. Not an official FLIP leaderboard result.','selection':'Alpha selected on validation RMSE from fixed grid; no refit on validation, test never used for selection.','seed':42,'versions':{'python':platform.python_version(),'numpy':np.__version__,'scipy':scipy.__version__,'scikit_learn':sklearn.__version__},'limitations':['Four mutable sites in one protein; not a general protein model.','Sequence-only additive/pairwise model; no structure-derived features or coordinates.','Assay fitness is a selection/enrichment outcome; not pure binding affinity or stability.','Related variants share a scaffold and residue states across splits; disjoint variants are not disjoint proteins.','All retained source rows include low/zero fitness observations and uneven counts; no replicate uncertainty or count weighting model.','Ridge pairwise terms cannot represent higher-order interactions.','No therapeutic, BBB or drug-delivery validation. Predictions may be negative on the log scale; they are unconstrained regression outputs, not physical values.']}
    save('metadata.json',meta)
    print('VERIFIED',json.dumps({'counts':meta['split_counts'],'range':meta['fitness_range'],'constant':constant}),flush=True)
if __name__=='__main__':main()
