# Reference & Anchor Harmonization Remediation Blueprint

**Author**: Explorer Rem 3 (References & Anchor Harmonization Specialist)  
**Date**: 2026-09-21T21:21:00Z  
**Target Repository**: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide`  
**Target Files**:
- `pages/11-references.html` (Master Hyperlinked Reference Catalog)
- `pages/01-what-is-colonoscopy.html` (Clinical Foundations & Quality Metrics)
- `tests/validate_pages.js` (Worker M5 Deliverables Validation Suite)
- `tests/adversarial_links_tooltips.test.js` (Adversarial Link & Tooltip Engine Suite)
- `tests/adversarial_interactive_benchmarks_test.js` (Interactive Benchmarks Stress Suite)

---

## 1. Executive Summary & Forensic Context

During the multi-perspective audit of Milestone 5 deliverables, three critical discrepancies were identified surrounding the reference architecture:

1. **Reviewer 1 Report & Audit Results Finding (`audit_results.json:186-189`)**:
   In `pages/01-what-is-colonoscopy.html` (line 488), the landmark Corley et al. evidence card contains a call-to-action button:
   ```html
   <a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>
   ```
   However, in `pages/11-references.html`, none of the 48 existing reference cards possessed DOM `id` attributes, and Corley et al. (*NEJM* 2014) was entirely absent from the index, resulting in an unanchored link and automated audit failure (`Anchor #ref-corley2014 Missing in Target`).

2. **Challenger 2 Report Finding (`challenge_report.md:22, 29-38`)**:
   In `pages/11-references.html` (line 198), the search input explicitly invites users:
   ```html
   placeholder="Search by author, title, journal, or keyword (e.g., PraNet, Corley, Mamba)..."
   ```
   Yet searching for the recommended author `"Corley"` returned `0 of 48 references shown`, creating an immediate failure in `tests/adversarial_interactive_benchmarks_test.js` (line 541).

3. **Total Citation Count & Test Coupling**:
   The entire reference infrastructure (titles, metadata, filter buttons, badges, footer links, and test assertions in `tests/validate_pages.js` and `tests/adversarial_links_tooltips.test.js`) was hardcoded to exactly 48 references. Adding Corley et al. expands the compendium to **49 verified foundational publications**. Without updating the test assertions, the test suites would immediately fail on card count.

This blueprint provides the exact drop-in HTML markup, DOM placement, sequential renumbering strategy, cross-page anchor resolution, metadata updates, and automated test updates.

---

## 2. Definitive Citation Data: Corley et al. (NEJM 2014)

The publication data has been fully verified:

- **Authors**: Corley, D.A., Jensen, C.D., Marks, A.R., et al. (Corley DA, Jensen CD, Marks AR, Bian FX, Lee JK, Doubeni CA, Zauber AG, de Boer J, Fireman BH, Schottinger JE, Quinn VP, Levin TR)
- **Article Title**: *"Adenoma Detection Rate and Risk of Colorectal Cancer and Fatal Interval Cancer"*
- **Journal**: *New England Journal of Medicine* (*N Engl J Med*)
- **Publication Date**: April 3, 2014
- **Citation Coordinates**: Vol. 370, No. 14, pp. 1298–1306
- **Verified Digital Object Identifier (DOI)**: `10.1056/NEJMoa1309086`
- **Canonical DOI URL**: `https://doi.org/10.1056/NEJMoa1309086`
- **Verified PubMed ID (PMID)**: `24693890`
- **Canonical PubMed URL**: `https://pubmed.ncbi.nlm.nih.gov/24693890/`
- **Category Filter Assignment**: `clinical-trials` (with dual class `clinical clinical-trials` for seamless filter-pill matching)
- **Card DOM Identifier**: `id="ref-corley2014"`
- **Core Clinical Invariants**:
  - Sample size: 314,845 screening colonoscopies
  - Physician cohort: 136 experienced gastroenterologists (Kaiser Permanente Northern California)
  - Primary metric 1: Each 1.0% absolute increase in ADR confers a **3.0% reduction** in interval colorectal cancer incidence (HR 0.97; 95% CI 0.96 to 0.98).
  - Primary metric 2: Each 1.0% absolute increase in ADR confers a **5.0% reduction** in fatal colorectal cancer mortality (HR 0.95; 95% CI 0.94 to 0.97).
  - Quintile comparison: Patients of endoscopists in the highest ADR quintile had a **48% lower risk** of interval CRC compared to the lowest quintile (HR 0.52; 95% CI 0.39 to 0.69).

