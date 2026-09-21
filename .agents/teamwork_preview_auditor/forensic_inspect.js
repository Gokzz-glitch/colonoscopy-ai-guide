// forensic_inspect.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');

const filesToAudit = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'README.md'),
  path.join(rootDir, 'assets', 'js', 'charts.js'),
  path.join(rootDir, 'assets', 'js', 'main.js'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

console.log(`Found ${filesToAudit.length} files to audit.`);

for (const file of filesToAudit) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);
  
  // Check 1: Mentions of ColonDB and CVC-300
  const hasColonDB = /ColonDB/i.test(content);
  const hasCVC300 = /CVC-?300|EndoScene/i.test(content);
  
  // Check 2: Mentions of ClinicDB
  const hasClinicDB = /ClinicDB|CVC-612/i.test(content);
  
  // Check 3: Mentions of HyperKvasir
  const hasHyperKvasir = /HyperKvasir/i.test(content);

  // Check 4: Specific citations / numbers
  const hasCorley = /Corley/i.test(content);
  const hasBudzyn = /Budzy[nń]|ACCEPT/i.test(content);
  const hasChakra = /Chakra/i.test(content);

  console.log(`\n--- [${relPath}] ---`);
  console.log(`  ColonDB: ${hasColonDB}, CVC-300: ${hasCVC300}, ClinicDB: ${hasClinicDB}, HyperKvasir: ${hasHyperKvasir}, Corley: ${hasCorley}, Budzyn: ${hasBudzyn}, Chakra: ${hasChakra}`);
}
