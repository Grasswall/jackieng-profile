# GB1 four-site fitness study

New AI-assisted public benchmark for this profile, not Jackie Ng's prior research, a private AtomBios architecture or a drug-delivery model. Four-site GB1 sequence scoring, not protein generation. The real application would require new matched experimental data and validation.

## Reproduce

Use Python 3.14 (the executed environment is recorded in metadata) and Node 22. Create a virtual environment outside this repository:

```sh
python3 -m venv "$HOME/.hermes/cache/scratch/protein-ml-venv"
"$HOME/.hermes/cache/scratch/protein-ml-venv/bin/pip" install -r scripts/protein_benchmark/requirements.txt
"$HOME/.hermes/cache/scratch/protein-ml-venv/bin/python" scripts/protein_benchmark/train.py
"$HOME/.hermes/cache/scratch/protein-ml-venv/bin/python" scripts/protein_benchmark/verify.py
node --experimental-strip-types scripts/protein_benchmark/test-inference.mjs
npm run build
```

No API keys required. Data downloads go under TMPDIR/protein_benchmark or ~/.hermes/cache/scratch/protein_benchmark; source bytes are SHA-256 checked. `source-lock.json` pins the mirror commit and ZIP. `verify.py` independently downloads the original eLife supplement, checks its hash, matches all 149,361 targets exactly and recalculates every test prediction from browser weights. No private structure coordinates are read.

## Source / license

Wu NC, Dai L, Olson CA, Lloyd-Smith JO, Sun R (2016), *Adaptation in protein fitness landscapes is facilitated by indirect paths*, eLife 5:e16965. https://doi.org/10.7554/eLife.16965 . Original article and supplement: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Source supplement: https://cdn.elifesciences.org/articles/16965/elife-16965-supp1-v4.xlsx . FLIP mirror: https://github.com/J-SNACKKB/FLIP . The mirror supplies convenience columns; this study consumes original Variants, Fitness and HD only, not its keep/split flags. Exported records are a small deterministic sample; no full dataset redistribution.

The original study already filters low-input-count variants and rescales single mutants using an earlier experiment; “all rows” means the original supplement's measured rows, not every possible sequence. Assay fitness reflects both folding and IgG-Fc selection; it is not pure affinity. Further count/replicate uncertainty modelling is absent here. Read the original methods before biological interpretation.

## Data contract / regression test

Use **named columns**. `Fitness` is the target. `HD` is mutation count and split metadata, never the target. A rejected preliminary implementation accidentally selected HD; its artifacts were quarantined, never deployed and are not part of this study. Assertions lock WT VDGV fitness=1, ADGV fitness=0.0619096557142, fitness maximum>4 and mutation counts against sequence differences. Original-file matching verifies the entire target column, not only these anchors.

## Split / model selection

Train: 2,168 variants at Hamming distance 0–2 from VDGV. Validation: 26,019 distance-3 variants. Test: 121,174 distance-4 variants. No shared variant keys; same scaffold and residue states are shared, so this is not held-out-protein generalization. Deterministic custom split; not an official FLIP leaderboard result. Seed 42 selects only the displayed test sample, not the split.

Target = log1p(nonnegative experimental Fitness). Additive = 4 position-specific 20-AA one-hot blocks (80 features). Pairwise = additive plus 6 pair-specific 20×20 blocks (2,480 features). Ridge with intercept, lsqr solver. Select alpha separately on validation RMSE from 0.01, 0.1, 1, 10, 100. No test selection or validation refitting. No structural graph, coordinates, pretrained embeddings or generative neural network.

## Actual held-out results

Test log1p-fitness RMSE: training-mean constant 0.229861; additive 0.191438; pairwise 0.179709. Test R²: additive −0.287584; pairwise −0.134643. Test Spearman: additive 0.343528; pairwise 0.348889. Pair terms improve error against these baselines, but neither beats the diagnostic constant equal to the test mean. This is limited extrapolation, not a validated design engine. Scores can be negative and are not clipped into physical claims.

All train/validation/test metrics and alpha grid results are in `public/data/protein-benchmark/model.json`. Provenance, versions, checksum and limits are in metadata.json; independent whole-dataset and whole-test checks are in verification.json. `src/lib/proteinBenchmark.ts` is the exact browser inference function tested against Python outputs. Feature contributions depend on encoding; they are not causal mechanisms or independent feature importance.
