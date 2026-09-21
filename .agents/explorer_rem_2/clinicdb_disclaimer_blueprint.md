# ClinicDB Video Leakage Disclaimer Strategy & Fix Blueprint

**Document ID**: BLUEPRINT-REM-CLINICDB-01  
**Author**: Explorer Rem 2 (ClinicDB Video Leakage Disclaimer Strategy Specialist)  
**Date**: 2026-09-22  
**Target Milestone**: Remediation M1 / Check 2 Compliance  
**Target Project**: `colonoscopy_ai_guide`  
**Compliance Standard**: 100% Zero-Defect Pass on `check2_clinicdb_leakage` (`run_master_audit.js`) and Alignment with `Opus1.md` / `synthesis_m1.md`

---

## 1. EXECUTIVE SUMMARY & AUDIT FORENSICS

### 1.1 The Forensic Problem: CVC-ClinicDB Video Frame Leakage
In medical computer vision literature, standard evaluation protocols (notably Protocol A initiated by PraNet / Fan et al., MICCAI 2020) split the **CVC-ClinicDB (CVC-612)** dataset into 550 training frames and 62 test frames. 

However, forensic cryptographic and geometric auditing has demonstrated that:
1. **Identical Patient Sequences**: CVC-ClinicDB comprises 612 consecutive frames taken from approximately 31 endoscopic video sequences across only 13 patient procedures.
2. **In-Sequence Temporal Leakage**: Every single one of the 62 test frames in the PraNet protocol originates from the exact same patient video sequences used during training (with **30 verified near-duplicate frame pairings sharing $\ge 20$ RANSAC geometric affine inliers**, such as `train_180.png` $\leftrightarrow$ `clinicdb_181.png` captured ~40 ms apart).
3. **Artificial Performance Inflation**: Models reporting $\ge 0.90–0.94$ Dice on CVC-ClinicDB are not demonstrating generalized polyp segmentation; they are performing **seen-domain video frame interpolation** and memorizing sequential lumen lighting and lesion margins, creating an artificial $+12\%$ to $+15\%$ Dice inflation over genuine unseen clinical test distributions (e.g., ETIS-Larib 0.398–0.801).

### 1.2 Audit Failure Root Cause in `run_master_audit.js`
In the forensic audit (`.agents/teamwork_preview_auditor/audit_results.json`), `check2_clinicdb_leakage` failed with:
```json
"check2_clinicdb_leakage": {
  "status": "FAIL",
  "details": [
    "pages/04-architectures.html: Interactive architecture cards list ClinicDB scores (0.899, 0.932) in benchmark strings without inline leakage disclaimer."
  ],
  "evidence": [
    "pages/03-ai-history.html: Line 459 reports '0.937 ClinicDB' as 'Primary Breakthrough: Holds the highest published static benchmark scores' without any video leakage or inflation warning on the entire page."
  ]
}
```

The audit script `run_master_audit.js` inspects:
1. `pages/03-ai-history.html`:
   ```javascript
   if (content.includes("0.937 ClinicDB") && !/leakage|in-sequence|seen-domain/i.test(content)) {
     c2_fail = true;
     auditResults.check2_clinicdb_leakage.evidence.push(...);
   }
   ```
2. `pages/04-architectures.html`:
   ```javascript
   const pRanetShape = content.includes("BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628");
   const hardNetShape = content.includes("BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677");
   if (pRanetShape || hardNetShape) {
     auditResults.check2_clinicdb_leakage.details.push(...);
   }
   ```

### 1.3 Remediation Objective
Ensure that **every** mention of CVC-ClinicDB benchmark scores across all pages carries an immediate, visually prominent inline asterisk, caveat badge, and explanatory footnote linking to `08-benchmark-integrity.html`, completely resolving both the audit evidence and detail items.

---

## 2. UNIVERSAL DESIGN PATTERNS FOR INLINE DISCLAIMERS

To ensure visual harmony with `assets/css/main.css` and the design tokens of the project, three standardized UI patterns are established:

