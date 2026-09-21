const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_links_audit.json'), 'utf8'));

for (const [file, links] of Object.entries(audit)) {
  const nonNavBroken = links.filter(l => l.status !== 'OK' && l.section !== 'header' && l.section !== 'drawer' && l.section !== 'footer');
  if (nonNavBroken.length > 0) {
    console.log(`=== ${file} (${nonNavBroken.length} non-nav broken links) ===`);
    nonNavBroken.forEach(b => {
      console.log(`  L${b.line} [${b.section}] [${b.status}]: text="${b.text.slice(0, 35)}" href="${b.href}"`);
    });
  }
}
