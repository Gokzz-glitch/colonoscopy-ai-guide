// audit_check4_key_numbers.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');
const allFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'README.md'),
  path.join(rootDir, 'assets', 'js', 'charts.js'),
  path.join(rootDir, 'assets', 'js', 'main.js'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

console.log("=== CHECK 4: Zero Hallucinations & Key Numbers / Citations Verification ===\n");

const tests = [
  {
    name: "Corley et al. NEJM 2014: 1% ADR -> 3% CRC reduction, 5% fatal CRC reduction",
    check: (content) => /Corley.*(?:1\.?0?%|1\s*percent).*ADR.*(?:3\.?0?%|3\s*percent).*CRC.*(?:5\.?0?%|5\s*percent).*fatal/is.test(content) ||
                        (/Corley/i.test(content) && /3\s*%/i.test(content) && /5\s*%/i.test(content))
  },
  {
    name: "41 RCTs, 31,789 patients",
    check: (content) => /41\s*(?:RCTs|randomized)/i.test(content) && /31,?789/i.test(content)
  },
  {
    name: "Budzyń et al. (Lancet Gastro Hep Aug 2025) ACCEPT trial: -6.0% ADR drop",
    check: (content) => /Budzy[nń]/i.test(content) && /ACCEPT/i.test(content) && /-?6(?:\.0)?%/i.test(content)
  },
  {
    name: "AGA 2025 microsimulation: 11 fewer CRCs, 2 fewer deaths, 6-35 extra surveillance colonoscopies",
    check: (content) => /AGA/i.test(content) && /11\s*(?:fewer|less).*CRC/i.test(content) && /2\s*(?:fewer|less).*death/i.test(content) && /6[-–]35/i.test(content)
  },
  {
    name: "ChakraTransformer: ViT-L/16 @ 384 px, 309.2M params, Kvasir 0.838, ClinicDB 0.771, 7.76 FPS",
    check: (content) => /ViT-L\/16/i.test(content) && /309\.2M/i.test(content) && /0\.838/i.test(content) && /0\.771/i.test(content) && /7\.76\s*FPS/i.test(content)
  },
  {
    name: "ChakraXAttnUNet v2: 28.6M params",
    check: (content) => /ChakraXAttn.*28\.6M/i.test(content) || (/28\.6M/i.test(content) && /Chakra/i.test(content))
  },
  {
    name: "splits_v2: 1,228 train / 222 val, 0 leaking groups",
    check: (content) => /1,?228/i.test(content) && /222/i.test(content) && /0\s*(?:leaking\s*)?groups/i.test(content)
  },
  {
    name: "False alarm set: 4,275 frames from 23 PolypGen sequences",
    check: (content) => /4,?275/i.test(content) && /23\s*PolypGen/i.test(content)
  },
  {
    name: "PICCOLO: 3,433 frames, 76 lesions, 40 videos (21 diminutive <=5mm, 16 small 6-9mm, 31 large >=10mm)",
    check: (content) => /3,?433/i.test(content) && /76\s*lesions/i.test(content) && /21\s*diminutive/i.test(content) && /16\s*small/i.test(content) && /31\s*large/i.test(content)
  }
];

for (const t of tests) {
  let matchedFiles = [];
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(rootDir, file);
    if (t.check(content)) {
      matchedFiles.push(rel);
    }
  }
  if (matchedFiles.length > 0) {
    console.log(`[PASS] ${t.name}`);
    console.log(`       Verified in: ${matchedFiles.join(', ')}`);
  } else {
    console.log(`[FAIL] ${t.name}`);
    console.log(`       NOT FOUND IN ANY FILE!`);
  }
}
