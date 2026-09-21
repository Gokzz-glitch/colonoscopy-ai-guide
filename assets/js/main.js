/**
 * Colonoscopy AI Education & ChakraModel Research Platform
 * Main JavaScript Engine: main.js
 * 
 * Features:
 * 1. Sticky Navigation Scroll Progress Indicator
 * 2. Theme Toggle Engine (Dark Mode Default with LocalStorage Caching)
 * 3. Mobile Hamburger Navigation Drawer
 * 4. Master 50-Term In-Memory Verified Glossary & Smart Tooltip Engine
 * 5. Reusable Search & Filter Utilities (References & Glossary pages)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Master 50-Term Verified Glossary Dictionary
     Source: integrity_chakra_ledger.md (Explorer M1-3 & Opus1.md)
     ========================================================================== */
  const GLOSSARY_TERMS = {
    // --- Category 1: Clinical Endoscopy ---
    "adr": {
      term: "Adenoma Detection Rate (ADR)",
      acronym: "ADR",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The proportion of screening colonoscopies in which an endoscopist detects at least one precancerous adenomatous polyp. It is the primary quality benchmark in clinical colonoscopy, where every 1% increase in ADR corresponds to a 3% reduction in interval colorectal cancer risk.",
      link: "12-glossary.html#adr"
    },
    "pdr": {
      term: "Polyp Detection Rate (PDR)",
      acronym: "PDR",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The percentage of colonoscopy procedures where any polypoid tissue is resected, regardless of whether pathology confirms it as precancerous. While easier to compute than ADR because it requires no histology report, it can be artificially inflated by removing benign non-neoplastic tissue.",
      link: "12-glossary.html#pdr"
    },
    "apc": {
      term: "Adenomas Per Colonoscopy (APC)",
      acronym: "APC / PPC",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A quantitative quality metric calculated as the total number of histologically confirmed adenomas removed divided by the total number of completed colonoscopies. Unlike ADR, which treats finding one polyp the same as finding five, APC measures an endoscopist's thoroughness in clearing multiple synchronous lesions.",
      link: "12-glossary.html#apc"
    },
    "amr": {
      term: "Adenoma Miss Rate (AMR)",
      acronym: "AMR",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The fraction of true adenomatous polyps present in a patient's colon that are completely overlooked during an initial examination, traditionally measured via same-day back-to-back tandem colonoscopies. Tandem trials show human endoscopists miss 20% to 25% of adenomas, a gap AI detection systems aim to close.",
      link: "12-glossary.html#amr"
    },
    "paris-classification": {
      term: "Paris Classification",
      acronym: "Paris",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "An international endoscopic classification system that categorizes superficial gastrointestinal lesions based on their morphological height and profile. Lesions are classified into pedunculated (0-I p), sessile (0-I s), slightly elevated flat (0-II a), completely flat (0-II b), slightly depressed (0-II c), or ulcerated (0-III).",
      link: "12-glossary.html#paris-classification"
    },
    "nice-classification": {
      term: "NICE Classification",
      acronym: "NICE",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The NBI International Colorectal Endoscopic classification criteria used to optically differentiate hyperplastic polyps from precancerous adenomas without physical biopsy. It evaluates lesion color relative to background mucosa, micro-vascular vessels, and surface pit patterns under Narrow Band Imaging.",
      link: "12-glossary.html#nice-classification"
    },
    "kudo-pit-pattern": {
      term: "Kudo Pit Pattern",
      acronym: "Kudo",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A diagnostic grading scale that examines the mucosal crypt architecture and gland opening patterns of a polyp under high-magnification chromoendoscopy. Patterns range from Type I (normal circular pits) and Type II (stellate hyperplastic pits) to Types III-IV (tubular/sulcular adenomas) and Type V (non-structural invasive carcinoma).",
      link: "12-glossary.html#kudo-pit-pattern"
    },
    "sessile-serrated-lesion": {
      term: "Sessile Serrated Lesion (SSL)",
      acronym: "SSL / SSA/P",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A subtle, flat precancerous lesion typically found in the right proximal colon that develops into cancer via the alternative microsatellite instability pathway. Because SSLs exhibit pale coloration, indistinct borders, and frequently conceal themselves beneath an adherent mucus cap, they are the most frequently missed lesions in routine endoscopy.",
      link: "12-glossary.html#sessile-serrated-lesion"
    },
    "diminutive-polyp": {
      term: "Diminutive Polyp",
      acronym: "Diminutive (<=5mm)",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "Any colorectal polyp measuring 5 millimeters or less in maximum physical diameter. Although diminutive polyps carry a very low individual risk of invasive malignancy (<0.5%), they account for over 70% of all polyps encountered during screening examinations.",
      link: "12-glossary.html#diminutive-polyp"
    },
    "resect-and-discard": {
      term: "Resect and Discard",
      acronym: "R&D",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A cost-saving clinical paradigm where diminutive polyps are optically characterized as benign or adenomatous in real-time by AI and immediately discarded rather than being sent for formal laboratory pathology. The European and American endoscopy societies require AI characterization systems to achieve >=90% negative predictive value before approving this protocol.",
      link: "12-glossary.html#resect-and-discard"
    },
    "withdrawal-time": {
      term: "Withdrawal Time",
      acronym: "WT (>=6 min)",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The time spent by an endoscopist carefully inspecting the colonic mucosal surface as the endoscope is retracted from the cecum back to the anal verge. Clinical guidelines mandate a minimum inspection time of 6 minutes in normal colons, as shorter withdrawal times directly correlate with higher polyp miss rates.",
      link: "12-glossary.html#withdrawal-time"
    },
    "cecal-intubation-rate": {
      term: "Cecal Intubation Rate (CIR)",
      acronym: "CIR (>=95%)",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "The percentage of colonoscopy examinations where the endoscopist successfully navigates the scope tip all the way to the medial cecal wall, clearly visualizing the appendiceal orifice and ileocecal valve. High-quality clinical screening programs require a verified cecal intubation rate of at least 95% in routine screening cases.",
      link: "12-glossary.html#cecal-intubation-rate"
    },
    "bbps": {
      term: "Boston Bowel Preparation Scale (BBPS)",
      acronym: "BBPS",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A validated ten-point clinical scoring system assessing colonic cleanliness across three anatomical segments: the right, transverse, and left colon. Each segment is scored from 0 (unprepared mucosa obscured by solid stool) to 3 (perfectly clear mucosa), with total scores below 6 requiring an early repeat exam.",
      link: "12-glossary.html#bbps"
    },
    "alarm-fatigue": {
      term: "Alarm Fatigue",
      acronym: "Alarm Fatigue",
      category: "Clinical",
      badgeClass: "badge-clinical",
      definition: "A dangerous cognitive desensitization state where clinicians become overwhelmed by frequent, repetitive, or irrelevant auditory and visual alerts generated by medical devices. In AI colonoscopy, high false-alarm rates on normal mucosal folds or bubbles lead endoscopists to distrust and ultimately power down the CADe software.",
      link: "12-glossary.html#alarm-fatigue"
    },

    // --- Category 2: Evaluation Metrics ---
    "dice": {
      term: "Dice Similarity Coefficient (DSC)",
      acronym: "Dice / DSC",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "A statistical spatial overlap index that quantifies the harmonic agreement between a predicted binary segmentation mask and ground-truth physician annotations. Calculated as 2|P ∩ G| / (|P| + |G|), a Dice score of 1.0 indicates perfect pixel alignment, while 0.0 indicates zero overlap.",
      link: "12-glossary.html#dice"
    },
    "iou": {
      term: "Intersection over Union (IoU)",
      acronym: "IoU / Jaccard",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "A strict geometric overlap metric defined as the area of overlap between the predicted and target masks divided by the total area of their combined union. In polyp segmentation, IoU penalizes boundary deviations and false positive pixels more severely than the Dice coefficient.",
      link: "12-glossary.html#iou"
    },
    "mae": {
      term: "Mean Absolute Error (MAE)",
      acronym: "MAE",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "The pixel-wise average absolute difference between the continuous predicted saliency map and the binary ground-truth segmentation mask. Unlike overlap metrics that threshold predictions at 0.5, MAE directly assesses how cleanly and decisively the model separates background from foreground across all probabilities.",
      link: "12-glossary.html#mae"
    },
    "far": {
      term: "False Alarm Rate (FAR)",
      acronym: "FAR",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "The percentage of completely healthy, polyp-free endoscopic video frames that erroneously trigger a positive polyp segmentation or detection alert. Measuring FAR on negative video frames is essential to prevent clinical alarm fatigue during long screening procedures.",
      link: "12-glossary.html#far"
    },
    "s-measure": {
      term: "Structural Measure (S-measure)",
      acronym: "S_alpha",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "A modern computer vision evaluation metric that evaluates foreground map quality by combining region-aware structural similarity with object-aware edge contour similarity. Unlike standard Dice, S-measure correlates strongly with human subjective visual perception of polyp boundary fidelity.",
      link: "12-glossary.html#s-measure"
    },
    "e-measure": {
      term: "Enhanced-Alignment Measure (E-measure)",
      acronym: "E_phi",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "An advanced segmentation metric that jointly captures pixel-level alignment errors and image-level global statistics via an enhanced alignment matrix. It penalizes scatter artifacts and phantom predictions across the colonic wall far more effectively than traditional F-measure.",
      link: "12-glossary.html#e-measure"
    },
    "fps": {
      term: "Frames Per Second (FPS)",
      acronym: "FPS (>=25 live)",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "The operational throughput metric measuring the number of video frames an artificial intelligence model can process and display per second. In live clinical colonoscopy, systems must operate at 25 FPS or higher to achieve smooth, real-time video synchronization without perceptible video stutter.",
      link: "12-glossary.html#fps"
    },
    "inference-latency": {
      term: "Inference Latency",
      acronym: "Latency (<40 ms)",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "The physical duration, measured in milliseconds, required for an image frame to travel through neural network computation and render a boundary box on the surgical monitor. For clinical comfort, end-to-end processing latency must remain under 30 to 40 milliseconds to prevent noticeable visual lag.",
      link: "12-glossary.html#inference-latency"
    },
    "peak-vram": {
      term: "Peak VRAM",
      acronym: "Peak VRAM",
      category: "Metric",
      badgeClass: "badge-metric",
      definition: "The maximum amount of dedicated video memory allocated by the graphics processing unit during model training or real-time inference passes. Low peak VRAM consumption is critical for embedding advanced AI models onto resource-constrained edge computers inside hospital endoscopy towers.",
      link: "12-glossary.html#peak-vram"
    },

    // --- Category 3: Model Architectures ---
    "cnn": {
      term: "Convolutional Neural Network (CNN)",
      acronym: "CNN",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A class of deep neural networks that utilizes sliding parameterized kernels to extract hierarchical visual features such as edges, textures, and shapes. CNNs possess built-in translation equivariance and strong local inductive biases, making them exceptionally stable for biomedical image analysis.",
      link: "12-glossary.html#cnn"
    },
    "vit": {
      term: "Vision Transformer (ViT)",
      acronym: "ViT",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A neural architecture that flattens images into non-overlapping spatial patches and processes them as sequence tokens using multi-head self-attention mechanisms. While ViTs capture long-range global image context, standard non-hierarchical variants lack multi-scale feature pyramids and require massive training datasets to converge.",
      link: "12-glossary.html#vit"
    },
    "pvt": {
      term: "Pyramid Vision Transformer (PVT)",
      acronym: "PVT",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A hierarchical transformer backbone that progressively shrinks token spatial dimensions while expanding channel capacity, generating multi-scale feature maps analogous to a CNN pyramid. In models like Polyp-PVT, it allows self-attention to operate efficiently across dense semantic segmentation tasks.",
      link: "12-glossary.html#pvt"
    },
    "swin-transformer": {
      term: "Swin Transformer",
      acronym: "Swin",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A hierarchical vision transformer that calculates self-attention exclusively within localized non-overlapping windows that systematically shift across adjacent layers. This shifted window approach yields linear computational complexity relative to image size while maintaining cross-window connectivity for boundary tracing.",
      link: "12-glossary.html#swin-transformer"
    },
    "reverse-attention": {
      term: "Reverse Attention (RA)",
      acronym: "RA",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A specialized decoder module that subtracts high-level coarse prediction maps from foreground masks to explicitly force subsequent layers to focus on missing boundary regions. Popularized by PraNet, reverse attention acts as an active contour model that refines ambiguous lesion margins.",
      link: "12-glossary.html#reverse-attention"
    },
    "ppd": {
      term: "Parallel Partial Decoder (PPD)",
      acronym: "PPD",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A structural decoder component that aggregates and fuses only high-level semantic feature maps while intentionally bypassing low-level noisy layers. This design prevents shallow feature noise from contaminating global polyp localization maps while cutting computational parameters.",
      link: "12-glossary.html#ppd"
    },
    "rfb": {
      term: "Receptive Field Block (RFB)",
      acronym: "RFB",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "An architectural block inspired by human visual cortex receptive fields that combines multi-branch dilated convolutions with differing dilation rates. RFBs enlarge the effective receptive field without losing spatial resolution, allowing networks to recognize both small and sprawling polyps.",
      link: "12-glossary.html#rfb"
    },
    "ssm-mamba": {
      term: "State Space Model (SSM / Mamba)",
      acronym: "SSM / Mamba",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A modern sequence modeling architecture that maps continuous input signals through time-invariant hidden states with linear computational complexity in sequence length. In endoscopic video architectures like EndoMamba, Mamba models replace quadratic attention to capture long-range temporal history without crashing GPU memory.",
      link: "12-glossary.html#ssm-mamba"
    },
    "dual-path-skip-routing": {
      term: "Dual-Path Skip Routing",
      acronym: "Dual-Path",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "An innovative U-Net skip connection design used in ChakraXAttnUNet v2 that combines context-gated attention selection with a direct unpooled convolutional bypass. This dual routing mechanism ensures global semantic guidance modulates features without sacrificing high-frequency sub-millimeter edge contours.",
      link: "12-glossary.html#dual-path-skip-routing"
    },
    "fpn": {
      term: "Multi-Scale Feature Pyramid (FPN)",
      acronym: "FPN",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A network topology that combines low-resolution, semantically rich features with high-resolution, semantically weak features via top-down pathways and lateral skip connections. This pyramid structure enables computer vision models to accurately segment both tiny 2 mm mucosal lesions and massive 40 mm circumferential polyps.",
      link: "12-glossary.html#fpn"
    },
    "tta": {
      term: "Test-Time Augmentation (TTA)",
      acronym: "TTA",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "An inference ensemble strategy where an input image is evaluated across multiple geometric transformations (such as horizontal flips, vertical flips, and rotations) and the predictions are averaged. TTA typically adds 0.010 to 0.015 points of Dice accuracy at the direct cost of multiplying inference latency.",
      link: "12-glossary.html#tta"
    },
    "inductive-bias": {
      term: "Inductive Bias",
      acronym: "Inductive Bias",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "The set of mathematical assumptions baked directly into an algorithm's architecture that biases it toward learning certain spatial and structural relationships. Convolutional networks have strong spatial locality biases, whereas standard vision transformers must learn spatial relationships entirely from data.",
      link: "12-glossary.html#inductive-bias"
    },
    "deep-supervision": {
      term: "Deep Supervision",
      acronym: "Deep Supervision",
      category: "Architecture",
      badgeClass: "badge-arch",
      definition: "A training technique where auxiliary loss functions are applied to intermediate decoder layers rather than solely at the final output head. This technique combats vanishing gradients in deep networks and forces intermediate feature layers to learn distinctive, semantically meaningful lesion representations.",
      link: "12-glossary.html#deep-supervision"
    },

    // --- Category 4: Benchmark Datasets ---
    "kvasir-seg": {
      term: "Kvasir-SEG",
      acronym: "Kvasir-SEG (1,000 imgs)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A landmark public gastrointestinal dataset released in 2020 by Simula Research Laboratory comprising 1,000 polyp images with expert pixel-level annotations. Collected from patient procedures in Norway, its 100-image held-out partition serves as the universal benchmark for seen-domain segmentation accuracy.",
      link: "12-glossary.html#kvasir-seg"
    },
    "cvc-clinicdb": {
      term: "CVC-ClinicDB (CVC-612)",
      acronym: "CVC-ClinicDB (612 frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A foundational dataset created by the Computer Vision Center containing 612 still video frames extracted from 29 colonoscopy procedures at Hospital Clínic Barcelona. Although widely cited as an out-of-domain benchmark, forensic audits reveal its 62 test frames share video sequences directly with the 550 training frames.",
      link: "12-glossary.html#cvc-clinicdb"
    },
    "cvc-colondb": {
      term: "CVC-ColonDB",
      acronym: "CVC-ColonDB (380 frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "An early benchmark dataset established in 2012 featuring 380 colonoscopy frames extracted from 15 operational colonoscopy videos. ColonDB serves as a primary out-of-distribution generalization test, though researchers must account for its 15 internal duplicate groups and overlap with CVC-300.",
      link: "12-glossary.html#cvc-colondb"
    },
    "etis-larib": {
      term: "ETIS-LaribPolypDB",
      acronym: "ETIS-Larib (196 frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A challenging benchmark containing 196 high-resolution (1225x966) colonoscopy frames acquired from 34 different polyps at Lariboisière Hospital in Paris. ETIS represents the most demanding out-of-domain benchmark in the literature because its images feature tiny, low-contrast, and specularly washed-out polyps.",
      link: "12-glossary.html#etis-larib"
    },
    "cvc-300": {
      term: "CVC-300 (EndoScene Test)",
      acronym: "CVC-300 (60 frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A 60-frame held-out test split derived from the EndoScene challenge repository, historically utilized to evaluate algorithm generalizability. Forensic analysis shows that 58 of its 60 frames are exact-pixel duplicates of frames in CVC-ColonDB, requiring strict independent reporting.",
      link: "12-glossary.html#cvc-300"
    },
    "polypgen": {
      term: "PolypGen",
      acronym: "PolypGen (6 centers)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A comprehensive multi-center benchmark dataset released in 2021/2023 containing both single frames and video sequences collected across 6 distinct international hospitals. It provides multi-center generalization test frames along with 4,275 verified polyp-free negative frames crucial for false alarm auditing.",
      link: "12-glossary.html#polypgen"
    },
    "piccolo": {
      term: "PICCOLO",
      acronym: "PICCOLO (3,433 frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A Spanish multi-center high-definition clinical dataset containing 3,433 frames across 76 individual lesions with zero video overlap between official splits. It is uniquely valuable for research because every lesion includes granular clinical metadata: millimeter size (21 diminutive), Paris morphology (35 flat), and histology.",
      link: "12-glossary.html#piccolo"
    },
    "sun-seg": {
      term: "SUN-SEG",
      acronym: "SUN-SEG (158k frames)",
      category: "Dataset",
      badgeClass: "badge-dataset",
      definition: "A comprehensive video polyp segmentation benchmark established in 2022 featuring 158,690 frames across 1,106 video sequences annotated with pixel masks and bounding boxes. It serves as the primary evaluation standard for spatiotemporal architectures, incorporating explicit attributes for small and occluded polyps.",
      link: "12-glossary.html#sun-seg"
    },

    // --- Category 5: Benchmark Integrity & Data Hygiene ---
    "video-frame-leakage": {
      term: "Video Frame Leakage",
      acronym: "Video Leakage (+12-15% Dice)",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "A fatal experimental flaw that occurs when adjacent or nearby video frames from the same clinical endoscopy recording are distributed across training and validation sets. Because sequential frames captured 40 milliseconds apart are visually near-identical, models memorize specific sequence frames rather than learning generalized features.",
      link: "12-glossary.html#video-frame-leakage"
    },
    "in-sequence-evaluation": {
      term: "In-Sequence Evaluation",
      acronym: "In-Sequence (Seen Domain)",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "An evaluation regime where test frames originate from the exact same video sequences, patients, or hardware configurations as the training data. While useful for measuring temporal video interpolation, it must be clearly disclosed as seen-domain testing and never masqueraded as out-of-domain clinical generalization.",
      link: "12-glossary.html#in-sequence-evaluation"
    },
    "cross-dataset-contamination": {
      term: "Cross-Dataset Contamination",
      acronym: "Contamination",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "The unauthorized or undisclosed presence of identical or near-duplicate images across two supposedly independent medical datasets. Contamination invalidates zero-shot generalization claims, as seen when candidate datasets like PolypDB inadvertently absorb held-out test frames from Kvasir-SEG.",
      link: "12-glossary.html#cross-dataset-contamination"
    },
    "sha-256-cryptographic-audit": {
      term: "SHA-256 Cryptographic Audit",
      acronym: "SHA-256 Audit",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "The process of calculating 256-bit cryptographic hash signatures on every file and pixel matrix within a dataset to mathematically verify uniqueness. In our audit, SHA-256 matching proved that all 1,000 segmented images in HyperKvasir are byte-identical clones of Kvasir-SEG.",
      link: "12-glossary.html#sha-256-cryptographic-audit"
    },
    "group-aware-splitting": {
      term: "Group-Aware Splitting (splits_v2)",
      acronym: "splits_v2",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "A rigorous data-partitioning protocol that enforces video sequences, lesion clusters, and connected duplicate components to remain strictly within either the training set or the validation set. Our splits_v2 protocol eliminated all 27 sequence groups crossing splits in CVC-ClinicDB, guaranteeing zero temporal leakage.",
      link: "12-glossary.html#group-aware-splitting"
    },
    "prompt-leakage": {
      term: "Prompt Leakage (Foundation Models)",
      acronym: "Prompt Leakage (~ +0.35 Dice)",
      category: "Integrity",
      badgeClass: "badge-integrity",
      definition: "An evaluation artifact where interactive vision foundation models (such as SAM or MedSAM) are scored using bounding box prompts derived directly from the ground-truth target mask. In academic polyp segmentation, ground-truth box prompting artificially inflates reported Dice scores by roughly +0.35, obscuring the model's true autonomous detection capabilities.",
      link: "12-glossary.html#prompt-leakage"
    }
  };

  // Comprehensive lookup alias table for flexible matching
  const TERM_ALIASES = {
    "adenoma detection rate": "adr",
    "polyp detection rate": "pdr",
    "adenomas per colonoscopy": "apc",
    "adenoma miss rate": "amr",
    "paris": "paris-classification",
    "nice": "nice-classification",
    "kudo": "kudo-pit-pattern",
    "ssl": "sessile-serrated-lesion",
    "ssa/p": "sessile-serrated-lesion",
    "diminutive": "diminutive-polyp",
    "resect and discard": "resect-and-discard",
    "r&d": "resect-and-discard",
    "withdrawal time": "withdrawal-time",
    "cecal intubation rate": "cecal-intubation-rate",
    "cir": "cecal-intubation-rate",
    "boston bowel preparation scale": "bbps",
    "alarm fatigue": "alarm-fatigue",
    "dsc": "dice",
    "dice coefficient": "dice",
    "dice similarity coefficient": "dice",
    "jaccard": "iou",
    "intersection over union": "iou",
    "mean absolute error": "mae",
    "false alarm rate": "far",
    "s-measure": "s-measure",
    "e-measure": "e-measure",
    "frames per second": "fps",
    "latency": "inference-latency",
    "peak vram": "peak-vram",
    "vram": "peak-vram",
    "convolutional neural network": "cnn",
    "vision transformer": "vit",
    "pyramid vision transformer": "pvt",
    "swin": "swin-transformer",
    "reverse attention": "reverse-attention",
    "ra": "reverse-attention",
    "parallel partial decoder": "ppd",
    "receptive field block": "rfb",
    "mamba": "ssm-mamba",
    "state space model": "ssm-mamba",
    "dual-path": "dual-path-skip-routing",
    "feature pyramid": "fpn",
    "test-time augmentation": "tta",
    "inductive bias": "inductive-bias",
    "deep supervision": "deep-supervision",
    "kvasir": "kvasir-seg",
    "clinicdb": "cvc-clinicdb",
    "colondb": "cvc-colondb",
    "etis": "etis-larib",
    "cvc300": "cvc-300",
    "endoscene": "cvc-300",
    "polypgen": "polypgen",
    "piccolo": "piccolo",
    "sun-seg": "sun-seg",
    "video leakage": "video-frame-leakage",
    "video frame leakage": "video-frame-leakage",
    "in-sequence": "in-sequence-evaluation",
    "contamination": "cross-dataset-contamination",
    "sha-256": "sha-256-cryptographic-audit",
    "splits_v2": "group-aware-splitting",
    "group-aware": "group-aware-splitting",
    "prompt leakage": "prompt-leakage"
  };

  /* ==========================================================================
     2. Sticky Navigation & Scroll Progress Indicator
     ========================================================================== */
  function initScrollProgress() {
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) {
        progressBar.style.width = '0%';
        return;
      }
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /* ==========================================================================
     3. Theme Toggle Engine (Dark Default with LocalStorage)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'colonoscopy_ai_theme';

  function initThemeEngine() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark unless explicit light theme saved
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'dark');
    applyTheme(initialTheme);

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  /* ==========================================================================
     4. Mobile Navigation Drawer Toggle
     ========================================================================== */
  function initMobileNav() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    if (!hamburgerBtn || !mobileDrawer) return;

    function toggleDrawer(open) {
      const shouldOpen = typeof open === 'boolean' ? open : !mobileDrawer.classList.contains('open');
      if (shouldOpen) {
        mobileDrawer.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleDrawer(false);
      }
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        toggleDrawer(false);
      }
    });

    // Close when clicking a nav link in drawer
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });
  }

  /* ==========================================================================
     5. Master Glossary Tooltip Engine
     ========================================================================== */
  let tooltipEl = null;
  let activeTooltipTarget = null;
  let tooltipHideTimeout = null;

  function initGlossaryTooltips() {
    // 1. Create or get tooltip DOM element
    tooltipEl = document.getElementById('glossary-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'glossary-tooltip';
      tooltipEl.className = 'glossary-tooltip';
      tooltipEl.setAttribute('role', 'tooltip');
      tooltipEl.setAttribute('aria-hidden', 'true');
      tooltipEl.innerHTML = `
        <div class="tooltip-header">
          <span class="tooltip-title"></span>
          <span class="badge tooltip-badge"></span>
        </div>
        <p class="tooltip-def"></p>
        <a href="#" class="tooltip-link">View in Glossary &rarr;</a>
      `;
      document.body.appendChild(tooltipEl);

      // Keep tooltip visible when mouse hovers into tooltip itself
      tooltipEl.addEventListener('mouseenter', () => {
        if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
      });
      tooltipEl.addEventListener('mouseleave', () => {
        hideTooltip();
      });
    }

    // 2. Bind to all elements with class .glossary-term or attribute data-term
    const termElements = document.querySelectorAll('.glossary-term, [data-term]');
    termElements.forEach(bindGlossaryEvents);

    // Global listener for touch outside to dismiss
    document.addEventListener('touchstart', (e) => {
      if (tooltipEl && tooltipEl.classList.contains('visible')) {
        if (!tooltipEl.contains(e.target) && (!activeTooltipTarget || !activeTooltipTarget.contains(e.target))) {
          hideTooltip();
        }
      }
    }, { passive: true });
  }

  function resolveGlossaryTerm(element) {
    // 1. Check data-term
    let key = (element.getAttribute('data-term') || '').trim().toLowerCase();
    
    // 2. If no data-term, use element text
    if (!key) {
      key = element.textContent.trim().toLowerCase();
    }

    // Remove surrounding punctuation/brackets
    key = key.replace(/^[(\s]+|[)\s]+$/g, '');

    // Check direct match
    if (GLOSSARY_TERMS[key]) {
      return GLOSSARY_TERMS[key];
    }

    // Check alias table
    if (TERM_ALIASES[key] && GLOSSARY_TERMS[TERM_ALIASES[key]]) {
      return GLOSSARY_TERMS[TERM_ALIASES[key]];
    }

    // Check partial slug matches
    const normalizedKey = key.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    if (GLOSSARY_TERMS[normalizedKey]) {
      return GLOSSARY_TERMS[normalizedKey];
    }
    if (TERM_ALIASES[normalizedKey] && GLOSSARY_TERMS[TERM_ALIASES[normalizedKey]]) {
      return GLOSSARY_TERMS[TERM_ALIASES[normalizedKey]];
    }

    return null;
  }

  function bindGlossaryEvents(element) {
    // Accessibility
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-describedby', 'glossary-tooltip');

    element.addEventListener('mouseenter', () => showTooltip(element));
    element.addEventListener('focus', () => showTooltip(element));
    element.addEventListener('mouseleave', () => scheduleHideTooltip());
    element.addEventListener('blur', () => scheduleHideTooltip());
    
    // Mobile Touch
    element.addEventListener('click', (e) => {
      // Toggle tooltip on mobile click
      if (activeTooltipTarget === element && tooltipEl.classList.contains('visible')) {
        hideTooltip();
      } else {
        showTooltip(element);
      }
    });
  }

  function showTooltip(target) {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);

    const termData = resolveGlossaryTerm(target);
    if (!termData) return;

    activeTooltipTarget = target;

    // Populate content
    const titleEl = tooltipEl.querySelector('.tooltip-title');
    const badgeEl = tooltipEl.querySelector('.tooltip-badge');
    const defEl = tooltipEl.querySelector('.tooltip-def');
    const linkEl = tooltipEl.querySelector('.tooltip-link');

    titleEl.textContent = termData.term;
    badgeEl.textContent = termData.category;
    badgeEl.className = `badge tooltip-badge ${termData.badgeClass || 'badge-teal'}`;
    defEl.textContent = termData.definition;
    
    // Resolve relative path based on current location
    const isInPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const glossaryPath = isInPagesDir ? '12-glossary.html' : 'pages/12-glossary.html';
    const targetAnchor = termData.link.split('#')[1] || '';
    linkEl.href = `${glossaryPath}${targetAnchor ? '#' + targetAnchor : ''}`;

    // Measure and position
    tooltipEl.style.display = 'block';
    tooltipEl.style.visibility = 'hidden';
    tooltipEl.classList.remove('visible');

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 12;

    // Horizontal positioning: center on target, clamped to viewport
    let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding;
    }

    // Vertical positioning: prefer above target, fallback to below
    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;
    let top;

    if (spaceAbove >= tooltipRect.height + 12) {
      // Position above
      top = targetRect.top - tooltipRect.height - 8;
    } else if (spaceBelow >= tooltipRect.height + 12) {
      // Position below
      top = targetRect.bottom + 8;
    } else {
      // Center in viewport if extreme overflow
      top = Math.max(padding, (viewportHeight - tooltipRect.height) / 2);
    }

    tooltipEl.style.left = `${Math.round(left)}px`;
    tooltipEl.style.top = `${Math.round(top)}px`;
    tooltipEl.style.visibility = 'visible';
    tooltipEl.setAttribute('aria-hidden', 'false');
    tooltipEl.classList.add('visible');
  }

  function scheduleHideTooltip() {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
    tooltipHideTimeout = setTimeout(() => {
      hideTooltip();
    }, 150);
  }

  function hideTooltip() {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
    if (!tooltipEl) return;
    tooltipEl.classList.remove('visible');
    tooltipEl.setAttribute('aria-hidden', 'true');
    activeTooltipTarget = null;
  }

  /* ==========================================================================
     6. Search & Filter Utilities for Pages (References & Glossary)
     ========================================================================== */

  /**
   * Initializes references filtering on 11-references.html
   * @param {Object} options
   */
  function initReferencesFilter(options = {}) {
    const searchInput = document.getElementById(options.searchInputId || 'reference-search');
    const categoryButtons = document.querySelectorAll(options.categorySelector || '.ref-category-pill');
    const refItems = document.querySelectorAll(options.itemSelector || '.reference-card');
    const counterEl = document.getElementById(options.counterId || 'reference-count');

    if (!refItems.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      let visibleCount = 0;
      refItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        const itemText = item.textContent.toLowerCase();
        
        const matchesCategory = (activeCategory === 'all' || itemCategory === activeCategory || itemCategory.split(/\s+/).includes(activeCategory));
        const matchesSearch = (!searchQuery || itemText.includes(searchQuery));

        if (matchesCategory && matchesSearch) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (counterEl) {
        counterEl.textContent = `${visibleCount} of ${refItems.length} references shown`;
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        applyFilter();
      });
    });

    applyFilter();
  }

  /**
   * Initializes interactive search & letter jump index for 12-glossary.html
   * @param {Object} options
   */
  function initGlossaryPage(options = {}) {
    const searchInput = document.getElementById(options.searchInputId || 'glossary-search');
    const filterButtons = document.querySelectorAll(options.categorySelector || '.glossary-filter-pill');
    const glossaryCards = document.querySelectorAll(options.itemSelector || '.glossary-card');
    const letterButtons = document.querySelectorAll(options.letterSelector || '.letter-btn');
    const counterEl = document.getElementById(options.counterId || 'glossary-count');

    if (!glossaryCards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      let visibleCount = 0;
      const activeLetters = new Set();

      glossaryCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const term = (card.getAttribute('data-term') || card.querySelector('h3')?.textContent || '').toLowerCase();
        const definition = (card.querySelector('.glossary-def')?.textContent || '').toLowerCase();
        const firstLetter = term.charAt(0).toUpperCase();

        const matchesCat = (activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase());
        const matchesSearch = (!searchQuery || term.includes(searchQuery) || definition.includes(searchQuery));

        if (matchesCat && matchesSearch) {
          card.style.display = '';
          visibleCount++;
          activeLetters.add(firstLetter);
        } else {
          card.style.display = 'none';
        }
      });

      // Update letter jump button states
      letterButtons.forEach(btn => {
        const letter = btn.getAttribute('data-letter');
        if (activeLetters.has(letter)) {
          btn.classList.remove('disabled');
          btn.removeAttribute('disabled');
        } else {
          btn.classList.add('disabled');
          btn.setAttribute('disabled', 'true');
        }
      });

      if (counterEl) {
        counterEl.textContent = `${visibleCount} of ${glossaryCards.length} terms displayed`;
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        applyFilter();
      });
    });

    applyFilter();
  }

  /* ==========================================================================
     7. Public API Export & Auto-Initialization
     ========================================================================== */
  const ColonoscopyAI = {
    glossary: GLOSSARY_TERMS,
    aliases: TERM_ALIASES,
    initScrollProgress,
    initThemeEngine,
    initMobileNav,
    initGlossaryTooltips,
    initReferencesFilter,
    initGlossaryPage,
    resolveGlossaryTerm,
    showTooltip,
    hideTooltip
  };

  // Attach to window
  window.ColonoscopyAI = ColonoscopyAI;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollProgress();
      initThemeEngine();
      initMobileNav();
      initGlossaryTooltips();
    });
  } else {
    initScrollProgress();
    initThemeEngine();
    initMobileNav();
    initGlossaryTooltips();
  }

})();
