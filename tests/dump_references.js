const fs = require('fs');
const path = require('path');

const refHtmlPath = path.resolve(__dirname, '..', 'pages', '11-references.html');
const content = fs.readFileSync(refHtmlPath, 'utf8');

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
      if (tagMatch[0].startsWith('</')) {
        depth--;
      } else if (!tagMatch[0].endsWith('/>')) {
        depth++;
      }
      currIndex = tagRegex.lastIndex;
    }
    elements.push(html.substring(startIndex, currIndex));
  }
  return elements;
}

const cards = extractElementsWithClass(content, 'reference-card');
console.log(`Total reference cards parsed: ${cards.length}\n`);

cards.forEach((card, idx) => {
  const num = (idx + 1).toString().padStart(2, '0');
  const titleMatch = card.match(/<h3 class=["']ref-title["']>([\s\S]*?)<\/h3>/i);
  const authorsMatch = card.match(/<div class=["']ref-authors["']>([\s\S]*?)<\/div>/i);
  const venueMatch = card.match(/<div class=["']ref-venue["']>([\s\S]*?)<\/div>/i);
  const idMatch = card.match(/id=["']([^"']+)["']/i);
  
  const links = [];
  const aRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let aMatch;
  while ((aMatch = aRegex.exec(card)) !== null) {
    links.push({ href: aMatch[1], label: aMatch[2].replace(/<[^>]*>/g, '').trim() });
  }

  const title = titleMatch ? titleMatch[1].trim() : 'UNKNOWN TITLE';
  const authors = authorsMatch ? authorsMatch[1].trim() : 'UNKNOWN AUTHORS';
  const venue = venueMatch ? venueMatch[1].trim() : 'UNKNOWN VENUE';
  const cardId = idMatch ? idMatch[1] : 'NONE';

  console.log(`[#${num}] ID: ${cardId} | ${authors} | "${title}"`);
  console.log(`     Venue: ${venue}`);
  console.log(`     Links: ${links.map(l => l.label + ' -> ' + l.href).join(' | ')}`);
});
