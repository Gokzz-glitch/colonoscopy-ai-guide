const fs = require('fs');
const content = fs.readFileSync('pages/04-architectures.html', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (/<section|<h2|<h3|<h4|class=".*card.*"|data-model/i.test(l)) {
    console.log(`L${idx+1}: ${l.trim().substring(0, 120)}`);
  }
});
