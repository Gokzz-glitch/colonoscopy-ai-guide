/**
 * Automated Verification Suite for Worker M5 Deliverables
 * Validates:
 * 1. pages/08-benchmark-integrity.html
 * 2. pages/09-chakramodel.html
 * 3. pages/10-future.html
 * 4. pages/11-references.html
 * 5. pages/12-glossary.html
 * 6. README.md
 */

const fs = require('fs');
const path = require('path');

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
console.log("COLONOSCOPY AI GUIDE - WORKER M5 INTEGRATION & PAGES VALIDATION SUITE");
console.log("===============================================================================\n");

const ROOT_DIR = path.resolve(__dirname, '..');
const P08 = path.join(ROOT_DIR, 'pages', '08-benchmark-integrity.html');
const P09 = path.join(ROOT_DIR, 'pages', '09-chakramodel.html');
const P10 = path.join(ROOT_DIR, 'pages', '10-future.html');
const P11 = path.join(ROOT_DIR, 'pages', '11-references.html');
const P12 = path.join(ROOT_DIR, 'pages', '12-glossary.html');
const README_FILE = path.join(ROOT_DIR, 'README.md');

// 1. File Existence and Non-Empty
console.log("1. Checking Worker M5 Deliverables Existence...");
assert(fs.existsSync(P08), `08-benchmark-integrity.html exists`);
assert(fs.existsSync(P09), `09-chakramodel.html exists`);
assert(fs.existsSync(P10), `10-future.html exists`);
assert(fs.existsSync(P11), `11-references.html exists`);
assert(fs.existsSync(P12), `12-glossary.html exists`);
assert(fs.existsSync(README_FILE), `README.md exists at project root`);

const c08 = fs.readFileSync(P08, 'utf8');
const c09 = fs.readFileSync(P09, 'utf8');
const c10 = fs.readFileSync(P10, 'utf8');
const c11 = fs.readFileSync(P11, 'utf8');
const c12 = fs.readFileSync(P12, 'utf8');
const cReadme = fs.readFileSync(README_FILE, 'utf8');

assert(c08.length > 5000, `08-benchmark-integrity.html is substantial (${c08.length} bytes)`);
assert(c09.length > 5000, `09-chakramodel.html is substantial (${c09.length} bytes)`);
assert(c10.length > 5000, `10-future.html is substantial (${c10.length} bytes)`);
assert(c11.length > 10000, `11-references.html is substantial (${c11.length} bytes)`);
assert(c12.length > 10000, `12-glossary.html is substantial (${c12.length} bytes)`);
assert(cReadme.length > 3000, `README.md is comprehensive (${cReadme.length} bytes)`);

// 2. Validate Navigation & Common Infrastructure across all 5 pages
console.log("\n2. Validating Navigation & Header/Footer Infrastructure...");
[
  { name: '08-benchmark-integrity', content: c08 },
  { name: '09-chakramodel', content: c09 },
  { name: '10-future', content: c10 },
  { name: '11-references', content: c11 },
  { name: '12-glossary', content: c12 }
].forEach(page => {
  assert(page.content.includes('id="scroll-progress"'), `${page.name} includes #scroll-progress bar`);
  assert(page.content.includes('class="site-header"'), `${page.name} includes sticky .site-header`);
  assert(page.content.includes('class="theme-toggle-btn"'), `${page.name} includes .theme-toggle-btn`);
  assert(page.content.includes('class="hamburger-btn"'), `${page.name} includes .hamburger-btn`);
  assert(page.content.includes('id="mobile-drawer"'), `${page.name} includes #mobile-drawer`);
  assert(page.content.includes('class="site-footer"'), `${page.name} includes .site-footer`);
  assert(page.content.includes('href="../assets/css/main.css"'), `${page.name} links to main.css`);
  assert(page.content.includes('src="../assets/js/main.js"'), `${page.name} links to main.js`);
});

