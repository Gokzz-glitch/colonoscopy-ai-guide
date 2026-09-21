# Comprehensive Link Remediation Blueprint & Navigation Harmonization Specification

**Author**: Explorer Rem 1: Navigation & Internal Link Mapping Specialist  
**Assigned Directory**: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_rem_1`  
**Date**: 2026-09-22  
**Target Project**: Colonoscopy AI Educational & ChakraModel Research Platform  
**Target Output**: `link_remediation_blueprint.md`  
**Scope**: All 14 HTML files across the platform, test suites (`validate_m3_pages.js`, `validate_m4_pages.js`), and navigation architecture.

---

## 1. Executive Summary & Problem Diagnosis

During the forensic audit and adversarial reviews of the Colonoscopy AI Guide, **140 broken internal hyperlinks** were identified across 10 of the 14 HTML files. 

### Root Causes
1. **Planning vs. Finalized Filename Divergence**: During Milestone 3 and Milestone 4 development, workers linked to working draft filenames (e.g. `08-failure-modes.html`, `09-chakramodel-case-study.html`, `10-future-directions.html`, `01-clinical-foundations.html`, `07-integrity-audit.html`), whereas Milestone 5 finalized them under concise canonical names (`08-benchmark-integrity.html`, `09-chakramodel.html`, `10-future.html`).
2. **Missing In-Page & Cross-Page Anchor Targets**:
   - In `pages/01-what-is-colonoscopy.html` (line 488), a button links to `11-references.html#ref-corley2014`, but no anchor with `id="ref-corley2014"` exists in `pages/11-references.html`.
   - In `pages/12-glossary.html` (lines 160–185), the alphabetical jump bar contains 26 `<a href="#letter-A">` through `<a href="#letter-Z">` buttons, but the page body does not define the corresponding `id="letter-A"` through `id="letter-Z"` anchor targets.
3. **Test Suite Spec Coupling**:
   - In `tests/validate_m3_pages.js` (line 130), the automated test suite explicitly asserts the existence of the outdated draft strings `08-failure-modes.html` and `09-chakramodel-case-study.html`.
   - In `tests/validate_m4_pages.js`, link resolution was not asserted, allowing Milestone 4 pages to pass validation despite 60 broken links.

---

## 2. Platform Canonical Inventory & Mapping Rules

### 2.1 The 14 Canonical Files on Disk
| # | Canonical Relative Path | Module Title | Primary Focus |
|---|---|---|---|
| **00** | `index.html` | Platform Overview & Dual Mission | Patient & Researcher dual entry pathways |
| **01** | `pages/01-what-is-colonoscopy.html` | Module 01: Clinical Foundations | Anatomy, BBPS, CIR, Corley ADR invariant |
| **02** | `pages/02-polyp-types.html` | Module 02: Polyp Morphology & Histology | Paris, Pit Pattern, NICE, Neoplastic pathways |
| **03** | `pages/03-ai-history.html` | Module 03: AI History & Evolution | 4 AI Eras, Classical CV to Foundation Models |
| **04** | `pages/04-architectures.html` | Module 04: Deep Architectures | U-Net, PraNet, HarDNet, PVT, ColonFormer, EndoMamba |
| **05** | `pages/05-datasets.html` | Module 05: Benchmark Datasets Catalog | 10 Public datasets, Modality & Integrity disclosures |
| **06** | `pages/06-benchmarks.html` | Module 06: SOTA Benchmark Leaderboards | Performance matrices, Small polyp collapse, Speed |
| **06b**| `pages/06b-clinical-evidence.html`| Module 06b: Clinical Trials & RCTs | 41 RCTs, AGA Microsimulation, Cognitive deskilling |
| **07** | `pages/07-clinical-systems.html` | Module 07: Commercial CADe/CADx Systems | GI Genius, CAD EYE, <40ms Latency budget |
| **08** | `pages/08-benchmark-integrity.html`| Module 08: Benchmark Integrity Audit | Contamination map, 4 Structural benchmark flaws |
| **09** | `pages/09-chakramodel.html` | Module 09: ChakraModel Research Project | Architecture, Stage 1 Protocol, splits_v2 |
| **10** | `pages/10-future.html` | Module 10: Future of Colonoscopy AI | Roadmap, Mamba, Vision foundation models |
| **11** | `pages/11-references.html` | Module 11: Master References | 48 Verified papers, DOIs, arXiv, GitHub repos |
| **12** | `pages/12-glossary.html` | Module 12: Plain-English Glossary | 50 Verified terms, Search, Category filter |

### 2.2 Canonical Draft-to-Physical Translation Table
| Draft Name in Code | Canonical Replacement | Files Affected |
|---|---|---|
| `08-failure-modes.html` | `08-benchmark-integrity.html` | `index.html`, `01`, `02`, `06b`, `07` |
| `09-chakramodel-case-study.html` | `09-chakramodel.html` | `index.html`, `01`, `02`, `06b`, `07` |
| `10-future-directions.html` | `10-future.html` | `index.html`, `01`, `02`, `06b`, `07` |
| `01-clinical-foundations.html` | `01-what-is-colonoscopy.html` | `03`, `04`, `05`, `06` |
| `02-clinical-evidence.html` | `06b-clinical-evidence.html` | `03`, `04`, `05`, `06` |
| `07-integrity-audit.html` | `08-benchmark-integrity.html` | `03`, `04`, `05`, `06` |
| `08-commercial-systems.html` | `07-clinical-systems.html` | `03`, `04`, `05`, `06` |
| `09-implementation.html` | `09-chakramodel.html` | `03`, `04`, `05`, `06` |
| `10-future-frontiers.html` | `10-future.html` | `03`, `04`, `05`, `06` |

### 2.3 Relative Path Prefix Enforcement Rules
1. **From Root (`index.html`)**:
   - Links to pages in `pages/` **MUST** include the `pages/` directory prefix (e.g. `href="pages/01-what-is-colonoscopy.html"`, `href="pages/08-benchmark-integrity.html"`).
   - Links to home remain `href="index.html"`.
   - Asset links use `assets/css/main.css` and `assets/js/main.js`.
2. **From Inside Pages Subdirectory (`pages/*.html`)**:
   - Links to peer pages in the same directory **MUST NOT** have `pages/` (e.g. `href="01-what-is-colonoscopy.html"`, `href="08-benchmark-integrity.html"`).
   - Links to home **MUST** point to the parent directory: `href="../index.html"`.
   - Asset links use `../assets/css/main.css` and `../assets/js/main.js`.

---

## 3. Detailed Breakdown of the 140 Broken Links

| Source File | Total Broken | Header | Drawer | Cards / CTAs / Body | Footer | In-Page Anchors |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `index.html` | **19** | 2 | 3 | 11 | 3 | 0 |
| `pages/01-what-is-colonoscopy.html` | **9** | 2 | 3 | 1 | 3 | 1 (Corley) |
| `pages/02-polyp-types.html` | **8** | 2 | 3 | 0 | 3 | 0 |
| `pages/03-ai-history.html` | **15** | 3 | 6 | 0 | 6 | 0 |
| `pages/04-architectures.html` | **15** | 3 | 6 | 0 | 6 | 0 |
| `pages/05-datasets.html` | **15** | 3 | 6 | 0 | 6 | 0 |
| `pages/06-benchmarks.html` | **16** | 3 | 6 | 1 (CTA) | 6 | 0 |
| `pages/06b-clinical-evidence.html` | **8** | 2 | 3 | 0 | 3 | 0 |
| `pages/07-clinical-systems.html` | **9** | 2 | 3 | 1 (CTA) | 3 | 0 |
| `pages/08-benchmark-integrity.html` | **0** | 0 | 0 | 0 | 0 | 0 |
| `pages/09-chakramodel.html` | **0** | 0 | 0 | 0 | 0 | 0 |
| `pages/10-future.html` | **0** | 0 | 0 | 0 | 0 | 0 |
| `pages/11-references.html` | **0** | 0 | 0 | 0 | 0 | 0 |
| `pages/12-glossary.html` | **26** | 0 | 0 | 0 | 0 | 26 (A-Z) |
| **TOTAL** | **140** | **20** | **39** | **14** | **39** | **28** |