### Component Pattern A: Inline Asterisk & Warning Note (Milestone / Architecture Cards)
Used where benchmark scores are listed inline inside milestone cards or model summaries:
```html
<strong>0.937 ClinicDB<span style="color: var(--color-coral); font-weight: 700;">*</span></strong>
<div style="margin-top: 0.35rem; padding: 0.4rem 0.65rem; background: rgba(249, 115, 22, 0.1); border-left: 3px solid var(--color-coral); border-radius: var(--radius-xs); font-size: 0.775rem; color: var(--text-secondary);">
  <strong style="color: var(--color-coral);">*Integrity Disclaimer:</strong> CVC-ClinicDB scores suffer from in-sequence video frame temporal leakage (+12% to +15% artificial Dice inflation from seen-domain interpolation); see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
</div>
```

### Component Pattern B: Interactive Explorer Benchmark String & Dynamic Caveat Banner
Used in the JavaScript controller of `pages/04-architectures.html`:
- In the tensor shape string:
  ```javascript
  shapes: "BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899* [Video Leakage] / ETIS 0.628"
  ```
- In the detail panel UI:
  A dynamic callout container `#detail-node-caveat` that activates whenever an architecture's key innovation / benchmark node is selected:
  ```html
  <div id="detail-node-caveat" style="display: none; background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--color-coral); padding: 0.75rem 1rem; border-radius: var(--radius-xs); margin-bottom: 1rem; font-size: 0.825rem; color: var(--text-secondary);">
    <strong style="color: var(--color-coral);">⚠️ Benchmark Integrity Caveat:</strong> <span id="detail-caveat-text"></span>
  </div>
  ```

### Component Pattern C: Table Footnote Block
Used immediately below data tables in `pages/06-benchmarks.html` and `pages/09-chakramodel.html`:
```html
<div style="margin-top: 1rem; padding: 0.85rem 1.25rem; background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--color-coral); border-radius: var(--radius-sm); font-size: 0.825rem; color: var(--text-secondary);">
  <strong style="color: var(--color-coral);">*CVC-ClinicDB Video Leakage Disclosure:</strong> All 62 test frames in Protocol A originate from the identical 13 patient procedures used in training (30 near-duplicate image pairs with &ge;20 RANSAC inliers). Published scores (0.823&ndash;0.937 mDice) reflect seen-domain temporal interpolation (+12% to +15% artificial inflation) rather than true clinical out-of-distribution generalizability. For mathematical proof and cryptographic frame pairings, see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline; font-weight: 600;">Benchmark Integrity Audit</a>.
</div>
```

---

## 3. EXACT STEP-BY-STEP REPLACEMENT BLUEPRINT

### File 1: `pages/03-ai-history.html`

#### Target Location:
Lines 458–461 (Milestone 11: HSNet card).

#### Target Content (BEFORE):
```html
            <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.85rem;">
              <div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB, and 0.808 ETIS-Larib</strong> mDice.</div>
              <div style="margin-top: 0.4rem;"><strong>Key Limitation:</strong> 22 FPS throughput on RTX 3090 fails 60 FPS ultra-HD clinical colonoscope integration requirements.</div>
            </div>
```

#### Replacement Content (AFTER):
```html
            <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.85rem;">
              <div><strong>Primary Breakthrough:</strong> Holds the highest published static benchmark scores: <strong>0.926 Kvasir, 0.937 ClinicDB<span style="color: var(--color-coral); font-weight: 700;">*</span>, and 0.808 ETIS-Larib</strong> mDice.</div>
              <div style="margin-top: 0.35rem; padding: 0.4rem 0.65rem; background: rgba(249, 115, 22, 0.1); border-left: 3px solid var(--color-coral); border-radius: var(--radius-xs); font-size: 0.775rem; color: var(--text-secondary);">
                <strong style="color: var(--color-coral);">*Integrity Disclaimer:</strong> CVC-ClinicDB scores suffer from in-sequence video frame temporal leakage (+12% to +15% artificial Dice inflation from seen-domain interpolation); see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
              </div>
              <div style="margin-top: 0.4rem;"><strong>Key Limitation:</strong> 22 FPS throughput on RTX 3090 fails 60 FPS ultra-HD clinical colonoscope integration requirements.</div>
            </div>
```

#### Rationale & Verification Impact:
1. Adds explicit asterisk and prominent orange-bordered callout directly inside the card body.
2. Injects required keywords (`leakage`, `in-sequence`, `seen-domain`) into the page content.
3. Completely satisfies `run_master_audit.js` line 94 condition `!/leakage|in-sequence|seen-domain/i.test(content)`, turning `c2_fail` to `false`.

---

### File 2: `pages/04-architectures.html`

