const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const refHtmlPath = path.join(ROOT_DIR, 'pages', '11-references.html');

let content = fs.readFileSync(refHtmlPath, 'utf8');

let updatedContent;
if (content.includes('id="ref-corley2014"')) {
  // File is already patched on disk
  updatedContent = content;
} else {
  // Update metadata in header and hero
  content = content.replace('Master Reference Catalog (48 Verified Citations)', 'Master Reference Catalog (49 Verified Citations)');
  content = content.replace('48 verified research publications', '49 verified research publications');
  content = content.replace('11. Master References (48 Papers)', '11. Master References (49 Papers)');
  content = content.replace('48 verified foundational publications', '49 verified foundational publications');
  content = content.replace('All (48)</button>', 'All (49)</button>');
  content = content.replace('48 of 48 references displayed', '49 of 49 references displayed');
  content = content.replace('48 Master References</a>', '49 Master References</a>');
  content = content.replace('48-CITATIONS-VERIFIED', '49-CITATIONS-VERIFIED');

  // Corley card markup
  const corleyCard = `
      <!-- Ref 9 -->
      <div id="ref-corley2014" class="reference-card" data-category="clinical clinical-trials">
        <div class="ref-header">
          <div>
            <h3 class="ref-title">Adenoma Detection Rate and Risk of Colorectal Cancer and Fatal Interval Cancer</h3>
            <div class="ref-authors">Corley, D.A., Jensen, C.D., Marks, A.R., et al.</div>
            <div class="ref-venue">New England Journal of Medicine, 2014, Vol. 370, No. 14, pp. 1298–1306.</div>
          </div>
          <span class="ref-num">#09</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">
          Landmark longitudinal cohort study of 314,845 screening colonoscopies performed by 136 gastroenterologists establishing the epidemiological foundation of colonoscopy quality: each 1.0% absolute increase in adenoma detection rate (ADR) confers a 3.0% reduction in interval colorectal cancer incidence and a 5.0% reduction in fatal colorectal cancer mortality.
        </p>
        <div class="ref-badges">
          <span class="badge badge-clinical">Clinical Epidemiology</span>
          <a href="https://doi.org/10.1056/NEJMoa1309086" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-doi">DOI: 10.1056/NEJMoa1309086</a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/24693890/" target="_blank" rel="noopener noreferrer" class="ref-link-btn btn-pubmed">PubMed: 24693890</a>
        </div>
      </div>
`;

  // Split by Section 2
  const parts = content.split('Section 2: Canonical Benchmark Datasets & Challenges');
  if (parts.length !== 2) {
    console.error('Failed to find Section 2');
    process.exit(1);
  }

  // Update section headers
  parts[0] = parts[0].replace('Section 1: Landmark Clinical Trials & Regulatory Standards (1 - 8)', 'Section 1: Landmark Clinical Trials & Regulatory Standards (1 - 9)');
  parts[0] = parts[0] + corleyCard + '      ';

  let sec2_6 = 'Section 2: Canonical Benchmark Datasets & Challenges' + parts[1];
  sec2_6 = sec2_6.replace('Challenges (9 - 19)', 'Challenges (10 - 20)');
  sec2_6 = sec2_6.replace('Baselines (20 - 30)', 'Baselines (21 - 31)');
  sec2_6 = sec2_6.replace('Architectures (31 - 40)', 'Architectures (32 - 41)');
  sec2_6 = sec2_6.replace('Segmentation (41 - 44)', 'Segmentation (42 - 45)');
  sec2_6 = sec2_6.replace('Mamba (45 - 48)', 'Mamba (46 - 49)');

  // Renumber cards from 48 down to 9
  for (let i = 48; i >= 9; i--) {
    const oldNum = i.toString().padStart(2, '0');
    const newNum = (i + 1).toString().padStart(2, '0');
    sec2_6 = sec2_6.replace('<!-- Ref ' + i + ' -->', '<!-- Ref ' + (i + 1) + ' -->');
    sec2_6 = sec2_6.replace('<span class="ref-num">#' + oldNum + '</span>', '<span class="ref-num">#' + newNum + '</span>');
  }

  updatedContent = parts[0] + sec2_6;
}

// Balanced tag extractor
function extractElementsWithClass(html, className) {
  const elements = [];
  const startRegex = new RegExp(`<([a-zA-Z0-9]+)[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'gi');
  let match;
  while ((match = startRegex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const startIndex = match.index;
    let depth = 1;
    let currIndex = startIndex + match[0].length;
    const tagRegex = new RegExp(`<\/?${tagName}\\b[^>]*>`, 'gi');
    tagRegex.lastIndex = currIndex;
    let tagMatch;
    while (depth > 0 && (tagMatch = tagRegex.exec(html)) !== null) {
      if (tagMatch[0].startsWith('</')) depth--;
      else if (!tagMatch[0].endsWith('/>')) depth++;
      currIndex = tagRegex.lastIndex;
    }
    elements.push(html.substring(startIndex, currIndex));
  }
  return elements;
}

const cards = extractElementsWithClass(updatedContent, 'reference-card');
console.log('Total cards extracted:', cards.length);

let orderOk = true;
cards.forEach((card, idx) => {
  const padNum = '#' + (idx + 1).toString().padStart(2, '0');
  if (!card.includes(padNum)) {
    console.error('Mismatch at card ' + (idx + 1) + ', expected ' + padNum);
    orderOk = false;
  }
});
console.log('DOM-sequential numbering order check:', orderOk ? 'PASSED 100%' : 'FAILED');

const hasCorleyId = updatedContent.includes('id="ref-corley2014"');
console.log('Contains id="ref-corley2014":', hasCorleyId);

const hasCorleyDoi = updatedContent.includes('10.1056/NEJMoa1309086');
console.log('Contains Corley DOI:', hasCorleyDoi);

const hasCorleyPubmed = updatedContent.includes('https://pubmed.ncbi.nlm.nih.gov/24693890/');
console.log('Contains Corley PubMed link:', hasCorleyPubmed);

// Test filter simulation
function simulateFilter(query, category) {
  return cards.filter(card => {
    const catMatch = card.match(/data-category="([^"]*)"/);
    const itemCat = catMatch ? catMatch[1] : '';
    const text = card.replace(/<[^>]*>/g, ' ').toLowerCase();
    const matchesCat = (category === 'all' || itemCat === category || itemCat.split(/\s+/).includes(category));
    const matchesQuery = (!query || text.includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });
}

console.log('Search "Corley":', simulateFilter('Corley', 'all').length, 'matches (expected 1)');
console.log('Search "PraNet":', simulateFilter('PraNet', 'all').length, 'matches (expected >= 1)');
console.log('Search "Mamba":', simulateFilter('Mamba', 'all').length, 'matches (expected >= 1)');
console.log('Search "Repici":', simulateFilter('Repici', 'all').length, 'matches (expected >= 1)');
console.log('Category "clinical":', simulateFilter('', 'clinical').length, 'matches (expected 9)');
console.log('Category "all":', simulateFilter('', 'all').length, 'matches (expected 49)');