---

## 4. Line-by-Line Remediation Specification (All 14 Files)


### 4.1 File: `index.html`

- **Total Issues Detected**: 19

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L33 | Header Nav | <code><li><a href="pages/08-failure-modes.html" class="nav-link">Integrity Audit</a></li></code> | <code><li><a href="pages/08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li></code> |
| #2 | L34 | Header Nav | <code><li><a href="pages/09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li></code> | <code><li><a href="pages/09-chakramodel.html" class="nav-link">ChakraModel</a></li></code> |
| #3 | L78 | Mobile Drawer | <code><a href="pages/08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> | <code><a href="pages/08-benchmark-integrity.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> |
| #4 | L79 | Mobile Drawer | <code><a href="pages/09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a></code> | <code><a href="pages/09-chakramodel.html" class="nav-link">09. ChakraModel Research Case Study</a></code> |
| #5 | L80 | Mobile Drawer | <code><a href="pages/10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> | <code><a href="pages/10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> |
| #6 | L115 | Interactive Card / CTA Button | <code><a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-lg"></code> | <code><a href="pages/09-chakramodel.html" class="btn btn-outline btn-lg"></code> |
| #7 | L256 | Interactive Card / CTA Button | <code><a href="pages/08-failure-modes.html" class="btn btn-secondary btn-sm">Integrity Audit</a></code> | <code><a href="pages/08-benchmark-integrity.html" class="btn btn-secondary btn-sm">Integrity Audit</a></code> |
| #8 | L257 | Interactive Card / CTA Button | <code><a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-sm">ChakraModel Study</a></code> | <code><a href="pages/09-chakramodel.html" class="btn btn-outline btn-sm">ChakraModel Study</a></code> |
| #9 | L295 | Interactive Card / CTA Button | <code><a href="pages/09-chakramodel-case-study.html" class="btn btn-secondary"></code> | <code><a href="pages/09-chakramodel.html" class="btn btn-secondary"></code> |
| #10 | L333 | Interactive Card / CTA Button | <code><a href="pages/08-failure-modes.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a></code> | <code><a href="pages/08-benchmark-integrity.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a></code> |
| #11 | L480 | Interactive Card / CTA Button | <code><h3 class="card-title"><a href="pages/08-failure-modes.html">Failure Modes & Video Leakage</a></h3></code> | <code><h3 class="card-title"><a href="pages/08-benchmark-integrity.html">Failure Modes & Video Leakage</a></h3></code> |
| #12 | L485 | Interactive Card / CTA Button | <code><a href="pages/08-failure-modes.html" class="tooltip-link">Examine Leakage Proofs &rarr;</a></code> | <code><a href="pages/08-benchmark-integrity.html" class="tooltip-link">Examine Leakage Proofs &rarr;</a></code> |
| #13 | L495 | Interactive Card / CTA Button | <code><h3 class="card-title"><a href="pages/09-chakramodel-case-study.html">ChakraModel Research Study</a></h3></code> | <code><h3 class="card-title"><a href="pages/09-chakramodel.html">ChakraModel Research Study</a></h3></code> |
| #14 | L500 | Interactive Card / CTA Button | <code><a href="pages/09-chakramodel-case-study.html" class="tooltip-link">Read Research Report &rarr;</a></code> | <code><a href="pages/09-chakramodel.html" class="tooltip-link">Read Research Report &rarr;</a></code> |
| #15 | L510 | Global Footer | <code><h3 class="card-title"><a href="pages/10-future-directions.html">Future Directions & Frontiers</a></h3></code> | <code><h3 class="card-title"><a href="pages/10-future.html">Future Directions & Frontiers</a></h3></code> |
| #16 | L515 | Global Footer | <code><a href="pages/10-future-directions.html" class="tooltip-link">See Future Roadmap &rarr;</a></code> | <code><a href="pages/10-future.html" class="tooltip-link">See Future Roadmap &rarr;</a></code> |
| #17 | L628 | Global Footer | <code><li><a href="pages/10-future-directions.html">Future Directions & Mamba</a></li></code> | <code><li><a href="pages/10-future.html">Future Directions & Mamba</a></li></code> |
| #18 | L635 | Global Footer | <code><li><a href="pages/08-failure-modes.html">Integrity & Video Leakage Audit</a></li></code> | <code><li><a href="pages/08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li></code> |
| #19 | L636 | Global Footer | <code><li><a href="pages/09-chakramodel-case-study.html">ChakraModel Case Study</a></li></code> | <code><li><a href="pages/09-chakramodel.html">ChakraModel Case Study</a></li></code> |

#### Verbatim Block Replacements for `index.html`

**Header Navigation (Lines 33–34)**:
```html
<!-- BEFORE -->
<li><a href="pages/08-failure-modes.html" class="nav-link">Integrity Audit</a></li>
<li><a href="pages/09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>

<!-- AFTER -->
<li><a href="pages/08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>
<li><a href="pages/09-chakramodel.html" class="nav-link">ChakraModel</a></li>
```

**Mobile Navigation Drawer (Lines 78–80)**:
```html
<!-- BEFORE -->
<a href="pages/08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>
<a href="pages/09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>
<a href="pages/10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>

<!-- AFTER -->
<a href="pages/08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
<a href="pages/09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
<a href="pages/10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>
```

**Hero CTA Button (Line 115)**:
```html
<!-- BEFORE -->
<a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-lg">
  Read ChakraModel Audit
</a>

<!-- AFTER -->
<a href="pages/09-chakramodel.html" class="btn btn-outline btn-lg">
  Read ChakraModel Audit
</a>
```

**Researcher Pathway Buttons (Lines 256–257)**:
```html
<!-- BEFORE -->
<a href="pages/08-failure-modes.html" class="btn btn-secondary btn-sm">Integrity Audit</a>
<a href="pages/09-chakramodel-case-study.html" class="btn btn-outline btn-sm">ChakraModel Study</a>

<!-- AFTER -->
<a href="pages/08-benchmark-integrity.html" class="btn btn-secondary btn-sm">Integrity Audit</a>
<a href="pages/09-chakramodel.html" class="btn btn-outline btn-sm">ChakraModel Study</a>
```

**ChakraModel Highlight Banner & Tooltip Link (Lines 295 & 333)**:
```html
<!-- BEFORE (Line 295) -->
<a href="pages/09-chakramodel-case-study.html" class="btn btn-secondary">
  Read Full Forensic Report &rarr;
</a>
<!-- BEFORE (Line 333) -->
<a href="pages/08-failure-modes.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a>

<!-- AFTER (Line 295) -->
<a href="pages/09-chakramodel.html" class="btn btn-secondary">
  Read Full Forensic Report &rarr;
</a>
<!-- AFTER (Line 333) -->
<a href="pages/08-benchmark-integrity.html" class="tooltip-link" style="font-size: 0.85rem;">See all 4 audit flaws &rarr;</a>
```

