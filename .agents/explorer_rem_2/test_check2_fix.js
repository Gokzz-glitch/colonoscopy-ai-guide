const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');

// Test 03-ai-history.html with proposed fix
let c3 = fs.readFileSync(path.join(pagesDir, '03-ai-history.html'), 'utf8');

// Proposed fix for 03-ai-history.html
const target03 = `<div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB, and 0.808 ETIS-Larib</strong> mDice.</div>`;
const replacement03 = `<div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB<span style="color: var(--color-coral); font-weight: 700;">*</span>, and 0.808 ETIS-Larib</strong> mDice.</div>
              <div style="margin-top: 0.35rem; padding: 0.4rem 0.6rem; background: rgba(249, 115, 22, 0.1); border-left: 3px solid var(--color-coral); border-radius: var(--radius-xs); font-size: 0.775rem; color: var(--text-secondary);">
                <strong style="color: var(--color-coral);">*Integrity Disclaimer:</strong> CVC-ClinicDB scores suffer from in-sequence video frame temporal leakage (+12% to +15% artificial Dice inflation from seen-domain interpolation); see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
              </div>`;

c3 = c3.replace(target03, replacement03);

// Test 04-architectures.html with proposed fix
let c4 = fs.readFileSync(path.join(pagesDir, '04-architectures.html'), 'utf8');

const target04_1 = `shapes: "BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628",`;
const rep04_1 = `shapes: "BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899* [Video Leakage] / ETIS 0.628",`;

const target04_2 = `shapes: "BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677",`;
const rep04_2 = `shapes: "BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932* [Video Leakage] / ETIS 0.677",`;

c4 = c4.replace(target04_1, rep04_1);
c4 = c4.replace(target04_2, rep04_2);

console.log("=== SIMULATING AUDIT CHECK 2 ON PROPOSED CONTENT ===");

let c2_fail = false;
let details = [];
let evidence = [];

// Audit test 03
if (c3.includes("0.937 ClinicDB") && !/leakage|in-sequence|seen-domain/i.test(c3)) {
  c2_fail = true;
  evidence.push(`pages/03-ai-history.html: flagged`);
}

// Audit test 04
const pRanetShape = c4.includes("BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628");
const hardNetShape = c4.includes("BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677");
if (pRanetShape || hardNetShape) {
  details.push(`pages/04-architectures.html: flagged`);
}

console.log(`c2_fail: ${c2_fail}`);
console.log(`evidence: ${JSON.stringify(evidence)}`);
console.log(`details: ${JSON.stringify(details)}`);
console.log(`pRanetShape detected: ${pRanetShape}`);
console.log(`hardNetShape detected: ${hardNetShape}`);
console.log(`03-ai-history has leakage/in-sequence/seen-domain: ${/leakage|in-sequence|seen-domain/i.test(c3)}`);

if (!c2_fail && details.length === 0 && evidence.length === 0) {
  console.log("\n>>> SUCCESS: CHECK 2 PASSES WITH ZERO VIOLATIONS AND ZERO DETAILS! <<<");
} else {
  console.log("\n>>> FAILURE: Still flagged! <<<");
}
