const fs = require('fs');
const c = fs.readFileSync('pages/12-glossary.html', 'utf8');

const regex = /<div class="glossary-card" id="([^"]+)"[^>]*data-term="([^"]+)"/g;
let m;
const cards = [];
while ((m = regex.exec(c)) !== null) {
  cards.push({ id: m[1], term: m[2] });
}

console.log('Total cards:', cards.length);
const letters = {};
cards.forEach(card => {
  const firstLetter = card.term.charAt(0).toUpperCase();
  if (!letters[firstLetter]) letters[firstLetter] = [];
  letters[firstLetter].push(card);
});

console.log('Letters present:', Object.keys(letters).sort());
for (const l of Object.keys(letters).sort()) {
  console.log(`${l} (${letters[l].length}): ${letters[l].map(x => x.term).join(', ')}`);
}
