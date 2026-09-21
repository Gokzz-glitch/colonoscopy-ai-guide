const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const compiled = JSON.parse(fs.readFileSync(path.join(__dirname, 'compiled_blueprint_data.json'), 'utf8'));

let md = `# Comprehensive Link Remediation Blueprint & Navigation Harmonization Specification

**Author**: Explorer Rem 1: Navigation & Internal Link Mapping Specialist  
**Assigned Directory**: \`C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide\\.agents\\explorer_rem_1\`  
**Date**: 2026-09-22  
**Target Project**: Colonoscopy AI Educational & ChakraModel Research Platform  
**Target Output**: \`link_remediation_blueprint.md\`  
**Scope**: All 14 HTML files across the platform, test suites (\`validate_m3_pages.js\`, \`validate_m4_pages.js\`), and navigation architecture.

---

## 1. Executive Summary & Problem Diagnosis

During the forensic audit and adversarial reviews of the Colonoscopy AI Guide, **140 broken internal hyperlinks** were identified across 10 of the 14 HTML files. 

### Root Causes
1. **Planning vs. Finalized Filename Divergence**: During Milestone 3 and Milestone 4 development, workers linked to working draft filenames (e.g. \`08-failure-modes.html\`, \`09-chakramodel-case-study.html\`, \`10-future-directions.html\`, \`01-clinical-foundations.html\`, \`07-integrity-audit.html\`), whereas Milestone 5 finalized them under concise canonical names (\`08-benchmark-integrity.html\`, \`09-chakramodel.html\`, \`10-future.html\`).
2. **Missing In-Page & Cross-Page Anchor Targets**:
   - In \`pages/01-what-is-colonoscopy.html\` (line 488), a button links to \`11-references.html#ref-corley2014\`, but no anchor with \`id="ref-corley2014"\` exists in \`pages/11-references.html\`.
   - In \`pages/12-glossary.html\` (lines 160–185), the alphabetical jump bar contains 26 \`<a href="#letter-A">\` through \`<a href="#letter-Z">\` buttons, but the page body does not define the corresponding \`id="letter-A"\` through \`id="letter-Z"\` anchor targets.
3. **Test Suite Spec Coupling**:
   - In \`tests/validate_m3_pages.js\` (line 130), the automated test suite explicitly asserts the existence of the outdated draft strings \`08-failure-modes.html\` and \`09-chakramodel-case-study.html\`.
   - In \`tests/validate_m4_pages.js\`, link resolution was not asserted, allowing Milestone 4 pages to pass validation despite 60 broken links.

---

## 2. Platform Canonical Inventory & Mapping Rules

### 2.1 The 14 Canonical Files on Disk
| # | Canonical Relative Path | Module Title | Primary Focus |
|---|---|---|---|
| **00** | \`index.html\` | Platform Overview & Dual Mission | Patient & Researcher dual entry pathways |
| **01** | \`pages/01-what-is-colonoscopy.html\` | Module 01: Clinical Foundations | Anatomy, BBPS, CIR, Corley ADR invariant |
| **02** | \`pages/02-polyp-types.html\` | Module 02: Polyp Morphology & Histology | Paris, Pit Pattern, NICE, Neoplastic pathways |
| **03** | \`pages/03-ai-history.html\` | Module 03: AI History & Evolution | 4 AI Eras, Classical CV to Foundation Models |
| **04** | \`pages/04-architectures.html\` | Module 04: Deep Architectures | U-Net, PraNet, HarDNet, PVT, ColonFormer, EndoMamba |
| **05** | \`pages/05-datasets.html\` | Module 05: Benchmark Datasets Catalog | 10 Public datasets, Modality & Integrity disclosures |
| **06** | \`pages/06-benchmarks.html\` | Module 06: SOTA Benchmark Leaderboards | Performance matrices, Small polyp collapse, Speed |
| **06b**| \`pages/06b-clinical-evidence.html\`| Module 06b: Clinical Trials & RCTs | 41 RCTs, AGA Microsimulation, Cognitive deskilling |
| **07** | \`pages/07-clinical-systems.html\` | Module 07: Commercial CADe/CADx Systems | GI Genius, CAD EYE, <40ms Latency budget |
| **08** | \`pages/08-benchmark-integrity.html\`| Module 08: Benchmark Integrity Audit | Contamination map, 4 Structural benchmark flaws |
| **09** | \`pages/09-chakramodel.html\` | Module 09: ChakraModel Research Project | Architecture, Stage 1 Protocol, splits_v2 |
| **10** | \`pages/10-future.html\` | Module 10: Future of Colonoscopy AI | Roadmap, Mamba, Vision foundation models |
| **11** | \`pages/11-references.html\` | Module 11: Master References | 48 Verified papers, DOIs, arXiv, GitHub repos |
| **12** | \`pages/12-glossary.html\` | Module 12: Plain-English Glossary | 50 Verified terms, Search, Category filter |

### 2.2 Canonical Draft-to-Physical Translation Table
| Draft Name in Code | Canonical Replacement | Files Affected |
|---|---|---|
| \`08-failure-modes.html\` | \`08-benchmark-integrity.html\` | \`index.html\`, \`01\`, \`02\`, \`06b\`, \`07\` |
| \`09-chakramodel-case-study.html\` | \`09-chakramodel.html\` | \`index.html\`, \`01\`, \`02\`, \`06b\`, \`07\` |
| \`10-future-directions.html\` | \`10-future.html\` | \`index.html\`, \`01\`, \`02\`, \`06b\`, \`07\` |
| \`01-clinical-foundations.html\` | \`01-what-is-colonoscopy.html\` | \`03\`, \`04\`, \`05\`, \`06\` |
| \`02-clinical-evidence.html\` | \`06b-clinical-evidence.html\` | \`03\`, \`04\`, \`05\`, \`06\` |
| \`07-integrity-audit.html\` | \`08-benchmark-integrity.html\` | \`03\`, \`04\`, \`05\`, \`06\` |
| \`08-commercial-systems.html\` | \`07-clinical-systems.html\` | \`03\`, \`04\`, \`05\`, \`06\` |
| \`09-implementation.html\` | \`09-chakramodel.html\` | \`03\`, \`04\`, \`05\`, \`06\` |
| \`10-future-frontiers.html\` | \`10-future.html\` | \`03\`, \`04\`, \`05\`, \`06\` |

### 2.3 Relative Path Prefix Enforcement Rules
1. **From Root (\`index.html\`)**:
   - Links to pages in \`pages/\` **MUST** include the \`pages/\` directory prefix (e.g. \`href="pages/01-what-is-colonoscopy.html"\`, \`href="pages/08-benchmark-integrity.html"\`).
   - Links to home remain \`href="index.html"\`.
   - Asset links use \`assets/css/main.css\` and \`assets/js/main.js\`.
2. **From Inside Pages Subdirectory (\`pages/*.html\`)**:
   - Links to peer pages in the same directory **MUST NOT** have \`pages/\` (e.g. \`href="01-what-is-colonoscopy.html"\`, \`href="08-benchmark-integrity.html"\`).
   - Links to home **MUST** point to the parent directory: \`href="../index.html"\`.
   - Asset links use \`../assets/css/main.css\` and \`../assets/js/main.js\`.

---

## 3. Detailed Breakdown of the 140 Broken Links

| Source File | Total Broken | Header | Drawer | Cards / CTAs / Body | Footer | In-Page Anchors |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| \`index.html\` | **19** | 2 | 3 | 11 | 3 | 0 |
| \`pages/01-what-is-colonoscopy.html\` | **9** | 2 | 3 | 1 | 3 | 1 (Corley) |
| \`pages/02-polyp-types.html\` | **8** | 2 | 3 | 0 | 3 | 0 |
| \`pages/03-ai-history.html\` | **15** | 3 | 6 | 0 | 6 | 0 |
| \`pages/04-architectures.html\` | **15** | 3 | 6 | 0 | 6 | 0 |
| \`pages/05-datasets.html\` | **15** | 3 | 6 | 0 | 6 | 0 |
| \`pages/06-benchmarks.html\` | **16** | 3 | 6 | 1 (CTA) | 6 | 0 |
| \`pages/06b-clinical-evidence.html\` | **8** | 2 | 3 | 0 | 3 | 0 |
| \`pages/07-clinical-systems.html\` | **9** | 2 | 3 | 1 (CTA) | 3 | 0 |
| \`pages/08-benchmark-integrity.html\` | **0** | 0 | 0 | 0 | 0 | 0 |
| \`pages/09-chakramodel.html\` | **0** | 0 | 0 | 0 | 0 | 0 |
| \`pages/10-future.html\` | **0** | 0 | 0 | 0 | 0 | 0 |
| \`pages/11-references.html\` | **0** | 0 | 0 | 0 | 0 | 0 |
| \`pages/12-glossary.html\` | **26** | 0 | 0 | 0 | 0 | 26 (A-Z) |
| **TOTAL** | **140** | **20** | **39** | **14** | **39** | **28** |

---

## 4. Line-by-Line Remediation Specification (All 14 Files)

`;

