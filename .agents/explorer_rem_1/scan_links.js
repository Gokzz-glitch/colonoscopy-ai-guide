const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const files = [
  path.join(ROOT_DIR, 'index.html'),
  ...fs.readdirSync(path.join(ROOT_DIR, 'pages')).map(f => path.join(ROOT_DIR, 'pages', f))
];

const draftMap = {
  '08-failure-modes.html': '08-benchmark-integrity.html',
  '09-chakramodel-case-study.html': '09-chakramodel.html',
  '10-future-directions.html': '10-future.html',
  '01-clinical-foundations.html': '01-what-is-colonoscopy.html',
  '02-clinical-evidence.html': '06b-clinical-evidence.html',
  '07-integrity-audit.html': '08-benchmark-integrity.html',
  '08-commercial-systems.html': '07-clinical-systems.html',
  '09-implementation.html': '09-chakramodel.html',
  '10-future-frontiers.html': '10-future.html'
};

const results = {};

files.forEach(filePath => {
  const relFile = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const fileIssues = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(line)) !== null) {
      const href = match[1];

      // Check draft filenames
      for (const [draft, canonical] of Object.entries(draftMap)) {
        if (href.includes(draft)) {
          fileIssues.push({
            lineNum,
            href,
            type: 'DRAFT_FILENAME',
            matchDraft: draft,
            canonicalReplacement: href.replace(draft, canonical),
            rawLine: line.trim()
          });
        }
      }

      // Check ref-corley2014 anchor
      if (href.includes('#ref-corley2014')) {
        fileIssues.push({
          lineNum,
          href,
          type: 'BROKEN_ANCHOR',
          matchDraft: '#ref-corley2014',
          canonicalReplacement: 'needs target anchor in 11-references.html',
          rawLine: line.trim()
        });
      }

      // Check letter anchors in glossary
      if (relFile.includes('12-glossary.html') && href.startsWith('#letter-')) {
        fileIssues.push({
          lineNum,
          href,
          type: 'GLOSSARY_LETTER_ANCHOR',
          matchDraft: href,
          canonicalReplacement: 'needs matching section id in 12-glossary.html',
          rawLine: line.trim()
        });
      }

      // Check relative path validity on disk
      if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('javascript:') && !href.startsWith('#')) {
        const [cleanHref] = href.split('#');
        const resolvedPath = path.resolve(path.dirname(filePath), cleanHref);
        if (!fs.existsSync(resolvedPath)) {
          // Already captured if draft, otherwise separate
          const isDraft = Object.keys(draftMap).some(d => cleanHref.includes(d));
          if (!isDraft) {
            fileIssues.push({
              lineNum,
              href,
              type: 'MISSING_FILE_NOT_DRAFT',
              matchDraft: cleanHref,
              canonicalReplacement: 'UNKNOWN',
              rawLine: line.trim()
            });
          }
        }
      }
    }
  });

  results[relFile] = fileIssues;
});

let total = 0;
for (const [f, issues] of Object.entries(results)) {
  console.log(`${f}: ${issues.length} issues`);
  total += issues.length;
}
console.log(`Total detected issues: ${total}`);

fs.writeFileSync(path.join(__dirname, 'detailed_scan.json'), JSON.stringify(results, null, 2));
