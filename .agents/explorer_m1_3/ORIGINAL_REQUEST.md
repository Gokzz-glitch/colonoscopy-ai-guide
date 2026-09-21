# Original Request to Explorer M1-3

## 2026-09-21T19:12:39Z

You are Explorer M1-3: Benchmark Integrity, ChakraModel Research & Master Catalog Specialist.
Your assigned working directory is:
`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_3`

Read your mission instructions and authoritative source files:
- Primary Sources:
  - `C:\Users\imgk3\Downloads\ChakraModel Research Status & Roadmap.pdf` (17 pages)
  - `m:\chakramodelpro\reports\dataset_audit_2026-09-21\AUDIT_REPORT.md`
  - `m:\chakramodelpro\reports\chakramodel_evaluation_report02=25-18-09-26.md`
  - `C:\Users\imgk3\teamwork_projects\pdf_to_markdown\Opus1.md`
- Workspace reference: `C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\ORIGINAL_REQUEST.md`

Your Task:
Extract all benchmark integrity findings, ChakraModel project history, failure analysis, experimental methodology, and compile the master hyperlinked reference list and master glossary definitions into:
`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_3\integrity_chakra_ledger.md`
and write your completion handoff to:
`C:\Users\imgk3\teamwork_projects\colonoscopy_ai_guide\.agents\explorer_m1_3\handoff.md`.

You must cover four essential domains with exact verified figures:
1. Benchmark Integrity Flaws & Overlap Analysis:
   - Video frame leakage in CVC-ClinicDB: Explain how the 62 test frames in the standard PraNet split originate from the same video sequences as the 550 training frames. Document how adjacent frames (e.g. 368 and 369) were placed in train and val in random splits (27 duplicate/sequence groups spanning train/val). Document the 30 verified near-duplicate links between training frames and the 62 test frames. Explain why ClinicDB test is seen-domain and why unadjusted scores cannot be trusted as out-of-domain generalization.
   - Dataset overlap: Document that CVC-ColonDB and CVC-300 share 58 identical images (59 identical masks) and why they must NEVER be merged into a single metric. Document PolypDB candidate containing at least 25 verified copies of Kvasir-SEG (including Kvasir test frames). Document internal exact duplicates (15 groups in ColonDB, 3 in ETIS).
   - HyperKvasir duplicate disclosure: Document the verified SHA-256 analysis proving that HyperKvasir's 1,000 segmented polyp images are 1,000/1,000 byte-identical duplicates of Kvasir-SEG, meaning HyperKvasir provides ZERO additional segmented polyp images.
   - False alarm blind spot: The standard 5 benchmark test sets contain only positive polyp frames (100% prevalence). In clinical colonoscopy, >95% of frames are normal mucosa. Standard benchmarks never measure false positive / false alarm rates on healthy colon.
2. ChakraModel Project: Motivation, Failure Analysis & Protocol:
   - Executive summary: Pivot from proposing "a new lightweight Transformer U-Net" to "measuring how much standard polyp-segmentation benchmarks overstate progress".
   - Failure analysis of ChakraTransformer: ViT-L/16 @ 384 px (309.2M params, 2M conv decoder). Raw results on Kaggle T4x2: Kvasir Dice 0.838 (0.847 with 4-way TTA), ClinicDB Dice 0.771 (0.784 with TTA). Comparison to published baselines (Polyp-PVT 0.917/0.937, PraNet 0.898/0.899, even U-Net 2015 0.818/0.823). Why it failed: lack of hierarchical feature pyramid, tiny decoder, 10x-12x over-parameterization on ~1,000 images, non-standard evaluation split, speed (7.76 FPS FP32, 26.83 FPS FP16).
   - 128px experiments failure: Vanilla U-Net (0.276), Double U-Net (0.614), Attention U-Net (0.768), UNet++ ResNet-18 (0.830 +/- 0.214). Why from-scratch training collapsed on low resolution.
   - ChakraXAttnUNet v2: Swin-T encoder + cross-attention skip fusion (28.6M params), direct full-resolution skip path fixing v1 flaw.
   - Experimental protocol (Stage 1): 4 models (U-Net + ResNet-34 24.4M, SegFormer + MiT-B2 ~25M, FPN + PVTv2-B2 ~25M, ChakraXAttnUNet v2 28.6M), 3 seeds, fixed recipe (352x352, AdamW lr 1e-4, weight decay 1e-4, cosine schedule, 50 epochs, batch size 16, PraNet structure loss).
   - The 3 experiments: E1 (4 models x 3 seeds on splits_v2: seen/unseen, small polyps <5% area, false alarms on 4,275 PolypGen frames, speed), E2 (6 runs on leaky v1 split to measure validation drift), E3 (ClinicDB 5-fold CV: 20 runs, video-grouped vs random folds over identical 612 frames with fold sizes 216/96/103/102/95 to isolate leakage inflation).
   - The fix: `splits_v2` group-aware split (1,228 train: 469 ClinicDB + 759 Kvasir; 222 val: 81 ClinicDB + 141 Kvasir; 0 groups spanning train/val).
   - Stage 2 & 3 Roadmap: Stage 2 (PICCOLO small/flat polyp strata, official PraNet/Polyp-PVT wrappers, fair-prompt SAM evaluation), Stage 3 (video temporal models on SUN-SEG, LDPolypVideo, multimodal agentic colonoscopy).
3. Master Hyperlinked Reference Catalog:
   - Compile at least 40 authoritative, verified academic references covering clinical trials, segmentation architectures, benchmark datasets, and foundation models.
   - For every entry: Authors, Title, Journal/Conference, Year, Volume/Pages, verified DOI link, arXiv link (if applicable), and official GitHub repository link (if applicable).
4. Master Glossary Dictionary:
   - Compile 45+ technical terms across clinical endoscopy, computer vision, architectures, benchmarks, and data integrity.
   - For each term: Name, Acronym, Category (Clinical, Metric, Architecture, Dataset, Integrity), and a concise 2-sentence plain-English definition specifically formatted for site-wide hover tooltip integration.
