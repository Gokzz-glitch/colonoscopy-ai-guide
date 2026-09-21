const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pages = fs.readdirSync(path.join(root, 'pages')).filter(f => f.endsWith('.html')).map(f => path.join(root, 'pages', f));
const allFiles = [path.join(root, 'index.html'), ...pages];

console.log(`Scanning ${allFiles.length} files for ClinicDB...`);

const results = {};

for (const f of allFiles) {
  const rel = path.relative(root, f);
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split(/\r?\n/);
  
  lines.forEach((line, idx) => {
    if (/ClinicDB/i.test(line)) {
      if (!results[rel]) results[rel] = [];
      results[rel].push({
        lineNum: idx + 1,
        content: line.trim()
      });
    }
  });
}

for (const [file, matches] of Object.entries(results)) {
  console.log(`\n=== ${file} (${matches.length} matches) ===`);
  matches.forEach(m => {
    console.log(`  L${m.lineNum}: ${m.content}`);
  });
}
