const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(root, 'pages');
const allHtml = [
  path.join(root, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

const scores = ['0.823', '0.899', '0.932', '0.937', '0.916', '0.941', '0.771'];

console.log(`Found ${allHtml.length} HTML files.`);

allHtml.forEach(file => {
  const rel = path.relative(root, file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  
  const hits = [];
  lines.forEach((line, idx) => {
    const hasClinic = /ClinicDB/i.test(line);
    const matchedScores = scores.filter(s => line.includes(s));
    if (hasClinic || matchedScores.length > 0) {
      hits.push({
        line: idx + 1,
        text: line.trim(),
        hasClinic,
        matchedScores
      });
    }
  });

  if (hits.length > 0) {
    console.log(`\n========================================`);
    console.log(`${rel} (${hits.length} matches):`);
    hits.forEach(h => {
      console.log(`  [L${h.line}] (scores: ${h.matchedScores.join(',') || 'none'}) ${h.text.substring(0, 120)}`);
    });
  }
});