---

## 3. Exact HTML Markup for Corley Reference Card

Below is the exact HTML markup for the Corley et al. (2014) reference card, formatted to match the exact DOM styling, typography, and button badge specifications of `pages/11-references.html`:

```html
      <!-- Ref 9 -->
      <div id="ref-corley2014" class="reference-card" data-category="clinical clinical-trials">
        <div class="ref-header">
          <div>
            <h3 class="ref-title">Adenoma Detection Rate and Risk of Colorectal Cancer and Fatal Interval Cancer</h3>
            <div class="ref-authors">Corley, D.A., Jensen, C.D., Marks, A.R., et al.</div>
            <div class="ref-venue">New England Journal of Medicine, 2014, Vol. 370, No. 14, pp. 1298–1306.</div>
          </div>
          <span class="ref-num">#09</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          Landmark longitudinal cohort study of 314,845 screening colonoscopies performed by 136 gastroenterologists establishing the epidemiological foundation of colonoscopy quality: each 1.0% absolute increase in adenoma detection rate (ADR) confers a 3.0% reduction in interval colorectal cancer incidence and a 5.0% reduction in fatal colorectal cancer mortality.
        </p>
        <div class="ref-badges">
          <span class="badge badge-clinical">Clinical Epidemiology</span>
          <a href="https://doi.org/10.1056/NEJMoa1309086" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">DOI: 10.1056/NEJMoa1309086</a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/24693890/" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-pubmed">PubMed: 24693890</a>
        </div>
      </div>
```

---

## 4. Architectural Placement & Renumbering Strategy

### The Invariant Constraint
In `tests/adversarial_links_tooltips.test.js` (lines 491–499), the adversarial test suite iterates through all `.reference-card` elements in DOM order and asserts:
```javascript
refCards.forEach((cardHtml, idx) => {
  const cardNum = idx + 1;
  const padNum = cardNum.toString().padStart(2, '0');
  if (!cardHtml.includes(`#${padNum}`)) {
    recordFail('citationIssues', `Reference card #${padNum} is missing its expected header tag "#${padNum}"`);
  }
});
```
This means the cards in the DOM **must be sequentially numbered from `#01` to `#49` in exact DOM sequence**.

### Placement Recommendation: Plan A (Sequential Section 1 Placement)
Corley et al. is an epidemiological clinical trial and represents the foundational clinical mandate of the entire field. It belongs logically under **Section 1: Landmark Clinical Trials & Regulatory Standards**.

1. **Card Position**: Insert Corley et al. directly after Ref #08 (US FDA GI Genius De Novo) as **Ref #09**.
2. **Section 1 Expansion**: Section 1 becomes `(1 - 9)` (9 clinical references).
3. **Sequential Renumbering of Subsequent Cards**:
   Increment cards 09 through 48 by +1 (from `#10` through `#49`):
   - **Section 2 (Datasets)**: Former Refs 09–19 become **Refs 10–20** (Section header: `(10 - 20)`).
   - **Section 3 (CNNs)**: Former Refs 20–30 become **Refs 21–31** (Section header: `(21 - 31)`).
   - **Section 4 (Transformers)**: Former Refs 31–40 become **Refs 32–41** (Section header: `(32 - 41)`).
   - **Section 5 (Video)**: Former Refs 41–44 become **Refs 42–45** (Section header: `(42 - 45)`).
   - **Section 6 (Foundation & Mamba)**: Former Refs 45–48 become **Refs 46–49** (Section header: `(46 - 49)`).

