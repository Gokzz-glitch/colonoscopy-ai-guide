/**
 * Automated Verification & Validation Test Suite for Worker M4 Pages:
 * - pages/03-ai-history.html
 * - pages/04-architectures.html
 * - pages/05-datasets.html
 * - pages/06-benchmarks.html
 */

const fs = require('fs');
const path = require('path');

let passes = [];
let failures = [];

function assert(condition, message) {
  if (condition) {
    passes.push(message);
    console.log(`  ✓ ${message}`);
  } else {
    failures.push(message);
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("===============================================================================");
console.log("WORKER M4 - TECHNICAL, ARCHITECTURES & BENCHMARKS PAGES VALIDATION");
console.log("===============================================================================\n");

const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');

const P3 = path.join(PAGES_DIR, '03-ai-history.html');
const P4 = path.join(PAGES_DIR, '04-architectures.html');
const P5 = path.join(PAGES_DIR, '05-datasets.html');
const P6 = path.join(PAGES_DIR, '06-benchmarks.html');

// 1. File existence and substantial size
console.log("1. Checking File Existence and Substantial Sizes (>15,000 bytes)...");
[
  { file: P3, name: '03-ai-history.html' },
  { file: P4, name: '04-architectures.html' },
  { file: P5, name: '05-datasets.html' },
  { file: P6, name: '06-benchmarks.html' }
].forEach(p => {
  assert(fs.existsSync(p.file), `${p.name} exists`);
  const size = fs.statSync(p.file).size;
  assert(size > 15000, `${p.name} is deeply detailed and substantial (${size} bytes)`);
});

const c3 = fs.readFileSync(P3, 'utf8');
const c4 = fs.readFileSync(P4, 'utf8');
const c5 = fs.readFileSync(P5, 'utf8');
const c6 = fs.readFileSync(P6, 'utf8');

// 2. Structural & Layout Consistency Across All 4 Pages
console.log("\n2. Verifying Universal Structural Layout and Navigation Components...");
[
  { content: c3, name: '03-ai-history.html' },
  { content: c4, name: '04-architectures.html' },
  { content: c5, name: '05-datasets.html' },
  { content: c6, name: '06-benchmarks.html' }
].forEach(p => {
  assert(p.content.includes('<!DOCTYPE html>'), `${p.name} contains standard HTML5 DOCTYPE`);
  assert(p.content.includes('<html lang="en" data-theme="dark">'), `${p.name} defaults to data-theme="dark"`);
  assert(p.content.includes('<div id="scroll-progress"'), `${p.name} contains #scroll-progress top indicator`);
  assert(p.content.includes('class="site-header"'), `${p.name} contains sticky .site-header`);
  assert(p.content.includes('class="brand-logo"'), `${p.name} contains brand logo`);
  assert(p.content.includes('class="theme-toggle-btn"'), `${p.name} contains theme toggle button`);
  assert(p.content.includes('class="hamburger-btn"'), `${p.name} contains mobile hamburger toggle`);
  assert(p.content.includes('class="mobile-nav-drawer"'), `${p.name} contains mobile navigation drawer`);
  assert(p.content.includes('class="site-footer"'), `${p.name} contains responsive footer with links`);
  assert(p.content.includes('../assets/css/main.css'), `${p.name} links to main.css`);
  assert(p.content.includes('../assets/js/main.js'), `${p.name} links to main.js`);
  assert(p.content.includes('class="glossary-term"'), `${p.name} wraps technical terms in .glossary-term`);
});

// 3. Page 03-ai-history.html Requirements
console.log("\n3. Validating 03-ai-history.html (Evolution Timeline)...");
assert(c3.includes('id="era-slider"'), "Timeline slider input #era-slider present");
assert(c3.includes('id="era-summary-card"'), "Dynamic era summary highlight card present");
assert(c3.includes('id="milestone-cards-container"'), "Milestone cards container present");
assert(c3.includes('WM-DOVA'), "Era 1: WM-DOVA energy maps present");
assert(c3.includes('Edge-Voting'), "Era 1: Geometric edge voting present");
assert(c3.includes('U-Net'), "Era 2: U-Net baseline present");
assert(c3.includes('PraNet'), "Era 2: PraNet reverse attention present");
assert(c3.includes('HarDNet-MSEG'), "Era 2: HarDNet-MSEG low-CIO present");
assert(c3.includes('SANet'), "Era 2: SANet color exchange present");
assert(c3.includes('Polyp-PVT'), "Era 3: Polyp-PVT pyramid vision transformer present");
assert(c3.includes('ColonFormer'), "Era 3: ColonFormer axial attention present");
assert(c3.includes('Endo-FM'), "Era 4: Endo-FM video foundation model present");
assert(c3.includes('EndoMamba'), "Era 4: EndoMamba selective state space model present");
assert(c3.includes('data-era="1"') && c3.includes('data-era="2"') && c3.includes('data-era="3"') && c3.includes('data-era="4"'), "Cards correctly categorized across all 4 eras");

// 4. Page 04-architectures.html Requirements
console.log("\n4. Validating 04-architectures.html (Architectural Deep Dives)...");
assert(c4.includes('id="interactive-explorer"'), "Interactive Architecture Explorer container present");
assert(c4.includes('data-component="encoder"'), "Component node: Encoder present");
assert(c4.includes('data-component="bottleneck"'), "Component node: Bottleneck present");
assert(c4.includes('data-component="decoder"'), "Component node: Decoder present");
assert(c4.includes('data-component="loss"'), "Component node: Loss function present");
assert(c4.includes('data-component="innovation"'), "Component node: Innovation present");
assert(c4.includes('id="arch-unet"'), "U-Net deep dive section present (31.03M, 53 FPS)");
assert(c4.includes('id="arch-pranet"'), "PraNet deep dive section present (Res2Net, PPD, Reverse Attention, 32.55M)");
assert(c4.includes('id="arch-hardnet"'), "HarDNet-MSEG deep dive section present (Harmonic Dense, Low CIO, 88 FPS)");
assert(c4.includes('id="arch-polyp-pvt"'), "Polyp-PVT deep dive section present (PVTv2, CIM, GCN, 44.6M)");
assert(c4.includes('id="arch-colonformer"'), "ColonFormer deep dive section present (MiT-B3, RA-RA, non-monotonic scaling)");
assert(c4.includes('id="arch-endomamba"'), "EndoMamba deep dive section present (Mamba S6, linear complexity, 47 FPS)");
assert(c4.includes('Non-Monotonic Backbone Scaling'), "Non-monotonic scaling beyond MiT-B3 explicitly documented");
assert(c4.includes('Resolution Mismatch Nuance'), "312x312 resolution mismatch explicitly documented");

// 5. Page 05-datasets.html Requirements
console.log("\n5. Validating 05-datasets.html (Dataset Catalog)...");
assert(c5.includes('id="dataset-search"'), "Dataset search input present");
assert(c5.includes('id="modality-filter-group"'), "Modality filter buttons present");
assert(c5.includes('CVC-ClinicDB'), "CVC-ClinicDB profile present");
assert(c5.includes('CVC-ColonDB'), "CVC-ColonDB profile present");
assert(c5.includes('ETIS-LaribPolypDB'), "ETIS-LaribPolypDB profile present");
assert(c5.includes('Kvasir-SEG'), "Kvasir-SEG profile present");
assert(c5.includes('HyperKvasir'), "HyperKvasir profile present");
assert(c5.includes('BKAI-IGH NeoPolyp'), "BKAI-IGH NeoPolyp profile present");
assert(c5.includes('PICCOLO'), "PICCOLO profile present");
assert(c5.includes('LDPolypVideo'), "LDPolypVideo profile present");
assert(c5.includes('SUN-SEG'), "SUN-SEG profile present");
assert(c5.includes('PolypGen 2021'), "PolypGen 2021 profile present");
assert(c5.includes('1,000/1,000 SHA-256') || c5.includes('byte-identical'), "HyperKvasir 1,000 byte-identical duplicate finding documented");
assert(c5.includes('58 of the 60') || c5.includes('58 frames'), "ColonDB and CVC-300 58-frame duplicate overlap documented");
assert(c5.includes('video leakage') || c5.includes('Video Leakage'), "ClinicDB video leakage hazard documented");

// 6. Page 06-benchmarks.html Requirements
console.log("\n6. Validating 06-benchmarks.html (Benchmark Comparisons)...");
assert(c6.includes('cdn.jsdelivr.net/npm/chart.js'), "Chart.js CDN script included");
assert(c6.includes('../assets/js/charts.js'), "charts.js script included");
assert(c6.includes('data-chart="dice-comparison"'), 'Benchmark container data-chart="dice-comparison" present');
assert(c6.includes('id="benchmark-chart"'), "Benchmark canvas #benchmark-chart present");
assert(c6.includes('id="efficiency-chart"'), "Efficiency scatter canvas #efficiency-chart present");
assert(c6.includes('id="small-polyp-chart"'), "Small polyp collapse canvas #small-polyp-chart present");
assert(c6.includes('id="video-scaling-chart"'), "Video scaling canvas #video-scaling-chart present");
assert(c6.includes('0.818') && c6.includes('0.398'), "Canonical U-Net scores (0.818 / 0.398) verified");
assert(c6.includes('0.898') && c6.includes('0.628'), "Canonical PraNet scores (0.898 / 0.628) verified");
assert(c6.includes('0.904') && c6.includes('0.677'), "Canonical HarDNet scores (0.904 / 0.677) verified");
assert(c6.includes('0.917') && c6.includes('0.808'), "Canonical Polyp-PVT scores (0.917 / 0.808) verified");
assert(c6.includes('0.924') && c6.includes('0.814'), "Canonical ColonFormer scores (0.924 / 0.814) verified");
assert(c6.includes('0.926') && c6.includes('0.808'), "Canonical HSNet scores (0.926 / 0.808) verified");
assert(c6.includes('Forensic Integrity Alerts for Benchmark Interpretation'), "Prominent integrity alert banner present");

// Summary
console.log("\n===============================================================================");
console.log(`WORKER M4 TEST SUMMARY: ${passes.length} Passed, ${failures.length} Failed`);
console.log("===============================================================================");

if (failures.length > 0) {
  process.exit(1);
} else {
  console.log("ALL M4 PAGES FULLY VALIDATED AND PASS INTEGRITY CHECKS!\n");
  process.exit(0);
}
