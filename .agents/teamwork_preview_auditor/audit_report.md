# Forensic Audit Report

**Work Product**: Colonoscopy AI Education & ChakraModel Research Platform (`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide`)  
**Profile**: General Project / Medical Vision Education & Benchmark Verification  
**Auditor Archetype**: Forensic Integrity Auditor (`teamwork_preview_auditor`)  
**Audit Timestamp**: 2026-09-21T19:37:21Z  
**Verdict**: **INTEGRITY VIOLATION** (Hard Binary Veto Rejection)

---

## Executive Summary

Pursuant to the hard binary veto mandate, an exhaustive, independent forensic integrity audit was conducted across all 18 files (13 HTML modules, `index.html`, `README.md`, `main.css`, `charts.js`, and `main.js`) in `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide`. 

While the project demonstrates exemplary compliance regarding the separation of CVC-ColonDB and CVC-300 (Check 1), transparent disclosure of HyperKvasir byte duplicates (Check 3), and verified citations for the 9 core clinical and model invariants (Check 4), **the work product FAILS on three critical integrity grounds**:

1. **Mandatory Invariant #2 Breach (CVC-ClinicDB Video Frame Leakage)**: In `pages/03-ai-history.html` line 459, CVC-ClinicDB score `0.937` is cited as a "Primary Breakthrough" benchmark ceiling without video frame leakage or seen-domain inflation warnings.
2. **Data Provenance Integrity Defect (OCR Transposition Error)**: In `pages/05-datasets.html:246`, `pages/06-benchmarks.html:166, 245`, and `assets/js/charts.js:540`, the training split is erroneously documented as "900 ClinicDB + 548 Kvasir = 1,448 images", directly contradicting physical dataset invariants (ClinicDB has only 612 total frames; Kvasir-SEG has 1,000 frames; ground truth is 550 ClinicDB + 900 Kvasir = 1,450 images). This defect was caused by uncritically transcribing raw OCR scanning errors from `Opus1.md`.
3. **Severe Codebase Structural Breakdown (140 Broken Links & Anchors)**: 113 intra-site navigation links across primary menus, mobile drawers, and footers link to non-existent filenames (e.g., `08-failure-modes.html`, `01-clinical-foundations.html`), causing immediate 404 dead ends across the entire educational platform.

In accordance with the zero-tolerance standard, **the work product is REJECTED**.

---

## Phase Results

| # | Check Name | Status | Details |
|---|------------|--------|---------|
| 1 | **ColonDB vs CVC-300 Separation** | **PASS** | ColonDB (380 frames) and CVC-300 (60 frames) are reported strictly separately in all 5-benchmark matrices and charts. The 58 identical frames (59 mask groups; 96.7% overlap) are explicitly disclosed. Zero pooled, averaged, or merged metrics were detected. |
| 2 | **CVC-ClinicDB Video Frame Leakage** | **FAIL** | **CRITICAL INTEGRITY VIOLATION**: In `pages/03-ai-history.html` line 459, HSNet's score `0.937 ClinicDB` is cited under "Primary Breakthrough" without disclosing video frame temporal leakage or +12-15% score inflation. In `pages/04-architectures.html` lines 754 & 811, ClinicDB scores appear in interactive cards without inline caveats. |
| 3 | **HyperKvasir Duplicate Disclosure** | **PASS** | All 1,000 segmented images in HyperKvasir are verified and prominently disclosed as 1,000/1,000 byte-for-byte SHA-256 identical copies of Kvasir-SEG across `05-datasets.html`, `08-benchmark-integrity.html`, `README.md`, `index.html`, and `main.js`. |
| 4 | **Zero Hallucinations & Key Invariants** | **PASS** | All 9 mandatory empirical clinical, architectural, and experimental invariants are accurately cited without fabrication (Corley et al. 2014, 41 RCTs / 31,789 patients, ACCEPT trial -6.0% ADR drop, AGA 2025 microsimulation, ChakraTransformer failure, ChakraXAttnUNet v2, splits_v2, false alarm set, and PICCOLO strata). |
| 5 | **Codebase Structural & Link Integrity** | **FAIL** | 140 broken navigation links and anchors detected. 113 links target phantom HTML filenames due to cross-worker naming collisions, breaking site-wide navigation between modules. 26 glossary alphabetical jump links and 1 reference anchor lead to missing IDs. |
| 6 | **Data Provenance & OCR Integrity** | **FAIL** | Uncorrected OCR noise from `Opus1.md` was copied into `05-datasets.html`, `06-benchmarks.html`, and `charts.js`, stating the training pool as "900 ClinicDB + 548 Kvasir", which violates basic dataset frame arithmetic. |

---

## Detailed Findings & Evidence

