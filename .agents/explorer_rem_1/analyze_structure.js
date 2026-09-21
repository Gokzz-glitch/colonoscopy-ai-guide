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
  console.log(`\n=================== ${f} ===================`);
  
  // Find header
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  console.log('Header lines:', headerMatch ? headerMatch[0].split('\n').length : 0);
  
  // Find mobile drawer
  const drawerRegex = /(?:<nav|<div)[^>]*(?:id="mobile-drawer"|class="[^"]*mobile-nav[^"]*")[^>]*>[\s\S]*?<\/(?:nav|div)>/i;
  const drawerMatch = content.match(drawerRegex);
  console.log('Drawer found:', !!drawerMatch);
  if (!drawerMatch) {
    // Check what mobile drawer markup looks like
    const m = content.match(/mobile-drawer/gi) || content.match(/mobile-nav/gi);
    console.log('Mobile drawer mentions:', m ? m.length : 0);
  }
  
  // Find footer
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
  console.log('Footer lines:', footerMatch ? footerMatch[0].split('\n').length : 0);
});