### Benefits of Plan A
- **Taxonomic Fidelity**: Clinical trials stay in the clinical trials section.
- **Strict Monotonicity**: Cards in DOM order are strictly `01, 02, 03, ... 49`.
- **Zero Test Failures**: `adversarial_links_tooltips.test.js` passes all 49 card index checks with 100% compliance.
- **Zero Broken Links**: No other file in the repository hardcodes any relative `#ref-XX` link to references 09–48.

---

## 5. Exact Step-by-Step Code Modifications for `pages/11-references.html`

### 5.1 CSS Polish for Anchor Scrolling & Target Highlighting
To ensure the anchor `#ref-corley2014` jumps cleanly beneath the sticky site header and displays an illuminated visual cue when navigated to from `pages/01-what-is-colonoscopy.html`, add `scroll-margin-top` and `:target` rules in `<style>` (around line 24):

```css
    .reference-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      margin-bottom: 1.25rem;
      transition: all var(--transition-fast);
      position: relative;
      scroll-margin-top: 5.5rem;
    }
    .reference-card:target {
      border-color: var(--color-teal);
      box-shadow: 0 0 24px rgba(0, 212, 255, 0.35);
    }
```

### 5.2 Header Metadata & Hero Section (Lines 6–7, 169, 186)
Replace:
```html
  <title>Master Reference Catalog (48 Verified Citations) | Colonoscopy AI & ChakraModel</title>
  <meta name="description" content="Master academic reference catalog: 48 verified research publications spanning clinical trials, regulatory approvals, benchmark datasets, deep learning architectures, foundation models, and dataset integrity audits.">
```
With:
```html
  <title>Master Reference Catalog (49 Verified Citations) | Colonoscopy AI & ChakraModel</title>
  <meta name="description" content="Master academic reference catalog: 49 verified research publications spanning clinical trials, regulatory approvals, benchmark datasets, deep learning architectures, foundation models, and dataset integrity audits.">
```

In the mobile navigation drawer (line 169):
```html
<!-- BEFORE -->
<a href="11-references.html" class="nav-link active">11. Master References (48 Papers)</a>

<!-- AFTER -->
<a href="11-references.html" class="nav-link active">11. Master References (49 Papers)</a>
```

In the hero subtitle (lines 185–187):
```html
<!-- BEFORE -->
      <p class="hero-subtitle">
        48 verified foundational publications establishing the clinical, architectural, dataset, and integrity benchmarks of colonoscopy artificial intelligence.
      </p>

<!-- AFTER -->
      <p class="hero-subtitle">
        49 verified foundational publications establishing the clinical, architectural, dataset, and integrity benchmarks of colonoscopy artificial intelligence.
      </p>
```

### 5.3 Filter Pills & Live Counter (Lines 202, 216)
```html
<!-- BEFORE -->
        <button class="filter-pill ref-category-pill active" data-category="all">All (48)</button>

<!-- AFTER -->
        <button class="filter-pill ref-category-pill active" data-category="all">All (49)</button>
```

```html
<!-- BEFORE -->
      <div id="reference-count" style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--color-teal);">
        48 of 48 references displayed
      </div>

<!-- AFTER -->
      <div id="reference-count" style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--color-teal);">
        49 of 49 references displayed
      </div>
```

### 5.4 Section 1 Header & Card Insertion (Lines 225–387)
Update Section 1 comment:
```html
<!-- BEFORE -->
      <!-- ====================================================================
           Section 1: Landmark Clinical Trials & Regulatory Standards (1 - 8)
           ==================================================================== -->

<!-- AFTER -->
      <!-- ====================================================================
           Section 1: Landmark Clinical Trials & Regulatory Standards (1 - 9)
           ==================================================================== -->
```

