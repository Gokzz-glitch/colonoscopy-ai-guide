// check_colondb_cvc300.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const files = [
  'pages/05-datasets.html',
  'pages/06-benchmarks.html',
  'pages/08-benchmark-integrity.html',
  'pages/09-chakramodel.html',
  'pages/11-references.html',
  'pages/12-glossary.html',
  'index.html',
  'assets/js/charts.js',
  'assets/js/main.js'
];

let pooledDetected = false;

for (const rel of files) {
  const full = path.join(rootDir, rel);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, 'utf8');
  
  console.log(`\n=== Auditing ColonDB vs CVC-300 in ${rel} ===`);
  
  // Check for suspicious pooling patterns:
  // "ColonDB + CVC-300", "ColonDB/CVC-300", "ColonDB & CVC-300 pooled", "average of ColonDB and CVC-300"
  const poolPatterns = [
    /ColonDB\s*(?:\+|and|&)\s*CVC-?300(?:\s*pooled|\s*average|\s*merged|\s*combined)/i,
    /pooled\s*(?:metric|score|mean|evaluation).*ColonDB/i,
    /ColonDB\/CVC-?300\s*(?:mean|average|score|dice)/i
  ];
  
  for (const pat of poolPatterns) {
    const m = content.match(pat);
    if (m) {
      console.log(`  [FLAG] Potential pooling pattern matched: "${m[0]}"`);
      // Check surrounding context
      const idx = content.indexOf(m[0]);
      console.log(`  Context: ...${content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 150))}...`);
    }
  }

  // Check how 58 frames overlap is documented
  const overlapMatches = content.match(/58\s*(?:exact|identical|shared|duplicate)/gi);
  if (overlapMatches) {
    console.log(`  [PASS] Found ${overlapMatches.length} references to 58 exact/shared/duplicate frames.`);
  } else if (/ColonDB/i.test(content) && /CVC-?300/i.test(content)) {
    console.log(`  [NOTE] Both datasets mentioned, checking overlap mentions...`);
  }
}