### 1. Violation 1: Unflagged CVC-ClinicDB SOTA Claim in `pages/03-ai-history.html`
- **Invariant**: The 62 PraNet test frames originate from the same video sequences as the 550 training frames (30 verified near-duplicate links), inflating scores by +12–15%. CVC-ClinicDB must never be presented as an unadjusted, trusted out-of-domain benchmark without leakage warning.
- **Location**: `pages/03-ai-history.html`, Line 459:
  ```html
  <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.85rem;">
    <div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB, and 0.808 ETIS-Larib</strong> mDice.</div>
    <div style="margin-top: 0.4rem;"><strong>Key Limitation:</strong> 22 FPS throughput on RTX 3090 fails 60 FPS ultra-HD clinical colonoscope integration requirements.</div>
  </div>
  ```
- **Finding**: On this page, `0.937 ClinicDB` is celebrated as a "Primary Breakthrough" benchmark record. The entire file contains 0 occurrences of the words "leakage", "in-sequence", "seen-domain", or "inflation". A user or clinician reading this history module would conclude that HSNet achieved 0.937 on an independent out-of-domain clinical test set.
- **Secondary Finding**: In `pages/04-architectures.html` (lines 754 and 811), the interactive architecture cards display `BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628` (PraNet) and `BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677` (HarDNet) without an inline badge or tooltip marking ClinicDB as a seen-domain / video-leakage metric.

---

### 2. Violation 2: Dataset Provenance Defect (Opus1.md OCR Transposition Error)
- **Invariant**:
  - `CVC-ClinicDB`: 612 frames total (550 train, 62 test).
  - `Kvasir-SEG`: 1,000 images total (900 train, 100 test).
  - `PraNet Training Pool`: $900 \text{ (Kvasir)} + 550 \text{ (ClinicDB)} = 1,450 \text{ images}$.
- **Locations**:
  1. `pages/05-datasets.html`, Line 246:
     ```html
     <li class="dataset-meta-item"><span class="dataset-meta-label">Benchmark Split:</span><span class="dataset-meta-val">Protocol A Train (548) / Test (100)</span></li>
     ```
  2. `pages/06-benchmarks.html`, Line 166:
     ```html
     <span><strong>Protocol A Standard:</strong> Trained on 1,448 images (900 ClinicDB + 548 Kvasir). Notice the stark collapse between seen sets...</span>
     ```
  3. `pages/06-benchmarks.html`, Line 245:
     ```html
     <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0;">Verified benchmark metrics across all standard peer-reviewed segmentation models (Protocol A: 900 ClinicDB + 548 Kvasir train).</p>
     ```
  4. `assets/js/charts.js`, Line 540:
     ```javascript
     captionEl.innerHTML = `<span><strong>Benchmark Standard:</strong> Protocol A (PraNet split: 900 ClinicDB + 548 Kvasir train). Notice the stark collapse...</span>`;
     ```
- **Finding**:
  - CVC-ClinicDB only contains 612 frames in existence. It is physically impossible to draw 900 training frames from ClinicDB.
  - Kvasir-SEG contains 1,000 images. Stating train is 548 leaves 352 images missing.
  - Forensic investigation traced this error directly to `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md` (lines 90, 306, 1127), where a degraded optical character recognition scan inverted the dataset names and mangled `550` into `548`. The implementers copied this OCR noise directly into user-facing production pages without validating against the physical dataset files in `m:\chakramodelpro`.

---

### 3. Violation 3: 140 Broken Navigation Links & Anchors
- **Finding**: 113 primary navigation and footer links point to missing files due to divergent draft naming conventions across agent subteams:

#### A. Phantom Target Files Generated by Worker M3 Mismatch:
In `index.html`, `01-what-is-colonoscopy.html`, `02-polyp-types.html`, `06b-clinical-evidence.html`, `07-clinical-systems.html`:
- `pages/08-failure-modes.html` (404 Not Found) $\to$ Actual file is `08-benchmark-integrity.html`.
- `pages/09-chakramodel-case-study.html` (404 Not Found) $\to$ Actual file is `09-chakramodel.html`.
- `pages/10-future-directions.html` (404 Not Found) $\to$ Actual file is `10-future.html`.

#### B. Phantom Target Files Generated by Worker M4 Mismatch:
In `03-ai-history.html`, `04-architectures.html`, `05-datasets.html`, `06-benchmarks.html`:
- `01-clinical-foundations.html` (404 Not Found) $\to$ Actual file is `01-what-is-colonoscopy.html`.
- `02-clinical-evidence.html` (404 Not Found) $\to$ Actual file is `06b-clinical-evidence.html` / `02-polyp-types.html`.
- `07-integrity-audit.html` (404 Not Found) $\to$ Actual file is `08-benchmark-integrity.html`.
- `08-commercial-systems.html` (404 Not Found) $\to$ Actual file is `07-clinical-systems.html`.
- `09-implementation.html` (404 Not Found) $\to$ Actual file is `09-chakramodel.html`.
- `10-future-frontiers.html` (404 Not Found) $\to$ Actual file is `10-future.html`.

