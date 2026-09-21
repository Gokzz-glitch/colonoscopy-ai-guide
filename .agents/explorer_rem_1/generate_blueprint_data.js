const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const detailed = JSON.parse(fs.readFileSync(path.join(__dirname, 'detailed_scan.json'), 'utf8'));

let out = '';
for (const [filePath, issues] of Object.entries(detailed)) {
  out += `\n======================================================\n`;
  out += `FILE: ${filePath} (${issues.length} issues)\n`;
  out += `======================================================\n`;
  issues.forEach((iss, index) => {
    out += `[#${index + 1}] Line ${iss.lineNum}:\n`;
    out += `  Current:  ${iss.rawLine}\n`;
    out += `  Href:     "${iss.href}"\n`;
    out += `  Target:   "${iss.canonicalReplacement}"\n`;
  });
}

fs.writeFileSync(path.join(__dirname, 'blueprint_raw_utf8.txt'), out, 'utf8');
console.log('Saved UTF-8 file successfully');
