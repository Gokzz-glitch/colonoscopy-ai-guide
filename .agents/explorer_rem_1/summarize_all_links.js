const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_links_audit.json'), 'utf8'));

let totalBroken = 0;
for (const [file, links] of Object.entries(audit)) {
  const broken = links.filter(l => l.status !== 'OK');
  if (broken.length > 0) {
    console.log(`\n=== ${file} (${broken.length} broken / ${links.length} total) ===`);
    broken.forEach(b => {
      console.log(`  L${b.line} [${b.section}] [${b.status}]: text="${b.text}" href="${b.href}"`);
    });
    totalBroken += broken.length;
  }
}
console.log(`\nTotal broken links in all_links_audit: ${totalBroken}`);
