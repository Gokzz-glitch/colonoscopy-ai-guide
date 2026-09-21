# Colonoscopy AI Education & ChakraModel Research Platform

[![Integrity Audit](https://img.shields.io/badge/Audit-CHAKRA--AUDIT--v2--PASS-10b981.svg)](#benchmark-integrity-disclosures)
[![Literature](https://img.shields.io/badge/References-48%20Verified%20Papers-00d4ff.svg)](pages/11-references.html)
[![Glossary](https://img.shields.io/badge/Glossary-50%20Standardized%20Terms-a855f7.svg)](pages/12-glossary.html)
[![License](https://img.shields.io/badge/License-CC%20BY%204.0%20%2F%20MIT-ffb347.svg)](#license)

> **Mission**: An authoritative, scientifically audited educational platform and research compendium engineered to bridge the clinical reality of screening colonoscopy with the cutting edge of artificial intelligence.

---

## Table of Contents
1. [Platform Overview & Dual Mission](#platform-overview--dual-mission)
2. [Complete Platform Site Map](#complete-platform-site-map)
3. [Visual Design System & Design Tokens](#visual-design-system--design-tokens)
4. [Benchmark Integrity Disclosures & The 4 Flaws](#benchmark-integrity-disclosures--the-4-flaws)
5. [The ChakraModel Research Project & `leakbench`](#the-chakramodel-research-project--leakbench)
6. [Local Preview & Development](#local-preview--development)
7. [Automated Verification & Test Suites](#automated-verification--test-suites)
8. [GitHub Pages Deployment Guide](#github-pages-deployment-guide)
9. [Citation & Academic Credit](#citation--academic-credit)
10. [License](#license)

---

## Platform Overview & Dual Mission

Colorectal cancer (CRC) is the third most common cancer and the second leading cause of cancer deaths worldwide. Screening colonoscopy is uniquely preventive because it detects and removes precancerous polyps before malignancy develops. Corley et al. (*New England Journal of Medicine*, 2014) proved that **every 1.0% increase in Adenoma Detection Rate (ADR) confers a 3.0% reduction in interval colorectal cancer and a 5.0% reduction in cancer fatalities**.

Despite this, human endoscopists miss between 20% and 26% of adenomatous polyps during standard exams, rising to over 34% for flat, diminutive, and serrated lesions.

While real-time Artificial Intelligence (CADe) has demonstrated a **55% relative reduction in adenoma miss rates** across 41 randomized controlled trials (31,789 patients), academic machine learning research has become detached from clinical reality:
- Benchmark datasets suffer from **temporal video frame leakage** across training and test splits.
- Supposedly independent test sets contain **exact duplicate images**.
- Algorithms are evaluated on **100% polyp prevalence**, remaining blind to **alarm fatigue on healthy mucosa**.

This platform delivers two synchronized experiences:
1. **Public & Patients**: Clear, compassionate, medically accurate education explaining bowel preparation, procedure anatomy, polyp histology, and how AI protects them in the endoscopy room.
2. **Researchers & Engineers**: A forensic critique of academic benchmarks, architectural deep dives (U-Net, PraNet, Polyp-PVT, EndoMamba), reproducible evaluations (`splits_v2`, `leakbench`), and future spatiotemporal foundation models.

---

## Complete Platform Site Map

| Page URL | Title | Core Focus |
|---|---|---|
| `index.html` | **Platform Overview & Dual Paths** | Hero section, clinical impact statistics, dual audience entry paths (Patients vs Researchers). |
| `pages/01-what-is-colonoscopy.html` | **Anatomy, Procedure & Screening** | 8 colorectal zones, split-dose prep, BBPS score, CIR (&ge;95%), withdrawal time (&ge;6 min). |
| `pages/02-polyp-types.html` | **Polyp Morphology & Paris Classes** | Paris 0-I to 0-III, NICE/Kudo criteria, conventional adenoma vs serrated pathway (SSLs). |
| `pages/03-ai-history.html` | **AI History Timeline** | 4 eras: Handcrafted wavelets &rarr; Deep CNNs &rarr; Transformers &rarr; Foundation/State-Space Models. |
| `pages/04-architectures.html` | **Model Architectures Deep Dive** | Mathematical breakdowns of U-Net, PraNet, HarDNet-MSEG, Polyp-PVT, ColonFormer, EndoMamba. |
| `pages/05-datasets.html` | **Comprehensive Dataset Catalog** | Detailed documentation of all 10 public colonoscopy datasets with provenance and leakage warnings. |
| `pages/06-benchmarks.html` | **Performance Leaderboard** | Interactive Chart.js benchmark matrices with mandatory seen-domain leakage warnings. |
| `pages/06b-clinical-evidence.html` | **Clinical Trials & Evidence** | 41 RCTs, 31,789 patients, ADR vs AMR analysis, non-neoplastic resection costs, and deskilling. |
| `pages/08-benchmark-integrity.html` | **Benchmark Integrity Audit** | Forensic analysis of the 4 hidden flaws: video leakage, ColonDB/CVC-300 overlap, HyperKvasir clones. |
| `pages/09-chakramodel.html` | **ChakraModel Research Project** | Failure analysis of ChakraTransformer (309M), ChakraXAttnUNet v2, `leakbench`, and `splits_v2`. |
| `pages/10-future.html` | **Future & State-Space Models** | Fair-prompt SAM evaluation, spatiotemporal video (EndoMamba), agentic multimodal co-pilot. |
| `pages/11-references.html` | **Master Hyperlinked References** | 48 verified citations with instant text search, category filters, DOIs, arXiv, and GitHub links. |
| `pages/12-glossary.html` | **Plain-English Master Glossary** | 50 standardized terms across Clinical, Metric, Architecture, Dataset, and Integrity categories. |

---

## Visual Design System & Design Tokens

The platform features a modern, medical-grade dark mode default with a clean high-contrast light mode toggle. All styles are defined in `assets/css/main.css`.

### Design Tokens (`:root`)
- **Dark Mode Background**: `--bg-primary: #0a0e1a` (Deep space dark)
- **Secondary Surface**: `--bg-secondary: #0f172a` (Midnight slate)
- **Glassmorphic Card Surface**: `--surface-card: #111827`, `backdrop-filter: blur(12px)`
- **Light Mode Palette**: `[data-theme="light"]` with `--bg-primary: #f8fafc` (Clean clinical slate)

### Neon Accent Tokens
- **Electric Teal**: `--color-teal: #00d4ff` (Primary actions, metric highlights)
- **Warm Amber**: `--color-amber: #ffb347` (Clinical caveats, intermediate risk)
- **Soft Purple**: `--color-purple: #a855f7` (Transformer architectures, foundation models)
- **Clinical Emerald**: `--color-emerald: #10b981` (Confirmed findings, guideline compliance)
- **Integrity Coral**: `--color-coral: #f97316` (Benchmark flaws, leakage warnings, alerts)
- **Critical Danger**: `--color-danger: #ef4444` (Severe overlap violations, duplicate data)

### Typography
- **Headings**: `'Space Grotesk', sans-serif`
- **Body**: `'Inter', sans-serif`
- **Code & Metrics**: `'JetBrains Mono', monospace`

### Interactive Components
- **Sticky Scroll Progress**: `#scroll-progress` gradient bar tracking vertical viewport depth.
- **Master Tooltip Engine**: Hovering over any `<span class="glossary-term" data-term="...">` instantly renders a floating, viewport-clamped card with term category and 2-sentence plain-English definition.
- **Responsive Sticky Tables**: Data tables with fixed headers during long vertical scrolls.
- **Print Optimization**: Dedicated `@media print` stylesheets converting backgrounds to pure white with full URL expansions.

---

## Benchmark Integrity Disclosures & The 4 Flaws

### 1. Video Frame Temporal Leakage in CVC-ClinicDB
CVC-ClinicDB consists of 612 consecutive frames from 29&ndash;31 colonoscopy videos. Under the standard PraNet 550/62 split, **all 62 test frames originate from the exact video sequences used in training**. Our audit identified **30 verified near-duplicate links** (&ge;20 RANSAC affine inliers) linking training frames to test frames captured ~40 ms apart. Random splits also cause 27 sequence groups to span train and validation splits, artificially inflating reported validation Dice by **+12% to +15%**.

### 2. CVC-ColonDB &harr; CVC-300 Exact Overlap
CVC-ColonDB (380 frames) and CVC-300 (60 frames) are historically evaluated as independent test benchmarks. In reality, **58 of the 60 frames in CVC-300 (96.7%) are pixel-for-pixel duplicates of CVC-ColonDB frames** (SHA-256 verified). Averaging or pooling these benchmarks constitutes mathematical malpractice and double-counts identical lesions.

### 3. HyperKvasir 1,000/1,000 Duplicate Segmented Masks
HyperKvasir (*Scientific Data*, Nature 2020) provides 1,000 segmented polyp frames with pixel masks. A cryptographic audit proved that **1,000 out of 1,000 files are byte-identical SHA-256 clones of Kvasir-SEG**. Published papers claiming to train on "2,000 combined images" were double-sampling the identical 1,000 images. HyperKvasir provides zero additional segmented data.

### 4. The 100% Prevalence Blind Spot on Healthy Mucosa
Standard academic benchmarks exhibit 100% polyp prevalence across all 802 test frames. In clinical practice, **&gt;95% of screening video frames are normal mucosa**. Academic models are never audited for false alarms, causing clinical **alarm fatigue** when deployed. ChakraModel incorporates **4,275 verified polyp-free negative frames** from PolypGen to quantify False Alarm Rate (FAR) across 0%, 0.1%, and 1% area thresholds.

---

## The ChakraModel Research Project & `leakbench`

1. **The Strategic Pivot**: Transitioning from building another marginal architecture to scientifically measuring benchmark inflation.
2. **Failure Analysis**:
   - **ChakraTransformer** (ViT-L/16 @ 384 px, 309.2M params): Collapsed to 0.838 Kvasir Dice and 0.771 ClinicDB Dice; 7.76 FPS failed clinical real-time needs due to non-hierarchical patch collapse and decoder bottleneck.
   - **128px Experiments**: Downsampling to $128 \times 128$ caused from-scratch optimization to collapse (0.28 to 0.77 Dice).
3. **ChakraXAttnUNet v2**:
   - Swin-T hierarchical encoder (shifted-window self-attention, 28.6M params).
   - **Dual-Path Skip Routing**: Combines context-gated attention selection with an unpooled, direct $1 \times 1$ conv skip bypass, curing the fatal skip-pooling flaw of v1.
   - **Auxiliary Morphological Boundary Loss**: Supervised with explicit mathematical dilation-erosion targets.
4. **`splits_v2` Group-Aware Partition**: 1,228 train / 222 val frames with **exactly zero sequence groups crossing splits**.
5. **Stage 1 `leakbench` Protocol**: 38 standardized GPU runs across 4 models (`unet_r34`, `segformer_b2`, `fpn_pvtv2b2`, `xattn`), running E1 (clean comparison), E2 (validation leakage drift), and E3 (ClinicDB 5-fold CV leakage isolation).

---

## Local Preview & Development

The platform is built with pure standards-compliant HTML5, CSS3, and modern vanilla ES6+ JavaScript. It requires zero compilation, bundlers, or package installations to run.

### Option 1: Python Built-in HTTP Server (Recommended)
Open PowerShell or Terminal in the project root:
```powershell
cd C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide
python -m http.server 8000
```
Open your browser and navigate to:
```
http://localhost:8000/
```

### Option 2: Node.js `npx serve`
```powershell
npx -y serve .
```

---

## Automated Verification & Test Suites

The platform includes comprehensive test suites verifying design system integrity, in-memory dictionary completeness, benchmark matrix numbers, and HTML markup standards:

### 1. Core Asset & Glossary Validation Test
```powershell
node tests/validate_assets.js
```
*Verification Assertions (71 checks)*:
- CSS token definitions (colors, dark/light themes, typography, sticky elements).
- JavaScript syntax and DOM sandbox initialization.
- Master glossary dictionary: exactly 50 terms across Clinical (14), Metric (9), Architecture (13), Dataset (8), and Integrity (6).
- Benchmark ground truth numbers for U-Net, PraNet, HarDNet, SANet, Polyp-PVT, ColonFormer, and CFA-Net.

### 2. Full Page Integrity Test
```powershell
node tests/validate_pages.js
```
*Verifies all 5 HTML deliverables, navigation consistency, DOIs, search IDs, and glossary anchors.*

---

## GitHub Pages Deployment Guide

Because this repository contains no dynamic backend or build artifacts, deploying to **GitHub Pages** takes under 2 minutes:

1. **Initialize & Commit**:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete colonoscopy AI guide and chakra research platform"
   ```
2. **Push to GitHub**:
   ```powershell
   git remote add origin https://github.com/<your-username>/colonoscopy-ai-guide.git
   git branch -M main
   git push -u origin main
   ```
3. **Configure GitHub Pages**:
   - Navigate to your repository on GitHub &rarr; **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and the root folder `/ (root)`.
   - Click **Save**.
4. **Live URL**:
   Your site will be live at `https://<your-username>.github.io/colonoscopy-ai-guide/` within 60 seconds.

---

## Citation & Academic Credit

If you utilize the forensic audit findings, `splits_v2` partitions, or ChakraModel research insights in your work, please cite:

```bibtex
@article{chakramodel2026,
  title={Forensic Benchmark Integrity in Colonoscopy AI: Measuring Video Temporal Leakage, Cross-Dataset Duplication, and the False Alarm Blind Spot},
  author={ChakraModel Research Consortium},
  journal={Colonoscopy AI Open Education & Research Platform},
  year={2026},
  url={https://github.com/colonoscopy-ai-guide}
}
```

---

## License

- **Educational & Narrative Content**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- **Source Code, JavaScript Engines & Stylesheets**: [MIT License](LICENSE).
- **Verified Benchmark Data**: Courtesy of the original dataset authors (Simula Research Laboratory, CVC Barcelona, Lariboisière Hospital, PolypGen Consortium, and PICCOLO Study Group).
