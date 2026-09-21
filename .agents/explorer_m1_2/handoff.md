# HANDOFF REPORT: AI ARCHITECTURES, DATASETS & BENCHMARKS

**Agent**: Explorer M1-2 (AI Architectures, Datasets & Benchmarks Specialist)  
**Assigned Directory**: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_2`  
**Primary Source**: `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md` (19,236 lines of verified research data)  
**Deliverable File**: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_2\technical_ledger.md`  
**Recipient**: Parent Orchestrator (`6cbe56b6-48be-422f-b717-c93c477a23c6`)  
**Date**: 2026-09-22T00:50:00+05:30  
**Handoff Type**: Hard Handoff (Task Complete)

---

## 1. OBSERVATION

I directly inspected and cross-referenced the research data in `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md` (19,236 lines) and verified all required machine learning specifications, architectural lineages, dataset profiles, and benchmark evaluation tables:

1. **AI Lineage & Evolution Timeline**:
   - Era 1: Handcrafted feature extraction (Karkanis et al. 2003 on wavelet color texture; Bernal et al. 2012/2015 on WM-DOVA energy maps that generated CVC-ColonDB and CVC-ClinicDB; Tajbakhsh et al. 2015/2016 on edge-voting and geometric constraints) to early deep learning (YOLOv2 at 67 FPS by Lee et al. 2020, Faster R-CNN at 22 ms by Yamada et al. 2019, SegNet CADe by Wang et al. 2018 on 27,113 frames from 1,138 patients) (`Opus1.md`, lines 98–186).
   - Era 2: Deep Convolutional Networks (U-Net in 2015 with ~31.0M params; UNet++ in 2018 with dense nested skips; ResUNet++ in 2019 with SE+ASPP; CPD common ancestor by Wu et al. 2019 CVPR establishing the convention of discarding shallow features $f_1, f_2$; PraNet by Fan et al. 2020 MICCAI with Res2Net-50 + PPD + Reverse Attention; HarDNet-MSEG by Huang et al. 2021 with HarDNet68 backbone targeting low DRAM memory traffic; SANet by Wei et al. 2021 with Color Exchange and Shallow Attention Module) (`Opus1.md`, lines 2549–2750, 3040–3850).
   - Era 3: Vision Transformers & Hybrid Networks (Polyp-PVT by Dong et al. 2021 with PVTv2-B2 + CFM + CIM + Graph-SAM crossing 0.8 mDice on unseen ColonDB; SSFormer by Wang et al. 2022 MICCAI introducing "Local Guides Global" via Local Emphasis modules; ColonFormer by Duc et al. 2022 with MiT backbone, UPer decoder, CFP, and Residual Axial Reverse Attention; HSNet by Fu et al. 2022 with filtered shallow features reaching 0.808 on ETIS; TransUNet at 105.5M params; Swin-Unet) (`Opus1.md`, lines 869–970, 6025–6925, 12745–12835, 18984–19055).
   - Era 4: Medical Foundation Models & Selective State Space Models (Zero-shot SAM and MedSAM achieving only 0.593 to 0.862 mDice on Kvasir; Endo-FM 2023 ViT-B/16 with 121.3M params and quadratic complexity $O(P^2 T^2 m)$ dropping to 2.4 FPS at T=128; EndoMamba 2024/2025 with selective state space models scaling linearly $O(P T m)$ maintaining 47.1 FPS at T=32 and 46.9 FPS at T=128 frames, achieving 85.4% CVC-12k Dice; LiteBounD 2026 distilling SAM/DINOv2 into U-Net, gaining +5.1 to +12.5 Dice for only +0.3M parameters) (`Opus1.md`, lines 508–520, 703–851, 978–997, 18050–18504).

2. **Component-by-Component Architectural Breakdown**:
   - Exact mathematical formulations, encoder backbones, decoder structures, loss functions, parameter counts, and inference speeds recorded for U-Net, PraNet, HarDNet-MSEG, Polyp-PVT, ColonFormer, EndoMamba, SANet, SSFormer, and HSNet (`Opus1.md`, lines 2658–2675, 2723–2750, 3020–3035, 3438–3555, 3646–3659, 6545–6760, 6837–6865, 713–735, 832–851).
   - Verbatim loss functions:
     - PraNet Structure Loss: $\mathcal{L} = \mathcal{L}_{wbce} + \mathcal{L}_{wiou}$ with edge weight $\alpha_{ij} = |\text{AvgPool}_{31\times31}(G) - G|$ producing weights from 1.0 to 3.5 on boundaries.
     - ColonFormer Loss: $\mathcal{L} = \frac{1}{2}(\mathcal{L}_{wfocal} + \mathcal{L}_{wiou})$, halving effective gradient magnitude.
     - EndoMamba Loss: $\mathcal{L}_{total} = \mathcal{L}_{cv} + \mathcal{L}_{dm}$ (cross-view and dynamic motion matching).

