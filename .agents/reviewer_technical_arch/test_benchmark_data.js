const fs = require('fs');
const path = require('path');

const root = 'C:/Users/imgk3/teamwork_projects/colonoscopy_ai_guide';
const chartsJs = fs.readFileSync(path.join(root, 'assets/js/charts.js'), 'utf8');

// Extract BENCHMARK_MODELS
const mMatch = chartsJs.match(/const BENCHMARK_MODELS = ({[\s\S]*?});\s*const BENCHMARK_DATASETS/);
if (!mMatch) {
  console.error('Could not extract BENCHMARK_MODELS');
  process.exit(1);
}
const models = eval('(' + mMatch[1] + ')');

// Ledger ground truth table
const ledgerScores = {
  unet: { kvasir: [0.818, 0.746], clinicdb: [0.823, 0.755], colondb: [0.512, 0.444], etis: [0.398, 0.335], cvc300: [0.710, 0.627] },
  pranet: { kvasir: [0.898, 0.840], clinicdb: [0.899, 0.849], colondb: [0.709, 0.640], etis: [0.628, 0.567], cvc300: [0.871, 0.797] },
  hardnet: { kvasir: [0.904, 0.857], clinicdb: [0.932, 0.848], colondb: [0.731, 0.677], etis: [0.677, 0.613], cvc300: [0.887, 0.803] },
  sanet: { kvasir: [0.904, 0.847], clinicdb: [0.916, 0.859], colondb: [0.753, 0.670], etis: [0.750, 0.654], cvc300: [0.888, 0.815] },
  polyp_pvt: { kvasir: [0.917, 0.864], clinicdb: [0.937, 0.889], colondb: [0.808, 0.727], etis: [0.787, 0.706], cvc300: [0.900, 0.833] },
  ssformer: { kvasir: [0.917, 0.864], clinicdb: [0.930, 0.880], colondb: [0.770, 0.721], etis: [0.796, 0.720], cvc300: [0.895, 0.827] },
  colonformer: { kvasir: [0.924, 0.870], clinicdb: [0.932, 0.885], colondb: [0.814, 0.730], etis: [0.801, 0.725], cvc300: [0.906, 0.835] },
  hsnet: { kvasir: [0.926, 0.877], clinicdb: [0.937, 0.887], colondb: [0.810, 0.735], etis: [0.808, 0.734], cvc300: [0.903, 0.839] }
};

let discrepancies = 0;
for (const [key, truth] of Object.entries(ledgerScores)) {
  const model = models[key];
  if (!model) {
    console.error(`Missing model in charts.js: ${key}`);
    discrepancies++;
    continue;
  }
  for (const [dKey, [dice, iou]] of Object.entries(truth)) {
    const score = model.scores[dKey];
    if (!score) {
      console.error(`Missing dataset score ${dKey} in model ${key}`);
      discrepancies++;
      continue;
    }
    if (Math.abs(score.dice - dice) > 0.001) {
      console.error(`Dice mismatch for ${key} on ${dKey}: got ${score.dice}, expected ${dice}`);
      discrepancies++;
    }
    if (Math.abs(score.iou - iou) > 0.001) {
      console.error(`IoU mismatch for ${key} on ${dKey}: got ${score.iou}, expected ${iou}`);
      discrepancies++;
    }
  }
}

if (discrepancies === 0) {
  console.log('All 8 core benchmark models have 100% exact numerical match across all 5 datasets in charts.js!');
}