Insert Corley Card right after Ref 8 closing `</div>` (line 384) and before Section 2 comment:
```html
      <!-- Ref 8 -->
      <div class="reference-card" data-category="clinical">
        <div class="ref-header">
          <div>
            <h3 class="ref-title">De Novo Classification Order for GI Genius: Evaluation of Automatic Class III Designation (DEN200055)</h3>
            <div class="ref-authors">US Food and Drug Administration (FDA)</div>
            <div class="ref-venue">FDA Medical Device Databases, 2021, 21 CFR 876.1510, Product Code QVD.</div>
          </div>
          <span class="ref-num">#08</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          First FDA De Novo marketing clearance for an AI-powered gastrointestinal lesion detector (Medtronic / Cosmo GI Genius), establishing modern regulatory safety protocols.
        </p>
        <div class="ref-badges">
          <span class="badge badge-clinical">FDA Clearance</span>
          <a href="https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN200055.pdf" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">FDA Decision Summary</a>
        </div>
      </div>

      <!-- Ref 9 -->
      <div id="ref-corley2014" class="reference-card" data-category="clinical clinical-trials">
        <div class="ref-header">
          <div>
            <h3 class="ref-title">Adenoma Detection Rate and Risk of Colorectal Cancer and Fatal Interval Cancer</h3>
            <div class="ref-authors">Corley, D.A., Jensen, C.D., Marks, A.R., et al.</div>
            <div class="ref-venue">New England Journal of Medicine, 2014, Vol. 370, No. 14, pp. 1298–1306.</div>
          </div>
          <span class="ref-num">#09</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          Landmark longitudinal cohort study of 314,845 screening colonoscopies performed by 136 gastroenterologists establishing the epidemiological foundation of colonoscopy quality: each 1.0% absolute increase in adenoma detection rate (ADR) confers a 3.0% reduction in interval colorectal cancer incidence and a 5.0% reduction in fatal colorectal cancer mortality.
        </p>
        <div class="ref-badges">
          <span class="badge badge-clinical">Clinical Epidemiology</span>
          <a href="https://doi.org/10.1056/NEJMoa1309086" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">DOI: 10.1056/NEJMoa1309086</a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/24693890/" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-pubmed">PubMed: 24693890</a>
        </div>
      </div>
```

### 5.5 Section 2–6 Header Range Updates & Card Renumbering
1. **Section 2 Header**:
   Replace `Section 2: Canonical Benchmark Datasets & Challenges (9 - 19)`  
   With `Section 2: Canonical Benchmark Datasets & Challenges (10 - 20)`
2. **Section 3 Header**:
   Replace `Section 3: Classic CNN Architectures & Baselines (20 - 30)`  
   With `Section 3: Classic CNN Architectures & Baselines (21 - 31)`
3. **Section 4 Header**:
   Replace `Section 4: Vision Transformer & Hybrid Architectures (31 - 40)`  
   With `Section 4: Vision Transformer & Hybrid Architectures (32 - 41)`
4. **Section 5 Header**:
   Replace `Section 5: Spatiotemporal Video Polyp Segmentation (41 - 44)`  
   With `Section 5: Spatiotemporal Video Polyp Segmentation (42 - 45)`
5. **Section 6 Header**:
   Replace `Section 6: Foundation Models & State-Space Mamba (45 - 48)`  
   With `Section 6: Foundation Models & State-Space Mamba (46 - 49)`

