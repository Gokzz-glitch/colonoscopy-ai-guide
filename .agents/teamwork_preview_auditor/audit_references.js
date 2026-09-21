// audit_references.js
const fs = require('fs');
const path = require('path');

const refFile = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide\\pages\\11-references.html';
const content = fs.readFileSync(refFile, 'utf8');

// Find all reference cards
const refCards = content.match(/<div class="reference-card"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
console.log(`Found ${refCards.length} reference cards in 11-references.html`);

// Also let's match by ref-title
const titleMatches = content.match(/<h3 class="ref-title">([\s\S]*?)<\/h3>/gi) || [];
console.log(`Found ${titleMatches.length} ref-titles in 11-references.html`);

const doiMatches = content.match(/href="(https:\/\/doi\.org\/[^"]+|https:\/\/arxiv\.org\/[^"]+)"/gi) || [];
console.log(`Found ${doiMatches.length} DOI/arXiv links in 11-references.html`);

// Let's print out all 48 reference titles
titleMatches.forEach((t, i) => {
  const clean = t.replace(/<[^>]+>/g, '').trim();
  console.log(`  [#${i+1}] ${clean.slice(0, 80)}`);
});
