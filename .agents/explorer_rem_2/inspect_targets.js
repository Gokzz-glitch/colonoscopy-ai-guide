const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const files = [
  'index.html',
  'pages/03-ai-history.html',
  'pages/04-architectures.html',
  'pages/05-datasets.html',
  'pages/06-benchmarks.html',
  'pages/07-clinical-systems.html'
];

for (const rel of files) {
  const f = path.join(root, rel);
  if (!fs.existsSync(f)) {
    console.log(`File not found: ${rel}`);
    continue;
  }
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log(`\n========================================`);
  console.log(`FILE: ${rel}`);
  console.log(`========================================`);
  lines.forEach((line, idx) => {
    if (/ClinicDB|0\.937|0\.899|0\.932|0\.941|0\.916|0\.823|0\.771/i.test(line)) {
      console.log(`L${idx + 1}: ${line.trim()}`);
    }
  });
}
