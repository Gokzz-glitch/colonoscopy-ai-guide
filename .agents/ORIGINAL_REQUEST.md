# Original User Request

## 2026-09-21T19:09:35Z

# Teamwork Project Prompt

Build a premium, interactive, publicly deployable static website (HTML/CSS/JS) for Colonoscopy AI Education & ChakraModel Research, serving both the general public and researchers. 

Working directory: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide`
Integrity mode: development

## Requirements

### R1. Architecture & Design
Implement a multi-page static site (HTML5, CSS3, ES6+) with a dark mode space-themed visual identity (Deep space dark, electric teal, warm amber), no frameworks. Include 12 specific pages with interactive elements (sticky navigation, timeline slider, interactive Chart.js charts, dataset integrity map, architecture diagram, Glossary tooltip hover).

### R2. Content Extraction & Accuracy
Extract content strictly from the provided `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md` (19,236 lines) and `ChakraModel Research Status & Roadmap.pdf`. Every number, claim, and date must be cross-referenced to the source. No hallucinations. Do not approximate without labels. All references must be hyperlinked.

### R3. Benchmark Integrity Nuance
Ensure specific integrity facts are preserved: never merge ColonDB and CVC-300 numbers, note CVC-ClinicDB video leakage, and clarify HyperKvasir segmented images are duplicates. Do not present unadjusted ClinicDB scores as ground truth.

### R4. Team Assignments & Process
Use the specified agent roles (UX Architect, Tech Writer, Creative Problem Solver, Presentation Master, Storyteller, Domain Researcher, Builder/Dev, Checkpoint Reviewer) to execute the build.

## Acceptance Criteria

### Verification Checklist
- [ ] 12 specific HTML pages are created and linked correctly.
- [ ] Timeline slider, interactive charts, and glossary tooltips are functional.
- [ ] Content is verified against `Opus1.md` and `ChakraModel Research Status & Roadmap.pdf`.
- [ ] ColonDB and CVC-300 metrics are reported separately.
- [ ] CVC-ClinicDB video leakage is clearly noted on the integrity and benchmark pages.
- [ ] The user has completed manual cross-verification of the final build.

***

### DETAILED PROJECT SPECIFICATION (From User)
The user has provided a comprehensive specification for the project, which MUST be adhered to:

## 🎯 MISSION STATEMENT
Build a premium, interactive, publicly deployable website that serves two audiences simultaneously:
1. General Public / Patients 
2. Researchers / Engineers

The website must be beautiful, navigable, deeply hyperlinked to original sources, and verifiable against the source PDFs line-by-line.

## 📚 SOURCE DOCUMENTS
- Opus1.pdf (425 pages) / Extracted text available at `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md`
- ChakraModel Research Status & Roadmap.pdf (found at `C:\Users\imgk3\Downloads\ChakraModel Research Status & Roadmap.pdf`)

## 🌐 WEBSITE ARCHITECTURE — What to Build
### Tech Stack
- Core: Vanilla HTML5 + CSS3 + JavaScript (ES6+)
- Hosting: GitHub Pages (static, free, always on)
- Fonts: Google Fonts — Inter for body, Space Grotesk for headings
- Icons: Lucide Icons (CDN)
- Charts: Chart.js (CDN) for interactive benchmark comparisons
- Animations: CSS scroll-driven animations + subtle JS micro-interactions
- Dark mode: Default dark, with toggle for light
- No frameworks needed (but keep modular: one CSS file, one JS file, multiple HTML pages)

### Site Map
```
index.html                    ← Landing / Hero
pages/
  01-what-is-colonoscopy.html  ← Anatomy, procedure, why it matters
  02-polyp-types.html          ← Paris classification, size, histology
  03-ai-history.html           ← CNN era → Transformer era → Foundation model era
  04-architectures.html        ← Deep dive: U-Net to EndoMamba
  05-datasets.html             ← Every dataset with integrity notes
  06-benchmarks.html           ← Interactive Dice/IoU comparison charts
  07-clinical-systems.html     ← GI Genius, CAD EYE, ENDO-AID etc.
  08-benchmark-integrity.html  ← Video leakage, dataset overlap, false alarms
  09-chakramodel.html          ← ChakraModel project: what it found & why it matters
  10-future.html               ← Stage 2, Stage 3, what comes next
  11-references.html           ← All hyperlinked references (arXiv, GitHub, PubMed)
  12-glossary.html             ← Plain-English glossary for non-experts
assets/
  css/
    main.css
  js/
    main.js
    charts.js
  img/                         ← Generated or embedded images
README.md                      ← GitHub Pages deployment instructions
```

## 🎨 DESIGN BRIEF
### Visual Identity
- Primary palette: Deep space dark (`#0a0e1a`) + electric teal (`#00d4ff`) + warm amber (`#ffb347`)
- Accent: Soft purple-violet (`#a855f7`) for AI/research sections
- Success/data: Emerald (`#10b981`) for confirmed results
- Warning: Coral (`#f97316`) for integrity issues / risks
- Glass cards: backdrop-filter: blur(12px) on semi-transparent panels
- Gradients: Radial glows behind hero sections, mesh gradients in section dividers
- Typography scale: H1 = 4rem bold, H2 = 2.5rem, body = 1rem/1.6rem line-height
- Border radius: 16px for cards, 8px for inputs, 50% for pills
- Shadows: layered box-shadows with teal tint at 0.15 opacity

### Interactive Elements (MANDATORY)
1. Sticky navigation with progress bar showing scroll position
2. Timeline slider on `03-ai-history.html` — drag to see model evolution year by year
3. Interactive Dice chart on `06-benchmarks.html` — toggle which datasets/models to compare; Chart.js bar chart
4. Dataset integrity map on `08-benchmark-integrity.html` — visual diagram showing which datasets share frames (click to expand)
5. Architecture diagram on `04-architectures.html` — clickable nodes showing encoder/decoder breakdown
6. Glossary tooltip hover — any technical term on any page shows a 2-line definition on hover without leaving the page
7. "Read the paper" deep links — every claim links to exact arXiv/PubMed/GitHub page (not just homepage)
8. Print-friendly PDF view — CSS `@media print` optimised

## 📋 CONTENT REQUIREMENTS 
Please refer to the detailed user prompt (which provides page-by-page content outlines, specifically for `01-what-is-colonoscopy.html` up through `12-glossary.html`, including the new `06b-clinical-evidence.html`) and extract details rigorously from the Opus1.md markdown file.

## ⚠️ CRITICAL CONSTRAINTS
1. Zero missed context: Every section of both source documents must appear somewhere on the website
2. Zero approximations without labels: If a number is estimated or a lower bound, say so (e.g. "at least 25 frames shared")
3. Double verification: After building, re-read both PDFs and confirm all content is present
4. Never merge ColonDB + CVC-300 numbers — they share 58 frames and must always be reported separately
5. Never present unadjusted ClinicDB scores as ground truth — always note the video leakage caveat
6. HyperKvasir segmented ≠ extra data — always note the SHA-256 duplicate fact
7. The page should be comprehensible to a non-expert — every technical term must be in the glossary and tooltipped
8. Size is NOT a concern — build the full site, no shortcuts, no "summarised for brevity"
