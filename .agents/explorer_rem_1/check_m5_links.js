const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
['pages/08-benchmark-integrity.html', 'pages/09-chakramodel.html', 'pages/10-future.html'].forEach(f => {
  const c = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
  const btns = [];
  const regex = /<a\s+[^>]*class=["'][^"']*(?:btn|cta)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = regex.exec(c)) !== null) {
    const hrefMatch = m[0].match(/href=["']([^"']*)["']/i);
    btns.push({
      text: m[1].replace(/<[^>]+>/g, '').trim(),
      href: hrefMatch ? hrefMatch[1] : ''
    });
  }
  console.log(`=== ${f} buttons (${btns.length}) ===`);
  btns.forEach(b => console.log(`  "${b.text}" -> href: ${b.href}`));
});
