const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const files = [
  path.join(ROOT_DIR, 'index.html'),
  ...fs.readdirSync(path.join(ROOT_DIR, 'pages')).map(f => path.join(ROOT_DIR, 'pages', f))
];

const summary = {};

files.forEach(filePath => {
  const relFile = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract site-header / nav links
  const headerMatch = content.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  const drawerMatch = content.match(/<(?:div|nav)[^>]*(?:id="mobile-drawer"|class="[^"]*mobile-nav-drawer[^"]*")[^>]*>([\s\S]*?)<\/(?:div|nav)>/i);
  const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);

  function extractLinks(htmlSnippet) {
    if (!htmlSnippet) return [];
    const links = [];
    const reg = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
    let m;
    while ((m = reg.exec(htmlSnippet)) !== null) {
      links.push({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
    }
    return links;
  }

  summary[relFile] = {
    headerLinks: extractLinks(headerMatch ? headerMatch[1] : ''),
    drawerLinks: extractLinks(drawerMatch ? drawerMatch[1] : ''),
    footerLinks: extractLinks(footerMatch ? footerMatch[1] : '')
  };
});

fs.writeFileSync(path.join(__dirname, 'nav_summary.json'), JSON.stringify(summary, null, 2));
console.log('Nav summary generated successfully');