`pages/04-architectures.html` requires modifications in three distinct layers:
1. JavaScript Data Dictionary (`ARCH_DATA`)
2. Detail Panel HTML & Controller (`updateExplorerView()`)
3. Static Architecture Deep Dive Cards

#### Layer 2.1: `ARCH_DATA` Modifications in `<script>` block

##### Edit 2.1.1: PraNet Innovation Node (Line 754)
**Target Content (BEFORE):**
```javascript
          innovation: {
            title: "Boundary Mining vs Shallow Feature Omission",
            subtitle: "Boundary Mining Paradigm",
            shapes: "BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628",
            desc: "Pioneered reverse attention boundary mining, achieving an 11-point Dice gain over U-Net on Kvasir-SEG. However, completely discarding f1 and f2 degraded performance on diminutive (<5mm) and flat lesions.",
            code: "# PraNet Architecture Metrics Summary\nParameters: 32.55 Million\nThroughput: 50 FPS (RTX 2080 Ti FP32)\nETIS-Larib mDice: 0.628 | CVC-ColonDB mDice: 0.709",
            params: "32.55M Total",
            flops: "13.11 GFLOPs",
            hw: "Strictly bounded within 20 ms clinical latency window"
          }
```

**Replacement Content (AFTER):**
```javascript
          innovation: {
            title: "Boundary Mining vs Shallow Feature Omission",
            subtitle: "Boundary Mining Paradigm",
            shapes: "BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899* [Video Leakage] / ETIS 0.628",
            desc: "Pioneered reverse attention boundary mining, achieving an 11-point Dice gain over U-Net on Kvasir-SEG. *Integrity Note: The 0.899 ClinicDB score reflects seen-domain video frame leakage (+12% to +15% inflation across identical patient sequences). Completely discarding f1 and f2 degraded performance on subtle diminutive (<5mm) and flat lesions.",
            disclaimer: "CVC-ClinicDB test frames share identical patient video sequences with training frames (30 verified duplicate links). Reported 0.899 mDice represents seen-domain video interpolation, not true generalizability.",
            code: "# PraNet Architecture Metrics Summary\nParameters: 32.55 Million\nThroughput: 50 FPS (RTX 2080 Ti FP32)\nETIS-Larib mDice: 0.628 | CVC-ColonDB mDice: 0.709\nClinicDB mDice: 0.899* (In-Sequence Video Leakage)",
            params: "32.55M Total",
            flops: "13.11 GFLOPs",
            hw: "Strictly bounded within 20 ms clinical latency window"
          }
```

##### Edit 2.1.2: HarDNet-MSEG Innovation Node (Line 811)
**Target Content (BEFORE):**
```javascript
          innovation: {
            title: "DRAM Access Traffic (CIO) Optimization",
            subtitle: "DRAM Optimization",
            shapes: "BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677",
            desc: "Achieved 88 FPS real-time speed on RTX 2080 Ti. Note that its evaluation was at 312x312 (21.4% fewer pixels than 352x352).",
            code: "# Speed vs Accuracy Profile\nParams: 33.34M | FPS: 88.0 (FP32)\nKvasir mDice: 0.904 | MAE: 0.025",
            params: "33.34M Total",
            flops: "10.40 GFLOPs",
            hw: "Fastest clinical segmentation baseline"
          }
```

**Replacement Content (AFTER):**
```javascript
          innovation: {
            title: "DRAM Access Traffic (CIO) Optimization",
            subtitle: "DRAM Optimization",
            shapes: "BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932* [Video Leakage] / ETIS 0.677",
            desc: "Achieved 88 FPS real-time speed on RTX 2080 Ti. *Integrity Note: The 0.932 ClinicDB score is an in-sequence video memorization artifact (+12% to +15% inflation). Note also that its evaluation was at 312x312 (21.4% fewer pixels than 352x352).",
            disclaimer: "CVC-ClinicDB test frames share identical patient video sequences with training frames. The 0.932 mDice score reflects seen-domain video memorization rather than robust out-of-distribution detection.",
            code: "# Speed vs Accuracy Profile\nParams: 33.34M | FPS: 88.0 (FP32)\nKvasir mDice: 0.904 | MAE: 0.025\nClinicDB mDice: 0.932* (In-Sequence Video Leakage)",
            params: "33.34M Total",
            flops: "10.40 GFLOPs",
            hw: "Fastest clinical segmentation baseline"
          }
```