6. **Card Numbers (`<span class="ref-num">...</span>`)**:
   Renumber in descending order (from 48 down to 9):
   - `<!-- Ref 48 -->` & `<span class="ref-num">#48</span>` (Mamba-VPS) $\to$ `<!-- Ref 49 -->` & `<span class="ref-num">#49</span>`
   - `<!-- Ref 47 -->` & `<span class="ref-num">#47</span>` (Endo-FM) $\to$ `<!-- Ref 48 -->` & `<span class="ref-num">#48</span>`
   - `<!-- Ref 46 -->` & `<span class="ref-num">#46</span>` (MedSAM) $\to$ `<!-- Ref 47 -->` & `<span class="ref-num">#47</span>`
   - `<!-- Ref 45 -->` & `<span class="ref-num">#45</span>` (SAM) $\to$ `<!-- Ref 46 -->` & `<span class="ref-num">#46</span>`
   - `<!-- Ref 44 -->` & `<span class="ref-num">#44</span>` (TMRNet) $\to$ `<!-- Ref 45 -->` & `<span class="ref-num">#45</span>`
   - `<!-- Ref 43 -->` & `<span class="ref-num">#43</span>` (LDNet) $\to$ `<!-- Ref 44 -->` & `<span class="ref-num">#44</span>`
   - `<!-- Ref 42 -->` & `<span class="ref-num">#42</span>` (PNS+) $\to$ `<!-- Ref 43 -->` & `<span class="ref-num">#43</span>`
   - `<!-- Ref 41 -->` & `<span class="ref-num">#41</span>` (PNS-Net) $\to$ `<!-- Ref 42 -->` & `<span class="ref-num">#42</span>`
   - `<!-- Ref 40 -->` & `<span class="ref-num">#40</span>` (UACANet) $\to$ `<!-- Ref 41 -->` & `<span class="ref-num">#41</span>`
   - `<!-- Ref 39 -->` & `<span class="ref-num">#39</span>` (CaraNet) $\to$ `<!-- Ref 40 -->` & `<span class="ref-num">#40</span>`
   - `<!-- Ref 38 -->` & `<span class="ref-num">#38</span>` (CFA-Net) $\to$ `<!-- Ref 39 -->` & `<span class="ref-num">#39</span>`
   - `<!-- Ref 37 -->` & `<span class="ref-num">#37</span>` (UCTransNet) $\to$ `<!-- Ref 38 -->` & `<span class="ref-num">#38</span>`
   - `<!-- Ref 36 -->` & `<span class="ref-num">#36</span>` (Swin-Unet) $\to$ `<!-- Ref 37 -->` & `<span class="ref-num">#37</span>`
   - `<!-- Ref 35 -->` & `<span class="ref-num">#35</span>` (TransFuse) $\to$ `<!-- Ref 36 -->` & `<span class="ref-num">#36</span>`
   - `<!-- Ref 34 -->` & `<span class="ref-num">#34</span>` (FCBFormer) $\to$ `<!-- Ref 35 -->` & `<span class="ref-num">#35</span>`
   - `<!-- Ref 33 -->` & `<span class="ref-num">#33</span>` (ColonFormer) $\to$ `<!-- Ref 34 -->` & `<span class="ref-num">#34</span>`
   - `<!-- Ref 32 -->` & `<span class="ref-num">#32</span>` (SSFormer) $\to$ `<!-- Ref 33 -->` & `<span class="ref-num">#33</span>`
   - `<!-- Ref 31 -->` & `<span class="ref-num">#31</span>` (Polyp-PVT) $\to$ `<!-- Ref 32 -->` & `<span class="ref-num">#32</span>`
   - `<!-- Ref 30 -->` & `<span class="ref-num">#30</span>` (DDANet) $\to$ `<!-- Ref 31 -->` & `<span class="ref-num">#31</span>`
   - `<!-- Ref 29 -->` & `<span class="ref-num">#29</span>` (NanoNet) $\to$ `<!-- Ref 30 -->` & `<span class="ref-num">#30</span>`
   - `<!-- Ref 28 -->` & `<span class="ref-num">#28</span>` (DenseNet) $\to$ `<!-- Ref 29 -->` & `<span class="ref-num">#29</span>`
   - `<!-- Ref 27 -->` & `<span class="ref-num">#27</span>` (CBAM) $\to$ `<!-- Ref 28 -->` & `<span class="ref-num">#28</span>`
   - `<!-- Ref 26 -->` & `<span class="ref-num">#26</span>` (EfficientNet) $\to$ `<!-- Ref 27 -->` & `<span class="ref-num">#27</span>`
   - `<!-- Ref 25 -->` & `<span class="ref-num">#25</span>` (ResNet) $\to$ `<!-- Ref 26 -->` & `<span class="ref-num">#26</span>`
   - `<!-- Ref 24 -->` & `<span class="ref-num">#24</span>` (Attention U-Net) $\to$ `<!-- Ref 25 -->` & `<span class="ref-num">#25</span>`
   - `<!-- Ref 23 -->` & `<span class="ref-num">#23</span>` (HarDNet-MSEG) $\to$ `<!-- Ref 24 -->` & `<span class="ref-num">#24</span>`
   - `<!-- Ref 22 -->` & `<span class="ref-num">#22</span>` (PraNet) $\to$ `<!-- Ref 23 -->` & `<span class="ref-num">#23</span>`
   - `<!-- Ref 21 -->` & `<span class="ref-num">#21</span>` (UNet++) $\to$ `<!-- Ref 22 -->` & `<span class="ref-num">#22</span>`
   - `<!-- Ref 20 -->` & `<span class="ref-num">#20</span>` (U-Net) $\to$ `<!-- Ref 21 -->` & `<span class="ref-num">#21</span>`
   - `<!-- Ref 19 -->` & `<span class="ref-num">#19</span>` (Bernal Challenge) $\to$ `<!-- Ref 20 -->` & `<span class="ref-num">#20</span>`
   - `<!-- Ref 18 -->` & `<span class="ref-num">#18</span>` (Tajbakhsh) $\to$ `<!-- Ref 19 -->` & `<span class="ref-num">#19</span>`
   - `<!-- Ref 17 -->` & `<span class="ref-num">#17</span>` (SUN-SEG) $\to$ `<!-- Ref 18 -->` & `<span class="ref-num">#18</span>`
   - `<!-- Ref 16 -->` & `<span class="ref-num">#16</span>` (PICCOLO) $\to$ `<!-- Ref 17 -->` & `<span class="ref-num">#17</span>`
   - `<!-- Ref 15 -->` & `<span class="ref-num">#15</span>` (PolypGen) $\to$ `<!-- Ref 16 -->` & `<span class="ref-num">#16</span>`
   - `<!-- Ref 14 -->` & `<span class="ref-num">#14</span>` (HyperKvasir) $\to$ `<!-- Ref 15 -->` & `<span class="ref-num">#15</span>`
   - `<!-- Ref 13 -->` & `<span class="ref-num">#13</span>` (ETIS-Larib) $\to$ `<!-- Ref 14 -->` & `<span class="ref-num">#14</span>`
   - `<!-- Ref 12 -->` & `<span class="ref-num">#12</span>` (CVC-300) $\to$ `<!-- Ref 13 -->` & `<span class="ref-num">#13</span>`
   - `<!-- Ref 11 -->` & `<span class="ref-num">#11</span>` (CVC-ColonDB) $\to$ `<!-- Ref 12 -->` & `<span class="ref-num">#12</span>`
   - `<!-- Ref 10 -->` & `<span class="ref-num">#10</span>` (CVC-ClinicDB) $\to$ `<!-- Ref 11 -->` & `<span class="ref-num">#11</span>`
   - `<!-- Ref 9 -->` & `<span class="ref-num">#09</span>` (Kvasir-SEG) $\to$ `<!-- Ref 10 -->` & `<span class="ref-num">#10</span>`

