// audit_check1_colondb_cvc300.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');
const allFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'README.md'),
  path.join(rootDir, 'assets', 'js', 'charts.js'),
  path.join(rootDir, 'assets', 'js', 'main.js'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

console.log("=== CHECK 1: ColonDB vs CVC-300 Separation Audit ===");

let anyMerged = false;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Look for any instance where ColonDB and CVC-300 are mentioned together
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/ColonDB/i.test(line) && /CVC-?300/i.test(line)) {
      // Check if it's stating the overlap or merging them
      const isOverlapWarning = /58|overlap|duplicate|never pool|separate|independently|distinct/i.test(line);
      const isMerge = /pooled|combined|average score|merged score|ColonDB\s*\+\s*CVC-?300/i.test(line);
      
      console.log(`[${rel}:${idx+1}]`);
      console.log(`  Line: ${line.trim().slice(0, 140)}`);
      console.log(`  Overlap Warning: ${isOverlapWarning} | Merge/Pool Detected: ${isMerge}`);
      
      if (isMerge && !/never pool|do not pool|malpractice/i.test(line)) {
        console.error(`  >>> VIOLATION DETECTED: ColonDB and CVC-300 merged in ${rel}:${idx+1}`);
        anyMerged = true;
      }
    }
  });
}

console.log("\nVerdict for Check 1:");
if (anyMerged) {
  console.log("FAIL - INTEGRITY VIOLATION: Merged ColonDB and CVC-300 detected.");
} else {
  console.log("PASS - ColonDB and CVC-300 strictly separated across all files.");
}
