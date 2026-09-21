// find_clinicdb_scores.js
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

console.log("=== Searching for all locations where CVC-ClinicDB scores appear ===");

const clinicScores = ['0.823', '0.899', '0.932', '0.937', '0.916', '0.941', '0.771'];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  const foundScores = [];
  clinicScores.forEach(sc => {
    if (content.includes(sc)) {
      foundScores.push(sc);
    }
  });
  
  if (foundScores.length > 0) {
    console.log(`\nFile: ${rel}`);
    console.log(`  Found scores: ${foundScores.join(', ')}`);
    
    // Check if leakage is mentioned in this file
    const mentionsLeakage = /leakage|in-sequence|seen-domain|inflated|inflation|\+12|\+15/i.test(content);
    console.log(`  Mentions video leakage / inflation warning: ${mentionsLeakage}`);
  }
}