**Interactive Curriculum Module Cards (Lines 480, 485, 495, 500, 510, 515)**:
```html
<!-- Module 08 Card (Lines 480, 485) -->
<h3 class="card-title"><a href="pages/08-benchmark-integrity.html">Benchmark Integrity Audit</a></h3>
...
<a href="pages/08-benchmark-integrity.html" class="tooltip-link">Examine Leakage Proofs &rarr;</a>

<!-- Module 09 Card (Lines 495, 500) -->
<h3 class="card-title"><a href="pages/09-chakramodel.html">ChakraModel Research Study</a></h3>
...
<a href="pages/09-chakramodel.html" class="tooltip-link">Read Research Report &rarr;</a>

<!-- Module 10 Card (Lines 510, 515) -->
<h3 class="card-title"><a href="pages/10-future.html">Future Directions & Frontiers</a></h3>
...
<a href="pages/10-future.html" class="tooltip-link">See Future Roadmap &rarr;</a>
```

**Global Footer (Lines 628, 635, 636)**:
```html
<!-- BEFORE -->
<li><a href="pages/10-future-directions.html">Future Directions & Mamba</a></li>
<li><a href="pages/08-failure-modes.html">Integrity & Video Leakage Audit</a></li>
<li><a href="pages/09-chakramodel-case-study.html">ChakraModel Case Study</a></li>

<!-- AFTER -->
<li><a href="pages/10-future.html">Future Directions & Mamba</a></li>
<li><a href="pages/08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>
<li><a href="pages/09-chakramodel.html">ChakraModel Case Study</a></li>
```


### 4.2 File: `pages/01-what-is-colonoscopy.html`

- **Total Issues Detected**: 9

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L33 | Header Nav | <code><li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li></code> |
| #2 | L34 | Header Nav | <code><li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li></code> | <code><li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li></code> |
| #3 | L78 | Mobile Drawer | <code><a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> |
| #4 | L79 | Mobile Drawer | <code><a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Case Study</a></code> |
| #5 | L80 | Mobile Drawer | <code><a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> |
| #6 | L488 | Evidence CTA Button | <code><a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a></code> | <code>&lt;a href="11-references.html#ref-corley2014" ...&gt;</code> (requires target in 11) OR <code>&lt;a href="11-references.html" ...&gt;</code> |
| #7 | L594 | Global Footer | <code><li><a href="10-future-directions.html">Future Directions & Mamba</a></li></code> | <code><li><a href="10-future.html">Future Directions & Mamba</a></li></code> |
| #8 | L601 | Global Footer | <code><li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li></code> |
| #9 | L602 | Global Footer | <code><li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li></code> | <code><li><a href="09-chakramodel.html">ChakraModel Case Study</a></li></code> |

#### Verbatim Block Replacements for `pages/01-what-is-colonoscopy.html`

**Header Navigation (Lines 33–34)**:
```html
<!-- BEFORE -->
<li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>

<!-- AFTER -->
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li>
```

**Mobile Navigation Drawer (Lines 78–80)**:
```html
<!-- BEFORE -->
<a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>
<a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>
<a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
<a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
<a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>
```

**Corley et al. 2014 Citation Details Button (Line 488)**:
```html
<!-- Option A (Recommended): Maintain anchor link with target added to 11-references.html -->
<a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>

<!-- Option B (Fallback): Direct page link without anchor -->
<a href="11-references.html" class="btn btn-outline btn-sm">Citation Details &rarr;</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="10-future-directions.html">Future Directions & Mamba</a></li>
<li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li>

<!-- AFTER -->
<li><a href="10-future.html">Future Directions & Mamba</a></li>
<li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel.html">ChakraModel Case Study</a></li>
```


### 4.3 File: `pages/02-polyp-types.html`

- **Total Issues Detected**: 8

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L33 | Header Nav | <code><li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li></code> |
| #2 | L34 | Header Nav | <code><li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li></code> | <code><li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li></code> |
| #3 | L78 | Mobile Drawer | <code><a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> |
| #4 | L79 | Mobile Drawer | <code><a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Case Study</a></code> |
| #5 | L80 | Mobile Drawer | <code><a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> |
| #6 | L566 | Global Footer | <code><li><a href="10-future-directions.html">Future Directions & Mamba</a></li></code> | <code><li><a href="10-future.html">Future Directions & Mamba</a></li></code> |
| #7 | L573 | Global Footer | <code><li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li></code> |
| #8 | L574 | Global Footer | <code><li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li></code> | <code><li><a href="09-chakramodel.html">ChakraModel Case Study</a></li></code> |

#### Verbatim Block Replacements for `pages/02-polyp-types.html`

**Header Navigation (Lines 33–34)**:
```html
<!-- BEFORE -->
<li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>

<!-- AFTER -->
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li>
```

**Mobile Navigation Drawer (Lines 78–80)**:
```html
<!-- BEFORE -->
<a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>
<a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>
<a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
<a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
<a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="10-future-directions.html">Future Directions & Mamba</a></li>
<li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li>

<!-- AFTER -->
<li><a href="10-future.html">Future Directions & Mamba</a></li>
<li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel.html">ChakraModel Case Study</a></li>
```


### 4.4 File: `pages/03-ai-history.html`

- **Total Issues Detected**: 15

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L28 | Header Nav | <code><li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li></code> |
| #2 | L29 | Header Nav | <code><li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li></code> | <code><li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li></code> |
| #3 | L34 | Header Nav | <code><li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li></code> |
| #4 | L51 | Mobile Drawer | <code><a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a></code> | <code><a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a></code> |
| #5 | L52 | Mobile Drawer | <code><a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> | <code><a href="06b-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> |
| #6 | L57 | Mobile Drawer | <code><a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">07 Forensic Integrity Audit</a></code> |
| #7 | L58 | Mobile Drawer | <code><a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> | <code><a href="07-clinical-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> |
| #8 | L59 | Mobile Drawer | <code><a href="09-implementation.html" class="nav-link">09 Implementation &amp; Latency</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09 Implementation &amp; Latency</a></code> |
| #9 | L60 | Mobile Drawer | <code><a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10 Future Frontiers</a></code> |
| #10 | L757 | Global Footer | <code><li><a href="01-clinical-foundations.html">Clinical Foundations</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li></code> |
| #11 | L758 | Global Footer | <code><li><a href="02-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> | <code><li><a href="06b-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> |
| #12 | L759 | Global Footer | <code><li><a href="08-commercial-systems.html">Commercial Systems</a></li></code> | <code><li><a href="07-clinical-systems.html">Commercial Systems</a></li></code> |
| #13 | L770 | Global Footer | <code><li><a href="09-implementation.html">Deployment &amp; Latency</a></li></code> | <code><li><a href="09-chakramodel.html">Deployment &amp; Latency</a></li></code> |
| #14 | L776 | Global Footer | <code><li><a href="07-integrity-audit.html">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity Audit</a></li></code> |
| #15 | L777 | Global Footer | <code><li><a href="10-future-frontiers.html">Future Frontiers</a></li></code> | <code><li><a href="10-future.html">Future Frontiers</a></li></code> |

#### Verbatim Block Replacements for `pages/03-ai-history.html`

**Header Navigation (Lines 28–34)**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li>
<li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li>
<li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li>
```

**Mobile Navigation Drawer (Lines 51–60)**:
```html
<!-- BEFORE -->
<a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a>
<a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials & Evidence</a>
...
<a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a>
<a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a>
<a href="09-implementation.html" class="nav-link">09 Implementation & Latency</a>
<a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a>

