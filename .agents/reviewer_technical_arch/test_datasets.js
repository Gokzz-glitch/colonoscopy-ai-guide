const fs = require('fs');
const path = require('path');

const root = 'C:/Users/imgk3/teamwork_projects/colonoscopy_ai_guide';
const p5 = fs.readFileSync(path.join(root, 'pages/05-datasets.html'), 'utf8');

const regex = /<article class="dataset-card([^"]*)"([^>]*)>([\s\S]*?)<\/article>/g;
let match;
let count = 0;
while ((match = regex.exec(p5)) !== null) {
  count++;
  const cardClass = match[1];
  const attrs = match[2];
  const body = match[3];
  const titleMatch = body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Unknown';
  console.log(`${count}. [${title}] attrs: ${attrs.trim()}`);
}
console.log(`Total dataset cards parsed: ${count}`);
