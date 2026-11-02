export type BenchmarkModel = {
  name: string; pairwise: boolean; intercept: number; weights: number[]; alpha: number; n_features: number;
  metrics: Record<string, {rmse_log1p: number; r2_log1p: number; spearman: number | null; n: number}>;
}
export type Benchmark = {
  schema_version: number; alphabet: string; wild_type: string; positions: number[]; pairs: number[][];
  models: {additive: BenchmarkModel; pairwise: BenchmarkModel};
  constant: {name: string; metrics: BenchmarkModel['metrics']};
}
export function inferVariant(variant: string, data: Benchmark, key: 'additive' | 'pairwise') {
  if (variant.length !== 4 || variant.split('').some(a => !data.alphabet.includes(a))) throw new Error('Enter exactly four uppercase standard amino acids, e.g. VDGV.');
  const model=data.models[key];
  if (model.weights.length !== model.n_features || model.weights.some(w=>!Number.isFinite(w)) || !Number.isFinite(model.intercept)) throw new Error('Invalid model weights.');
  const a=variant.split('').map(c=>data.alphabet.indexOf(c));
  const singles=a.map((v,i)=>model.weights[20*i+v]);
  const pairs=model.pairwise ? data.pairs.map(([i,j],k)=>({label:`${data.positions[i]}–${data.positions[j]}`,value:model.weights[80+400*k+20*a[i]+a[j]]})) : [];
  const score=model.intercept+singles.reduce((s,v)=>s+v,0)+pairs.reduce((s,v)=>s+v.value,0);
  return {score,intercept:model.intercept,singles,pairs,mutations:variant.split('').filter((v,i)=>v!==data.wild_type[i]).length};
}