<!-- AFTER -->
<a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a>
<a href="06b-clinical-evidence.html" class="nav-link">06b Clinical Trials & Evidence</a>
...
<a href="08-benchmark-integrity.html" class="nav-link">08 Forensic Integrity Audit</a>
<a href="07-clinical-systems.html" class="nav-link">07 Commercial CADe/CADx</a>
<a href="09-chakramodel.html" class="nav-link">09 ChakraModel Research</a>
<a href="10-future.html" class="nav-link">10 Future Frontiers</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html">Clinical Foundations</a></li>
<li><a href="02-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="08-commercial-systems.html">Commercial Systems</a></li>
...
<li><a href="09-implementation.html">Deployment & Latency</a></li>
...
<li><a href="07-integrity-audit.html">Integrity Audit</a></li>
<li><a href="10-future-frontiers.html">Future Frontiers</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li>
<li><a href="06b-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="07-clinical-systems.html">Commercial Systems</a></li>
...
<li><a href="09-chakramodel.html">ChakraModel Research</a></li>
...
<li><a href="08-benchmark-integrity.html">Integrity Audit</a></li>
<li><a href="10-future.html">Future Frontiers</a></li>
```


### 4.5 File: `pages/04-architectures.html`

- **Total Issues Detected**: 15

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L28 | Header Nav | <code><li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li></code> |
| #2 | L29 | Header Nav | <code><li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li></code> | <code><li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li></code> |
| #3 | L34 | Header Nav | <code><li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li></code> |
| #4 | L51 | Mobile Drawer | <code><a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a></code> | <code><a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a></code> |
| #5 | L52 | Mobile Drawer | <code><a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> | <code><a href="06b-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> |
| #6 | L57 | Mobile Drawer | <code><a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">07 Forensic Integrity Audit</a></code> |
| #7 | L58 | Mobile Drawer | <code><a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> | <code><a href="07-clinical-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> |
| #8 | L59 | Mobile Drawer | <code><a href="09-implementation.html" class="nav-link">09 Implementation &amp; Latency</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09 Implementation &amp; Latency</a></code> |
| #9 | L60 | Mobile Drawer | <code><a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10 Future Frontiers</a></code> |
| #10 | L667 | Global Footer | <code><li><a href="01-clinical-foundations.html">Clinical Foundations</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li></code> |
| #11 | L668 | Global Footer | <code><li><a href="02-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> | <code><li><a href="06b-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> |
| #12 | L669 | Global Footer | <code><li><a href="08-commercial-systems.html">Commercial Systems</a></li></code> | <code><li><a href="07-clinical-systems.html">Commercial Systems</a></li></code> |
| #13 | L680 | Global Footer | <code><li><a href="09-implementation.html">Deployment &amp; Latency</a></li></code> | <code><li><a href="09-chakramodel.html">Deployment &amp; Latency</a></li></code> |
| #14 | L686 | Global Footer | <code><li><a href="07-integrity-audit.html">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity Audit</a></li></code> |
| #15 | L687 | Global Footer | <code><li><a href="10-future-frontiers.html">Future Frontiers</a></li></code> | <code><li><a href="10-future.html">Future Frontiers</a></li></code> |

#### Verbatim Block Replacements for `pages/04-architectures.html`

**Header Navigation (Lines 28–34)**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li>
<li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li>
<li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li>
```

**Mobile Navigation Drawer (Lines 51–60)**:
```html
<!-- BEFORE -->
<a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a>
<a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials & Evidence</a>
...
<a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a>
<a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a>
<a href="09-implementation.html" class="nav-link">09 Implementation & Latency</a>
<a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a>

<!-- AFTER -->
<a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a>
<a href="06b-clinical-evidence.html" class="nav-link">06b Clinical Trials & Evidence</a>
...
<a href="08-benchmark-integrity.html" class="nav-link">08 Forensic Integrity Audit</a>
<a href="07-clinical-systems.html" class="nav-link">07 Commercial CADe/CADx</a>
<a href="09-chakramodel.html" class="nav-link">09 ChakraModel Research</a>
<a href="10-future.html" class="nav-link">10 Future Frontiers</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html">Clinical Foundations</a></li>
<li><a href="02-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="08-commercial-systems.html">Commercial Systems</a></li>
...
<li><a href="09-implementation.html">Deployment & Latency</a></li>
...
<li><a href="07-integrity-audit.html">Integrity Audit</a></li>
<li><a href="10-future-frontiers.html">Future Frontiers</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li>
<li><a href="06b-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="07-clinical-systems.html">Commercial Systems</a></li>
...
<li><a href="09-chakramodel.html">ChakraModel Research</a></li>
...
<li><a href="08-benchmark-integrity.html">Integrity Audit</a></li>
<li><a href="10-future.html">Future Frontiers</a></li>
```


### 4.6 File: `pages/05-datasets.html`

- **Total Issues Detected**: 15

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L28 | Header Nav | <code><li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li></code> |
| #2 | L29 | Header Nav | <code><li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li></code> | <code><li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li></code> |
| #3 | L34 | Header Nav | <code><li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li></code> |
| #4 | L51 | Mobile Drawer | <code><a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a></code> | <code><a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a></code> |
| #5 | L52 | Mobile Drawer | <code><a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> | <code><a href="06b-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> |
| #6 | L57 | Mobile Drawer | <code><a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">07 Forensic Integrity Audit</a></code> |
| #7 | L58 | Mobile Drawer | <code><a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> | <code><a href="07-clinical-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> |
| #8 | L59 | Mobile Drawer | <code><a href="09-implementation.html" class="nav-link">09 Implementation &amp; Latency</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09 Implementation &amp; Latency</a></code> |
| #9 | L60 | Mobile Drawer | <code><a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10 Future Frontiers</a></code> |
| #10 | L568 | Global Footer | <code><li><a href="01-clinical-foundations.html">Clinical Foundations</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li></code> |
| #11 | L569 | Global Footer | <code><li><a href="02-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> | <code><li><a href="06b-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> |
| #12 | L570 | Global Footer | <code><li><a href="08-commercial-systems.html">Commercial Systems</a></li></code> | <code><li><a href="07-clinical-systems.html">Commercial Systems</a></li></code> |
| #13 | L581 | Global Footer | <code><li><a href="09-implementation.html">Deployment &amp; Latency</a></li></code> | <code><li><a href="09-chakramodel.html">Deployment &amp; Latency</a></li></code> |
| #14 | L587 | Global Footer | <code><li><a href="07-integrity-audit.html">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity Audit</a></li></code> |
| #15 | L588 | Global Footer | <code><li><a href="10-future-frontiers.html">Future Frontiers</a></li></code> | <code><li><a href="10-future.html">Future Frontiers</a></li></code> |

#### Verbatim Block Replacements for `pages/05-datasets.html`

**Header Navigation (Lines 28–34)**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li>
<li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li>
<li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li>
```

**Mobile Navigation Drawer (Lines 51–60)**:
```html
<!-- BEFORE -->
<a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a>
<a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials & Evidence</a>
...
<a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a>
<a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a>
<a href="09-implementation.html" class="nav-link">09 Implementation & Latency</a>
<a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a>