// Now append file-by-file detailed specs
for (const [f, changes] of Object.entries(compiled)) {
  md += `\n### 4.${Object.keys(compiled).indexOf(f) + 1} File: \`${f}\`\n\n`;
  md += `- **Total Issues Detected**: ${changes.length}\n`;
  if (changes.length === 0) {
    md += `- **Status**: 100% Compliant. No broken relative file links detected.\n`;
    md += `- **Harmonization Note**: Ensure Header Nav, Drawer, and Footer follow the unified naming scheme.\n\n`;
    continue;
  }

  md += `\n| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |\n`;
  md += `|:---:|:---:|:---|:---|:---|\n`;

  changes.forEach((c, idx) => {
    let sectionRole = 'General Link';
    if (c.lineNum < 40) sectionRole = 'Header Nav';
    else if (c.lineNum < 90) sectionRole = 'Mobile Drawer';
    else if (c.lineNum > 500 && c.lineNum < 800) sectionRole = 'Global Footer';
    else if (c.type === 'ANCHOR_CORLEY') sectionRole = 'Evidence CTA Button';
    else if (c.type === 'ANCHOR_GLOSSARY_LETTER') sectionRole = 'Alphabet Jump Button';
    else sectionRole = 'Interactive Card / CTA Button';

    const cleanBefore = c.before.trim().replace(/\|/g, '\\|');
    let cleanAfter = c.after.trim().replace(/\|/g, '\\|');
    if (c.type === 'ANCHOR_CORLEY') {
      cleanAfter = `<code>&lt;a href="11-references.html#ref-corley2014" ...&gt;</code> (requires target in 11) OR <code>&lt;a href="11-references.html" ...&gt;</code>`;
    } else if (c.type === 'ANCHOR_GLOSSARY_LETTER') {
      cleanAfter = `Keep <code>${cleanBefore}</code> & add <code>&lt;span id="${cleanBefore.match(/href="([^"]+)"/)[1].slice(1)}"&gt;&lt;/span&gt;</code> anchor target in DOM`;
    } else {
      cleanAfter = `<code>${cleanAfter}</code>`;
    }

    md += `| #${idx + 1} | L${c.lineNum} | ${sectionRole} | <code>${cleanBefore}</code> | ${cleanAfter} |\n`;
  });

  md += `\n#### Verbatim Block Replacements for \`${f}\`\n\n`;

  if (f === 'index.html') {
    md += `**Header Navigation (Lines 33–34)**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="pages/08-failure-modes.html" class="nav-link">Integrity Audit</a></li>\n<li><a href="pages/09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>\n\n<!-- AFTER -->\n<li><a href="pages/08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>\n<li><a href="pages/09-chakramodel.html" class="nav-link">ChakraModel</a></li>\n\`\`\`\n\n`;
    md += `**Mobile Navigation Drawer (Lines 78–80)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="pages/08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>\n<a href="pages/09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>\n<a href="pages/10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>\n\n<!-- AFTER -->\n<a href="pages/08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>\n<a href="pages/09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>\n<a href="pages/10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>\n\`\`\`\n\n`;
    md += `**Hero CTA Button (Line 115)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-lg">\n  Read ChakraModel Audit\n</a>\n\n<!-- AFTER -->\n<a href="pages/09-chakramodel.html" class="btn btn-outline btn-lg">\n  Read ChakraModel Audit\n</a>\n\`\`\`\n\n`;
    md += `**Researcher Pathway Buttons (Lines 256–257)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="pages/08-failure-modes.html" class="btn btn-secondary btn-sm">Integrity Audit</a>\n<a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-sm">ChakraModel Study</a>\n\n<!-- AFTER -->\n<a href="pages/08-benchmark-integrity.html" class="btn btn-secondary btn-sm">Integrity Audit</a>\n<a href="pages/09-chakramodel.html" class="btn btn-outline btn-sm">ChakraModel Study</a>\n\`\`\`\n\n`;
    md += `**ChakraModel Highlight Banner & Tooltip Link (Lines 295 & 333)**:\n\`\`\`html\n<!-- BEFORE (Line 295) -->\n<a href="pages/09-chakramodel-case-study.html" class="btn btn-secondary">\n  Read Full Forensic Report &rarr;\n</a>\n<!-- BEFORE (Line 333) -->\n<a href="pages/08-failure-modes.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a>\n\n<!-- AFTER (Line 295) -->\n<a href="pages/09-chakramodel.html" class="btn btn-secondary">\n  Read Full Forensic Report &rarr;\n</a>\n<!-- AFTER (Line 333) -->\n<a href="pages/08-benchmark-integrity.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a>\n\`\`\`\n\n`;
    md += `**Interactive Curriculum Module Cards (Lines 480, 485, 495, 500, 510, 515)**:\n\`\`\`html\n<!-- Module 08 Card (Lines 480, 485) -->\n<h3 class="card-title"><a href="pages/08-benchmark-integrity.html">Benchmark Integrity Audit</a></h3>\n...\n<a href="pages/08-benchmark-integrity.html" class="tooltip-link">Examine Leakage Proofs &rarr;</a>\n\n<!-- Module 09 Card (Lines 495, 500) -->\n<h3 class="card-title"><a href="pages/09-chakramodel.html">ChakraModel Research Study</a></h3>\n...\n<a href="pages/09-chakramodel.html" class="tooltip-link">Read Research Report &rarr;</a>\n\n<!-- Module 10 Card (Lines 510, 515) -->\n<h3 class="card-title"><a href="pages/10-future.html">Future Directions & Frontiers</a></h3>\n...\n<a href="pages/10-future.html" class="tooltip-link">See Future Roadmap &rarr;</a>\n\`\`\`\n\n`;
    md += `**Global Footer (Lines 628, 635, 636)**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="pages/10-future-directions.html">Future Directions & Mamba</a></li>\n<li><a href="pages/08-failure-modes.html">Integrity & Video Leakage Audit</a></li>\n<li><a href="pages/09-chakramodel-case-study.html">ChakraModel Case Study</a></li>\n\n<!-- AFTER -->\n<li><a href="pages/10-future.html">Future Directions & Mamba</a></li>\n<li><a href="pages/08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>\n<li><a href="pages/09-chakramodel.html">ChakraModel Case Study</a></li>\n\`\`\`\n\n`;
  } else if (['pages/01-what-is-colonoscopy.html', 'pages/02-polyp-types.html', 'pages/06b-clinical-evidence.html', 'pages/07-clinical-systems.html'].includes(f)) {
    md += `**Header Navigation (Lines 33–34)**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li>\n<li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>\n\n<!-- AFTER -->\n<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>\n<li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li>\n\`\`\`\n\n`;
    md += `**Mobile Navigation Drawer (Lines 78–80)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>\n<a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>\n<a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>\n\n<!-- AFTER -->\n<a href="08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>\n<a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>\n<a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>\n\`\`\`\n\n`;
    if (f === 'pages/01-what-is-colonoscopy.html') {
      md += `**Corley et al. 2014 Citation Details Button (Line 488)**:\n\`\`\`html\n<!-- Option A (Recommended): Maintain anchor link with target added to 11-references.html -->\n<a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>\n\n<!-- Option B (Fallback): Direct page link without anchor -->\n<a href="11-references.html" class="btn btn-outline btn-sm">Citation Details &rarr;</a>\n\`\`\`\n\n`;
    }
    if (f === 'pages/07-clinical-systems.html') {
      md += `**Bottom Call-to-Action Transition Button (Line 570)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="08-failure-modes.html" class="btn btn-primary btn-lg">\n  Proceed to Module 08: Integrity Audit & Video Leakage &rarr;\n</a>\n\n<!-- AFTER -->\n<a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg">\n  Proceed to Module 08: Integrity Audit & Video Leakage &rarr;\n</a>\n\`\`\`\n\n`;
    }
    md += `**Global Footer Navigation Links**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="10-future-directions.html">Future Directions & Mamba</a></li>\n<li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li>\n<li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li>\n\n<!-- AFTER -->\n<li><a href="10-future.html">Future Directions & Mamba</a></li>\n<li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>\n<li><a href="09-chakramodel.html">ChakraModel Case Study</a></li>\n\`\`\`\n\n`;
  } else if (['pages/03-ai-history.html', 'pages/04-architectures.html', 'pages/05-datasets.html', 'pages/06-benchmarks.html'].includes(f)) {
    md += `**Header Navigation (Lines 28–34)**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li>\n<li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li>\n...\n<li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li>\n\n<!-- AFTER -->\n<li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li>\n<li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li>\n...\n<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li>\n\`\`\`\n\n`;
    md += `**Mobile Navigation Drawer (Lines 51–60)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a>\n<a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials & Evidence</a>\n...\n<a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a>\n<a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a>\n<a href="09-implementation.html" class="nav-link">09 Implementation & Latency</a>\n<a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a>\n\n<!-- AFTER -->\n<a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a>\n<a href="06b-clinical-evidence.html" class="nav-link">06b Clinical Trials & Evidence</a>\n...\n<a href="08-benchmark-integrity.html" class="nav-link">08 Forensic Integrity Audit</a>\n<a href="07-clinical-systems.html" class="nav-link">07 Commercial CADe/CADx</a>\n<a href="09-chakramodel.html" class="nav-link">09 ChakraModel Research</a>\n<a href="10-future.html" class="nav-link">10 Future Frontiers</a>\n\`\`\`\n\n`;
    if (f === 'pages/06-benchmarks.html') {
      md += `**Bottom Call-to-Action Transition Button (Line 468)**:\n\`\`\`html\n<!-- BEFORE -->\n<a href="07-integrity-audit.html" class="btn btn-primary btn-lg">\n  <span>Read Integrity Audit</span>\n  <svg ...></svg>\n</a>\n\n<!-- AFTER -->\n<a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg">\n  <span>Read Integrity Audit</span>\n  <svg ...></svg>\n</a>\n\`\`\`\n\n`;
    }
    md += `**Global Footer Navigation Links**:\n\`\`\`html\n<!-- BEFORE -->\n<li><a href="01-clinical-foundations.html">Clinical Foundations</a></li>\n<li><a href="02-clinical-evidence.html">Trial Evidence & RCTs</a></li>\n<li><a href="08-commercial-systems.html">Commercial Systems</a></li>\n...\n<li><a href="09-implementation.html">Deployment & Latency</a></li>\n...\n<li><a href="07-integrity-audit.html">Integrity Audit</a></li>\n<li><a href="10-future-frontiers.html">Future Frontiers</a></li>\n\n<!-- AFTER -->\n<li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li>\n<li><a href="06b-clinical-evidence.html">Trial Evidence & RCTs</a></li>\n<li><a href="07-clinical-systems.html">Commercial Systems</a></li>\n...\n<li><a href="09-chakramodel.html">ChakraModel Research</a></li>\n...\n<li><a href="08-benchmark-integrity.html">Integrity Audit</a></li>\n<li><a href="10-future.html">Future Frontiers</a></li>\n\`\`\`\n\n`;
  } else if (f === 'pages/12-glossary.html') {
    md += `**Alphabetical Jump Bar In-Page Anchors (Lines 160–185)**:\n`;
    md += `In \`pages/12-glossary.html\`, 26 jump buttons point to \`href="#letter-A"\` through \`href="#letter-Z"\`.\n`;
    md += `Currently, no elements with \`id="letter-A"\` .. \`id="letter-Z"\` exist in the DOM, causing 26 broken anchor violations.\n\n`;
    md += `**Remediation Solution**:\nInsert semantic anchor points before each alphabetical group (or at the top of the glossary container) corresponding to each letter.\n`;
    md += `\`\`\`html\n<!-- Add anchor spans inside #glossary-items-container for active and disabled letters -->\n<span id="letter-A" class="letter-target"></span>\n<!-- Card ADR, APC, AMR, Alarm Fatigue -->\n\n<span id="letter-B" class="letter-target"></span>\n<!-- Card BBPS -->\n\n<span id="letter-C" class="letter-target"></span>\n<!-- Cards CIR, CNN, ClinicDB, ColonDB, CVC-300, Cross-Dataset Contamination -->\n\n<span id="letter-D" class="letter-target"></span>\n<!-- Cards Diminutive, DSC, Dual-Path, Deep Supervision -->\n\n<span id="letter-E" class="letter-target"></span>\n<!-- Cards E-measure, ETIS-Larib -->\n\n<span id="letter-F" class="letter-target"></span>\n<!-- Cards FAR, FPS -->\n\n<span id="letter-G" class="letter-target"></span>\n<!-- Card splits_v2 -->\n\n<span id="letter-H" class="letter-target"></span>\n<span id="letter-I" class="letter-target"></span>\n<!-- Cards IoU, Latency, Inductive Bias, In-Sequence -->\n\n<span id="letter-J" class="letter-target"></span>\n<span id="letter-K" class="letter-target"></span>\n<!-- Cards Kudo, Kvasir-SEG -->\n\n<span id="letter-L" class="letter-target"></span>\n<span id="letter-M" class="letter-target"></span>\n<!-- Cards MAE, FPN -->\n\n<span id="letter-N" class="letter-target"></span>\n<!-- Card NICE -->\n\n<span id="letter-O" class="letter-target"></span>\n<span id="letter-P" class="letter-target"></span>\n<!-- Cards PDR, Paris, VRAM, PVT, PPD, PolypGen, PICCOLO, Prompt Leakage -->\n\n<span id="letter-Q" class="letter-target"></span>\n<span id="letter-R" class="letter-target"></span>\n<!-- Cards Resect and Discard, Reverse Attention, RFB -->\n\n<span id="letter-S" class="letter-target"></span>\n<!-- Cards SSL, S-measure, Swin, SSM/Mamba, SUN-SEG, SHA-256 -->\n\n<span id="letter-T" class="letter-target"></span>\n<!-- Card TTA -->\n\n<span id="letter-U" class="letter-target"></span>\n<span id="letter-V" class="letter-target"></span>\n<!-- Cards ViT, Video Frame Leakage -->\n\n<span id="letter-W" class="letter-target"></span>\n<!-- Card Withdrawal Time -->\n\n<span id="letter-X" class="letter-target"></span>\n<span id="letter-Y" class="letter-target"></span>\n<span id="letter-Z" class="letter-target"></span>\n\`\`\`\n`;
  }
}