// 3. Validate Page 08: Benchmark Integrity Audit
console.log("\n3. Validating 08-benchmark-integrity.html (Integrity Map & 4 Flaws)...");
assert(c08.includes('Interactive Dataset Contamination Map') || c08.includes('integrity-graph-grid'), "08 includes interactive visual contamination map");
assert(c08.includes('30 verified near-duplicate links') || c08.includes('30 Verified Links') || c08.includes('30 Near-Duplicate Links'), "08 documents 30 verified near-duplicate links in ClinicDB");
assert(c08.includes('RANSAC') && c08.includes('ORB'), "08 details ORB and RANSAC affine consensus methodology");
assert(c08.includes('27') && c08.includes('sequence groups'), "08 details 27 sequence groups spanning train and validation in v1");
assert(c08.includes('12%') || c08.includes('15%') || c08.includes('seen-domain'), "08 highlights seen-domain +12-15% artificial Dice inflation");
assert(c08.includes('58') && c08.includes('CVC-300'), "08 documents 58 identical frames between CVC-ColonDB and CVC-300");
assert(c08.includes('SHA-256') && c08.includes('HyperKvasir'), "08 documents 1,000/1,000 SHA-256 duplication in HyperKvasir");
assert(c08.includes('4,275') && c08.includes('PolypGen'), "08 documents 4,275 polyp-free healthy mucosa frames");
assert(c08.includes('class="glossary-term"'), "08 wraps technical terms in .glossary-term");

// 4. Validate Page 09: ChakraModel Research Project
console.log("\n4. Validating 09-chakramodel.html (ChakraModel History, Protocol, splits_v2)...");
assert(c09.includes('Standard polyp-segmentation benchmarks overstate') || c09.includes('The Great Strategic Pivot'), "09 details Executive Summary and Strategic Pivot");
assert(c09.includes('ChakraTransformer') && c09.includes('309.2M'), "09 details ChakraTransformer failure with 309.2M params");
assert(c09.includes('0.838') && c09.includes('0.771'), "09 details ChakraTransformer empirical scores (0.838 Kvasir, 0.771 ClinicDB)");
assert(c09.includes('7.76 FPS'), "09 details ChakraTransformer 7.76 FPS inference speed");
assert(c09.includes('128') && (c09.includes('0.276') || c09.includes('Collapse')), "09 details 128px low-resolution experiments collapse");
assert(c09.includes('ChakraXAttnUNet v2') || c09.includes('CHAKRA-XATTN-UNET v2'), "09 details ChakraXAttnUNet v2 architecture");
assert(c09.includes('Dual-Path Skip Routing') || c09.includes('dual-path'), "09 details Dual-Path skip routing fixing v1 skip-pooling flaw");
assert(c09.includes('leakbench'), "09 establishes Stage 1 leakbench standardized protocol");
assert(c09.includes('splits_v2') && c09.includes('1,228') && c09.includes('222'), "09 documents splits_v2 group-aware split (1,228 train / 222 val)");
assert(c09.includes('PICCOLO') && c09.includes('3,433') && c09.includes('76'), "09 documents PICCOLO dataset integration (3,433 frames, 76 lesions)");

// 5. Validate Page 10: The Future of Colonoscopy AI
console.log("\n5. Validating 10-future.html (Roadmap, Foundation Models, Mamba, Agentic Vision)...");
assert(c10.includes('Stage 2') && c10.includes('Stage 3'), "10 documents Stage 2 and Stage 3 roadmap");
assert(c10.includes('SAM') || c10.includes('MedSAM'), "10 covers vision foundation models");
assert(c10.includes('prompt leakage') || c10.includes('Prompt Leakage'), "10 details fair-prompt evaluation and prompt leakage");
assert(c10.includes('EndoMamba') || c10.includes('Mamba-VPS'), "10 details state-space spatiotemporal modeling");
assert(c10.includes('Multimodal Agentic') || c10.includes('Co-Pilot'), "10 details multimodal agentic colonoscopy procedure suite");
assert(c10.includes('BBPS') && c10.includes('CIR') && c10.includes('withdrawal timer'), "10 details automated quality assurance (BBPS, CIR, withdrawal time)");
assert(c10.includes('deskilling') || c10.includes('Budzyński'), "10 discusses endoscopist cognitive deskilling trial findings");

// 6. Validate Page 11: Master Hyperlinked References
console.log("\n6. Validating 11-references.html (48 References & Metadata)...");
assert(c11.includes('id="reference-search"'), "11 includes #reference-search input");
assert(c11.includes('id="ref-filter-pills"'), "11 includes #ref-filter-pills container");
assert(c11.includes('id="reference-count"'), "11 includes #reference-count element");

// Count reference cards
const refCardMatches = c11.match(/class="reference-card"/g) || [];
console.log(`Found ${refCardMatches.length} reference cards in 11-references.html`);
assert(refCardMatches.length === 49, `11 contains exactly 49 reference cards (actual: ${refCardMatches.length})`);

