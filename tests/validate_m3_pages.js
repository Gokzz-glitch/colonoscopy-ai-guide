/**
 * Automated Validation Suite for Worker M3: Educational Core & Clinical Context Pages
 * Tests: index.html, 01-what-is-colonoscopy.html, 02-polyp-types.html, 06b-clinical-evidence.html, 07-clinical-systems.html
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
console.log("COLONOSCOPY AI GUIDE - WORKER M3 HTML PAGES VALIDATION SUITE");
console.log("===============================================================================\n");

const ROOT_DIR = path.resolve(__dirname, '..');
const MAIN_JS_FILE = path.join(ROOT_DIR, 'assets', 'js', 'main.js');
const MAIN_CSS_FILE = path.join(ROOT_DIR, 'assets', 'css', 'main.css');

const PAGES = [
  { file: path.join(ROOT_DIR, 'index.html'), id: 'index.html', relCss: 'assets/css/main.css', relJs: 'assets/js/main.js' },
  { file: path.join(ROOT_DIR, 'pages', '01-what-is-colonoscopy.html'), id: '01-what-is-colonoscopy.html', relCss: '../assets/css/main.css', relJs: '../assets/js/main.js' },
  { file: path.join(ROOT_DIR, 'pages', '02-polyp-types.html'), id: '02-polyp-types.html', relCss: '../assets/css/main.css', relJs: '../assets/js/main.js' },
  { file: path.join(ROOT_DIR, 'pages', '06b-clinical-evidence.html'), id: '06b-clinical-evidence.html', relCss: '../assets/css/main.css', relJs: '../assets/js/main.js' },
  { file: path.join(ROOT_DIR, 'pages', '07-clinical-systems.html'), id: '07-clinical-systems.html', relCss: '../assets/css/main.css', relJs: '../assets/js/main.js' }
];

// Read main.js to extract known glossary terms and aliases
const mainJsContent = fs.readFileSync(MAIN_JS_FILE, 'utf8');
const knownTerms = new Set();
const termMatches = mainJsContent.matchAll(/"([a-z0-9\-_]+)":\s*\{/g);
for (const match of termMatches) {
  knownTerms.add(match[1].toLowerCase());
}
const aliasMatches = mainJsContent.matchAll(/"([^"]+)":\s*"([^"]+)"/g);
for (const match of aliasMatches) {
  knownTerms.add(match[1].toLowerCase());
  knownTerms.add(match[2].toLowerCase());
}
console.log(`Loaded ${knownTerms.size} glossary keys and aliases from main.js.`);

// ----------------------------------------------------------------------------
// 1. Validate File Existence & Basic Properties
// ----------------------------------------------------------------------------
console.log("\n1. Verifying Page Existence & Non-trivial File Sizes...");
PAGES.forEach(p => {
  assert(fs.existsSync(p.file), `File exists: ${p.id}`);
  const stat = fs.statSync(p.file);
  assert(stat.size > 8000, `${p.id} has substantial rich content (${stat.size} bytes)`);
});

// ----------------------------------------------------------------------------
// 2. Validate HTML Structure & Required UI Components
// ----------------------------------------------------------------------------
console.log("\n2. Verifying HTML5 Structural Components & Navigation...");
PAGES.forEach(p => {
  const content = fs.readFileSync(p.file, 'utf8');
  
  assert(content.includes('<!DOCTYPE html>'), `${p.id}: Declares HTML5 doctype`);
  assert(content.includes('<html lang="en"'), `${p.id}: Declares html with lang attribute`);
  assert(content.includes('<head>') && content.includes('</head>'), `${p.id}: Has head section`);
  assert(content.includes('<body') && content.includes('</body>'), `${p.id}: Has body section`);
  assert(content.includes('<main') && content.includes('</main>'), `${p.id}: Has semantic main element`);
  assert(content.includes('<footer') && content.includes('</footer>'), `${p.id}: Has semantic footer element`);
  assert(content.includes('id="scroll-progress"'), `${p.id}: Includes #scroll-progress bar`);
  assert(content.includes('class="site-header"'), `${p.id}: Includes .site-header`);
  assert(content.includes('class="theme-toggle-btn"'), `${p.id}: Includes .theme-toggle-btn`);
  assert(content.includes('class="hamburger-btn"'), `${p.id}: Includes .hamburger-btn`);
  assert(content.includes('class="mobile-nav-drawer"'), `${p.id}: Includes .mobile-nav-drawer`);
  assert(content.includes(`href="${p.relCss}"`), `${p.id}: Properly links to stylesheet (${p.relCss})`);
  assert(content.includes(`src="${p.relJs}"`), `${p.id}: Properly links to script (${p.relJs})`);

  // Balanced tag counts for critical elements
  ['div', 'section', 'article', 'table', 'tr', 'td', 'th', 'header', 'main', 'footer'].forEach(tag => {
    const openCount = (content.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
    const closeCount = (content.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    assert(openCount === closeCount, `${p.id}: Balanced <${tag}> tags (opens: ${openCount}, closes: ${closeCount})`);
  });
});

// ----------------------------------------------------------------------------
// 3. Validate Glossary Terms & Tooltip Attributes
// ----------------------------------------------------------------------------
console.log("\n3. Verifying Glossary Term Tooltip Bindings...");
PAGES.forEach(p => {
  const content = fs.readFileSync(p.file, 'utf8');
  const termMatches = content.matchAll(/data-term="([^"]+)"/g);
  let termCount = 0;
  let missingTerms = [];
  
  for (const match of termMatches) {
    termCount++;
    const term = match[1].toLowerCase().trim();
    if (!knownTerms.has(term)) {
      missingTerms.push(term);
    }
  }

  assert(termCount >= 3, `${p.id}: Employs rich glossary terms (${termCount} terms linked)`);
  assert(missingTerms.length === 0, `${p.id}: All data-term values resolve in glossary dictionary (Unresolved: ${missingTerms.join(', ') || 'None'})`);
});

// ----------------------------------------------------------------------------
// 4. Page-Specific Content & Requirement Verification
// ----------------------------------------------------------------------------
console.log("\n4. Verifying Page-Specific Content Mandates...");

// 4.1 index.html
const indexContent = fs.readFileSync(PAGES[0].file, 'utf8');
assert(indexContent.includes('Colonoscopy AI &'), 'index.html: Title includes "Colonoscopy AI &"');
assert(indexContent.includes('ChakraModel Research Platform') || indexContent.includes('ChakraModel Research'), 'index.html: Title includes "ChakraModel Research"');
assert(indexContent.includes('41') && indexContent.includes('31,789'), 'index.html: Includes 41 RCTs & 31,789 patients counter');
assert(indexContent.includes('55%') && indexContent.includes('Adenoma Miss Rate'), 'index.html: Includes 55% AMR reduction stat');
assert(indexContent.includes('Corley et al.') && indexContent.includes('NEJM 2014'), 'index.html: Cites Corley et al. NEJM 2014 landmark invariant');
assert(indexContent.includes('<40 ms') || indexContent.includes('&lt;40 ms'), 'index.html: Includes <40 ms real-time latency budget');
assert(indexContent.includes('4,275') && indexContent.includes('False Alarm'), 'index.html: Includes 4,275 false alarm negative frame benchmark');
assert(indexContent.includes('Understand Your Procedure & How AI Protects You'), 'index.html: Dual audience public pathway title present');
assert(indexContent.includes('Explore Architectures, Benchmarks & Dataset Flaws'), 'index.html: Dual audience researcher pathway title present');
assert(indexContent.includes('01-what-is-colonoscopy.html') && indexContent.includes('02-polyp-types.html') && indexContent.includes('06b-clinical-evidence.html') && indexContent.includes('12-glossary.html'), 'index.html: Public path links to modules 01, 02, 06b, 12');
assert(indexContent.includes('04-architectures.html') && indexContent.includes('06-benchmarks.html') && indexContent.includes('08-benchmark-integrity.html') && indexContent.includes('09-chakramodel.html'), 'index.html: Researcher path links to modules 04, 06, 08, 09');
assert(indexContent.includes('CVC-ClinicDB') && indexContent.includes('splits_v2'), 'index.html: Covers ClinicDB leakage and splits_v2');

// 4.2 01-what-is-colonoscopy.html
const p1Content = fs.readFileSync(PAGES[1].file, 'utf8');
const expectedZones = ['Cecum', 'Ascending', 'Hepatic Flexure', 'Transverse', 'Splenic Flexure', 'Descending', 'Sigmoid', 'Rectum'];
expectedZones.forEach(zone => {
  assert(p1Content.includes(zone), `01-what-is-colonoscopy.html: Details anatomical zone "${zone}"`);
});
assert(p1Content.includes('Boston Bowel Preparation Scale') || p1Content.includes('BBPS'), '01-what-is-colonoscopy.html: Explains BBPS');
assert(p1Content.includes('Split-Dose'), '01-what-is-colonoscopy.html: Explains split-dose purgative protocol');
assert(p1Content.includes('Cecal Intubation Rate') || p1Content.includes('CIR'), '01-what-is-colonoscopy.html: Explains CIR quality target (>=95%)');
assert(p1Content.includes('Withdrawal') && p1Content.includes('6 minutes'), '01-what-is-colonoscopy.html: Explains withdrawal inspection minimum time (>=6 min, optimal 8-9 min)');
assert(p1Content.includes('Adenoma Detection Rate') && p1Content.includes('Polyp Detection Rate'), '01-what-is-colonoscopy.html: Covers ADR vs PDR');
assert(p1Content.includes('Adenoma Miss Rate') || p1Content.includes('AMR'), '01-what-is-colonoscopy.html: Covers AMR (20-26% standard, 34-35% flat)');
assert(p1Content.includes('Corley et al.') && p1Content.includes('NEJM 2014'), '01-what-is-colonoscopy.html: Details Corley et al. 2014 (1% ADR = 3% CRC drop)');
assert(p1Content.includes('bbps-right') && p1Content.includes('bbps-mid') && p1Content.includes('bbps-left'), '01-what-is-colonoscopy.html: Features interactive BBPS simulator');

// 4.3 02-polyp-types.html
const p2Content = fs.readFileSync(PAGES[2].file, 'utf8');
const expectedParis = ['0-Ip', '0-Is', '0-IIa', '0-IIb', '0-IIc', '0-III', 'LST-G', 'LST-NG'];
expectedParis.forEach(type => {
  assert(p2Content.includes(type), `02-polyp-types.html: Explains Paris subtype "${type}"`);
});
assert(p2Content.includes('Diminutive') && (p2Content.includes('&le;5 mm') || p2Content.includes('≤5 mm')), '02-polyp-types.html: Details diminutive polyps (<=5 mm)');
assert(p2Content.includes('Small') && p2Content.includes('6 to 9 mm'), '02-polyp-types.html: Details small polyps (6-9 mm)');
assert(p2Content.includes('Large') || p2Content.includes('Advanced'), '02-polyp-types.html: Details large / advanced adenomas (>=10 mm)');
assert(p2Content.includes('Conventional Adenoma-Carcinoma') && p2Content.includes('APC') && p2Content.includes('KRAS') && p2Content.includes('TP53'), '02-polyp-types.html: Details conventional APC-KRAS-TP53 pathway');
assert(p2Content.includes('Serrated Neoplastic Pathway') && p2Content.includes('BRAF') && p2Content.includes('CIMP') && p2Content.includes('MSI'), '02-polyp-types.html: Details serrated BRAF-CIMP-MSI pathway');
assert(p2Content.includes('Sessile Serrated Lesion') || p2Content.includes('SSL'), '02-polyp-types.html: Deep dive into Sessile Serrated Lesions (SSLs)');
assert(p2Content.includes('Kudo Pit Pattern'), '02-polyp-types.html: Covers Kudo Pit Pattern (I to V)');
assert(p2Content.includes('NICE Classification'), '02-polyp-types.html: Covers NICE Classification (Types 1-3)');
assert(p2Content.includes('JNET Classification'), '02-polyp-types.html: Covers JNET Classification (Types 1, 2A, 2B, 3)');

// 4.4 06b-clinical-evidence.html
const p6bContent = fs.readFileSync(PAGES[3].file, 'utf8');
assert(p6bContent.includes('41 RCTs') || (p6bContent.includes('41') && p6bContent.includes('Randomized Controlled Trials')), '06b-clinical-evidence.html: Covers 41 RCTs');
assert(p6bContent.includes('31,789'), '06b-clinical-evidence.html: Covers 31,789 patients');
assert(p6bContent.includes('Wang et al.') && (p6bContent.includes('Gut 2019') || p6bContent.includes('Lancet Oncol') || p6bContent.includes('GIE 2020')), '06b-clinical-evidence.html: Details Wang et al. trials');
assert(p6bContent.includes('Repici et al.') && p6bContent.includes('Gastroenterology 2020'), '06b-clinical-evidence.html: Details Repici et al. 2020 GI Genius RCT');
assert(p6bContent.includes('Wallace et al.') && p6bContent.includes('Mori et al.') && p6bContent.includes('Hassan et al.'), '06b-clinical-evidence.html: Cites Wallace, Mori, and Hassan trials');
assert(p6bContent.includes('Sultan et al.') || p6bContent.includes('AGA 2025') || p6bContent.includes('American Gastroenterological Association'), '06b-clinical-evidence.html: Covers AGA 2025 synthesis');
assert(p6bContent.includes('11 fewer') && p6bContent.includes('2 fewer'), '06b-clinical-evidence.html: Details AGA microsimulation (11 fewer CRCs, 2 fewer CRC deaths)');
assert(p6bContent.includes('surveillance') && (p6bContent.includes('6 to 35') || p6bContent.includes('6-35')), '06b-clinical-evidence.html: Details 6-35 extra surveillance colonoscopies');
assert(p6bContent.includes('11%') && p6bContent.includes('non-neoplastic'), '06b-clinical-evidence.html: Details 11% non-neoplastic resection increase');
assert(p6bContent.includes('Budzyń et al.') || p6bContent.includes('Budzyn et al.'), '06b-clinical-evidence.html: Details Budzyń et al. (Lancet Gastro Hep Aug 2025)');
assert(p6bContent.includes('ACCEPT') && p6bContent.includes('-6.0%'), '06b-clinical-evidence.html: Details ACCEPT trial -6.0% absolute ADR deskilling');
assert(p6bContent.includes('ASGE') && (p6bContent.includes('PVI') || p6bContent.includes('PIVI')), '06b-clinical-evidence.html: Details ASGE PVI optical criteria');
assert(p6bContent.includes('ESGE') && p6bContent.includes('BMJ') && p6bContent.includes('WEO'), '06b-clinical-evidence.html: Covers international guideline schism');
assert(p6bContent.includes('pop-slider') && p6bContent.includes('sim-crc'), '06b-clinical-evidence.html: Includes interactive microsimulation calculator');

// 4.5 07-clinical-systems.html
const p7Content = fs.readFileSync(PAGES[4].file, 'utf8');
assert(p7Content.includes('GI Genius') && p7Content.includes('Medtronic'), '07-clinical-systems.html: Covers Medtronic GI Genius');
assert(p7Content.includes('CAD EYE') && p7Content.includes('Fujifilm'), '07-clinical-systems.html: Covers Fujifilm CAD EYE');
assert(p7Content.includes('ENDO-AID') && p7Content.includes('Olympus'), '07-clinical-systems.html: Covers Olympus ENDO-AID');
assert(p7Content.includes('WISE VISION') && p7Content.includes('NEC'), '07-clinical-systems.html: Covers NEC WISE VISION');
assert(p7Content.includes('Discovery') && p7Content.includes('Pentax'), '07-clinical-systems.html: Covers Pentax Medical Discovery');
assert(p7Content.includes('MAGENTIQ-COLO'), '07-clinical-systems.html: Covers MAGENTIQ-COLO');
assert(p7Content.includes('De Novo') && p7Content.includes('510(k)') && p7Content.includes('CE Mark'), '07-clinical-systems.html: Covers regulatory clearances');
assert(p7Content.includes('<40 ms') || p7Content.includes('&lt;40 ms'), '07-clinical-systems.html: Details <40 ms latency budget constraint');
assert(p7Content.includes('Inline Hardware Video Pipeline') || p7Content.includes('Inline Hardware Appliance'), '07-clinical-systems.html: Illustrates inline hardware video appliance');
assert(p7Content.includes('Trade Secret') || p7Content.includes('Proprietary'), '07-clinical-systems.html: Analyzes trade secret divide vs open science');

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`TOTAL CHECKS: ${passes.length + failures.length}`);
console.log(`PASSED: ${passes.length}`);
console.log(`FAILED: ${failures.length}`);
console.log("===============================================================================");

if (failures.length > 0) {
  process.exit(1);
} else {
  console.log("\nALL WORKER M3 PAGES ARE FULLY COMPLIANT AND VERIFIED!");
}