<!-- AFTER -->
<a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a>
<a href="06b-clinical-evidence.html" class="nav-link">06b Clinical Trials & Evidence</a>
...
<a href="08-benchmark-integrity.html" class="nav-link">08 Forensic Integrity Audit</a>
<a href="07-clinical-systems.html" class="nav-link">07 Commercial CADe/CADx</a>
<a href="09-chakramodel.html" class="nav-link">09 ChakraModel Research</a>
<a href="10-future.html" class="nav-link">10 Future Frontiers</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html">Clinical Foundations</a></li>
<li><a href="02-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="08-commercial-systems.html">Commercial Systems</a></li>
...
<li><a href="09-implementation.html">Deployment & Latency</a></li>
...
<li><a href="07-integrity-audit.html">Integrity Audit</a></li>
<li><a href="10-future-frontiers.html">Future Frontiers</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li>
<li><a href="06b-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="07-clinical-systems.html">Commercial Systems</a></li>
...
<li><a href="09-chakramodel.html">ChakraModel Research</a></li>
...
<li><a href="08-benchmark-integrity.html">Integrity Audit</a></li>
<li><a href="10-future.html">Future Frontiers</a></li>
```


### 4.7 File: `pages/06-benchmarks.html`

- **Total Issues Detected**: 16

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L28 | Header Nav | <code><li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li></code> |
| #2 | L29 | Header Nav | <code><li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li></code> | <code><li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li></code> |
| #3 | L34 | Header Nav | <code><li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li></code> |
| #4 | L51 | Mobile Drawer | <code><a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a></code> | <code><a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a></code> |
| #5 | L52 | Mobile Drawer | <code><a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> | <code><a href="06b-clinical-evidence.html" class="nav-link">02 Clinical Trials &amp; Evidence</a></code> |
| #6 | L57 | Mobile Drawer | <code><a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">07 Forensic Integrity Audit</a></code> |
| #7 | L58 | Mobile Drawer | <code><a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> | <code><a href="07-clinical-systems.html" class="nav-link">08 Commercial CADe/CADx</a></code> |
| #8 | L59 | Mobile Drawer | <code><a href="09-implementation.html" class="nav-link">09 Implementation &amp; Latency</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09 Implementation &amp; Latency</a></code> |
| #9 | L60 | Mobile Drawer | <code><a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10 Future Frontiers</a></code> |
| #10 | L468 | Interactive Card / CTA Button | <code><a href="07-integrity-audit.html" class="btn btn-primary btn-lg"></code> | <code><a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg"></code> |
| #11 | L490 | Interactive Card / CTA Button | <code><li><a href="01-clinical-foundations.html">Clinical Foundations</a></li></code> | <code><li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li></code> |
| #12 | L491 | Interactive Card / CTA Button | <code><li><a href="02-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> | <code><li><a href="06b-clinical-evidence.html">Trial Evidence &amp; RCTs</a></li></code> |
| #13 | L492 | Interactive Card / CTA Button | <code><li><a href="08-commercial-systems.html">Commercial Systems</a></li></code> | <code><li><a href="07-clinical-systems.html">Commercial Systems</a></li></code> |
| #14 | L503 | Global Footer | <code><li><a href="09-implementation.html">Deployment &amp; Latency</a></li></code> | <code><li><a href="09-chakramodel.html">Deployment &amp; Latency</a></li></code> |
| #15 | L509 | Global Footer | <code><li><a href="07-integrity-audit.html">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity Audit</a></li></code> |
| #16 | L510 | Global Footer | <code><li><a href="10-future-frontiers.html">Future Frontiers</a></li></code> | <code><li><a href="10-future.html">Future Frontiers</a></li></code> |

#### Verbatim Block Replacements for `pages/06-benchmarks.html`

**Header Navigation (Lines 28–34)**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html" class="nav-link">Clinical</a></li>
<li><a href="02-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="07-integrity-audit.html" class="nav-link">Integrity</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html" class="nav-link">Clinical</a></li>
<li><a href="06b-clinical-evidence.html" class="nav-link">Trials</a></li>
...
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity</a></li>
```

**Mobile Navigation Drawer (Lines 51–60)**:
```html
<!-- BEFORE -->
<a href="01-clinical-foundations.html" class="nav-link">01 Clinical Foundations</a>
<a href="02-clinical-evidence.html" class="nav-link">02 Clinical Trials & Evidence</a>
...
<a href="07-integrity-audit.html" class="nav-link">07 Forensic Integrity Audit</a>
<a href="08-commercial-systems.html" class="nav-link">08 Commercial CADe/CADx</a>
<a href="09-implementation.html" class="nav-link">09 Implementation & Latency</a>
<a href="10-future-frontiers.html" class="nav-link">10 Future Frontiers</a>

<!-- AFTER -->
<a href="01-what-is-colonoscopy.html" class="nav-link">01 Clinical Foundations</a>
<a href="06b-clinical-evidence.html" class="nav-link">06b Clinical Trials & Evidence</a>
...
<a href="08-benchmark-integrity.html" class="nav-link">08 Forensic Integrity Audit</a>
<a href="07-clinical-systems.html" class="nav-link">07 Commercial CADe/CADx</a>
<a href="09-chakramodel.html" class="nav-link">09 ChakraModel Research</a>
<a href="10-future.html" class="nav-link">10 Future Frontiers</a>
```

**Bottom Call-to-Action Transition Button (Line 468)**:
```html
<!-- BEFORE -->
<a href="07-integrity-audit.html" class="btn btn-primary btn-lg">
  <span>Read Integrity Audit</span>
  <svg ...></svg>
</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg">
  <span>Read Integrity Audit</span>
  <svg ...></svg>
</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="01-clinical-foundations.html">Clinical Foundations</a></li>
<li><a href="02-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="08-commercial-systems.html">Commercial Systems</a></li>
...
<li><a href="09-implementation.html">Deployment & Latency</a></li>
...
<li><a href="07-integrity-audit.html">Integrity Audit</a></li>
<li><a href="10-future-frontiers.html">Future Frontiers</a></li>

<!-- AFTER -->
<li><a href="01-what-is-colonoscopy.html">Clinical Foundations</a></li>
<li><a href="06b-clinical-evidence.html">Trial Evidence & RCTs</a></li>
<li><a href="07-clinical-systems.html">Commercial Systems</a></li>
...
<li><a href="09-chakramodel.html">ChakraModel Research</a></li>
...
<li><a href="08-benchmark-integrity.html">Integrity Audit</a></li>
<li><a href="10-future.html">Future Frontiers</a></li>
```


### 4.8 File: `pages/06b-clinical-evidence.html`

- **Total Issues Detected**: 8

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L33 | Header Nav | <code><li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li></code> |
| #2 | L34 | Header Nav | <code><li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li></code> | <code><li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li></code> |
| #3 | L78 | Mobile Drawer | <code><a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> |
| #4 | L79 | Mobile Drawer | <code><a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Case Study</a></code> |
| #5 | L80 | Mobile Drawer | <code><a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> |
| #6 | L517 | Global Footer | <code><li><a href="10-future-directions.html">Future Directions & Mamba</a></li></code> | <code><li><a href="10-future.html">Future Directions & Mamba</a></li></code> |
| #7 | L524 | Global Footer | <code><li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li></code> |
| #8 | L525 | Global Footer | <code><li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li></code> | <code><li><a href="09-chakramodel.html">ChakraModel Case Study</a></li></code> |

#### Verbatim Block Replacements for `pages/06b-clinical-evidence.html`

**Header Navigation (Lines 33–34)**:
```html
<!-- BEFORE -->
<li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>

<!-- AFTER -->
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li>
```

**Mobile Navigation Drawer (Lines 78–80)**:
```html
<!-- BEFORE -->
<a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>
<a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>
<a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
<a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
<a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="10-future-directions.html">Future Directions & Mamba</a></li>
<li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li>

<!-- AFTER -->
<li><a href="10-future.html">Future Directions & Mamba</a></li>
<li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel.html">ChakraModel Case Study</a></li>
```


