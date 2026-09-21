const fs = require('fs');
const path = require('path');

const root = 'C:/Users/imgk3/teamwork_projects/colonoscopy_ai_guide';
const pages = ['03-ai-history.html', '04-architectures.html', '05-datasets.html', '06-benchmarks.html'];

for (const p of pages) {
  const html = fs.readFileSync(path.join(root, 'pages', p), 'utf8');
  console.log(`\n=== Checking accessibility & semantics for ${p} ===`);
  
  // Canvases
  const canvases = [...html.matchAll(/<canvas([^>]*)>/g)];
  console.log(`Canvases (${canvases.length}):`);
  canvases.forEach(c => {
    const hasRole = c[1].includes('role="img"');
    const hasAria = c[1].includes('aria-label');
    console.log(`  canvas: role="img": ${hasRole}, aria-label: ${hasAria}`);
  });

  // Buttons without type
  const buttonsWithoutType = [...html.matchAll(/<button(?![^>]*type=)[^>]*>/g)];
  console.log(`Buttons missing type attribute: ${buttonsWithoutType.length}`);

  // Inputs without aria-label or label
  const inputsWithoutLabel = [...html.matchAll(/<input(?![^>]*aria-label)[^>]*>/g)];
  console.log(`Inputs missing aria-label: ${inputsWithoutLabel.length}`);

  // Tables
  const tables = [...html.matchAll(/<table[^>]*>/g)];
  console.log(`Tables: ${tables.length}`);
}