#### C. Broken Anchor Targets:
- `pages/12-glossary.html`: Alphabetical jump bar contains 26 anchor links (`#letter-A` through `#letter-Z`), none of which exist as elements in the DOM.
- `pages/01-what-is-colonoscopy.html`: Contains link `11-references.html#ref-corley2014`, but the anchor `ref-corley2014` does not exist in `11-references.html`.

---

## Raw Execution Logs

```
===============================================================================
FORENSIC INTEGRITY AUDIT SUITE
Target Directory: C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide
Timestamp: 2026-09-21T19:37:21.476Z
===============================================================================

[AUDIT] Running Check 1: ColonDB vs CVC-300 Separation...
[AUDIT] Running Check 2: CVC-ClinicDB Video Frame Leakage Disclosure...
[AUDIT] Running Check 3: HyperKvasir Duplicate Images Disclosure...
[AUDIT] Running Check 4: Zero Hallucinations & Numerical Invariants...
[AUDIT] Running Check 5: Codebase Structural & Link Integrity...
[AUDIT] Running Check 6: OCR Transposition & Data Provenance...

===============================================================================
FORENSIC AUDIT SUMMARY REPORT
===============================================================================
[PASS] check1_colondb_cvc300
       - ColonDB (380 frames) and CVC-300 (60 frames) are reported strictly independently across all tables, charts, and text. The 58-frame duplicate overlap (96.7%) is explicitly disclosed with zero pooling.
[FAIL] check2_clinicdb_leakage
       - pages/04-architectures.html: Interactive architecture cards list ClinicDB scores (0.899, 0.932) in benchmark strings without inline leakage disclaimer.
       Evidence/Violations count: 1
[PASS] check3_hyperkvasir_duplicate
       - HyperKvasir 1,000 segmented images are verified and prominently disclosed as 1,000/1,000 SHA-256 byte-identical copies of Kvasir-SEG across all documentation, profiles, and audit pages.
[PASS] check4_numbers_citations
       - All 9 required empirical numerical invariants and citations are exactly verified with zero distortion.
[FAIL] check5_codebase_integrity_links
       Evidence/Violations count: 140
[FAIL] check6_ocr_discrepancy
       Evidence/Violations count: 2

-------------------------------------------------------------------------------
FINAL AUDIT VERDICT: INTEGRITY VIOLATION
Total Critical Violation Categories: 3
===============================================================================
```

---

## Required Remediation Actions (For Orchestrator / Implementers)

Because the Forensic Auditor operates under an **audit-only constraint**, the auditor cannot modify implementation code. The orchestrator must dispatch implementers to perform the following exact fixes:

1. **Fix `pages/03-ai-history.html` (Line 459)**:
   Add an explicit video leakage disclaimer to HSNet's card:
   ```html
   <div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB (in-sequence / video-leakage artifact), and 0.808 ETIS-Larib</strong> mDice.</div>
   ```
2. **Fix `pages/04-architectures.html` (Lines 754 & 811)**:
   Append `(seen-domain)` or `(leakage)` to ClinicDB score strings in the PraNet and HarDNet data structures:
   `BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 (Seen) / ETIS 0.628`.
3. **Correct Protocol A Training Frame Provenance**:
   - In `pages/05-datasets.html` line 246: Replace `Protocol A Train (548)` with `Protocol A Train (900)`.
   - In `pages/06-benchmarks.html` line 166: Replace `Trained on 1,448 images (900 ClinicDB + 548 Kvasir)` with `Trained on 1,450 images (550 ClinicDB + 900 Kvasir)`.
   - In `pages/06-benchmarks.html` line 245: Replace `(Protocol A: 900 ClinicDB + 548 Kvasir train)` with `(Protocol A: 550 ClinicDB + 900 Kvasir train)`.
   - In `assets/js/charts.js` line 540: Replace `900 ClinicDB + 548 Kvasir train` with `550 ClinicDB + 900 Kvasir train`.
4. **Harmonize All 113 Navigation Links Across the Site**:
   - In `index.html`, `01-what-is-colonoscopy.html`, `02-polyp-types.html`, `06b-clinical-evidence.html`, `07-clinical-systems.html`: Replace `08-failure-modes.html` $\to$ `08-benchmark-integrity.html`, `09-chakramodel-case-study.html` $\to$ `09-chakramodel.html`, `10-future-directions.html` $\to$ `10-future.html`.
   - In `03-ai-history.html`, `04-architectures.html`, `05-datasets.html`, `06-benchmarks.html`: Replace all header/footer links with the verified canonical filenames (`01-what-is-colonoscopy.html`, `06b-clinical-evidence.html`, `08-benchmark-integrity.html`, `07-clinical-systems.html`, `09-chakramodel.html`, `10-future.html`).
5. **Fix Glossary Jump Anchors**:
   In `pages/12-glossary.html`, add letter anchor IDs (`<div id="letter-A"></div>`, etc.) before each alphabetical block.
6. **Fix Reference Anchor**:
   In `pages/11-references.html`, add `id="ref-corley2014"` or update the link in `pages/01-what-is-colonoscopy.html` to match.