### 4.9 File: `pages/07-clinical-systems.html`

- **Total Issues Detected**: 9

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L33 | Header Nav | <code><li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li></code> |
| #2 | L34 | Header Nav | <code><li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li></code> | <code><li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li></code> |
| #3 | L78 | Mobile Drawer | <code><a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> | <code><a href="08-benchmark-integrity.html" class="nav-link">08. Failure Modes & Video Leakage</a></code> |
| #4 | L79 | Mobile Drawer | <code><a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a></code> | <code><a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Case Study</a></code> |
| #5 | L80 | Mobile Drawer | <code><a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> | <code><a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a></code> |
| #6 | L570 | Global Footer | <code><a href="08-failure-modes.html" class="btn btn-primary btn-lg"></code> | <code><a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg"></code> |
| #7 | L606 | Global Footer | <code><li><a href="10-future-directions.html">Future Directions & Mamba</a></li></code> | <code><li><a href="10-future.html">Future Directions & Mamba</a></li></code> |
| #8 | L613 | Global Footer | <code><li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li></code> | <code><li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li></code> |
| #9 | L614 | Global Footer | <code><li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li></code> | <code><li><a href="09-chakramodel.html">ChakraModel Case Study</a></li></code> |

#### Verbatim Block Replacements for `pages/07-clinical-systems.html`

**Header Navigation (Lines 33–34)**:
```html
<!-- BEFORE -->
<li><a href="08-failure-modes.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel-case-study.html" class="nav-link">ChakraModel</a></li>

<!-- AFTER -->
<li><a href="08-benchmark-integrity.html" class="nav-link">Integrity Audit</a></li>
<li><a href="09-chakramodel.html" class="nav-link">ChakraModel</a></li>
```

**Mobile Navigation Drawer (Lines 78–80)**:
```html
<!-- BEFORE -->
<a href="08-failure-modes.html" class="nav-link">08. Failure Modes & Video Leakage</a>
<a href="09-chakramodel-case-study.html" class="nav-link">09. ChakraModel Research Case Study</a>
<a href="10-future-directions.html" class="nav-link">10. Future Directions & Open Frontiers</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
<a href="09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
<a href="10-future.html" class="nav-link">10. Future Directions & Open Frontiers</a>
```

**Bottom Call-to-Action Transition Button (Line 570)**:
```html
<!-- BEFORE -->
<a href="08-failure-modes.html" class="btn btn-primary btn-lg">
  Proceed to Module 08: Integrity Audit & Video Leakage &rarr;
</a>

<!-- AFTER -->
<a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg">
  Proceed to Module 08: Integrity Audit & Video Leakage &rarr;
</a>
```

**Global Footer Navigation Links**:
```html
<!-- BEFORE -->
<li><a href="10-future-directions.html">Future Directions & Mamba</a></li>
<li><a href="08-failure-modes.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel-case-study.html">ChakraModel Case Study</a></li>

<!-- AFTER -->
<li><a href="10-future.html">Future Directions & Mamba</a></li>
<li><a href="08-benchmark-integrity.html">Integrity & Video Leakage Audit</a></li>
<li><a href="09-chakramodel.html">ChakraModel Case Study</a></li>
```


### 4.10 File: `pages/08-benchmark-integrity.html`

- **Total Issues Detected**: 0
- **Status**: 100% Compliant. No broken relative file links detected.
- **Harmonization Note**: Ensure Header Nav, Drawer, and Footer follow the unified naming scheme.


### 4.11 File: `pages/09-chakramodel.html`

- **Total Issues Detected**: 0
- **Status**: 100% Compliant. No broken relative file links detected.
- **Harmonization Note**: Ensure Header Nav, Drawer, and Footer follow the unified naming scheme.


### 4.12 File: `pages/10-future.html`

- **Total Issues Detected**: 0
- **Status**: 100% Compliant. No broken relative file links detected.
- **Harmonization Note**: Ensure Header Nav, Drawer, and Footer follow the unified naming scheme.


### 4.13 File: `pages/11-references.html`

- **Total Issues Detected**: 0
- **Status**: 100% Compliant. No broken relative file links detected.
- **Harmonization Note**: Ensure Header Nav, Drawer, and Footer follow the unified naming scheme.


### 4.14 File: `pages/12-glossary.html`

- **Total Issues Detected**: 26

