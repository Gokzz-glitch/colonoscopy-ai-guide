// audit_check1_colondb_cvc300_refined.js
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

console.log("=== Refined Check 1: Checking for ACTUAL pooling of ColonDB and CVC-300 ===");

let actualPoolCount = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Search for merged column headers, like "ColonDB+CVC-300", "ColonDB/CVC-300", "Pooled ColonDB", etc.
  const badHeaders = content.match(/<th[^>]*>.*(?:ColonDB\s*(?:\+|&|\/)\s*CVC-?300|CVC-?300\s*(?:\+|&|\/)\s*ColonDB|ColonDB\s+and\s+CVC-?300\s+pooled).*?<\/th>/gi);
  if (badHeaders) {
    console.log(`[FLAG] Found suspicious table header in ${rel}:`, badHeaders);
    actualPoolCount++;
  }
  
  // Check if any numbers are computed as an average of the two
  // In charts.js, check if data arrays merge them
  if (rel.endsWith('charts.js')) {
    // In charts.js, are there 5 distinct datasets?
    if (content.includes("const datasetsKeys = ['kvasir', 'clinicdb', 'colondb', 'etis', 'cvc300'];")) {
      console.log(`[PASS] charts.js defines 5 distinct datasets: kvasir, clinicdb, colondb, etis, cvc300.`);
    } else {
      console.log(`[FLAG] charts.js does not define the expected 5 separate dataset keys!`);
      actualPoolCount++;
    }
  }
}

console.log(`\nActual pooling violations found: ${actualPoolCount}`);