md += `\n---

## 5. Corley et al. 2014 Deep-Link Harmonization

In \`pages/01-what-is-colonoscopy.html\`, line 488:
\`\`\`html\n<a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>\n\`\`\`

### Problem
In \`pages/11-references.html\`, there are 48 reference cards, but:
1. None of the cards contain \`id\` attributes (e.g. \`id="ref-01"\` or \`id="ref-corley2014"\`).
2. Corley et al. (*NEJM* 2014) is referenced in the search placeholder (line 198: \`placeholder="...Corley..."\`), but is not indexed as an independent numbered card.

### Dual-Compatible Resolution Options
- **Option 1 (Target Anchor in 11-references.html - Recommended)**:
  In \`pages/11-references.html\`, add a dedicated landmark anchor or card for Corley 2014 without disrupting the 48-card count (or wrap Section 1 header with \`id="ref-corley2014"\`):
  \`\`\`html\n<div id="ref-corley2014" style="scroll-margin-top: 5rem;"></div>\n\`\`\`
  This guarantees that clicking the button scrolls directly to the Clinical Trials & Guidelines section.
- **Option 2 (Direct Page Link)**:
  In \`pages/01-what-is-colonoscopy.html\` line 488, replace:
  \`\`\`html\n<a href="11-references.html" class="btn btn-outline btn-sm">Citation Details &rarr;</a>\n\`\`\`
  This immediately eliminates the missing anchor violation.

---

## 6. Automated Test Suite Remediation

### 6.1 Fixing \`tests/validate_m3_pages.js\` (Line 130)

#### Current Failing Assertion (Line 130):
\`\`\`javascript\nassert(indexContent.includes('04-architectures.html') && indexContent.includes('06-benchmarks.html') && indexContent.includes('08-failure-modes.html') && indexContent.includes('09-chakramodel-case-study.html'), 'index.html: Researcher path links to modules 04, 06, 08, 09');\n\`\`\`

#### Required Remediated Assertion:
\`\`\`javascript\nassert(indexContent.includes('04-architectures.html') && indexContent.includes('06-benchmarks.html') && indexContent.includes('08-benchmark-integrity.html') && indexContent.includes('09-chakramodel.html'), 'index.html: Researcher path links to modules 04, 06, 08, 09');\n\`\`\`

#### Verification Command:
\`\`\`powershell\nnode tests/validate_m3_pages.js\n\`\`\`
Expected Result: **204 / 204 checks PASS (100%)**.

---

### 6.2 Hardening \`tests/validate_m4_pages.js\`

To prevent link regression and address Reviewer 2 Finding 3, add the following link existence validation loop to \`tests/validate_m4_pages.js\` after line 75:

\`\`\`javascript\n// 2.1 Verify that all relative internal links point to existing files\nconsole.log(\"\\n2.1 Verifying Internal Relative Link Targets...\");\n[\n  { file: P3, name: '03-ai-history.html' },\n  { file: P4, name: '04-architectures.html' },\n  { file: P5, name: '05-datasets.html' },\n  { file: P6, name: '06-benchmarks.html' }\n].forEach(p => {\n  const dir = path.dirname(p.file);\n  const content = fs.readFileSync(p.file, 'utf8');\n  const aRegex = /<a\\s+[^>]*href=[\"']([^\"']*)[\"'][^>]*>/gi;\n  let m;\n  let pageBrokenLinks = [];\n  while ((m = aRegex.exec(content)) !== null) {\n    const href = m[1].trim();\n    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;\n    const [fPart] = href.split('#');\n    const resolved = path.resolve(dir, fPart);\n    if (!fs.existsSync(resolved)) {\n      pageBrokenLinks.push(href);\n    }\n  }\n  assert(pageBrokenLinks.length === 0, \`\${p.name}: All internal hyperlinks resolve to existing disk files (Broken: \${pageBrokenLinks.join(', ') || 'none'})\`);\n});\n\`\`\`

#### Verification Command:
\`\`\`powershell\nnode tests/validate_m4_pages.js\n\`\`\`
Expected Result: **All checks PASS with zero missing disk files**.

---

## 7. Cross-Module Navigation Harmonization Matrix

To ensure flawless navigation coherence across all 14 files, all navigation menus must be harmonized into the standardized 3-domain structure:

### 7.1 Unified Mobile Drawer Hierarchy (All 14 Files)

\`\`\`html\n<div class="mobile-nav-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">\n  <!-- Group 1: Clinical Domain -->\n  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-teal); letter-spacing: 0.08em; margin-bottom: 0.5rem;">Clinical Education</div>\n  <a href="[PREFIX]index.html" class="nav-link">00. Home / Portal Overview</a>\n  <a href="[PREFIX]01-what-is-colonoscopy.html" class="nav-link">01. What is Colonoscopy? Anatomy & Prep</a>\n  <a href="[PREFIX]02-polyp-types.html" class="nav-link">02. Polyp Types & Morphology</a>\n  <a href="[PREFIX]06b-clinical-evidence.html" class="nav-link">06b. Clinical Trials & Evidence</a>\n  <a href="[PREFIX]07-clinical-systems.html" class="nav-link">07. Commercial CADe/CADx Systems</a>\n\n  <!-- Group 2: AI & Technical Foundations -->\n  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-purple); letter-spacing: 0.08em; margin: 1.25rem 0 0.5rem;">AI Engineering & Research</div>\n  <a href="[PREFIX]03-ai-history.html" class="nav-link">03. History of AI in Colonoscopy</a>\n  <a href="[PREFIX]04-architectures.html" class="nav-link">04. Deep Learning Architectures</a>\n  <a href="[PREFIX]05-datasets.html" class="nav-link">05. Benchmark Datasets</a>\n  <a href="[PREFIX]06-benchmarks.html" class="nav-link">06. SOTA Benchmarks & Leaderboards</a>\n  <a href="[PREFIX]08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>\n  <a href="[PREFIX]09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>\n  <a href="[PREFIX]10-future.html" class="nav-link">10. Future Directions & Foundation Models</a>\n\n  <!-- Group 3: Knowledge Resources -->\n  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-amber); letter-spacing: 0.08em; margin: 1.25rem 0 0.5rem;">Knowledge Resources</div>\n  <a href="[PREFIX]11-references.html" class="nav-link">11. Scientific References (48 Papers)</a>\n  <a href="[PREFIX]12-glossary.html" class="nav-link">12. Medical & Technical Glossary (50 Terms)</a>\n</div>\n\`\`\`
*(Where \`[PREFIX]\` is \`pages/\` from \`index.html\`, and \`\` from inside \`pages/\` with \`../index.html\` for Home).*

### 7.2 Unified Sequential Call-to-Action (CTA) Flow

Readers traveling through the curriculum follow an unbroken, verified sequence:

\`\`\`\n[Clinical Track]    01-what-is-colonoscopy.html -> 02-polyp-types.html -> 06b-clinical-evidence.html -> 07-clinical-systems.html\n                                                                                                              |\n                                                                                                              v\n[Convergence]                                                                                   08-benchmark-integrity.html\n                                                                                                              ^\n                                                                                                              |\n[Technical Track]   03-ai-history.html -> 04-architectures.html -> 05-datasets.html -> 06-benchmarks.html -----+\n                                                                                                              |\n                                                                                                              v\n[Synthesis Track]                                                                               09-chakramodel.html\n                                                                                                              |\n                                                                                                              v\n                                                                                                10-future.html\n                                                                                                              |\n                                                                                                              v\n                                                                                                11-references.html\n                                                                                                              |\n                                                                                                              v\n                                                                                                12-glossary.html\n                                                                                                              |\n                                                                                                              v\n                                                                                                index.html (Home)\n\`\`\`

---

## 8. Verification & Validation Protocol

Upon applying the 140 link replacements and anchor additions, execute the full test verification suite:

\`\`\`powershell\n# 1. Verify Milestone 3 Pages (Must PASS 204/204)\nnode tests/validate_m3_pages.js\n\n# 2. Verify Milestone 4 Pages (Must PASS 113/113)\nnode tests/validate_m4_pages.js\n\n# 3. Verify Milestone 5 Pages (Must PASS all checks)\nnode tests/validate_pages.js\n\n# 4. Run Full Adversarial Link & Anchor Verification\nnode tests/adversarial_links_tooltips.test.js\n\`\`\`

### Invalidation Conditions:
1. Any relative link in an \`<a href>\` tag returns \`fs.existsSync() === false\`.
2. Any anchor link \`#id\` fails to resolve in the target document.
3. \`tests/validate_m3_pages.js\` fails due to outdated string assertions.
4. Total broken links count $> 0$.

`;

fs.writeFileSync(path.join(__dirname, 'link_remediation_blueprint.md'), md, 'utf8');
console.log('Saved link_remediation_blueprint.md successfully');