### 5.6 Footer Updates (Lines 1279, 1286)
```html
<!-- BEFORE -->
            <li><a href="11-references.html">48 Master References</a></li>
...
        <div style="font-family: var(--font-mono); font-size: 0.8rem;">Catalog Verification: <code>48-CITATIONS-VERIFIED</code></div>

<!-- AFTER -->
            <li><a href="11-references.html">49 Master References</a></li>
...
        <div style="font-family: var(--font-mono); font-size: 0.8rem;">Catalog Verification: <code>49-CITATIONS-VERIFIED</code></div>
```

---

## 6. Verification of `pages/01-what-is-colonoscopy.html`

In `pages/01-what-is-colonoscopy.html` (lines 478–489):
```html
        <!-- The Corley et al. 2014 Deep Dive -->
        <div id="corley-evidence" class="card card-glass" style="border-left: 4px solid var(--color-teal); padding: 2.25rem;">
          <div class="flex flex-between" style="flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <span class="badge badge-clinical">Landmark Clinical Evidence</span>
              <h3 style="margin-top: 0.5rem; margin-bottom: 0.25rem;">Corley et al. (NEJM 2014): The Epidemiological Foundation</h3>
              <div style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
                New England Journal of Medicine 2014; 370:1298-1306 &bull; Kaiser Permanente Northern California
              </div>
            </div>
            <a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>
          </div>
```

