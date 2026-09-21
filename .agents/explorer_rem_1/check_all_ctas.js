const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const files = [
  'index.html',
  'pages/01-what-is-colonoscopy.html',
  'pages/02-polyp-types.html',
  'pages/03-ai-history.html',
  'pages/04-architectures.html',
  'pages/05-datasets.html',
  'pages/06-benchmarks.html',
  'pages/06b-clinical-evidence.html',
  'pages/07-clinical-systems.html',
  'pages/08-benchmark-integrity.html',
  'pages/09-chakramodel.html',
  'pages/10-future.html',
  'pages/11-references.html',
  'pages/12-glossary.html'
];

files.forEach(f => {
  const c = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
  // Look for transition section or bottom cta before footer
  const mainMatch = c.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) return;
  const mainContent = mainMatch[0];
  
  // Find all buttons in mainContent
  const btns = [];
  const regex = /<a\s+[^>]*class=["'][^"']*(?:btn|cta)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = regex.exec(mainContent)) !== null) {
    const hrefMatch = m[0].match(/href=["']([^"']*)["']/i);
    btns.push({
      text: m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
      href: hrefMatch ? hrefMatch[1] : ''
    });
  }
  // Print the last 2 buttons (typically bottom transition/CTA)
  const lastBtns = btns.slice(-2);
  console.log(`=== ${f} ===`);
  lastBtns.forEach(b => console.log(`  CTA: "${b.text}" -> ${b.href}`));
});