3. **Comprehensive Dataset Catalog**:
   - Complete profiles for all 10 target datasets:
     1. CVC-ClinicDB / CVC-612: 612 frames, 31 sequences, Hospital Clinic Barcelona; verified 13 patients (`Opus1.md`, line 16983).
     2. CVC-ColonDB: 380 frames from 15 colonoscopies, Hospital Clinic Barcelona; strictly 380 images (never merge with CVC-300).
     3. ETIS-LaribPolypDB: 196 frames, 34 polyps, Lariboisière Hospital Paris, 1225x970 HD.
     4. Kvasir-SEG: 1,000 images, Bærum Hospital Norway; stratified as 700 large, 323 medium, and only 48 small (<64x64) polyps (4.8%).
     5. HyperKvasir: 110,079 images, 374 videos, Bærum Hospital; verified 1,000 segmented polyp images are exact duplicates of Kvasir-SEG (`Opus1.md`, line 14482).
     6. BKAI-IGH NeoPolyp: 1,200 images, Institute of Gastroenterology and Hepatology Vietnam, multi-class neoplastic vs non-neoplastic vs background.
     7. PICCOLO: 3,433 frames, 76 lesions, 40 videos, Hospital Universitario de Móstoles Spain, paired WLI/NBI with Paris and size metadata (`Opus1.md`, line 14484).
     8. LDPolypVideo: 160+ polyp videos, ~42,000 frames, 61 polyp-free negative videos.
     9. SUN-SEG: 158,690 frames (49,136 positive across 378 clips; 109,554 negative across 728 clips; 69% negative); splits: Train 19,544, Easy 17,070, Hard 12,522; 10 attribute annotations (`Opus1.md`, lines 14156–14296).
     10. PolypGen 2021: 6 European centers, 2,409 sequence positive frames, 3,762 single positive frames, 4,275 negative sequence frames (`Opus1.md`, lines 314, 14496).

4. **Benchmark Evaluation Matrix & Methodological Insights**:
   - Full 5-dataset performance matrix (Kvasir, ClinicDB, ColonDB, ETIS, CVC-300) extracted across all models.
   - Identified the four major integrity findings:
     - Standard deviation across test images is $\pm 0.04$ to $\pm 0.05$, exceeding claimed SOTA margins (`Opus1.md`, lines 10889–10896).
     - Non-monotonic scaling in ColonFormer (peaks at MiT-B2/B3 and drops -0.026 on ETIS at B5) (`Opus1.md`, lines 6857–6865).
     - Resolution mismatch: HarDNet-MSEG at 312x312 (21.4% fewer pixels) vs PraNet at 352x352 (`Opus1.md`, lines 3646–3659).
     - Parameter count does not predict inference speed ($\rho = -0.20$); ColonSegNet (5M params) runs at 182 FPS at 512x512, while UltraLightCPS (0.08M params) runs at 113 FPS at 256x256 (`Opus1.md`, lines 17106–17120, 17342–17346).

---

## 2. LOGIC CHAIN

1. **Step 1: Establishing the Empirical Ground Truth**  
   From Observation 1 and 2, `Opus1.md` provides complete, cross-verified tables across seven distinct volumes of research data. To ensure zero hallucinations, every single metric and equation in `technical_ledger.md` was retrieved and matched against the exact text in `Opus1.md`.
2. **Step 2: Reconciling the Four Evolutionary Eras**  
   From Observation 1, the AI timeline progresses logically:
   - Early handcrafted methods failed on sessile/flat lesions because of boundary blur and texture variability.
   - Deep CNNs (U-Net, PraNet) solved in-distribution segmentation but collapsed on hard unseen benchmarks (ETIS-Larib).
   - Transformers (Polyp-PVT, ColonFormer) expanded receptive fields and improved OOD generalization (crossing 0.80 on ColonDB), but introduced quadratic video scaling and non-monotonic overparameterization overfitting.
   - Foundation models & State Space Models (EndoMamba) solved the video complexity bottleneck by substituting quadratic attention with linear selective scan recurrence, enabling real-time edge execution.
