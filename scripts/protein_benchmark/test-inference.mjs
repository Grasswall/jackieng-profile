import fs from 'node:fs';
import assert from 'node:assert/strict';
import { inferVariant } from '../../src/lib/proteinBenchmark.ts';
const dir=new URL('../../public/data/protein-benchmark/',import.meta.url);
const data=JSON.parse(fs.readFileSync(new URL('model.json',dir),'utf8'));
const vectors=JSON.parse(fs.readFileSync(new URL('parity.json',dir),'utf8'));
let count=0;
for (const v of vectors) for (const key of ['additive','pairwise']) {
 const p=inferVariant(v.variant,data,key);assert.ok(Math.abs(p.score-v.expected[key])<1e-10,`${key} ${v.variant}`); count++;
 assert.ok(Math.abs(p.intercept+p.singles.reduce((a,b)=>a+b,0)+p.pairs.reduce((a,b)=>a+b.value,0)-p.score)<1e-12);
}
for (const v of ['VDG','VDGVV','vdgv','VDGX','1234',' VDG']) assert.throws(()=>inferVariant(v,data,'pairwise'));
console.log(`PARITY_PASS: ${count} Python/TypeScript predictions; invalid input rejected; contribution sums verified.`);
