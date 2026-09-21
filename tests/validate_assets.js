/**
 * Automated Forensic & Integrity Validation Test Suite
 * Validates Core Assets: main.css, main.js, charts.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let failures = [];
let passes = [];

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
console.log("COLONOSCOPY AI GUIDE - CORE ASSETS VALIDATION SUITE");
console.log("===============================================================================\n");

const ROOT_DIR = path.resolve(__dirname, '..');
const CSS_FILE = path.join(ROOT_DIR, 'assets', 'css', 'main.css');
const MAIN_JS_FILE = path.join(ROOT_DIR, 'assets', 'js', 'main.js');
const CHARTS_JS_FILE = path.join(ROOT_DIR, 'assets', 'js', 'charts.js');

// ----------------------------------------------------------------------------
// 1. Validate File Existence & Basic Properties
// ----------------------------------------------------------------------------
console.log("1. Checking File Existence and Sizes...");
assert(fs.existsSync(CSS_FILE), `main.css exists at ${CSS_FILE}`);
assert(fs.existsSync(MAIN_JS_FILE), `main.js exists at ${MAIN_JS_FILE}`);
assert(fs.existsSync(CHARTS_JS_FILE), `charts.js exists at ${CHARTS_JS_FILE}`);

const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
const mainJsContent = fs.readFileSync(MAIN_JS_FILE, 'utf8');
const chartsJsContent = fs.readFileSync(CHARTS_JS_FILE, 'utf8');

assert(cssContent.length > 5000, `main.css is substantial (${cssContent.length} bytes)`);
assert(mainJsContent.length > 5000, `main.js is substantial (${mainJsContent.length} bytes)`);
assert(chartsJsContent.length > 5000, `charts.js is substantial (${chartsJsContent.length} bytes)`);

// ----------------------------------------------------------------------------
// 2. CSS Design System Rules & Tokens Verification
// ----------------------------------------------------------------------------
console.log("\n2. Verifying CSS Design System Specifications...");

// Balanced braces check
let braceCount = 0;
for (let ch of cssContent) {
  if (ch === '{') braceCount++;
  if (ch === '}') braceCount--;
}
assert(braceCount === 0, "main.css has perfectly balanced curly braces");

// Dark Mode Tokens
assert(cssContent.includes('--bg-primary: #0a0e1a;'), "Deep space dark #0a0e1a default background defined");
assert(cssContent.includes('--color-teal: #00d4ff;'), "Electric teal #00d4ff defined");
assert(cssContent.includes('--color-amber: #ffb347;'), "Warm amber #ffb347 defined");
assert(cssContent.includes('--color-purple: #a855f7;'), "Soft purple-violet #a855f7 defined");
assert(cssContent.includes('--color-emerald: #10b981;'), "Emerald #10b981 defined");
assert(cssContent.includes('--color-coral: #f97316;'), "Coral warning #f97316 defined");

// Light Mode Tokens
assert(cssContent.includes('[data-theme="light"]'), "Light mode theme override block present");
assert(cssContent.includes('--bg-primary: #f8fafc;'), "Light mode clean medical tech palette #f8fafc defined");

// Glassmorphism & Typography
assert(cssContent.includes('backdrop-filter: blur(12px)'), "Glassmorphism backdrop-filter blur(12px) present");
assert(cssContent.includes('Space Grotesk'), "Space Grotesk heading typography present");
assert(cssContent.includes('Inter'), "Inter body typography present");

// Mandatory UI Components
assert(cssContent.includes('#scroll-progress'), "Top horizontal scroll progress indicator #scroll-progress defined");
assert(cssContent.includes('.audience-card'), "Dual audience path cards defined");
assert(cssContent.includes('.stat-card'), "Stat counter cards defined");
assert(cssContent.includes('.alert-clinical'), "Clinical note alert callout defined");
assert(cssContent.includes('.alert-technical'), "Technical warning alert callout defined");
assert(cssContent.includes('.alert-integrity'), "Integrity alert callout defined");
assert(cssContent.includes('.glossary-tooltip'), "Glossary tooltip popover defined");
assert(cssContent.includes('.data-table th.sticky-header'), "Data table sticky header defined");
assert(cssContent.includes('@media print'), "Print-friendly media query defined");

// ----------------------------------------------------------------------------
// 3. JavaScript Syntax & DOM Simulation for main.js
// ----------------------------------------------------------------------------
console.log("\n3. Validating main.js and 50-Term Glossary Dictionary...");

function createMockDom() {
  const listeners = {};
  const doc = {
    readyState: 'complete',
    documentElement: {
      scrollTop: 0,
      scrollHeight: 2000,
      clientHeight: 800,
      getAttribute: (attr) => 'dark',
      setAttribute: (attr, val) => {}
    },
    body: {
      style: {},
      appendChild: () => {},
      prepend: () => {}
    },
    createElement: (tag) => ({
      id: '',
      className: '',
      style: {},
      setAttribute: () => {},
      getAttribute: () => null,
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelector: () => ({ textContent: '', className: '', style: {}, setAttribute: () => {} }),
      querySelectorAll: () => []
    }),
    getElementById: (id) => null,
    querySelector: (sel) => null,
    querySelectorAll: () => [],
    addEventListener: (event, cb) => {
      listeners[event] = cb;
    }
  };

  const win = {
    document: doc,
    localStorage: {
      getItem: () => null,
      setItem: () => {}
    },
    addEventListener: (event, cb) => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false }),
    location: { pathname: '/index.html' },
    innerWidth: 1200,
    innerHeight: 800,
    MutationObserver: class {
      observe() {}
      disconnect() {}
    }
  };

  return { window: win, document: doc, localStorage: win.localStorage, MutationObserver: win.MutationObserver, setTimeout, clearTimeout, console };
}

const domSandbox = createMockDom();
domSandbox.window.window = domSandbox.window;
domSandbox.window.ColonoscopyAI = undefined;

try {
  vm.runInNewContext(mainJsContent, domSandbox);
  assert(true, "main.js parses and executes without syntax or runtime initialization errors");
} catch (e) {
  assert(false, `main.js execution error: ${e.message}`);
}

const ColonoscopyAI = domSandbox.window.ColonoscopyAI || domSandbox.ColonoscopyAI;
assert(ColonoscopyAI !== undefined, "ColonoscopyAI namespace exported to window");
assert(typeof ColonoscopyAI.initScrollProgress === 'function', "initScrollProgress method is available");
assert(typeof ColonoscopyAI.initThemeEngine === 'function', "initThemeEngine method is available");
assert(typeof ColonoscopyAI.initMobileNav === 'function', "initMobileNav method is available");
assert(typeof ColonoscopyAI.initGlossaryTooltips === 'function', "initGlossaryTooltips method is available");
assert(typeof ColonoscopyAI.initReferencesFilter === 'function', "initReferencesFilter method is available");
assert(typeof ColonoscopyAI.initGlossaryPage === 'function', "initGlossaryPage method is available");

// Validate 50 Glossary Terms
const terms = ColonoscopyAI.glossary;
const termKeys = Object.keys(terms);
console.log(`Found ${termKeys.length} terms in in-memory glossary dictionary.`);
assert(termKeys.length === 50, `Glossary contains exactly 50 terms (actual: ${termKeys.length})`);

const categories = { Clinical: 0, Metric: 0, Architecture: 0, Dataset: 0, Integrity: 0 };
let validDefinitions = 0;

termKeys.forEach(k => {
  const item = terms[k];
  if (categories[item.category] !== undefined) {
    categories[item.category]++;
  }
  if (item.term && item.category && item.badgeClass && item.definition && item.link) {
    validDefinitions++;
  }
});

assert(categories.Clinical === 14, `Clinical Category has 14 terms (actual: ${categories.Clinical})`);
assert(categories.Metric === 9, `Metric Category has 9 terms (actual: ${categories.Metric})`);
assert(categories.Architecture === 13, `Architecture Category has 13 terms (actual: ${categories.Architecture})`);
assert(categories.Dataset === 8, `Dataset Category has 8 terms (actual: ${categories.Dataset})`);
assert(categories.Integrity === 6, `Integrity Category has 6 terms (actual: ${categories.Integrity})`);
assert(validDefinitions === 50, `All 50 terms have complete schemas (term, category, badgeClass, definition, link)`);

// Test alias resolution
assert(ColonoscopyAI.resolveGlossaryTerm({ getAttribute: () => 'adr', textContent: 'ADR' }).term === "Adenoma Detection Rate (ADR)", "Resolves 'adr' key to full ADR object");
assert(ColonoscopyAI.resolveGlossaryTerm({ getAttribute: () => '', textContent: 'Video Leakage' }).term === "Video Frame Leakage", "Resolves 'Video Leakage' text to Video Frame Leakage");
assert(ColonoscopyAI.resolveGlossaryTerm({ getAttribute: () => 'etis', textContent: 'ETIS' }).term === "ETIS-LaribPolypDB", "Resolves 'etis' to ETIS-LaribPolypDB");

// ----------------------------------------------------------------------------
// 4. JavaScript Syntax & Benchmark Verification for charts.js
// ----------------------------------------------------------------------------
console.log("\n4. Validating charts.js and Benchmark Matrices...");

const chartsSandbox = {
  window: {},
  document: {
    readyState: 'complete',
    documentElement: {
      getAttribute: () => 'dark'
    },
    getElementById: (id) => null,
    addEventListener: () => {}
  },
  console: console
};
chartsSandbox.window = chartsSandbox;

try {
  vm.runInNewContext(chartsJsContent, chartsSandbox);
  assert(true, "charts.js parses and executes without syntax or runtime initialization errors");
} catch (e) {
  assert(false, `charts.js execution error: ${e.message}`);
}

const ColonoscopyCharts = chartsSandbox.ColonoscopyCharts;
assert(ColonoscopyCharts !== undefined, "ColonoscopyCharts namespace exported to window");
assert(typeof ColonoscopyCharts.initBenchmarkChart === 'function', "initBenchmarkChart method exists");
assert(typeof ColonoscopyCharts.setBenchmarkDataset === 'function', "setBenchmarkDataset method exists");
assert(typeof ColonoscopyCharts.setBenchmarkMetric === 'function', "setBenchmarkMetric method exists");
assert(typeof ColonoscopyCharts.toggleModel === 'function', "toggleModel method exists");
assert(typeof ColonoscopyCharts.initEfficiencyChart === 'function', "initEfficiencyChart method exists");
assert(typeof ColonoscopyCharts.initSmallPolypChart === 'function', "initSmallPolypChart method exists");
assert(typeof ColonoscopyCharts.initVideoScalingChart === 'function', "initVideoScalingChart method exists");

// Validate Benchmark Models & Scores
const models = ColonoscopyCharts.models;
const modelKeys = Object.keys(models);
console.log(`Found ${modelKeys.length} benchmark models in matrix.`);
assert(modelKeys.length >= 9, `At least 9 models represented (actual: ${modelKeys.length})`);

// Verify exact scores against technical_ledger.md
assert(models.unet.scores.kvasir.dice === 0.818, "U-Net Kvasir mDice verified at 0.818");
assert(models.unet.scores.etis.dice === 0.398, "U-Net ETIS mDice verified at 0.398");
assert(models.pranet.scores.clinicdb.dice === 0.899, "PraNet ClinicDB mDice verified at 0.899");
assert(models.pranet.scores.colondb.dice === 0.709, "PraNet ColonDB mDice verified at 0.709");
assert(models.hardnet.scores.kvasir.dice === 0.904, "HarDNet-MSEG Kvasir mDice verified at 0.904");
assert(models.hardnet.fps === 88.0, "HarDNet-MSEG inference speed verified at 88 FPS");
assert(models.sanet.scores.etis.dice === 0.750, "SANet ETIS mDice verified at 0.750");
assert(models.polyp_pvt.scores.clinicdb.dice === 0.937, "Polyp-PVT ClinicDB mDice verified at 0.937");
assert(models.colonformer.scores.cvc300.dice === 0.906, "ColonFormer CVC-300 mDice verified at 0.906");
assert(models.cfa_net.scores.kvasir.dice === 0.923, "CFA-Net Kvasir mDice verified at 0.923");

// Verify Datasets & Integrity Warnings
const datasets = ColonoscopyCharts.datasets;
assert(datasets.clinicdb !== undefined, "CVC-ClinicDB dataset metadata present");
assert(datasets.clinicdb.caveat.includes("video sequence") || datasets.clinicdb.caveat.includes("Video leakage") || datasets.clinicdb.caveat.includes("near-duplicate"), "CVC-ClinicDB video leakage caveat present");
assert(datasets.colondb !== undefined, "CVC-ColonDB dataset metadata present");
assert(datasets.colondb.caveat.includes("Never merge") || datasets.colondb.caveat.includes("distinct"), "CVC-ColonDB distinction from CVC-300 caveat present");
assert(datasets.cvc300 !== undefined, "CVC-300 dataset metadata present");
assert(datasets.cvc300.caveat.includes("58") || datasets.cvc300.caveat.includes("duplicate"), "CVC-300 58-frame duplicate caveat present");

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TEST SUMMARY: ${passes.length} Passed, ${failures.length} Failed`);
console.log("===============================================================================");

if (failures.length > 0) {
  process.exit(1);
} else {
  console.log("ALL VALIDATION CHECKS PASSED PERFECTLY!\n");
  process.exit(0);
}
