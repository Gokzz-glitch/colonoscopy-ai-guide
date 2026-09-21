// audit_check3_hyperkvasir.js
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

console.log("=== CHECK 3: HyperKvasir Duplicate Images Disclosure Audit ===");

let violationFound = false;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  if (!/HyperKvasir/i.test(content)) continue;
  
  console.log(`\nChecking ${rel}:`);
  
  // Extract paragraphs or lines mentioning HyperKvasir
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (/HyperKvasir/i.test(l)) {
      console.log(`  Line ${idx+1}: ${l.trim().slice(0, 140)}`);
    }
  });

  // Check if claimed as "new" or "additional" unique segmented data
  const badClaim = /HyperKvasir.*(?:additional|unique|expanded|new)\s+(?:1,?000|segmented)/i.test(content);
  if (badClaim) {
    console.log(`  [FLAG] Potential bad claim in ${rel}!`);
    violationFound = true;
  }
  
  // Check if duplication is disclosed
  const disclosed = /duplicate|identical|SHA-256|byte-for-byte|exact match|0 new/i.test(content);
  console.log(`  Duplicate disclosure present in file: ${disclosed}`);
}

console.log(`\nVerdict for Check 3: ${violationFound ? "FAIL" : "PASS"}`);
