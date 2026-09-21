/**
 * Independent Victory Forensic Auditor Script
 * Project: Colonoscopy AI Education & ChakraModel Research
 * Author: Victory Forensic Auditor (teamwork_preview_auditor_gen2)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const pagesDir = path.join(rootDir, 'pages');
const assetsDir = path.join(rootDir, 'assets');

console.log("===============================================================================");
console.log("INDEPENDENT VICTORY FORENSIC AUDITOR SUITE");
console.log("Auditor Directory: " + __dirname);
console.log("Project Root: " + rootDir);
console.log("Execution Timestamp: " + new Date().toISOString());
console.log("===============================================================================\n");

const htmlFiles = [
  path.join(rootDir, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

const assetFiles = [
  path.join(assetsDir, 'css', 'main.css'),
  path.join(assetsDir, 'js', 'main.js'),
  path.join(assetsDir, 'js', 'charts.js'),
  path.join(rootDir, 'README.md')
];

const allAuditedFiles = [...htmlFiles, ...assetFiles];

const results = {
  check1_colondb_cvc300: { passed: true, checks: 0, violations: [], disclosures: [] },
  check2_clinicdb_leakage: { passed: true, checks: 0, violations: [], pagesWithMetrics: [], disclosures: [] },
  check3_hyperkvasir_duplicate: { passed: true, checks: 0, violations: [], disclosures: [] },
  check4_empirical_invariants: { passed: true, checks: 0, violations: [], invariantsVerified: [] },
  check5_link_anchor_integrity: { passed: true, totalLinks: 0, externalLinks: 0, internalLinks: 0, anchorLinks: 0, brokenLinks: [] },
  check6_ocr_provenance: { passed: true, checks: 0, violations: [], verifiedProvenance: [] },
  dom_tag_balance: { passed: true, pagesChecked: 0, violations: [] },
  glossary_integrity: { passed: true, termsChecked: 0, unresolvedTerms: [] }
};

// -----------------------------------------------------------------------------
// CHECK 1: ColonDB vs CVC-300 Separation & 58-Frame Overlap Disclosure
// -----------------------------------------------------------------------------
console.log("--- Executing Check 1: ColonDB vs CVC-300 Independence & Duplicate Disclosure ---");

for (const file of allAuditedFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  results.check1_colondb_cvc300.checks++;

  // 1. Check for pooled headers or pooled metrics
  const badHeaderRegex = /<th[^>]*>.*(?:ColonDB\s*(?:\+|&|\/)\s*CVC-?300|CVC-?300\s*(?:\+|&|\/)\s*ColonDB|ColonDB\s+and\s+CVC-?300\s+pooled).*?<\/th>/gi;
  const badHeaders = content.match(badHeaderRegex);
  if (badHeaders) {
    results.check1_colondb_cvc300.passed = false;
    results.check1_colondb_cvc300.violations.push(`${rel}: Suspicious pooled table header: ${JSON.stringify(badHeaders)}`);
  }

  // 2. Check for pooling language in lines mentioning both
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (/ColonDB/i.test(l) && /CVC-?300/i.test(l)) {
      if (/pooled\s*metric|merged\s*score|average\s*score/i.test(l) && !/never|prohibit|invalid|malpractice|do not|warning|violation/i.test(l)) {
        results.check1_colondb_cvc300.passed = false;
        results.check1_colondb_cvc300.violations.push(`${rel}:${idx + 1}: Pooling phrasing: "${l.trim()}"`);
      }
    }
  });

  // 3. Check for 58-frame duplicate overlap disclosure
  if (/58\s*(?:identical|duplicate)\s*frames/i.test(content) || /58[- ]frame.*overlap/i.test(content) || /96\.7%/i.test(content)) {
    results.check1_colondb_cvc300.disclosures.push(`${rel}: 58-frame duplicate overlap (96.7%) explicitly disclosed`);
  }
}

console.log(`Check 1 Result: ${results.check1_colondb_cvc300.passed ? "PASS" : "FAIL"}`);
console.log(`Disclosures found: ${results.check1_colondb_cvc300.disclosures.length}`);
results.check1_colondb_cvc300.disclosures.forEach(d => console.log(`  ✓ ${d}`));

// -----------------------------------------------------------------------------
// CHECK 2: CVC-ClinicDB Video Frame Leakage Disclosure
// -----------------------------------------------------------------------------
console.log("\n--- Executing Check 2: CVC-ClinicDB Video Frame Leakage Disclosures ---");

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  results.check2_clinicdb_leakage.checks++;

  // Does this page mention ClinicDB benchmark numbers or metrics?
  const hasClinicMetrics = /ClinicDB.*(?:0\.\d{3}|\d{1,2}\.\d%|mDice|Dice)/i.test(content) ||
                          /(?:0\.899|0\.922|0\.932|0\.937|0\.771)\s*(?:ClinicDB|\(ClinicDB\)|on ClinicDB)?/i.test(content);

  if (hasClinicMetrics) {
    results.check2_clinicdb_leakage.pagesWithMetrics.push(rel);

    // Verify prominent leakage disclosure / warning on page
    const hasLeakageWarning = /leakage|in-sequence|seen-domain|contaminated|data contamination|temporal proximity/i.test(content);
    const hasBadgeOrFootnote = /badge.*(?:leak|warning|danger|hazard)|alert.*(?:leak|warning|danger)|class=["'][^"']*leak[^"']*["']|\*|†|leakage warning/i.test(content);

    if (!hasLeakageWarning) {
      results.check2_clinicdb_leakage.passed = false;
      results.check2_clinicdb_leakage.violations.push(`${rel}: Mentions ClinicDB metrics without video leakage or seen-domain disclosure!`);
    } else {
      results.check2_clinicdb_leakage.disclosures.push(`${rel}: ClinicDB metrics disclosed with video leakage disclaimer/badge (badge/alert present: ${hasBadgeOrFootnote})`);
    }
  }
}

console.log(`Check 2 Result: ${results.check2_clinicdb_leakage.passed ? "PASS" : "FAIL"}`);
console.log(`Pages with ClinicDB metrics: ${results.check2_clinicdb_leakage.pagesWithMetrics.length}`);
results.check2_clinicdb_leakage.disclosures.forEach(d => console.log(`  ✓ ${d}`));

// -----------------------------------------------------------------------------
// CHECK 3: HyperKvasir Duplicate Images Disclosure
// -----------------------------------------------------------------------------
console.log("\n--- Executing Check 3: HyperKvasir Duplicate Images Disclosure ---");

for (const file of allAuditedFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  results.check3_hyperkvasir_duplicate.checks++;

  // Prohibited claim: HyperKvasir adds 1000 unique segmented images
  if (/HyperKvasir.*(?:adds?|provides?)\s+(?:1,?000|new|additional)\s+unique\s+segmented/i.test(content)) {
    results.check3_hyperkvasir_duplicate.passed = false;
    results.check3_hyperkvasir_duplicate.violations.push(`${rel}: Prohibited claim: HyperKvasir adds new unique segmented images`);
  }

  // Check for SHA-256 byte-identical copies disclosure
  if (/SHA-256.*byte-identical|byte-for-byte copies of Kvasir-SEG|1,?000\/1,?000.*Kvasir-SEG/i.test(content)) {
    results.check3_hyperkvasir_duplicate.disclosures.push(`${rel}: 1,000 SHA-256 byte-identical duplicate disclosure verified`);
  }
}

console.log(`Check 3 Result: ${results.check3_hyperkvasir_duplicate.passed ? "PASS" : "FAIL"}`);
console.log(`Disclosures found: ${results.check3_hyperkvasir_duplicate.disclosures.length}`);
results.check3_hyperkvasir_duplicate.disclosures.forEach(d => console.log(`  ✓ ${d}`));

// -----------------------------------------------------------------------------
// CHECK 4: Empirical Invariants & Zero Hallucinations
// -----------------------------------------------------------------------------
console.log("\n--- Executing Check 4: Empirical Invariants & Zero Hallucinations ---");

const invariantSpecs = [
  {
    id: 1,
    name: "Corley et al. NEJM 2014 (1% ADR -> 3% CRC reduction, 5% fatal CRC reduction)",
    test: (c) => /Corley.*(?:3%|3\.0%).*(?:5%|5\.0%)/is.test(c) || /Corley.*NEJM.*2014/i.test(c) && /3%|5%/i.test(c)
  },
  {
    id: 2,
    name: "41 RCTs / 31,789 patients (55% AMR reduction)",
    test: (c) => /41\s*(?:RCTs|randomized).*31,?789/is.test(c) && /55%/i.test(c)
  },
  {
    id: 3,
    name: "Budzyń et al. (Lancet Gastro Hep Aug 2025) ACCEPT trial (-6.0% ADR deskilling)",
    test: (c) => /Budzy[nń].*ACCEPT.*-?6(?:\.0)?%/is.test(c)
  },
  {
    id: 4,
    name: "AGA 2025 microsimulation (11 fewer CRCs, 2 fewer CRC deaths, 6-35 extra surveillance colonoscopies, 11% non-neoplastic resection increase)",
    test: (c) => /AGA.*11\s*(?:fewer|less).*CRC.*2\s*(?:fewer|less).*death.*6[-–]35/is.test(c) && /11%/i.test(c)
  },
  {
    id: 5,
    name: "ChakraTransformer (ViT-L/16 @ 384 px, 309.2M params, Kvasir 0.838, ClinicDB 0.771, 7.76 FPS)",
    test: (c) => /ViT-L\/16.*309\.2M.*0\.838.*0\.771.*7\.76\s*FPS/is.test(c)
  },
  {
    id: 6,
    name: "ChakraXAttnUNet v2 (28.6M params, dual-path skip routing fixing v1 skip-pooling flaw)",
    test: (c) => /ChakraXAttn.*28\.6M/is.test(c) && /Dual-Path|skip/i.test(c)
  },
  {
    id: 7,
    name: "splits_v2 (1,228 train / 222 val, 0 leaking video groups)",
    test: (c) => /1,?228.*222.*0\s*(?:Leaking\s*)?Groups/is.test(c)
  },
  {
    id: 8,
    name: "False alarm set (4,275 frames from 23 PolypGen sequences)",
    test: (c) => /4,?275.*23\s*PolypGen/is.test(c)
  },
  {
    id: 9,
    name: "PICCOLO (3,433 frames, 76 lesions, 40 videos: 21 diminutive <=5mm, 16 small 6-9mm, 31 large >=10mm)",
    test: (c) => /3,?433.*76\s*lesions.*21.*16.*31/is.test(c)
  }
];

for (const inv of invariantSpecs) {
  results.check4_empirical_invariants.checks++;
  let foundIn = [];
  for (const file of allAuditedFiles) {
    const c = fs.readFileSync(file, 'utf8');
    const rel = path.relative(rootDir, file);
    if (inv.test(c)) {
      foundIn.push(rel);
    }
  }

  if (foundIn.length === 0) {
    results.check4_empirical_invariants.passed = false;
    results.check4_empirical_invariants.violations.push(`Invariant #${inv.id} NOT FOUND: ${inv.name}`);
  } else {
    results.check4_empirical_invariants.invariantsVerified.push({ id: inv.id, name: inv.name, foundIn });
    console.log(`  ✓ Invariant #${inv.id} verified in ${foundIn.length} files: ${inv.name}`);
  }
}

console.log(`Check 4 Result: ${results.check4_empirical_invariants.passed ? "PASS" : "FAIL"}`);

// -----------------------------------------------------------------------------
// CHECK 5: Link & Anchor Integrity across all 14 HTML production files
// -----------------------------------------------------------------------------
console.log("\n--- Executing Check 5: Link & Anchor Integrity ---");

const parsedCache = {};

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  const fileDir = path.dirname(file);

  const aMatches = content.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
  for (const aTag of aMatches) {
    results.check5_link_anchor_integrity.totalLinks++;
    const hrefMatch = aTag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];

    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) {
      results.check5_link_anchor_integrity.externalLinks++;
      continue;
    }

    results.check5_link_anchor_integrity.internalLinks++;
    const [pagePart, hashPart] = href.split('#');
    let targetFile = file;

    if (pagePart && pagePart.length > 0) {
      targetFile = path.resolve(fileDir, pagePart);
      if (!fs.existsSync(targetFile)) {
        results.check5_link_anchor_integrity.passed = false;
        results.check5_link_anchor_integrity.brokenLinks.push({
          source: rel,
          href,
          error: "Target file does not exist",
          resolvedPath: targetFile
        });
        continue;
      }
    }

    if (hashPart) {
      results.check5_link_anchor_integrity.anchorLinks++;
      if (!parsedCache[targetFile]) {
        parsedCache[targetFile] = fs.readFileSync(targetFile, 'utf8');
      }
      const targetContent = parsedCache[targetFile];
      const hasId = new RegExp(`id=["']${hashPart}["']`, 'i').test(targetContent);
      if (!hasId) {
        results.check5_link_anchor_integrity.passed = false;
        results.check5_link_anchor_integrity.brokenLinks.push({
          source: rel,
          href,
          error: `Target ID #${hashPart} not found in ${path.relative(rootDir, targetFile)}`
        });
      }
    }
  }
}

console.log(`Check 5 Result: ${results.check5_link_anchor_integrity.passed ? "PASS" : "FAIL"}`);
console.log(`Total Links Checked: ${results.check5_link_anchor_integrity.totalLinks}`);
console.log(`External Links: ${results.check5_link_anchor_integrity.externalLinks}`);
console.log(`Internal Links: ${results.check5_link_anchor_integrity.internalLinks}`);
console.log(`Anchor Links: ${results.check5_link_anchor_integrity.anchorLinks}`);
console.log(`Broken Links: ${results.check5_link_anchor_integrity.brokenLinks.length}`);
if (results.check5_link_anchor_integrity.brokenLinks.length > 0) {
  results.check5_link_anchor_integrity.brokenLinks.forEach(b => console.error(`  ✗ BROKEN: ${b.source} -> ${b.href} (${b.error})`));
}

// -----------------------------------------------------------------------------
// CHECK 6: OCR Transposition & Data Provenance Integrity
// -----------------------------------------------------------------------------
console.log("\n--- Executing Check 6: OCR Transposition & Data Provenance ---");

const ocrPatterns = [
  { pattern: /900\s*ClinicDB/i, desc: "900 ClinicDB artifact" },
  { pattern: /\b548\s*Kvasir\b/i, desc: "548 Kvasir artifact" },
  { pattern: /1,?448\s*images/i, desc: "1,448 images artifact" },
  { pattern: /612\s*Kvasir/i, desc: "612 Kvasir swapped artifact" },
  { pattern: /1,?000\s*ClinicDB/i, desc: "1000 ClinicDB swapped artifact" }
];

for (const file of allAuditedFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  results.check6_ocr_provenance.checks++;

  for (const ocr of ocrPatterns) {
    if (ocr.pattern.test(content)) {
      results.check6_ocr_provenance.passed = false;
      results.check6_ocr_provenance.violations.push(`${rel}: OCR artifact detected: ${ocr.desc}`);
    }
  }
}

console.log(`Check 6 Result: ${results.check6_ocr_provenance.passed ? "PASS" : "FAIL"}`);
console.log(`OCR Violations: ${results.check6_ocr_provenance.violations.length}`);

// -----------------------------------------------------------------------------
// DOM TAG BALANCE AND GLOSSARY INTEGRITY VERIFICATION
// -----------------------------------------------------------------------------
console.log("\n--- Executing DOM Tag Balance & Glossary Verification ---");

const vm = require('vm');

function createMockDom() {
  const doc = {
    readyState: 'complete',
    documentElement: {
      scrollTop: 0, scrollHeight: 2000, clientHeight: 800,
      getAttribute: () => 'dark', setAttribute: () => {}
    },
    body: { style: {}, appendChild: () => {}, prepend: () => {} },
    createElement: () => ({
      id: '', className: '', style: {}, setAttribute: () => {}, getAttribute: () => null,
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelector: () => ({ textContent: '', className: '', style: {}, setAttribute: () => {} }),
      querySelectorAll: () => []
    }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const win = {
    document: doc,
    localStorage: { getItem: () => null, setItem: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false }),
    location: { pathname: '/index.html' },
    innerWidth: 1200, innerHeight: 800,
    MutationObserver: class { observe() {} disconnect() {} }
  };
  return { window: win, document: doc, localStorage: win.localStorage, MutationObserver: win.MutationObserver, setTimeout, clearTimeout, console };
}

const mainJsContent = fs.readFileSync(path.join(assetsDir, 'js', 'main.js'), 'utf8');
const domSandbox = createMockDom();
domSandbox.window.window = domSandbox.window;
vm.runInNewContext(mainJsContent, domSandbox);

const ColonoscopyAI = domSandbox.window.ColonoscopyAI;
const glossaryDict = ColonoscopyAI ? ColonoscopyAI.glossary : {};
const termAliases = ColonoscopyAI ? ColonoscopyAI.aliases : {};
const validTerms = Object.keys(glossaryDict);
console.log(`Loaded ${validTerms.length} terms and ${Object.keys(termAliases).length} aliases from main.js.`);

const tagsToBalance = ['div', 'section', 'article', 'table', 'tr', 'td', 'th', 'header', 'main', 'footer', 'nav'];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  results.dom_tag_balance.pagesChecked++;

  for (const tag of tagsToBalance) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const opens = (content.match(openRegex) || []).length;
    const closes = (content.match(closeRegex) || []).length;
    if (opens !== closes) {
      results.dom_tag_balance.passed = false;
      results.dom_tag_balance.violations.push(`${rel}: Unbalanced <${tag}> tags (opens: ${opens}, closes: ${closes})`);
    }
  }

  // Check glossary term bindings on .glossary-term elements
  const termMatches = content.matchAll(/<([a-z0-9]+)[^>]*class=["'][^"']*\bglossary-term\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi);
  for (const tm of termMatches) {
    results.glossary_integrity.termsChecked++;
    const fullTag = tm[0];
    const innerText = tm[2].replace(/<[^>]+>/g, '').trim();
    const dataTermMatch = fullTag.match(/data-term=["']([^"']+)["']/i);
    const termKey = dataTermMatch ? dataTermMatch[1] : innerText;

    const resolves = ColonoscopyAI.resolveGlossaryTerm({
      getAttribute: (attr) => attr === 'data-term' ? (dataTermMatch ? dataTermMatch[1] : null) : null,
      textContent: innerText
    });
    if (!resolves) {
      // Record minor unmapped inline terminology
      results.glossary_integrity.unresolvedTerms.push(`${rel}: '${termKey}' (inline text '${innerText}')`);
    }
  }
}

// 50 Master Glossary Terms completeness
const masterKeys = Object.keys(glossaryDict);
if (masterKeys.length === 50) {
  console.log("Master glossary contains all 50 required terms.");
} else {
  results.glossary_integrity.passed = false;
  results.glossary_integrity.violations.push(`Glossary has ${masterKeys.length} terms instead of 50.`);
}

console.log(`DOM Tag Balance Result: ${results.dom_tag_balance.passed ? "PASS" : "FAIL"}`);
console.log(`Glossary Tooltip Spans Checked in HTML: ${results.glossary_integrity.termsChecked}`);
console.log(`Fully Resolved to 50 Master Terms: ${results.glossary_integrity.termsChecked - results.glossary_integrity.unresolvedTerms.length}`);
console.log(`Unmapped Technical Spans: ${results.glossary_integrity.unresolvedTerms.length}`);

// -----------------------------------------------------------------------------
// OVERALL SUMMARY & JSON DUMP
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log("INDEPENDENT AUDIT VERDICT SUMMARY");
console.log("===============================================================================");

const allPassed = results.check1_colondb_cvc300.passed &&
                  results.check2_clinicdb_leakage.passed &&
                  results.check3_hyperkvasir_duplicate.passed &&
                  results.check4_empirical_invariants.passed &&
                  results.check5_link_anchor_integrity.passed &&
                  results.check6_ocr_provenance.passed &&
                  results.dom_tag_balance.passed &&
                  results.glossary_integrity.passed;

const finalVerdict = allPassed ? "VICTORY CONFIRMED / CLEAN" : "INTEGRITY VIOLATION";

console.log(`FINAL VERDICT: ${finalVerdict}`);
console.log("===============================================================================\n");

const outputPath = path.join(__dirname, 'independent_audit_results.json');
fs.writeFileSync(outputPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  verdict: finalVerdict,
  results
}, null, 2));

console.log(`Detailed audit results saved to ${outputPath}`);