##### Edit 2.1.3: Polyp-PVT, ColonFormer, U-Net Innovation Nodes
Update `polyp_pvt`, `colonformer`, and `unet` in `ARCH_DATA` to ensure consistent disclaimers if ClinicDB is queried:
- **Polyp-PVT (`shapes` & `desc`)**:
  ```javascript
  shapes: "BENCHMARKS: Kvasir 0.917 / ColonDB 0.808 / ETIS 0.787 / ClinicDB 0.937* [Leakage]",
  desc: "First model to cross 0.80 mDice on unseen CVC-ColonDB (0.808). GCN preserves 0.806 mDice under 180° image rotation. *Integrity Note: Published 0.937 ClinicDB score suffers from in-sequence video temporal leakage.",
  disclaimer: "CVC-ClinicDB 0.937 mDice is artificially inflated by in-sequence video frame leakage; true clinical generalization is measured by unseen ColonDB (0.808) and ETIS-Larib (0.787).",
  ```
- **ColonFormer (`shapes` & `desc`)**:
  ```javascript
  shapes: "BENCHMARKS: Kvasir 0.924 / ColonDB 0.814 / ETIS 0.801 / ClinicDB 0.941* [Leakage]",
  desc: "Demonstrated that scaling beyond MiT-B3 degrades out-of-domain performance: MiT-B5 drops by 2.6 percentage points on ETIS-Larib due to small-dataset overfitting. *Integrity Note: Published 0.941 ClinicDB score reflects seen-domain video frame interpolation.",
  disclaimer: "CVC-ClinicDB 0.941 mDice represents seen-domain video interpolation due to shared video sequences across splits.",
  ```

#### Layer 2.2: Interactive Explorer UI Panel Markup & Dynamic Controller

##### HTML Markup in `#node-detail-panel` (lines 173–175)
Insert `#detail-node-caveat` right below `#detail-node-desc`:
```html
        <p id="detail-node-desc" style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; margin-bottom: 1rem;">
          Replaces standard $3\times3$ bottleneck convolutions with hierarchical sub-feature groups ($s=4$)...
        </p>
        <!-- Dynamic Benchmark & Integrity Caveat Callout -->
        <div id="detail-node-caveat" style="display: none; background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--color-coral); padding: 0.75rem 1rem; border-radius: var(--radius-xs); margin-bottom: 1rem; font-size: 0.825rem; color: var(--text-secondary);">
          <strong style="color: var(--color-coral);">⚠️ Benchmark Integrity Caveat:</strong> <span id="detail-caveat-text"></span>
        </div>
```

##### Controller Code in `updateExplorerView()` (around line 1090)
```javascript
        // Update caveat banner if component carries an integrity caveat
        const caveatBox = document.getElementById('detail-node-caveat');
        const caveatText = document.getElementById('detail-caveat-text');
        if (caveatBox && caveatText) {
          if (c.disclaimer) {
            caveatText.innerHTML = `${c.disclaimer} For cryptographic frame-pair matching and RANSAC inlier analysis, see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.`;
            caveatBox.style.display = 'block';
          } else {
            caveatBox.style.display = 'none';
          }
        }
```

#### Layer 2.3: Static Architecture Deep Dive Cards

##### Static Card 1: PraNet (`#arch-pranet`, lines 299–301)
Insert an explicit Benchmark & Leakage Callout Box directly inside PraNet's card body:
```html
        <!-- Benchmark Summary & Leakage Caveat -->
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; margin: 1.5rem 0; font-size: 0.85rem;">
          <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
            PraNet Protocol A Benchmark Results:
          </div>
          <div style="color: var(--text-secondary);">
            Kvasir-SEG: <strong>0.898 mDice</strong> &bull; CVC-ColonDB: <strong>0.709 mDice</strong> &bull; ETIS-Larib: <strong>0.628 mDice</strong> &bull; CVC-ClinicDB: <strong>0.899 mDice<span style="color: var(--color-coral); font-weight: 700;">*</span></strong>
          </div>
          <div style="margin-top: 0.4rem; padding: 0.4rem 0.65rem; background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--color-coral); border-radius: var(--radius-xs); font-size: 0.775rem; color: var(--text-secondary);">
            <strong style="color: var(--color-coral);">*Video Leakage Caveat:</strong> The 0.899 ClinicDB score evaluates on 62 test frames sharing identical video sequences with training frames (30 near-duplicate links with $\ge 20$ RANSAC inliers), causing +12% to +15% artificial Dice inflation via seen-domain memorization. See <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
          </div>
        </div>
```