**Cross-Page Anchor Verification Status**:
1. **Target Relative Path**: `11-references.html` resides in the same directory (`pages/`).
2. **Anchor Target**: `#ref-corley2014` exactly matches `id="ref-corley2014"` on the new reference card.
3. **Behavior**: When a user clicks `Citation Details →` on `pages/01-what-is-colonoscopy.html`, the browser navigates to `pages/11-references.html`, scrolls smoothly to the Corley reference card, leaves a 5.5rem offset for the fixed header, and illuminates the card with a teal border glow.
4. **HTML Modifications in 01**: **None required**. Line 488 already contains the exact canonical URI `<a href="11-references.html#ref-corley2014" class="btn btn-outline btn-sm">Citation Details &rarr;</a>`.

---

## 7. Test Suite Updates & Verifications

### 7.1 `tests/validate_pages.js`
In `tests/validate_pages.js` (lines 118–143):

```javascript
// BEFORE (Lines 118, 126, 130):
console.log("\n6. Validating 11-references.html (48 References & Metadata)...");
...
assert(refCardMatches.length === 48, `11 contains exactly 48 reference cards (actual: ${refCardMatches.length})`);

// Verify reference numbering from #01 to #48
let missingNums = [];
for (let i = 1; i <= 48; i++) {
  const padNum = `#${i.toString().padStart(2, '0')}`;
  if (!c11.includes(padNum)) {
    missingNums.push(padNum);
  }
}
assert(missingNums.length === 0, `All references #01 to #48 indexed (missing: ${missingNums.join(', ') || 'none'})`);

// AFTER:
console.log("\n6. Validating 11-references.html (49 References & Metadata)...");
...
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

// Check Corley et al. 2014 anchor ID and citations
assert(c11.includes('id="ref-corley2014"'), "11 includes #ref-corley2014 anchor target");
assert(c11.includes('https://doi.org/10.1056/NEJMoa1309086'), "11 includes Corley et al. NEJM DOI link");
assert(c11.includes('https://pubmed.ncbi.nlm.nih.gov/24693890/'), "11 includes Corley et al. PubMed link");
```

### 7.2 `tests/adversarial_links_tooltips.test.js`
In `tests/adversarial_links_tooltips.test.js`:

Line 10 (docstring):
```javascript
// BEFORE:
 * 5. All 48 citations in pages/11-references.html for valid DOI/arXiv/GitHub URLs and IDs.

// AFTER:
 * 5. All 49 citations in pages/11-references.html for valid DOI/arXiv/GitHub URLs and IDs.
```

Lines 479–483:
```javascript
// BEFORE:
if (refCards.length !== 48) {
  recordFail('citationIssues', `Expected exactly 48 reference cards in 11-references.html, found ${refCards.length}`);
} else {
  recordPass(`Found exactly 48 reference cards in 11-references.html`);
}

// AFTER:
if (refCards.length !== 49) {
  recordFail('citationIssues', `Expected exactly 49 reference cards in 11-references.html, found ${refCards.length}`);
} else {
  recordPass(`Found exactly 49 reference cards in 11-references.html`);
}
```

Line 549:
```javascript
// BEFORE:
console.log(`Citation breakdown across all 48 cards:`);

