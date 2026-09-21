const fs = require('fs');
const content = fs.readFileSync('pages/11-references.html', 'utf8');

const regex = /<h3 class=["']ref-title["']>([\s\S]*?)<\/h3>[\s\S]*?<div class=["']ref-authors["']>([\s\S]*?)<\/div>/gi;
let m;
let i = 1;
while ((m = regex.exec(content)) !== null && i <= 20) {
  console.log(`${i}: ${m[2].trim()} - "${m[1].trim()}"`);
  i++;
}