##### Static Card 2: HarDNet-MSEG (`#arch-hardnet`, lines 352–356)
**Target Content (BEFORE):**
```html
            <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted);">
              Metrics on Kvasir-SEG: <strong>0.904 mDice</strong>, 0.857 mIoU, and <strong>0.025 MAE</strong>.
            </div>
```
**Replacement Content (AFTER):**
```html
            <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted);">
              Metrics: Kvasir-SEG: <strong>0.904 mDice</strong> (0.857 mIoU) &bull; ETIS-Larib: <strong>0.677 mDice</strong> &bull; CVC-ClinicDB: <strong>0.932 mDice<span style="color: var(--color-coral); font-weight: 700;">*</span></strong>
              <div style="margin-top: 0.35rem; font-size: 0.775rem; color: var(--text-secondary); background: rgba(249, 115, 22, 0.08); padding: 0.4rem 0.65rem; border-left: 2px solid var(--color-coral); border-radius: var(--radius-xs);">
                <span style="color: var(--color-coral); font-weight: 600;">*Video Leakage Caveat:</span> 0.932 ClinicDB score is an in-sequence video memorization artifact (+12–15% inflation). See <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
              </div>
            </div>
```

##### Static Card 3: Polyp-PVT (`#arch-polyp-pvt`, lines 415–418)
Append an inline benchmark badge block:
```html
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; margin: 1.5rem 0; font-size: 0.85rem;">
          <div style="color: var(--text-secondary);">
            Kvasir-SEG: <strong>0.917 mDice</strong> &bull; CVC-ColonDB: <strong>0.808 mDice</strong> &bull; ETIS-Larib: <strong>0.787 mDice</strong> &bull; CVC-ClinicDB: <strong>0.937 mDice<span style="color: var(--color-coral); font-weight: 700;">*</span></strong>
          </div>
          <div style="margin-top: 0.4rem; font-size: 0.775rem; color: var(--text-secondary); background: rgba(249, 115, 22, 0.08); padding: 0.4rem 0.65rem; border-left: 2px solid var(--color-coral); border-radius: var(--radius-xs);">
            <span style="color: var(--color-coral); font-weight: 600;">*Video Leakage Caveat:</span> While Polyp-PVT achieved genuine breakthrough generalization on unseen ColonDB (0.808), its 0.937 ClinicDB score represents seen-domain video interpolation. See <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
          </div>
        </div>
```

##### Static Card 4: ColonFormer (`#arch-colonformer`, line 475)
Append an inline benchmark badge block:
```html
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; margin: 1.5rem 0; font-size: 0.85rem;">
          <div style="color: var(--text-secondary);">
            MiT-B3 Peak Metrics: Kvasir-SEG: <strong>0.924 mDice</strong> &bull; ETIS-Larib: <strong>0.801 mDice</strong> &bull; CVC-ColonDB: <strong>0.814 mDice</strong> &bull; CVC-ClinicDB: <strong>0.941 mDice<span style="color: var(--color-coral); font-weight: 700;">*</span></strong>
          </div>
          <div style="margin-top: 0.4rem; font-size: 0.775rem; color: var(--text-secondary); background: rgba(249, 115, 22, 0.08); padding: 0.4rem 0.65rem; border-left: 2px solid var(--color-coral); border-radius: var(--radius-xs);">
            <span style="color: var(--color-coral); font-weight: 600;">*Video Leakage Caveat:</span> 0.941 ClinicDB score reflects seen-domain video frame leakage across training and test sequences. See <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
          </div>
        </div>
```

---

### File 3: `pages/06-benchmarks.html`

#### Target Location 1:
Immediately below the Canonical Protocol A Benchmark Results Matrix table (after line 456):
```html
        </table>
      </div>
```

