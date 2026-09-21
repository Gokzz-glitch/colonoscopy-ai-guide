/**
 * Colonoscopy AI Education & ChakraModel Research Platform
 * Interactive Benchmark Visualization Engine: charts.js
 * 
 * Standards:
 * - High-DPI responsive rendering with Chart.js
 * - Dark theme default with automatic dynamic theme-switching integration
 * - Embedded verified benchmark matrices across 5 canonical datasets
 * - Mandatory visible integrity caveats:
 *   * CVC-ClinicDB: Video sequence temporal leakage warning
 *   * CVC-300: 58-frame exact duplicate overlap with CVC-ColonDB warning
 * - Secondary charts: Parameter efficiency vs speed vs generalization, small polyp performance,
 *   and video foundation model temporal scaling (EndoMamba vs Endo-FM).
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Verified Benchmark Matrices
     Sources: Opus1.md (lines 1027-1063, 3474-3545, 10784-10945) & technical_ledger.md
     ========================================================================== */

  const BENCHMARK_MODELS = {
    "unet": {
      name: "U-Net",
      year: 2015,
      params: "31.0M",
      paramsNum: 31.03,
      family: "CNN",
      color: "#94a3b8", // Slate
      fps: 53.0,
      scores: {
        "kvasir": { dice: 0.818, iou: 0.746 },
        "clinicdb": { dice: 0.823, iou: 0.755 },
        "colondb": { dice: 0.512, iou: 0.444 },
        "etis": { dice: 0.398, iou: 0.335 },
        "cvc300": { dice: 0.710, iou: 0.627 }
      }
    },
    "pranet": {
      name: "PraNet",
      year: 2020,
      params: "32.6M",
      paramsNum: 32.55,
      family: "Boundary CNN",
      color: "#f97316", // Coral
      fps: 50.0,
      scores: {
        "kvasir": { dice: 0.898, iou: 0.840 },
        "clinicdb": { dice: 0.899, iou: 0.849 },
        "colondb": { dice: 0.709, iou: 0.640 },
        "etis": { dice: 0.628, iou: 0.567 },
        "cvc300": { dice: 0.871, iou: 0.797 }
      }
    },
    "hardnet": {
      name: "HarDNet-MSEG",
      year: 2021,
      params: "33.3M",
      paramsNum: 33.34,
      family: "Low-CIO CNN",
      color: "#eab308", // Yellow-Amber
      fps: 88.0,
      scores: {
        "kvasir": { dice: 0.904, iou: 0.857 },
        "clinicdb": { dice: 0.932, iou: 0.848 },
        "colondb": { dice: 0.731, iou: 0.677 },
        "etis": { dice: 0.677, iou: 0.613 },
        "cvc300": { dice: 0.887, iou: 0.803 }
      }
    },
    "sanet": {
      name: "SANet",
      year: 2021,
      params: "32.6M",
      paramsNum: 32.55,
      family: "Attention CNN",
      color: "#a855f7", // Purple
      fps: 72.0,
      scores: {
        "kvasir": { dice: 0.904, iou: 0.847 },
        "clinicdb": { dice: 0.916, iou: 0.859 },
        "colondb": { dice: 0.753, iou: 0.670 },
        "etis": { dice: 0.750, iou: 0.654 },
        "cvc300": { dice: 0.888, iou: 0.815 }
      }
    },
    "polyp_pvt": {
      name: "Polyp-PVT",
      year: 2021,
      params: "44.6M",
      paramsNum: 44.60,
      family: "Vision Transformer",
      color: "#3b82f6", // Blue
      fps: 30.0,
      scores: {
        "kvasir": { dice: 0.917, iou: 0.864 },
        "clinicdb": { dice: 0.937, iou: 0.889 },
        "colondb": { dice: 0.808, iou: 0.727 },
        "etis": { dice: 0.787, iou: 0.706 },
        "cvc300": { dice: 0.900, iou: 0.833 }
      }
    },
    "ssformer": {
      name: "SSFormer",
      year: 2022,
      params: "33.5M",
      paramsNum: 33.50,
      family: "Hybrid ViT",
      color: "#ec4899", // Pink
      fps: 28.0,
      scores: {
        "kvasir": { dice: 0.917, iou: 0.864 },
        "clinicdb": { dice: 0.930, iou: 0.880 },
        "colondb": { dice: 0.770, iou: 0.721 },
        "etis": { dice: 0.796, iou: 0.720 },
        "cvc300": { dice: 0.895, iou: 0.827 }
      }
    },
    "colonformer": {
      name: "ColonFormer",
      year: 2022,
      params: "46.6M",
      paramsNum: 46.64,
      family: "Hierarchical ViT",
      color: "#00d4ff", // Electric Teal
      fps: 22.0,
      scores: {
        "kvasir": { dice: 0.924, iou: 0.870 },
        "clinicdb": { dice: 0.932, iou: 0.885 },
        "colondb": { dice: 0.814, iou: 0.730 },
        "etis": { dice: 0.801, iou: 0.725 },
        "cvc300": { dice: 0.906, iou: 0.835 }
      }
    },
    "cfa_net": {
      name: "CFA-Net",
      year: 2023,
      params: "30.1M",
      paramsNum: 30.10,
      family: "Cross-Feature CNN",
      color: "#14b8a6", // Teal-Cyan
      fps: 24.0,
      scores: {
        "kvasir": { dice: 0.923, iou: 0.873 },
        "clinicdb": { dice: 0.933, iou: 0.885 },
        "colondb": { dice: 0.805, iou: 0.725 },
        "etis": { dice: 0.795, iou: 0.718 },
        "cvc300": { dice: 0.902, iou: 0.831 }
      }
    },
    "hsnet": {
      name: "HSNet",
      year: 2022,
      params: "46.6M",
      paramsNum: 46.64,
      family: "Hybrid Semantic",
      color: "#10b981", // Emerald
      fps: 22.0,
      scores: {
        "kvasir": { dice: 0.926, iou: 0.877 },
        "clinicdb": { dice: 0.937, iou: 0.887 },
        "colondb": { dice: 0.810, iou: 0.735 },
        "etis": { dice: 0.808, iou: 0.734 },
        "cvc300": { dice: 0.903, iou: 0.839 }
      }
    }
  };

  const BENCHMARK_DATASETS = {
    "all": {
      name: "All 5 Benchmarks (Radar/Grouped)",
      shortName: "All 5",
      type: "Comprehensive",
      frames: "802 test frames",
      caveat: null
    },
    "kvasir": {
      name: "Kvasir-SEG Test",
      shortName: "Kvasir-SEG",
      type: "Seen Domain",
      frames: "100 images",
      caveat: "Seen-domain training pool distribution; 70% large polyps (>160px), only 4.8% small (<64px)."
    },
    "clinicdb": {
      name: "CVC-ClinicDB Test",
      shortName: "CVC-ClinicDB",
      type: "Seen Domain (Video Leakage)",
      frames: "62 frames",
      caveat: "METHODOLOGICAL WARNING: All 62 test frames originate from the same 13-patient video sequences as training frames (30 verified near-duplicate links). Artificially inflates Dice by +12% to +15%."
    },
    "colondb": {
      name: "CVC-ColonDB",
      shortName: "CVC-ColonDB",
      type: "Unseen Out-of-Distribution",
      frames: "380 frames (15 videos)",
      caveat: "INTEGRITY MANDATE: Distinct dataset from CVC-300. Never merge or pool scores. Contains 15 internal duplicate groups."
    },
    "etis": {
      name: "ETIS-LaribPolypDB",
      shortName: "ETIS-Larib",
      type: "Hard Out-of-Distribution",
      frames: "196 frames (34 polyps)",
      caveat: "High-definition (1225x966). Primary clinical generalization benchmark: flat, diminutive, and low-contrast polyps."
    },
    "cvc300": {
      name: "CVC-300 (EndoScene)",
      shortName: "CVC-300",
      type: "Unseen (58-Frame Overlap)",
      frames: "60 frames",
      caveat: "INTEGRITY MANDATE: 58 of its 60 frames (96.7%) are byte-for-byte identical to CVC-ColonDB. Must always be reported independently."
    }
  };

  /* ==========================================================================
     2. Chart Theme & Styling Configuration
     ========================================================================== */
  function getThemeColors() {
    const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
    return {
      textColor: isDark ? '#f8fafc' : '#0f172a',
      mutedTextColor: isDark ? '#94a3b8' : '#64748b',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
      cardBg: isDark ? '#111827' : '#ffffff',
      tooltipBg: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.96)',
      tooltipBorder: isDark ? 'rgba(0, 212, 255, 0.35)' : 'rgba(2, 132, 199, 0.35)',
      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    };
  }

  /* ==========================================================================
     3. Primary Benchmark Chart Controller
     ========================================================================== */
  let benchmarkChartInstance = null;
  let activeBenchmarkDataset = 'all';
  let activeBenchmarkMetric = 'dice'; // 'dice' or 'iou'
  let disabledModels = new Set();

  /**
   * Initializes the primary benchmark comparison chart
   * @param {string} canvasId
   * @param {Object} options
   */
  function initBenchmarkChart(canvasId = 'benchmark-chart', options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    if (typeof window.Chart === 'undefined') {
      console.warn('[ColonoscopyCharts] Chart.js is not loaded on this page.');
      renderFallbackTable(canvas);
      return null;
    }

    // Destroy existing instance if present
    if (benchmarkChartInstance) {
      benchmarkChartInstance.destroy();
      benchmarkChartInstance = null;
    }

    const theme = getThemeColors();
    const chartConfig = buildBenchmarkChartConfig(theme);
    benchmarkChartInstance = new window.Chart(canvas, chartConfig);

    // Update caption warning based on initial dataset
    updateWarningCaption(activeBenchmarkDataset);

    // Listen to theme changes to dynamically re-style chart
    watchThemeChange(() => {
      if (benchmarkChartInstance) {
        const newTheme = getThemeColors();
        updateChartTheme(benchmarkChartInstance, newTheme);
      }
    });

    return benchmarkChartInstance;
  }

  function buildBenchmarkChartConfig(theme) {
    if (activeBenchmarkDataset === 'all') {
      // Grouped Bar Chart comparing all 5 datasets across active models
      const datasetsKeys = ['kvasir', 'clinicdb', 'colondb', 'etis', 'cvc300'];
      const labels = datasetsKeys.map(k => BENCHMARK_DATASETS[k].shortName);

      const chartDatasets = Object.keys(BENCHMARK_MODELS)
        .filter(modelKey => !disabledModels.has(modelKey))
        .map(modelKey => {
          const m = BENCHMARK_MODELS[modelKey];
          const data = datasetsKeys.map(dKey => m.scores[dKey][activeBenchmarkMetric]);
          return {
            label: `${m.name} (${m.year})`,
            data: data,
            backgroundColor: hexToRgba(m.color, 0.75),
            borderColor: m.color,
            borderWidth: 1.5,
            borderRadius: 4,
            barPercentage: 0.8,
            categoryPercentage: 0.85
          };
        });

      return {
        type: 'bar',
        data: {
          labels: labels,
          datasets: chartDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 350 },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: theme.textColor,
                font: { family: theme.fontFamily, size: 12, weight: 500 },
                usePointStyle: true,
                pointStyle: 'rectRounded',
                padding: 16
              }
            },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.textColor,
              bodyColor: theme.textColor,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
              boxPadding: 6,
              callbacks: {
                label: function (context) {
                  const val = context.raw;
                  return ` ${context.dataset.label}: ${(val * 100).toFixed(1)}% (${activeBenchmarkMetric.toUpperCase()} = ${val.toFixed(3)})`;
                },
                afterFooter: function (contexts) {
                  const datasetIndex = contexts[0].dataIndex;
                  const dKey = datasetsKeys[datasetIndex];
                  if (dKey === 'clinicdb') {
                    return "\n⚠️ Video leakage: In-sequence evaluation artifact";
                  } else if (dKey === 'cvc300') {
                    return "\n⚠️ 58 frames duplicate of CVC-ColonDB";
                  }
                  return "";
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: theme.gridColor, drawBorder: false },
              ticks: { color: theme.textColor, font: { family: theme.fontFamily, weight: 600 } }
            },
            y: {
              min: 0.3,
              max: 1.0,
              grid: { color: theme.gridColor, drawBorder: false },
              ticks: {
                color: theme.mutedTextColor,
                font: { family: theme.fontFamily },
                callback: (val) => `${(val * 100).toFixed(0)}%`
              },
              title: {
                display: true,
                text: activeBenchmarkMetric === 'dice' ? 'Mean Dice Similarity Coefficient (mDice)' : 'Mean Intersection over Union (mIoU)',
                color: theme.textColor,
                font: { family: theme.fontFamily, size: 13, weight: 600 }
              }
            }
          }
        }
      };
    } else {
      // Single Dataset Leaderboard: Horizontal Bar Chart ordered by score
      const dKey = activeBenchmarkDataset;
      const modelKeys = Object.keys(BENCHMARK_MODELS).filter(m => !disabledModels.has(m));

      // Sort models descending by score on this dataset
      modelKeys.sort((a, b) => {
        return BENCHMARK_MODELS[b].scores[dKey][activeBenchmarkMetric] - BENCHMARK_MODELS[a].scores[dKey][activeBenchmarkMetric];
      });

      const labels = modelKeys.map(k => `${BENCHMARK_MODELS[k].name} ('${BENCHMARK_MODELS[k].year.toString().slice(2)})`);
      const data = modelKeys.map(k => BENCHMARK_MODELS[k].scores[dKey][activeBenchmarkMetric]);
      const colors = modelKeys.map(k => BENCHMARK_MODELS[k].color);

      return {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: `${BENCHMARK_DATASETS[dKey].shortName} - ${activeBenchmarkMetric.toUpperCase()}`,
            data: data,
            backgroundColor: colors.map(c => hexToRgba(c, 0.75)),
            borderColor: colors,
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 350 },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.textColor,
              bodyColor: theme.textColor,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const mKey = modelKeys[context.dataIndex];
                  const m = BENCHMARK_MODELS[mKey];
                  const val = context.raw;
                  return [
                    ` ${activeBenchmarkMetric.toUpperCase()}: ${(val * 100).toFixed(1)}% (${val.toFixed(3)})`,
                    ` Architecture: ${m.family}`,
                    ` Parameters: ${m.params} | Speed: ${m.fps} FPS`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              min: 0.3,
              max: 1.0,
              grid: { color: theme.gridColor, drawBorder: false },
              ticks: {
                color: theme.mutedTextColor,
                font: { family: theme.fontFamily },
                callback: (val) => `${(val * 100).toFixed(0)}%`
              },
              title: {
                display: true,
                text: activeBenchmarkMetric === 'dice' ? 'Mean Dice Coefficient (mDice)' : 'Mean IoU',
                color: theme.textColor,
                font: { family: theme.fontFamily, size: 13, weight: 600 }
              }
            },
            y: {
              grid: { display: false },
              ticks: { color: theme.textColor, font: { family: theme.fontFamily, weight: 600 } }
            }
          }
        }
      };
    }
  }

  function setBenchmarkDataset(datasetKey) {
    if (!BENCHMARK_DATASETS[datasetKey]) return;
    activeBenchmarkDataset = datasetKey;
    if (benchmarkChartInstance) {
      const theme = getThemeColors();
      const newConfig = buildBenchmarkChartConfig(theme);
      benchmarkChartInstance.config.type = newConfig.type;
      benchmarkChartInstance.config.data = newConfig.data;
      benchmarkChartInstance.config.options = newConfig.options;
      benchmarkChartInstance.update();
    }
    updateWarningCaption(datasetKey);
  }

  function setBenchmarkMetric(metricKey) {
    if (metricKey !== 'dice' && metricKey !== 'iou') return;
    activeBenchmarkMetric = metricKey;
    if (benchmarkChartInstance) {
      const theme = getThemeColors();
      const newConfig = buildBenchmarkChartConfig(theme);
      benchmarkChartInstance.config.type = newConfig.type;
      benchmarkChartInstance.config.data = newConfig.data;
      benchmarkChartInstance.config.options = newConfig.options;
      benchmarkChartInstance.update();
    }
  }

  function toggleModel(modelKey) {
    if (!BENCHMARK_MODELS[modelKey]) return;
    if (disabledModels.has(modelKey)) {
      disabledModels.delete(modelKey);
    } else {
      disabledModels.add(modelKey);
    }
    if (benchmarkChartInstance) {
      const theme = getThemeColors();
      const newConfig = buildBenchmarkChartConfig(theme);
      benchmarkChartInstance.config.data = newConfig.data;
      benchmarkChartInstance.update();
    }
  }

  function updateWarningCaption(datasetKey) {
    const captionEl = document.getElementById('benchmark-warning-caption');
    if (!captionEl) return;

    const ds = BENCHMARK_DATASETS[datasetKey];
    if (datasetKey === 'clinicdb') {
      captionEl.style.display = 'flex';
      captionEl.className = 'chart-caption-warning';
      captionEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <span><strong>Forensic Integrity Alert:</strong> CVC-ClinicDB test frames share identical patient video sequences with training frames. Published SOTA scores (0.90–0.94 mDice) represent in-sequence memorization, not out-of-domain clinical generalization.</span>
      `;
    } else if (datasetKey === 'cvc300') {
      captionEl.style.display = 'flex';
      captionEl.className = 'chart-caption-warning';
      captionEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span><strong>Overlap Warning:</strong> 58 of the 60 frames in CVC-300 are exact-pixel duplicates of CVC-ColonDB. Never merge CVC-ColonDB and CVC-300 into a pooled composite score.</span>
      `;
    } else if (datasetKey === 'colondb') {
      captionEl.style.display = 'flex';
      captionEl.className = 'chart-caption-warning';
      captionEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span><strong>Integrity Note:</strong> CVC-ColonDB (380 frames) contains 15 internal duplicate groups and 58 frames identical to CVC-300. Scores must be evaluated independently.</span>
      `;
    } else if (datasetKey === 'kvasir') {
      captionEl.style.display = 'flex';
      captionEl.className = 'chart-caption-warning';
      captionEl.style.color = 'var(--text-secondary)';
      captionEl.style.borderColor = 'var(--border-subtle)';
      captionEl.style.background = 'var(--surface-card)';
      captionEl.innerHTML = `
        <span><strong>Distribution Note:</strong> Kvasir-SEG test set contains 70% large polyps (>160x160 px) and only 4.8% small polyps (<64x64 px). High aggregate Dice masks failure on subtle lesions.</span>
      `;
    } else {
      captionEl.style.display = 'flex';
      captionEl.className = 'chart-caption-warning';
      captionEl.style.color = 'var(--text-secondary)';
      captionEl.style.borderColor = 'var(--border-subtle)';
      captionEl.style.background = 'var(--surface-card)';
      captionEl.innerHTML = `
        <span><strong>Benchmark Standard:</strong> Protocol A (PraNet split: 900 Kvasir-SEG + 550 ClinicDB train). Notice the stark collapse between seen sets (ClinicDB/Kvasir ~0.90+) and true unseen sets (ETIS-Larib ~0.62–0.80).</span>
      `;
    }
  }

  /* ==========================================================================
     4. Secondary Chart A: Efficiency (Parameters vs FPS vs Generalization)
     ========================================================================== */
  let efficiencyChartInstance = null;

  function initEfficiencyChart(canvasId = 'efficiency-chart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof window.Chart === 'undefined') return null;

    if (efficiencyChartInstance) {
      efficiencyChartInstance.destroy();
      efficiencyChartInstance = null;
    }

    const theme = getThemeColors();
    const dataPoints = [
      { name: "U-Net", x: 31.0, y: 53.0, etis: 0.398, r: 8, color: "#94a3b8" },
      { name: "UNet++", x: 36.6, y: 25.0, etis: 0.401, r: 8, color: "#cbd5e1" },
      { name: "ResUNet++", x: 4.1, y: 40.0, etis: 0.401, r: 8, color: "#64748b" },
      { name: "ColonSegNet", x: 5.0, y: 182.4, etis: 0.450, r: 9, color: "#06b6d4" },
      { name: "PraNet", x: 32.6, y: 50.0, etis: 0.628, r: 12, color: "#f97316" },
      { name: "HarDNet-MSEG", x: 33.3, y: 88.0, etis: 0.677, r: 14, color: "#eab308" },
      { name: "SANet", x: 32.6, y: 72.0, etis: 0.750, r: 15, color: "#a855f7" },
      { name: "Polyp-PVT", x: 44.6, y: 30.0, etis: 0.787, r: 16, color: "#3b82f6" },
      { name: "SSFormer", x: 33.5, y: 28.0, etis: 0.796, r: 16.5, color: "#ec4899" },
      { name: "ColonFormer", x: 46.6, y: 22.0, etis: 0.801, r: 17, color: "#00d4ff" },
      { name: "HSNet", x: 46.6, y: 22.0, etis: 0.808, r: 17.5, color: "#10b981" },
      { name: "ChakraTransformer (Failed)", x: 309.2, y: 7.8, etis: 0.350, r: 6, color: "#ef4444" }
    ];

    efficiencyChartInstance = new window.Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: dataPoints.map(p => ({
          label: p.name,
          data: [{ x: p.x, y: p.y, r: p.r }],
          backgroundColor: hexToRgba(p.color, 0.75),
          borderColor: p.color,
          borderWidth: 1.5,
          customData: p
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 11 },
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.textColor,
            bodyColor: theme.textColor,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: (ctx) => ctx[0].dataset.label,
              label: function (ctx) {
                const item = ctx.dataset.customData;
                return [
                  ` Parameters: ${item.x} Million`,
                  ` Inference Speed: ${item.y} FPS`,
                  ` ETIS-Larib Dice: ${(item.etis * 100).toFixed(1)}% (Bubble Size)`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Parameter Count (Millions, Log Scale)',
              color: theme.textColor,
              font: { family: theme.fontFamily, weight: 600 }
            },
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: {
              color: theme.mutedTextColor,
              callback: (val) => `${val}M`
            }
          },
          y: {
            title: {
              display: true,
              text: 'Inference Throughput (FPS on GPU)',
              color: theme.textColor,
              font: { family: theme.fontFamily, weight: 600 }
            },
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: { color: theme.mutedTextColor }
          }
        }
      }
    });

    return efficiencyChartInstance;
  }

  /* ==========================================================================
     5. Secondary Chart B: Small Polyp Performance Collapse (<5% Area)
     ========================================================================== */
  let smallPolypChartInstance = null;

  function initSmallPolypChart(canvasId = 'small-polyp-chart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof window.Chart === 'undefined') return null;

    if (smallPolypChartInstance) {
      smallPolypChartInstance.destroy();
      smallPolypChartInstance = null;
    }

    const theme = getThemeColors();
    const models = [
      { name: "U-Net", overall: 0.818, small: 0.485, color: "#94a3b8" },
      { name: "PraNet", overall: 0.898, small: 0.642, color: "#f97316" },
      { name: "HarDNet-MSEG", overall: 0.904, small: 0.680, color: "#eab308" },
      { name: "SANet (SAM Gate)", overall: 0.904, small: 0.765, color: "#a855f7" },
      { name: "Polyp-PVT", overall: 0.917, small: 0.781, color: "#3b82f6" },
      { name: "ColonFormer", overall: 0.924, small: 0.793, color: "#00d4ff" },
      { name: "ChakraXAttn v2", overall: 0.912, small: 0.798, color: "#10b981" }
    ];

    smallPolypChartInstance = new window.Chart(canvas, {
      type: 'bar',
      data: {
        labels: models.map(m => m.name),
        datasets: [
          {
            label: "Overall Test Set Dice",
            data: models.map(m => m.overall),
            backgroundColor: "rgba(148, 163, 184, 0.4)",
            borderColor: "#94a3b8",
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: "Diminutive / Small Polyp Dice (<5% Area)",
            data: models.map(m => m.small),
            backgroundColor: "rgba(0, 212, 255, 0.75)",
            borderColor: "#00d4ff",
            borderWidth: 1.5,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: theme.textColor, font: { family: theme.fontFamily } }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.textColor,
            bodyColor: theme.textColor,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            callbacks: {
              afterBody: function (ctx) {
                const modelIndex = ctx[0].dataIndex;
                const drop = ((models[modelIndex].overall - models[modelIndex].small) * 100).toFixed(1);
                return `Accuracy Drop: -${drop} percentage points on diminutive polyps`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: { color: theme.textColor, font: { family: theme.fontFamily, weight: 600 } }
          },
          y: {
            min: 0.4,
            max: 1.0,
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: {
              color: theme.mutedTextColor,
              callback: (v) => `${(v * 100).toFixed(0)}%`
            },
            title: {
              display: true,
              text: 'Mean Dice Score',
              color: theme.textColor,
              font: { family: theme.fontFamily }
            }
          }
        }
      }
    });

    return smallPolypChartInstance;
  }

  /* ==========================================================================
     6. Secondary Chart C: Video Foundation Model Temporal Scaling
     ========================================================================== */
  let videoScalingChartInstance = null;

  function initVideoScalingChart(canvasId = 'video-scaling-chart') {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof window.Chart === 'undefined') return null;

    if (videoScalingChartInstance) {
      videoScalingChartInstance.destroy();
      videoScalingChartInstance = null;
    }

    const theme = getThemeColors();
    videoScalingChartInstance = new window.Chart(canvas, {
      type: 'line',
      data: {
        labels: ["T=8 frames", "T=16 frames", "T=32 frames", "T=64 frames", "T=128 frames"],
        datasets: [
          {
            label: "Endo-FM (Transformer Space-Time Attention - Quadratic O(P²T²m))",
            data: [27.8, 21.7, 9.7, 5.1, 2.4],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 5
          },
          {
            label: "EndoMamba (State Space Model - Linear Scan O(PTm))",
            data: [47.5, 47.3, 47.1, 47.0, 46.9],
            borderColor: "#00d4ff",
            backgroundColor: "rgba(0, 212, 255, 0.15)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.1,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: theme.textColor, font: { family: theme.fontFamily, size: 12 } }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.textColor,
            bodyColor: theme.textColor,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            callbacks: {
              afterBody: function (ctx) {
                return ctx[0].datasetIndex === 0 && ctx[0].dataIndex >= 2
                  ? "⚠️ Fails live real-time clinical threshold (>=25 FPS)"
                  : "✓ Real-time clinical throughput maintained";
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: { color: theme.textColor, font: { family: theme.fontFamily, weight: 600 } }
          },
          y: {
            min: 0,
            max: 60,
            grid: { color: theme.gridColor, drawBorder: false },
            ticks: {
              color: theme.mutedTextColor,
              callback: (v) => `${v} FPS`
            },
            title: {
              display: true,
              text: 'Inference Throughput (FPS on RTX 3090)',
              color: theme.textColor,
              font: { family: theme.fontFamily }
            }
          }
        }
      }
    });

    return videoScalingChartInstance;
  }

  /* ==========================================================================
     7. Dynamic Theme Watching & Helpers
     ========================================================================== */
  function watchThemeChange(callback) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          callback();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  function updateChartTheme(chart, theme) {
    if (!chart || !chart.options) return;

    // Update legend
    if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
      chart.options.plugins.legend.labels.color = theme.textColor;
    }

    // Update tooltip
    if (chart.options.plugins && chart.options.plugins.tooltip) {
      chart.options.plugins.tooltip.backgroundColor = theme.tooltipBg;
      chart.options.plugins.tooltip.titleColor = theme.textColor;
      chart.options.plugins.tooltip.bodyColor = theme.textColor;
      chart.options.plugins.tooltip.borderColor = theme.tooltipBorder;
    }

    // Update scales
    if (chart.options.scales) {
      Object.keys(chart.options.scales).forEach(scaleKey => {
        const scale = chart.options.scales[scaleKey];
        if (scale.ticks) scale.ticks.color = theme.mutedTextColor;
        if (scale.grid) scale.grid.color = theme.gridColor;
        if (scale.title) scale.title.color = theme.textColor;
      });
    }

    chart.update('none');
  }

  function hexToRgba(hex, alpha = 1) {
    const cleanHex = hex.replace('#', '');
    let r, g, b;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function renderFallbackTable(container) {
    const parent = container.parentElement;
    const tableHtml = `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Year</th>
              <th>Params</th>
              <th class="numeric">Kvasir Dice</th>
              <th class="numeric">ClinicDB Dice</th>
              <th class="numeric">ColonDB Dice</th>
              <th class="numeric">ETIS Dice</th>
              <th class="numeric">CVC-300 Dice</th>
            </tr>
          </thead>
          <tbody>
            ${Object.keys(BENCHMARK_MODELS).map(k => {
              const m = BENCHMARK_MODELS[k];
              return `
                <tr>
                  <td><strong>${m.name}</strong></td>
                  <td>${m.year}</td>
                  <td><code>${m.params}</code></td>
                  <td class="numeric">${m.scores.kvasir.dice.toFixed(3)}</td>
                  <td class="numeric">${m.scores.clinicdb.dice.toFixed(3)}</td>
                  <td class="numeric">${m.scores.colondb.dice.toFixed(3)}</td>
                  <td class="numeric">${m.scores.etis.dice.toFixed(3)}</td>
                  <td class="numeric">${m.scores.cvc300.dice.toFixed(3)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
    parent.innerHTML = tableHtml;
  }

  /* ==========================================================================
     8. Public Export
     ========================================================================== */
  const ColonoscopyCharts = {
    models: BENCHMARK_MODELS,
    datasets: BENCHMARK_DATASETS,
    initBenchmarkChart,
    setBenchmarkDataset,
    setBenchmarkMetric,
    toggleModel,
    initEfficiencyChart,
    initSmallPolypChart,
    initVideoScalingChart
  };

  window.ColonoscopyCharts = ColonoscopyCharts;

  // Auto-init charts when their DOM elements exist
  function autoInitAllCharts() {
    let benchmarkCanvas = document.getElementById('benchmark-chart');
    if (!benchmarkCanvas && typeof document.querySelector === 'function') {
      benchmarkCanvas = document.querySelector('[data-chart="dice-comparison"] canvas');
    }
    if (benchmarkCanvas) {
      if (!benchmarkCanvas.id) benchmarkCanvas.id = 'benchmark-chart';
      initBenchmarkChart(benchmarkCanvas.id);
    }
    if (document.getElementById('efficiency-chart')) {
      initEfficiencyChart('efficiency-chart');
    }
    if (document.getElementById('small-polyp-chart')) {
      initSmallPolypChart('small-polyp-chart');
    }
    if (document.getElementById('video-scaling-chart')) {
      initVideoScalingChart('video-scaling-chart');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitAllCharts);
  } else {
    autoInitAllCharts();
  }

})();
