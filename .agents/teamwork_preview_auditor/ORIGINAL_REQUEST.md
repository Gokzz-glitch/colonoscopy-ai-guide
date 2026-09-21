## 2026-09-21T19:32:02Z

You are the Forensic Auditor for the Colonoscopy AI Education & ChakraModel Research project.
Your assigned working directory is:
`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\teamwork_preview_auditor`

Project working directory:
`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide`

Ground Truth Sources:
1. `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md`
2. `C:\Users\imgk3\Downloads\ChakraModel Research Status & Roadmap.pdf`
3. `m:\chakramodelpro\reports\dataset_audit_2026-09-21\AUDIT_REPORT.md`
4. `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\orchestrator\synthesis_m1.md`

Your Mission:
Perform rigorous, independent forensic integrity verification of the entire website codebase. You have HARD BINARY VETO POWER. If you detect an integrity violation, cheating, or fabricated data, the project FAILS UNCONDITIONALLY.

Mandatory Integrity Checks (Zero-Tolerance):
1. ColonDB vs CVC-300 Separation:
   - Check every page (especially `05-datasets.html`, `06-benchmarks.html`, `08-benchmark-integrity.html`, `09-chakramodel.html`, `assets/js/charts.js`).
   - Invariant: ColonDB (380 frames) and CVC-300 (60 frames) share 58 exact-pixel frames (59 mask groups).
   - AUDIT CHECK: Are ColonDB and CVC-300 reported SEPARATELY? Did anyone combine, average, or pool them into a merged score? If merged -> INTEGRITY VIOLATION.
2. CVC-ClinicDB Video Frame Leakage:
   - Check every location where CVC-ClinicDB benchmark scores are presented.
   - Invariant: The 62 PraNet test frames originate from the same video sequences as the 550 training frames (30 verified near-duplicate links), inflating scores by +12-15%.
   - AUDIT CHECK: Is this video frame leakage explicitly and prominently noted wherever ClinicDB scores appear? If ClinicDB is presented as an unadjusted, trusted out-of-domain benchmark without leakage warning -> INTEGRITY VIOLATION.
3. HyperKvasir Duplicate Images Disclosure:
   - Check `05-datasets.html`, `08-benchmark-integrity.html`, `09-chakramodel.html`, `assets/js/main.js`.
   - Invariant: HyperKvasir's 1,000 segmented images are byte-identical SHA-256 duplicates of Kvasir-SEG (0 extra segmented clinical data).
   - AUDIT CHECK: Is this fact clearly disclosed? If HyperKvasir segmented images are claimed to be additional unique clinical data -> INTEGRITY VIOLATION.
4. Zero Hallucinations & Fabrication:
   - Spot-check key numbers and citations:
     - Corley et al. NEJM 2014: 1% ADR -> 3% CRC reduction, 5% fatal CRC reduction.
     - 41 RCTs, 31,789 patients.
     - Budzyń et al. (Lancet Gastro Hep Aug 2025) ACCEPT trial: -6.0% ADR drop.
     - AGA 2025 microsimulation: 11 fewer CRCs, 2 fewer deaths, 6-35 extra surveillance colonoscopies.
     - ChakraTransformer: ViT-L/16 @ 384 px, 309.2M params, Kvasir 0.838, ClinicDB 0.771, 7.76 FPS.
     - ChakraXAttnUNet v2: 28.6M params.
     - `splits_v2`: 1,228 train / 222 val, 0 leaking groups.
     - False alarm set: 4,275 frames from 23 PolypGen sequences.
     - PICCOLO: 3,433 frames, 76 lesions, 40 videos (21 diminutive <=5mm, 16 small 6-9mm, 31 large >=10mm).
   - AUDIT CHECK: Are there any fabricated numbers, hallucinated authors, or dummy/facade implementations?
5. Execution:
   - Write a custom Node.js/Python audit script to automatically scan all HTML, JS, CSS, and MD files for compliance.
6. Output:
   - Write full audit report to `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\teamwork_preview_auditor\audit_report.md`.
   - Write handoff report to `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\teamwork_preview_auditor\handoff.md`.
   - Send completion message to parent orchestrator with your verdict (CLEAN or INTEGRITY VIOLATION).