#### Replacement Content (AFTER Line 456):
```html
        </table>
      </div>

      <!-- Mandatory Table Footnote on ClinicDB Video Leakage & CVC-300 Overlap -->
      <div style="margin-top: 1.25rem; padding: 1rem 1.25rem; background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--color-coral); border-radius: var(--radius-sm); font-size: 0.825rem; color: var(--text-secondary); line-height: 1.6;">
        <div>
          <strong style="color: var(--color-coral);">*CVC-ClinicDB Video Leakage Disclosure:</strong> All 62 test frames in Protocol A originate from the identical 13 patient procedures used in training (30 near-duplicate image pairs with &ge;20 RANSAC inliers). Published scores (0.823&ndash;0.937 mDice) reflect seen-domain temporal interpolation (+12% to +15% artificial inflation) rather than true clinical out-of-distribution generalizability.
        </div>
        <div style="margin-top: 0.4rem;">
          <strong style="color: var(--color-coral);">&dagger;CVC-300 Overlap Mandate:</strong> 58 of the 60 frames in CVC-300 (96.7%) are exact byte-identical duplicates of CVC-ColonDB frames. They must never be merged or pooled.
        </div>
        <div style="margin-top: 0.5rem;">
          For full cryptographic frame pairings and mathematical proof, read the <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline; font-weight: 600;">Benchmark Integrity Audit &rarr;</a>
        </div>
      </div>
```

#### Target Location 2:
Call-to-Action button at base of page (line 468):
**Target Content (BEFORE):**
```html
      <a href="07-integrity-audit.html" class="btn btn-primary btn-lg">
        <span>Read Integrity Audit</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
```

**Replacement Content (AFTER):**
```html
      <a href="08-benchmark-integrity.html" class="btn btn-primary btn-lg">
        <span>Read Integrity Audit</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
```

---

### File 4: `pages/09-chakramodel.html`

#### Target Location 1:
Benchmark table header (line 224):
**Target Content (BEFORE):**
```html
                <th>CVC-ClinicDB Dice</th>
```
**Replacement Content (AFTER):**
```html
                <th>CVC-ClinicDB Dice* <span class="badge badge-coral" style="font-size: 0.65rem; vertical-align: middle; margin-left: 0.25rem;">Video Leakage</span></th>
```

#### Target Location 2:
Immediately below the table container (line 267):
**Replacement Content (AFTER line 267):**
```html
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">
          <span style="color: var(--color-coral); font-weight: 600;">*Integrity Note:</span> Standard CVC-ClinicDB test scores reflect in-sequence video frame leakage (+12% to +15% artificial inflation). Under leakage-free video-grouped 5-fold cross-validation, models drop to realistic generalization levels. See <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity Audit</a>.
        </p>
```

---

### File 5: `pages/11-references.html`

#### Target Location:
Reference #31: Polyp-PVT (lines 850–858):
**Target Content (BEFORE):**
```html
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          The benchmark transformer standard combining PVTv2-B2 with Cascaded Reception Field (CRF) and Camouflage Identification Module (CIM), achieving 0.937 Dice on ClinicDB.
        </p>
        <div class="ref-badges">
          <span class="badge badge-arch">Hierarchical ViT</span>
          <a href="https://doi.org/10.26599/AIR.2023.9150015" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">DOI: 10.26599/AIR.2023.9150015</a>
```

**Replacement Content (AFTER):**
```html
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          The benchmark transformer standard combining PVTv2-B2 with Cascaded Reception Field (CRF) and Camouflage Identification Module (CIM), achieving 0.937 Dice on ClinicDB (*subject to in-sequence video frame temporal leakage; see <a href="08-benchmark-integrity.html" style="color: var(--color-teal); text-decoration: underline;">Benchmark Integrity</a>).
        </p>
        <div class="ref-badges">
          <span class="badge badge-arch">Hierarchical ViT</span>
          <span class="badge badge-coral" style="font-size: 0.75rem;">Video Leakage Caveat</span>
          <a href="https://doi.org/10.26599/AIR.2023.9150015" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">DOI: 10.26599/AIR.2023.9150015</a>
```

---

### File 6: Compliance Audit of Remaining Files

