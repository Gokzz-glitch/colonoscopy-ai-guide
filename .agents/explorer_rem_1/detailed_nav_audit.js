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

const report = {};

files.forEach(f => {
  const filePath = path.join(ROOT_DIR, f);
  const fileDir = path.dirname(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find all <a> tags
  const aRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const links = [];
  while ((m = aRegex.exec(content)) !== null) {
    const rawTag = m[0];
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    
    // Determine context: header, drawer, footer, cta, or body
    const index = m.index;
    const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
    const drawerMatch = content.match(/(?:<nav|<div)[^>]*(?:id="mobile-drawer"|class="[^"]*mobile-nav[^"]*")[^>]*>[\s\S]*?<\/(?:nav|div)>/i);
    const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);

    let section = 'body';
    if (headerMatch && index >= headerMatch.index && index < headerMatch.index + headerMatch[0].length) {
      section = 'header';
    } else if (drawerMatch && index >= drawerMatch.index && index < drawerMatch.index + drawerMatch[0].length) {
      section = 'drawer';
    } else if (footerMatch && index >= footerMatch.index && index < footerMatch.index + footerMatch[0].length) {
      section = 'footer';
    } else if (rawTag.includes('btn') || rawTag.includes('cta')) {
      section = 'cta_or_button';
    }

    // Check resolution
    let status = 'OK';
    let resolved = '';
    if (href.startsWith('#')) {
      // In-page anchor
      const id = href.slice(1);
      const hasId = content.includes(`id="${id}"`) || content.includes(`id='${id}'`);
      status = hasId ? 'OK' : 'BROKEN_INPAGE_ANCHOR';
    } else if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
      const [fPart, hash] = href.split('#');
      const resPath = path.resolve(fileDir, fPart);
      resolved = path.relative(ROOT_DIR, resPath);
      if (!fs.existsSync(resPath)) {
        status = 'BROKEN_FILE_404';
      } else if (hash) {
        const targetContent = fs.readFileSync(resPath, 'utf8');
        const hasHash = targetContent.includes(`id="${hash}"`) || targetContent.includes(`id='${hash}'`);
        status = hasHash ? 'OK' : 'BROKEN_CROSS_ANCHOR';
      }
    }

    links.push({
      line: content.slice(0, index).split('\n').length,
      section,
      text,
      href,
      resolved,
      status,
      rawTag: rawTag.slice(0, 100)
    });
  }

  report[f] = links;
});

fs.writeFileSync(path.join(__dirname, 'all_links_audit.json'), JSON.stringify(report, null, 2));
console.log('Saved all_links_audit.json');