// Verify reference numbering from #01 to #49
let missingNums = [];
for (let i = 1; i <= 49; i++) {
  const padNum = `#${i.toString().padStart(2, '0')}`;
  if (!c11.includes(padNum)) {
    missingNums.push(padNum);
  }
}
assert(missingNums.length === 0, `All references #01 to #49 indexed (missing: ${missingNums.join(', ') || 'none'})`);

// Check Corley et al. 2014 landmark reference
assert(c11.includes('id="ref-corley2014"'), "11 includes #ref-corley2014 anchor");
assert(c11.includes('10.1056/NEJMoa1309086'), "11 includes Corley et al. DOI link");
assert(c11.includes('24693890'), "11 includes Corley et al. PubMed ID");

// Check DOI and arXiv links
assert(c11.includes('https://doi.org/10.7326/M20-1994'), "11 includes Repici et al. DOI link");
assert(c11.includes('https://doi.org/10.1007/978-3-030-59725-2_26'), "11 includes PraNet DOI link");
assert(c11.includes('https://arxiv.org/abs/2108.06932'), "11 includes Polyp-PVT arXiv link");
assert(c11.includes('https://github.com/facebookresearch/segment-anything'), "11 includes SAM GitHub link");

// 7. Validate Page 12: Master Plain-English Glossary
console.log("\n7. Validating 12-glossary.html (50 Terms, Search, Filter, Jump Index)...");
assert(c12.includes('id="glossary-search"'), "12 includes #glossary-search input");
assert(c12.includes('id="glossary-filter-pills"'), "12 includes #glossary-filter-pills container");
assert(c12.includes('class="letter-index"'), "12 includes .letter-index alphabetical jump bar");
assert(c12.includes('id="glossary-count"'), "12 includes #glossary-count element");

// Count glossary cards
const glossaryCardMatches = c12.match(/class="glossary-card"/g) || [];
console.log(`Found ${glossaryCardMatches.length} glossary cards in 12-glossary.html`);
assert(glossaryCardMatches.length === 50, `12 contains exactly 50 glossary cards (actual: ${glossaryCardMatches.length})`);

// Verify essential anchor IDs matching main.js glossary links
const keyIds = ['adr', 'pdr', 'apc', 'amr', 'paris-classification', 'nice-classification', 'kudo-pit-pattern', 'sessile-serrated-lesion', 'diminutive-polyp', 'resect-and-discard', 'withdrawal-time', 'cecal-intubation-rate', 'bbps', 'alarm-fatigue', 'dice', 'iou', 'mae', 'far', 's-measure', 'e-measure', 'fps', 'inference-latency', 'peak-vram', 'cnn', 'vit', 'pvt', 'swin-transformer', 'reverse-attention', 'ppd', 'rfb', 'ssm-mamba', 'dual-path-skip-routing', 'fpn', 'tta', 'inductive-bias', 'deep-supervision', 'kvasir-seg', 'cvc-clinicdb', 'cvc-colondb', 'etis-larib', 'cvc-300', 'polypgen', 'piccolo', 'sun-seg', 'video-frame-leakage', 'in-sequence-evaluation', 'cross-dataset-contamination', 'sha-256-cryptographic-audit', 'group-aware-splitting', 'prompt-leakage'];

let missingIds = [];
keyIds.forEach(id => {
  if (!c12.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});
assert(missingIds.length === 0, `All 50 glossary anchor IDs present (missing: ${missingIds.join(', ') || 'none'})`);

// 8. Validate README.md
console.log("\n8. Validating README.md Structure & Guidelines...");
assert(cReadme.includes('# Colonoscopy AI Education & ChakraModel Research Platform'), "README title is present");
assert(cReadme.includes('Platform Overview & Dual Mission'), "README details dual mission");
assert(cReadme.includes('Complete Platform Site Map'), "README includes complete platform sitemap");
assert(cReadme.includes('Visual Design System & Design Tokens'), "README includes design token specifications");
assert(cReadme.includes('Benchmark Integrity Disclosures & The 4 Flaws'), "README discloses the 4 benchmark flaws");
assert(cReadme.includes('python -m http.server 8000'), "README gives local preview command");
assert(cReadme.includes('GitHub Pages Deployment Guide'), "README includes GitHub Pages deployment instructions");

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TEST SUMMARY: ${passes.length} Passed, ${failures.length} Failed`);
console.log("===============================================================================");

if (failures.length > 0) {
  console.error("VALIDATION FAILED with errors listed above.");
  process.exit(1);
} else {
  console.log("ALL WORKER M5 VALIDATION CHECKS PASSED PERFECTLY!");
  process.exit(0);
}