| File | Status | Audit Findings & Verification |
|---|---|---|
| `index.html` | **COMPLIANT** | Line 275 quotes ChakraTransformer's 0.771 Dice on ClinicDB. Directly accompanied by Line 288 ("CVC-ClinicDB Video Leakage: All 62 test frames in the canonical PraNet split originate from the identical video sequences as training frames") and Exhibit A frame pairings. |
| `pages/05-datasets.html` | **COMPLIANT** | Card 1 (lines 159–180) displays `<span class="badge badge-integrity">Video Leakage Hazard</span>` and explicitly details 30 verified near-duplicate links. Master catalog table (line 431) displays `<span class="badge badge-integrity">Video Leakage (+15% Dice)</span>`. |
| `pages/07-clinical-systems.html` | **COMPLIANT** | Focuses purely on commercial CADe/CADx hardware latency and clinical trials; does not quote academic CVC-ClinicDB test scores. |
| `pages/08-benchmark-integrity.html` | **COMPLIANT** | The definitive forensic integrity audit page detailing Flaw 1 (lines 322–372), RANSAC inliers, ORB descriptors, and cryptographic hashes. |
| `pages/12-glossary.html` | **COMPLIANT** | Dedicated entry `#cvc-clinicdb` and `video-frame-leakage` explaining split contamination and group-aware cross-validation. |
| `assets/js/charts.js` | **COMPLIANT** | Contains dataset warning banner and dynamic tooltip callback displaying `⚠️ Video leakage: In-sequence evaluation artifact` for ClinicDB data points. |

---

## 4. INDEPENDENT VERIFICATION & REGRESSION SUITE

An automated verification test script `tests/test_check2_clinicdb_leakage.js` has been formulated to run against the proposed modifications.

```javascript
/**
 * Automated Verification Script: test_check2_clinicdb_leakage.js
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');

const c3 = fs.readFileSync(path.join(pagesDir, '03-ai-history.html'), 'utf8');
const c4 = fs.readFileSync(path.join(pagesDir, '04-architectures.html'), 'utf8');

let violations = [];

// 1. Verify 03-ai-history.html
if (c3.includes("0.937 ClinicDB") && !/leakage|in-sequence|seen-domain/i.test(c3)) {
  violations.push("03-ai-history.html: Reports 0.937 ClinicDB without leakage keywords");
}

if (!c3.includes("*Integrity Disclaimer") && !c3.includes("video frame temporal leakage")) {
  violations.push("03-ai-history.html: Missing explicit inline integrity disclaimer callout");
}

// 2. Verify 04-architectures.html
const pRanetShape = c4.includes("BENCHMARKS: Kvasir 0.898 / ClinicDB 0.899 / ETIS 0.628");
const hardNetShape = c4.includes("BENCHMARKS: Kvasir 0.904 / ClinicDB 0.932 / ETIS 0.677");

if (pRanetShape) {
  violations.push("04-architectures.html: PraNet benchmark shape string lacks leakage disclaimer");
}
if (hardNetShape) {
  violations.push("04-architectures.html: HarDNet benchmark shape string lacks leakage disclaimer");
}

if (violations.length === 0) {
  console.log("✓ CHECK 2 VERIFICATION: PASS (0 violations, 0 details)");
  process.exit(0);
} else {
  console.error("✗ CHECK 2 VERIFICATION: FAILED", violations);
  process.exit(1);
}
```

---

## 5. SUMMARY OF IMPLEMENTATION ACTIONS FOR WORKER / IMPLEMENTER

1. **In `pages/03-ai-history.html`**:
   - Replace lines 458–461 with the annotated `0.937 ClinicDB*` and inline integrity callout box linking to `08-benchmark-integrity.html`.
2. **In `pages/04-architectures.html`**:
   - Update `ARCH_DATA` lines 754 and 811 to include `ClinicDB 0.899* [Video Leakage]` and `ClinicDB 0.932* [Video Leakage]` with `disclaimer` fields.
   - Insert `#detail-node-caveat` in `#node-detail-panel` and dynamic display logic in `updateExplorerView()`.
   - Add benchmark summary and leakage caveat boxes to static cards for PraNet, HarDNet, Polyp-PVT, and ColonFormer.
3. **In `pages/06-benchmarks.html`**:
   - Insert the comprehensive table footnote after line 456.
   - Fix the bottom CTA button href from `07-integrity-audit.html` to `08-benchmark-integrity.html`.
4. **In `pages/09-chakramodel.html`**:
   - Update `<th>CVC-ClinicDB Dice*</th>` and add table footnote.
5. **In `pages/11-references.html`**:
   - Qualify Ref #31 description and add badge.
6. **Run `node .agents/teamwork_preview_auditor/run_master_audit.js`**:
   - Assert `check2_clinicdb_leakage` status is `PASS`.
