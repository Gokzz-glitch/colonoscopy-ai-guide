const fs = require('fs');
const path = require('path');

const detailed = JSON.parse(fs.readFileSync(path.join(__dirname, 'detailed_scan.json'), 'utf8'));

for (const [file, issues] of Object.entries(detailed)) {
  if (issues.length > 0) {
    console.log(`\n======================================================`);
    console.log(`FILE: ${file} (${issues.length} issues)`);
    console.log(`======================================================`);
    issues.forEach(iss => {
      console.log(`Line ${iss.lineNum} [${iss.type}]: href="${iss.href}" -> canonical="${iss.canonicalReplacement}"`);
      console.log(`  Content: ${iss.rawLine}`);
    });
  }
}
