// audit_links_and_structure.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');
const allHtmlFiles = [
  path.join(rootDir, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

console.log("=== Auditing Links, Scripts, Stylesheets and Anchors across all HTML files ===");

let brokenLinks = 0;
let brokenAssets = 0;

for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  const fileDir = path.dirname(file);
  
  // 1. Check stylesheets
  const cssMatches = content.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
  for (const linkTag of cssMatches) {
    const hrefMatch = linkTag.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (!href.startsWith('http')) {
        const resolved = path.resolve(fileDir, href);
        if (!fs.existsSync(resolved)) {
          console.error(`[BROKEN CSS] In ${rel}: ${href} (resolved: ${resolved})`);
          brokenAssets++;
        }
      }
    }
  }

  // 2. Check scripts
  const scriptMatches = content.match(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
  for (const sTag of scriptMatches) {
    const srcMatch = sTag.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      const src = srcMatch[1];
      if (!src.startsWith('http')) {
        const resolved = path.resolve(fileDir, src);
        if (!fs.existsSync(resolved)) {
          console.error(`[BROKEN SCRIPT] In ${rel}: ${src} (resolved: ${resolved})`);
          brokenAssets++;
        }
      }
    }
  }

  // 3. Check internal page links
  const aMatches = content.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
  for (const aTag of aMatches) {
    const hrefMatch = aTag.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      // Skip external, mailto, tel, javascript
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        continue;
      }
      
      const [pagePart, hashPart] = href.split('#');
      let targetFile = file;
      if (pagePart && pagePart.length > 0) {
        targetFile = path.resolve(fileDir, pagePart);
        if (!fs.existsSync(targetFile)) {
          console.error(`[BROKEN LINK] In ${rel}: ${href} -> File not found: ${targetFile}`);
          brokenLinks++;
          continue;
        }
      }
      
      if (hashPart) {
        const targetContent = fs.readFileSync(targetFile, 'utf8');
        // Check if ID exists in target
        const hasId = new RegExp(`id=["']${hashPart}["']`, 'i').test(targetContent);
        if (!hasId) {
          console.warn(`[WARN UNMATCHED HASH] In ${rel}: link to ${href} -> ID #${hashPart} not found in ${path.relative(rootDir, targetFile)}`);
        }
      }
    }
  }
}

console.log(`\nSummary:`);
console.log(`  Broken Assets (CSS/JS): ${brokenAssets}`);
console.log(`  Broken Page Links: ${brokenLinks}`);
