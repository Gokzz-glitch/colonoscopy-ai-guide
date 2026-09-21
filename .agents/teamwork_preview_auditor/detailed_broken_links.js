// detailed_broken_links.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');
const allHtmlFiles = [
  path.join(rootDir, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

const brokenByFile = {};

for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  const fileDir = path.dirname(file);
  
  const aMatches = content.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
  for (const aTag of aMatches) {
    const hrefMatch = aTag.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        continue;
      }
      
      const [pagePart, hashPart] = href.split('#');
      let targetFile = file;
      if (pagePart && pagePart.length > 0) {
        targetFile = path.resolve(fileDir, pagePart);
        if (!fs.existsSync(targetFile)) {
          if (!brokenByFile[rel]) brokenByFile[rel] = [];
          brokenByFile[rel].push({ type: 'MISSING_FILE', href, targetFile: path.relative(rootDir, targetFile) });
          continue;
        }
      }
      
      if (hashPart) {
        const targetContent = fs.readFileSync(targetFile, 'utf8');
        const hasId = new RegExp(`id=["']${hashPart}["']`, 'i').test(targetContent);
        if (!hasId) {
          if (!brokenByFile[rel]) brokenByFile[rel] = [];
          brokenByFile[rel].push({ type: 'MISSING_ANCHOR', href, hashPart, targetFile: path.relative(rootDir, targetFile) });
        }
      }
    }
  }
}

for (const [f, issues] of Object.entries(brokenByFile)) {
  console.log(`\n=== File: ${f} (${issues.length} issues) ===`);
  const missingFiles = issues.filter(i => i.type === 'MISSING_FILE');
  const missingAnchors = issues.filter(i => i.type === 'MISSING_ANCHOR');
  
  if (missingFiles.length > 0) {
    console.log(`  Missing Target Files (${missingFiles.length}):`);
    // unique hrefs
    const uniq = [...new Set(missingFiles.map(m => m.href))];
    uniq.forEach(u => console.log(`    - href="${u}"`));
  }
  if (missingAnchors.length > 0) {
    console.log(`  Missing Target Anchors (${missingAnchors.length}):`);
    const uniq = [...new Set(missingAnchors.map(m => m.href))];
    uniq.forEach(u => console.log(`    - href="${u}"`));
  }
}
