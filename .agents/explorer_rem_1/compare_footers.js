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
  const content = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
  const footer = (content.match(/<footer[\s\S]*?<\/footer>/i) || [''])[0];
  const links = [...footer.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => m[2].replace(/<[^>]+>/g, '').trim() + ' (' + m[1] + ')');
  console.log(`\n=== ${f} Footer (${links.length} links) ===\n` + links.join(' | '));
});