| Item | Line | Section / Role | Current Verbatim Code | Replacement Canonical Code |
|:---:|:---:|:---|:---|:---|
| #1 | L160 | Alphabet Jump Button | <code><a href="#letter-A" class="letter-btn" data-letter="A">A</a></code> | Keep <code><a href="#letter-A" class="letter-btn" data-letter="A">A</a></code> & add <code>&lt;span id="letter-A"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #2 | L161 | Alphabet Jump Button | <code><a href="#letter-B" class="letter-btn" data-letter="B">B</a></code> | Keep <code><a href="#letter-B" class="letter-btn" data-letter="B">B</a></code> & add <code>&lt;span id="letter-B"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #3 | L162 | Alphabet Jump Button | <code><a href="#letter-C" class="letter-btn" data-letter="C">C</a></code> | Keep <code><a href="#letter-C" class="letter-btn" data-letter="C">C</a></code> & add <code>&lt;span id="letter-C"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #4 | L163 | Alphabet Jump Button | <code><a href="#letter-D" class="letter-btn" data-letter="D">D</a></code> | Keep <code><a href="#letter-D" class="letter-btn" data-letter="D">D</a></code> & add <code>&lt;span id="letter-D"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #5 | L164 | Alphabet Jump Button | <code><a href="#letter-E" class="letter-btn" data-letter="E">E</a></code> | Keep <code><a href="#letter-E" class="letter-btn" data-letter="E">E</a></code> & add <code>&lt;span id="letter-E"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #6 | L165 | Alphabet Jump Button | <code><a href="#letter-F" class="letter-btn" data-letter="F">F</a></code> | Keep <code><a href="#letter-F" class="letter-btn" data-letter="F">F</a></code> & add <code>&lt;span id="letter-F"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #7 | L166 | Alphabet Jump Button | <code><a href="#letter-G" class="letter-btn" data-letter="G">G</a></code> | Keep <code><a href="#letter-G" class="letter-btn" data-letter="G">G</a></code> & add <code>&lt;span id="letter-G"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #8 | L167 | Alphabet Jump Button | <code><a href="#letter-H" class="letter-btn disabled" data-letter="H">H</a></code> | Keep <code><a href="#letter-H" class="letter-btn disabled" data-letter="H">H</a></code> & add <code>&lt;span id="letter-H"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #9 | L168 | Alphabet Jump Button | <code><a href="#letter-I" class="letter-btn" data-letter="I">I</a></code> | Keep <code><a href="#letter-I" class="letter-btn" data-letter="I">I</a></code> & add <code>&lt;span id="letter-I"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #10 | L169 | Alphabet Jump Button | <code><a href="#letter-J" class="letter-btn disabled" data-letter="J">J</a></code> | Keep <code><a href="#letter-J" class="letter-btn disabled" data-letter="J">J</a></code> & add <code>&lt;span id="letter-J"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #11 | L170 | Alphabet Jump Button | <code><a href="#letter-K" class="letter-btn" data-letter="K">K</a></code> | Keep <code><a href="#letter-K" class="letter-btn" data-letter="K">K</a></code> & add <code>&lt;span id="letter-K"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #12 | L171 | Alphabet Jump Button | <code><a href="#letter-L" class="letter-btn disabled" data-letter="L">L</a></code> | Keep <code><a href="#letter-L" class="letter-btn disabled" data-letter="L">L</a></code> & add <code>&lt;span id="letter-L"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #13 | L172 | Alphabet Jump Button | <code><a href="#letter-M" class="letter-btn" data-letter="M">M</a></code> | Keep <code><a href="#letter-M" class="letter-btn" data-letter="M">M</a></code> & add <code>&lt;span id="letter-M"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #14 | L173 | Alphabet Jump Button | <code><a href="#letter-N" class="letter-btn" data-letter="N">N</a></code> | Keep <code><a href="#letter-N" class="letter-btn" data-letter="N">N</a></code> & add <code>&lt;span id="letter-N"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #15 | L174 | Alphabet Jump Button | <code><a href="#letter-O" class="letter-btn disabled" data-letter="O">O</a></code> | Keep <code><a href="#letter-O" class="letter-btn disabled" data-letter="O">O</a></code> & add <code>&lt;span id="letter-O"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #16 | L175 | Alphabet Jump Button | <code><a href="#letter-P" class="letter-btn" data-letter="P">P</a></code> | Keep <code><a href="#letter-P" class="letter-btn" data-letter="P">P</a></code> & add <code>&lt;span id="letter-P"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #17 | L176 | Alphabet Jump Button | <code><a href="#letter-Q" class="letter-btn disabled" data-letter="Q">Q</a></code> | Keep <code><a href="#letter-Q" class="letter-btn disabled" data-letter="Q">Q</a></code> & add <code>&lt;span id="letter-Q"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #18 | L177 | Alphabet Jump Button | <code><a href="#letter-R" class="letter-btn" data-letter="R">R</a></code> | Keep <code><a href="#letter-R" class="letter-btn" data-letter="R">R</a></code> & add <code>&lt;span id="letter-R"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #19 | L178 | Alphabet Jump Button | <code><a href="#letter-S" class="letter-btn" data-letter="S">S</a></code> | Keep <code><a href="#letter-S" class="letter-btn" data-letter="S">S</a></code> & add <code>&lt;span id="letter-S"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #20 | L179 | Alphabet Jump Button | <code><a href="#letter-T" class="letter-btn" data-letter="T">T</a></code> | Keep <code><a href="#letter-T" class="letter-btn" data-letter="T">T</a></code> & add <code>&lt;span id="letter-T"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #21 | L180 | Alphabet Jump Button | <code><a href="#letter-U" class="letter-btn" data-letter="U">U</a></code> | Keep <code><a href="#letter-U" class="letter-btn" data-letter="U">U</a></code> & add <code>&lt;span id="letter-U"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #22 | L181 | Alphabet Jump Button | <code><a href="#letter-V" class="letter-btn" data-letter="V">V</a></code> | Keep <code><a href="#letter-V" class="letter-btn" data-letter="V">V</a></code> & add <code>&lt;span id="letter-V"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #23 | L182 | Alphabet Jump Button | <code><a href="#letter-W" class="letter-btn" data-letter="W">W</a></code> | Keep <code><a href="#letter-W" class="letter-btn" data-letter="W">W</a></code> & add <code>&lt;span id="letter-W"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #24 | L183 | Alphabet Jump Button | <code><a href="#letter-X" class="letter-btn disabled" data-letter="X">X</a></code> | Keep <code><a href="#letter-X" class="letter-btn disabled" data-letter="X">X</a></code> & add <code>&lt;span id="letter-X"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #25 | L184 | Alphabet Jump Button | <code><a href="#letter-Y" class="letter-btn disabled" data-letter="Y">Y</a></code> | Keep <code><a href="#letter-Y" class="letter-btn disabled" data-letter="Y">Y</a></code> & add <code>&lt;span id="letter-Y"&gt;&lt;/span&gt;</code> anchor target in DOM |
| #26 | L185 | Alphabet Jump Button | <code><a href="#letter-Z" class="letter-btn disabled" data-letter="Z">Z</a></code> | Keep <code><a href="#letter-Z" class="letter-btn disabled" data-letter="Z">Z</a></code> & add <code>&lt;span id="letter-Z"&gt;&lt;/span&gt;</code> anchor target in DOM |

#### Verbatim Block Replacements for `pages/12-glossary.html`

**Alphabetical Jump Bar In-Page Anchors (Lines 160–185)**:
In `pages/12-glossary.html`, 26 jump buttons point to `href="#letter-A"` through `href="#letter-Z"`.
Currently, no elements with `id="letter-A"` .. `id="letter-Z"` exist in the DOM, causing 26 broken anchor violations.

**Remediation Solution**:
Insert semantic anchor points before each alphabetical group (or at the top of the glossary container) corresponding to each letter.
```html
<!-- Add anchor spans inside #glossary-items-container for active and disabled letters -->
<span id="letter-A" class="letter-target"></span>
<!-- Card ADR, APC, AMR, Alarm Fatigue -->

<span id="letter-B" class="letter-target"></span>
<!-- Card BBPS -->

<span id="letter-C" class="letter-target"></span>
<!-- Cards CIR, CNN, ClinicDB, ColonDB, CVC-300, Cross-Dataset Contamination -->

<span id="letter-D" class="letter-target"></span>
<!-- Cards Diminutive, DSC, Dual-Path, Deep Supervision -->

<span id="letter-E" class="letter-target"></span>
<!-- Cards E-measure, ETIS-Larib -->

<span id="letter-F" class="letter-target"></span>
<!-- Cards FAR, FPS -->

<span id="letter-G" class="letter-target"></span>
<!-- Card splits_v2 -->

<span id="letter-H" class="letter-target"></span>
<span id="letter-I" class="letter-target"></span>
<!-- Cards IoU, Latency, Inductive Bias, In-Sequence -->

<span id="letter-J" class="letter-target"></span>
<span id="letter-K" class="letter-target"></span>
<!-- Cards Kudo, Kvasir-SEG -->

<span id="letter-L" class="letter-target"></span>
<span id="letter-M" class="letter-target"></span>
<!-- Cards MAE, FPN -->

<span id="letter-N" class="letter-target"></span>
<!-- Card NICE -->

<span id="letter-O" class="letter-target"></span>
<span id="letter-P" class="letter-target"></span>
<!-- Cards PDR, Paris, VRAM, PVT, PPD, PolypGen, PICCOLO, Prompt Leakage -->

<span id="letter-Q" class="letter-target"></span>
<span id="letter-R" class="letter-target"></span>
<!-- Cards Resect and Discard, Reverse Attention, RFB -->

<span id="letter-S" class="letter-target"></span>
<!-- Cards SSL, S-measure, Swin, SSM/Mamba, SUN-SEG, SHA-256 -->

<span id="letter-T" class="letter-target"></span>
<!-- Card TTA -->

<span id="letter-U" class="letter-target"></span>
<span id="letter-V" class="letter-target"></span>
<!-- Cards ViT, Video Frame Leakage -->

<span id="letter-W" class="letter-target"></span>
<!-- Card Withdrawal Time -->

<span id="letter-X" class="letter-target"></span>
<span id="letter-Y" class="letter-target"></span>
<span id="letter-Z" class="letter-target"></span>
```

---

## 5. Corley et al. 2014 Deep-Link Harmonization

In `pages/01-what-is-colonoscopy.html`, line 488:
```html
<a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>
```

### Problem
In `pages/11-references.html`, there are 48 reference cards, but:
1. None of the cards contain `id` attributes (e.g. `id="ref-01"` or `id="ref-corley2014"`).
2. Corley et al. (*NEJM* 2014) is referenced in the search placeholder (line 198: `placeholder="...Corley..."`), but is not indexed as an independent numbered card.

