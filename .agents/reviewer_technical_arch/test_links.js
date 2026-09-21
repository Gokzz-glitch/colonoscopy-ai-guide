const fs = require('fs');
const path = require('path');

const root = 'C:/Users/imgk3/teamwork_projects/colonoscopy_ai_guide';
const pages = ['03-ai-history.html', '04-architectures.html', '05-datasets.html', '06-benchmarks.html'];

let missingLinks = 0;

for (const p of pages) {
  const filePath = path.join(root, 'pages', p);
  const html = fs.readFileSync(filePath, 'utf8');

  // href="..."
  const hrefMatches = [...html.matchAll(/href="([^"#][^"]*)"/g)];
  hrefMatches.forEach(m => {
    const url = m[1];
    if (url.startsWith('http://') || url.startsWith('https://')) return;
    const resolved = path.resolve(path.dirname(filePath), url);
    if (!fs.existsSync(resolved)) {
      console.error(`In ${p}: Broken href -> ${url} (resolved: ${resolved})`);
      missingLinks++;
    }
  });

  // src="..."
  const srcMatches = [...html.matchAll(/src="([^"#][^"]*)"/g)];
  srcMatches.forEach(m => {
    const url = m[1];
    if (url.startsWith('http://') || url.startsWith('https://')) return;
    const resolved = path.resolve(path.dirname(filePath), url);
    if (!fs.existsSync(resolved)) {
      console.error(`In ${p}: Broken src -> ${url} (resolved: ${resolved})`);
      missingLinks++;
    }
  });
}

if (missingLinks === 0) {
  console.log('All local href and src links across all 4 pages resolve to existing files!');
}