3. **Step 3: Uncovering Dataset & Benchmark Integrity Traps**  
   From Observation 3 and 4, standard benchmarks present severe hidden confounding factors:
   - CVC-ClinicDB's random frame splits suffer from video sequence leakage across only 13 patients, giving an artificially inflated baseline.
   - HyperKvasir's 1,000 segmented masks duplicate Kvasir-SEG.
   - Standard benchmark tables compare models trained on 312x312 vs 352x352, confusing architectural merit with pixel reduction.
   - 69% of SUN-SEG's frames are polyp-free negative mucosa, omitted from prior benchmark evaluations, which blinded the field to false alarm rates.
4. **Step 4: Compiling the Technical Ledger & Chart.js Data**  
   The extracted data was structured into `technical_ledger.md` with full Markdown tables, mathematical formulas, parameter counts, FLOPs, FPS, and directly importable Chart.js arrays for immediate frontend deployment.

---

## 3. CAVEATS

1. **Hardware Discrepancies in FPS**: Inference FPS was measured across diverse hardware setups in the literature (NVIDIA TITAN RTX, RTX 2080 Ti, RTX 3090, Tesla P100) and different batch sizes. While `technical_ledger.md` notes the specific hardware where reported, cross-hardware comparisons should be interpreted as approximate operating envelopes.
2. **CFA-Net Nomenclature**: In `Opus1.md`, the primary attention and transformer architectures highlighted alongside Polyp-PVT and ColonFormer are CaraNet (Context Axial Reverse Attention), CCBANet, BDG-Net, and HSNet. Where the prompt referenced "CFA-Net 2023", the ledger documents the exact closely-related architectures analyzed in `Opus1.md` (CaraNet, CFP module in ColonFormer, and HSNet) to maintain complete zero-hallucination fidelity to the primary text.
3. **HyperKvasir Video Subset**: While HyperKvasir contains 110,079 images, only 1,000 have pixel segmentation masks (which are identical to Kvasir-SEG). The remaining images are labeled classification frames or unlabeled video sequences.

---

## 4. CONCLUSION

Explorer M1-2 has completed all tasks specified in the assignment. The deliverable `technical_ledger.md` provides an exhaustive, fully cross-referenced technical ledger covering:
1. Complete AI lineage and timeline across Eras 1–4.
2. Component-by-component architectural deep dives for U-Net, PraNet, HarDNet-MSEG, Polyp-PVT, ColonFormer, EndoMamba, SANet, SSFormer, and HSNet, including exact loss function formulations and complexity profiles.
3. Detailed dataset catalog profiles for 10 public colonoscopy datasets with explicit integrity warnings (patient leakage, duplication, negative frame omission).
4. Full benchmark evaluation matrices across the 5 standard datasets, video segmentation benchmarks, and foundation model adaptations, complete with the four critical methodological discoveries.
5. Ready-to-integrate Chart.js and HTML datasets for frontend visualization.

The output is ready for downstream agents building `03-ai-history.html`, `04-architectures.html`, `05-datasets.html`, `06-benchmarks.html`, and `08-benchmark-integrity.html`.

---

## 5. VERIFICATION METHOD

To independently verify the facts and figures compiled in this report and the technical ledger:
1. **Inspect Deliverable**:
   `view_file C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_2\technical_ledger.md`
2. **Cross-Verify with Opus1.md using Python**:
   - Verify CVC-ClinicDB patient count (13 patients):
     `python -c "with open(r'C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md', 'r', encoding='utf-8') as f: lines = f.readlines(); print(lines[16982])"`
   - Verify EndoMamba vs Endo-FM speeds at T=128 (46.9 FPS vs 2.4 FPS):
     `python -c "with open(r'C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md', 'r', encoding='utf-8') as f: lines = f.readlines(); [print(lines[i].strip()) for i in range(832, 850)]"`
   - Verify ColonFormer scaling non-monotonic degradation:
     `python -c "with open(r'C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md', 'r', encoding='utf-8') as f: lines = f.readlines(); [print(lines[i].strip()) for i in range(6840, 6865)]"`
   - Verify Standard Deviation observation:
     `python -c "with open(r'C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md', 'r', encoding='utf-8') as f: lines = f.readlines(); [print(lines[i].strip()) for i in range(10888, 10898)]"`
   - Verify SUN-SEG negative frame count (109,554 frames / 69%):
     `python -c "with open(r'C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md', 'r', encoding='utf-8') as f: lines = f.readlines(); [print(lines[i].strip()) for i in range(14230, 14240)]"`

*Handoff complete.*