### Dual-Compatible Resolution Options
- **Option 1 (Target Anchor in 11-references.html - Recommended)**:
  In `pages/11-references.html`, add a dedicated landmark anchor or card for Corley 2014 without disrupting the 48-card count (or wrap Section 1 header with `id="ref-corley2014"`):
  ```html
<div id="ref-corley2014" style="scroll-margin-top: 5rem;"></div>
```
  This guarantees that clicking the button scrolls directly to the Clinical Trials & Guidelines section.
- **Option 2 (Direct Page Link)**:
  In `pages/01-what-is-colonoscopy.html` line 488, replace:
  ```html
<a href="11-references.html" class="btn btn-outline btn-sm">Citation Details &rarr;</a>
```
  This immediately eliminates the missing anchor violation.

---

## 6. Automated Test Suite Remediation

### 6.1 Fixing `tests/validate_m3_pages.js` (Line 130)

#### Current Failing Assertion (Line 130):
```javascript
assert(indexContent.includes('04-architectures.html') && indexContent.includes('06-benchmarks.html') && indexContent.includes('08-failure-modes.html') && indexContent.includes('09-chakramodel-case-study.html'), 'index.html: Researcher path links to modules 04, 06, 08, 09');
```

#### Required Remediated Assertion:
```javascript
assert(indexContent.includes('04-architectures.html') && indexContent.includes('06-benchmarks.html') && indexContent.includes('08-benchmark-integrity.html') && indexContent.includes('09-chakramodel.html'), 'index.html: Researcher path links to modules 04, 06, 08, 09');
```

#### Verification Command:
```powershell
node tests/validate_m3_pages.js
```
Expected Result: **204 / 204 checks PASS (100%)**.

---

### 6.2 Hardening `tests/validate_m4_pages.js`

To prevent link regression and address Reviewer 2 Finding 3, add the following link existence validation loop to `tests/validate_m4_pages.js` after line 75:

```javascript
// 2.1 Verify that all relative internal links point to existing files
console.log("\n2.1 Verifying Internal Relative Link Targets...");
[
  { file: P3, name: '03-ai-history.html' },
  { file: P4, name: '04-architectures.html' },
  { file: P5, name: '05-datasets.html' },
  { file: P6, name: '06-benchmarks.html' }
].forEach(p => {
  const dir = path.dirname(p.file);
  const content = fs.readFileSync(p.file, 'utf8');
  const aRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi;
  let m;
  let pageBrokenLinks = [];
  while ((m = aRegex.exec(content)) !== null) {
    const href = m[1].trim();
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
    const [fPart] = href.split('#');
    const resolved = path.resolve(dir, fPart);
    if (!fs.existsSync(resolved)) {
      pageBrokenLinks.push(href);
    }
  }
  assert(pageBrokenLinks.length === 0, `${p.name}: All internal hyperlinks resolve to existing disk files (Broken: ${pageBrokenLinks.join(', ') || 'none'})`);
});
```

#### Verification Command:
```powershell
node tests/validate_m4_pages.js
```
Expected Result: **All checks PASS with zero missing disk files**.

---

## 7. Cross-Module Navigation Harmonization Matrix

To ensure flawless navigation coherence across all 14 files, all navigation menus must be harmonized into the standardized 3-domain structure:

### 7.1 Unified Mobile Drawer Hierarchy (All 14 Files)

```html
<div class="mobile-nav-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
  <!-- Group 1: Clinical Domain -->
  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-teal); letter-spacing: 0.08em; margin-bottom: 0.5rem;">Clinical Education</div>
  <a href="[PREFIX]index.html" class="nav-link">00. Home / Portal Overview</a>
  <a href="[PREFIX]01-what-is-colonoscopy.html" class="nav-link">01. What is Colonoscopy? Anatomy & Prep</a>
  <a href="[PREFIX]02-polyp-types.html" class="nav-link">02. Polyp Types & Morphology</a>
  <a href="[PREFIX]06b-clinical-evidence.html" class="nav-link">06b. Clinical Trials & Evidence</a>
  <a href="[PREFIX]07-clinical-systems.html" class="nav-link">07. Commercial CADe/CADx Systems</a>

  <!-- Group 2: AI & Technical Foundations -->
  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-purple); letter-spacing: 0.08em; margin: 1.25rem 0 0.5rem;">AI Engineering & Research</div>
  <a href="[PREFIX]03-ai-history.html" class="nav-link">03. History of AI in Colonoscopy</a>
  <a href="[PREFIX]04-architectures.html" class="nav-link">04. Deep Learning Architectures</a>
  <a href="[PREFIX]05-datasets.html" class="nav-link">05. Benchmark Datasets</a>
  <a href="[PREFIX]06-benchmarks.html" class="nav-link">06. SOTA Benchmarks & Leaderboards</a>
  <a href="[PREFIX]08-benchmark-integrity.html" class="nav-link">08. Benchmark Integrity Audit</a>
  <a href="[PREFIX]09-chakramodel.html" class="nav-link">09. ChakraModel Research Project</a>
  <a href="[PREFIX]10-future.html" class="nav-link">10. Future Directions & Foundation Models</a>

  <!-- Group 3: Knowledge Resources -->
  <div style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; color: var(--color-amber); letter-spacing: 0.08em; margin: 1.25rem 0 0.5rem;">Knowledge Resources</div>
  <a href="[PREFIX]11-references.html" class="nav-link">11. Scientific References (48 Papers)</a>
  <a href="[PREFIX]12-glossary.html" class="nav-link">12. Medical & Technical Glossary (50 Terms)</a>
</div>
```
*(Where `[PREFIX]` is `pages/` from `index.html`, and `` from inside `pages/` with `../index.html` for Home).*

### 7.2 Unified Sequential Call-to-Action (CTA) Flow

Readers traveling through the curriculum follow an unbroken, verified sequence:

```
[Clinical Track]    01-what-is-colonoscopy.html -> 02-polyp-types.html -> 06b-clinical-evidence.html -> 07-clinical-systems.html
                                                                                                              |
                                                                                                              v
[Convergence]                                                                                   08-benchmark-integrity.html
                                                                                                              ^
                                                                                                              |
[Technical Track]   03-ai-history.html -> 04-architectures.html -> 05-datasets.html -> 06-benchmarks.html -----+
                                                                                                              |
                                                                                                              v
[Synthesis Track]                                                                               09-chakramodel.html
                                                                                                              |
                                                                                                              v
                                                                                                10-future.html
                                                                                                              |
                                                                                                              v
                                                                                                11-references.html
                                                                                                              |
                                                                                                              v
                                                                                                12-glossary.html
                                                                                                              |
                                                                                                              v
                                                                                                index.html (Home)
```

---

## 8. Verification & Validation Protocol

Upon applying the 140 link replacements and anchor additions, execute the full test verification suite:

```powershell
# 1. Verify Milestone 3 Pages (Must PASS 204/204)
node tests/validate_m3_pages.js

# 2. Verify Milestone 4 Pages (Must PASS 113/113)
node tests/validate_m4_pages.js

# 3. Verify Milestone 5 Pages (Must PASS all checks)
node tests/validate_pages.js

# 4. Run Full Adversarial Link & Anchor Verification
node tests/adversarial_links_tooltips.test.js
```

### Invalidation Conditions:
1. Any relative link in an `<a href>` tag returns `fs.existsSync() === false`.
2. Any anchor link `#id` fails to resolve in the target document.
3. `tests/validate_m3_pages.js` fails due to outdated string assertions.
4. Total broken links count $> 0$.

