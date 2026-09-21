const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const files = [
  'index.html',
  'pages/01-what-is-colonoscopy.html',
  'pages/02-polyp-types.html',
  'pages/03-ai-history.html',
  'pages/04-architectures.html',
  'pages/05-datasets.html',
  'pages/06-benchmarks.html',
  'pages/06b-clinical-evidence.html',
  'pages/07-clinical-systems.html',
  'pages/08-benchmark-integrity.html',
  'pages/09-chakramodel.html',
  'pages/10-future.html',
  'pages/11-references.html',
  'pages/12-glossary.html'
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

const filePlans = {};

files.forEach(f => {
  const filePath = path.join(ROOT_DIR, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const changes = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    let modifiedLine = line;
    let changed = false;
    let reason = '';

    // Check draft replacements
    for (const [draft, canonical] of Object.entries(draftMap)) {
      if (modifiedLine.includes(draft)) {
        modifiedLine = modifiedLine.split(draft).join(canonical);
        changed = true;
        reason = `Replace draft name '${draft}' with canonical '${canonical}'`;
      }
    }

    // Check ref-corley2014
    if (f.includes('01-what-is-colonoscopy.html') && modifiedLine.includes('11-references.html#ref-corley2014')) {
      // note anchor
      changes.push({
        lineNum,
        before: line,
        after: modifiedLine.replace('11-references.html#ref-corley2014', '11-references.html#ref-corley2014'),
        altAfter: modifiedLine.replace('11-references.html#ref-corley2014', '11-references.html'),
        type: 'ANCHOR_CORLEY',
        reason: 'Missing target anchor #ref-corley2014 in 11-references.html'
      });
      return;
    }

    // Check glossary letter buttons
    if (f.includes('12-glossary.html') && /href="#letter-[A-Z]"/.test(modifiedLine)) {
      changes.push({
        lineNum,
        before: line,
        after: line, // keep or note target anchors
        type: 'ANCHOR_GLOSSARY_LETTER',
        reason: `Target in-page anchor ${line.match(/href="([^"]+)"/)[1]} missing in 12-glossary.html`
      });
      return;
    }

    if (changed) {
      changes.push({
        lineNum,
        before: line,
        after: modifiedLine,
        type: 'DRAFT_REPLACEMENT',
        reason
      });
    }
  });

  filePlans[f] = changes;
});

fs.writeFileSync(path.join(__dirname, 'compiled_blueprint_data.json'), JSON.stringify(filePlans, null, 2), 'utf8');
console.log('Saved compiled_blueprint_data.json successfully');
