# Project: Colonoscopy AI Education & ChakraModel Research Web Platform

## Architecture & Global Design
- **Platform**: Multi-page static web application (HTML5, CSS3, ES6+ vanilla)
- **Design Tokens & Palette**:
  - Deep space dark (`#0a0e1a`)
  - Electric teal (`#00d4ff`)
  - Warm amber (`#ffb347`)
  - Purple-violet (`#a855f7`)
  - Emerald (`#10b981`)
  - Coral (`#f97316`)
  - Glass cards (`backdrop-filter: blur(12px)`)
- **Typography**: Space Grotesk (Headings), Inter (Body)
- **Icons & CDN**: Lucide Icons CDN, Chart.js CDN
- **Site Structure**:
  - `index.html`: Dual path landing page (Public vs Researcher)
  - `pages/01-what-is-colonoscopy.html`: Anatomy, procedure, ADR, why AI matters
  - `pages/02-polyp-types.html`: Paris classification, histology, risk stratification
  - `pages/03-ai-history.html`: Evolution timeline (CNN -> Transformer -> Foundation Models)
  - `pages/04-architectures.html`: U-Net to EndoMamba deep dive & interactive diagrams
  - `pages/05-datasets.html`: Comprehensive catalog & dataset profiles
  - `pages/06-benchmarks.html`: Interactive benchmark comparisons (Dice/IoU)
  - `pages/06b-clinical-evidence.html`: RCTs, real-world trials, ADR vs PDR
  - `pages/07-clinical-systems.html`: Commercial systems (GI Genius, CAD EYE, ENDO-AID, etc.)
  - `pages/08-benchmark-integrity.html`: Integrity map, video leakage, duplicate analysis
  - `pages/09-chakramodel.html`: ChakraModel research findings & roadmap
  - `pages/10-future.html`: Video foundation models, agentic colonoscopy, open challenges
  - `pages/11-references.html`: Hyperlinked primary literature catalog
  - `pages/12-glossary.html`: Searchable/filterable glossary & tooltip dictionary
  - `assets/css/main.css`: Consolidated stylesheet with dark/light themes & print styling
  - `assets/js/main.js`: Sticky nav, scroll indicator, theme toggle, glossary engine
  - `assets/js/charts.js`: Interactive Chart.js benchmark visualization engine
  - `README.md`: Deployment & GitHub Pages instructions

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Knowledge Extraction & Ledger | Extract verified data from Opus1.md, Roadmap pdf, m:\chakramodelpro | none | DONE |
| 2 | Design System & Core Assets | main.css, main.js, charts.js, glossary data | M1 | DONE |
| 3 | Educational Core & Clinical Context | index.html, 01, 02, 06b, 07 | M2 | DONE |
| 4 | AI Technical & Benchmark Pages | 03, 04, 05, 06 | M2, M3 | DONE |
| 5 | Integrity & ChakraModel Pages | 08, 09, 10, 11, 12 | M2, M4 | DONE |
| 6 | E2E Verification & Deployment | Full platform verification, 7 test suites, forensic audit, README | M3, M4, M5 | DONE (VICTORY CONFIRMED) |

## Interface Contracts
### 1. Glossary Tooltip Hover Contract
- Any HTML element containing a technical term can be wrapped with:
  `<span class="glossary-term" data-term="ADR">Adenoma Detection Rate (ADR)</span>`
- `main.js` tooltip engine reads `data-term`, queries the glossary dictionary, and displays a floating glassmorphic tooltip with a 2-line plain-English definition without navigating away.

### 2. Chart.js Benchmark API (`charts.js`)
- Chart containers provide data attributes: `<div class="chart-container" data-chart="dice-comparison"></div>`
- `charts.js` initialises Chart.js instances with custom neon teal/amber palette matching site theme, supporting dataset filtering and toggles.

### 3. Timeline Slider API (`03-ai-history.html`)
- Interactive slider or era tabs linked to milestone cards with smooth visual transitions.

### 4. Architecture Explorer API (`04-architectures.html`)
- Interactive architecture component cards showing encoder, bottleneck, decoder, loss functions, and key innovation with clickable inspection.

### 5. Dataset Integrity Map (`08-benchmark-integrity.html`)
- Interactive visual diagram of dataset overlaps, frame leakage (ClinicDB), and duplicate frame disclosures (HyperKvasir).

## Critical Integrity Invariants (Zero-Tolerance)
1. **Never merge ColonDB and CVC-300 numbers**: They share 58 frames and must be reported separately.
2. **Never present unadjusted ClinicDB scores as ground truth**: Always state the video leakage caveat clearly.
3. **HyperKvasir segmented images are SHA-256 duplicates**: Note that segmented frames are duplicates of unsegmented frames, not independent extra clinical data.
4. **Zero hallucinations**: Every metric, date, author, and trial number must be cross-referenced to Opus1.md or the Roadmap PDF.