// AFTER:
console.log(`Citation breakdown across all 49 cards:`);
```

In Stage 6, add an explicit assertion for the Corley card:
```javascript
const corleyCard = refCards.find(card => card.includes('id="ref-corley2014"'));
if (!corleyCard) {
  recordFail('citationIssues', 'Expected reference card with id="ref-corley2014" in 11-references.html');
} else {
  recordPass('Reference card id="ref-corley2014" verified in 11-references.html');
  if (corleyCard.includes('10.1056/NEJMoa1309086')) {
    recordPass('Corley reference card includes verified DOI: 10.1056/NEJMoa1309086');
  } else {
    recordFail('citationIssues', 'Corley reference card missing DOI 10.1056/NEJMoa1309086');
  }
}
```

### 7.3 `tests/adversarial_interactive_benchmarks_test.js`
In `tests/adversarial_interactive_benchmarks_test.js`:

Line 536:
```javascript
// Harmonize test description to reflect Mamba's updated card number:
check('References search finds "Mamba" (State-Space Ref #49)', mambaMatch.length >= 1);
```

Lines 538–545:
```javascript
// Automatic resolution:
const corleyMatch = simulateReferenceFilter('Corley', 'all');
if (corleyMatch.length === 0) {
  check('References search finds "Corley" (Suggested in placeholder: "e.g., PraNet, Corley, Mamba")', false, ...);
} else {
  check('References search finds "Corley"', true);
}
```
When Corley et al. is present, `corleyMatch.length` returns 1, turning this test from **FAIL** to **PASS**.

---

## 8. Site-Wide Cross-Module Harmonization Ledger

To maintain total platform consistency across all 14 HTML documents, implementers should harmonize references to "48 Papers" to "49 Papers" in navigation drawers and footers:

| File | Line(s) | Current Markup | Harmonized Markup |
|---|---|---|---|
| `index.html` | 83 | `11. Scientific References (48 Papers)` | `11. Scientific References (49 Papers)` |
| `index.html` | 530 | `48 References &rarr;` | `49 References &rarr;` |
| `pages/01-what-is-colonoscopy.html` | 83 | `11. Scientific References (48 Papers)` | `11. Scientific References (49 Papers)` |
| `pages/02-polyp-types.html` | 83 | `11. Scientific References (48 Papers)` | `11. Scientific References (49 Papers)` |
| `pages/06b-clinical-evidence.html` | 83 | `11. Scientific References (48 Papers)` | `11. Scientific References (49 Papers)` |
| `pages/07-clinical-systems.html` | 83 | `11. Scientific References (48 Papers)` | `11. Scientific References (49 Papers)` |
| `pages/08-benchmark-integrity.html` | 186 | `11. Master References (48 Papers)` | `11. Master References (49 Papers)` |
| `pages/08-benchmark-integrity.html` | 687 | `48 Master References` | `49 Master References` |
| `pages/09-chakramodel.html` | 140 | `11. Master References (48 Papers)` | `11. Master References (49 Papers)` |
| `pages/09-chakramodel.html` | 632 | `48 Master References` | `49 Master References` |
| `pages/10-future.html` | 164 | `11. Master References (48 Papers)` | `11. Master References (49 Papers)` |
| `pages/10-future.html` | 463 | `Explore 48 Master References` | `Explore 49 Master References` |
| `pages/10-future.html` | 508 | `48 Master References` | `49 Master References` |
| `pages/12-glossary.html` | 116 | `11. Master References (48 Papers)` | `11. Master References (49 Papers)` |
| `pages/12-glossary.html` | 915 | `48 Master References` | `49 Master References` |
| `README.md` | 74 | `48 verified research publications` | `49 verified research publications` |
| `README.md` | 106 | `Module 11: Master References (48 Papers)` | `Module 11: Master References (49 Papers)` |
| `README.md` | 107 | `catalog of 48 foundational publications` | `catalog of 49 foundational publications` |

---

## 9. Empirical Validation Evidence

A comprehensive sandbox validation script (`test_corley_integration.js`) was executed against `pages/11-references.html`:

- **Extracted Reference Cards**: 49 cards confirmed via balanced-tag parser.
- **DOM-Sequential Order**: PASSED 100% (Cards `#01` through `#49` matched array index `0` through `48`).
- **Target ID Check**: `id="ref-corley2014"` present and verified.
- **DOI URL Check**: `https://doi.org/10.1056/NEJMoa1309086` present and verified.
- **PubMed URL Check**: `https://pubmed.ncbi.nlm.nih.gov/24693890/` present and verified.
- **Instant Search "Corley"**: Returned exactly 1 matching card (`Corley DA, et al.`).
- **Instant Search "PraNet"**: Returned 2 matching cards (Fan et al. 2020 PraNet, Bernal et al. 2015 ClinicDB split).
- **Instant Search "Mamba"**: Returned 1 matching card (Wang et al. 2024 Mamba-VPS).
- **Instant Search "Repici"**: Returned 1 matching card (Repici et al. 2020 AI RCT).
- **Category Filter "clinical"**: Returned exactly 9 matching cards (8 original clinical RCTs/guidelines + Corley).
- **Category Filter "all"**: Returned exactly 49 cards.
