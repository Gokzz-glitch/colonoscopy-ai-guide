const fs = require('fs');
const content = fs.readFileSync('pages/04-architectures.html', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (idx >= 190 && idx <= 640) {
    if (/ClinicDB|ColonDB|Kvasir|ETIS|mDice|Dice|IoU|0\.\d{3}/i.test(l)) {
      console.log(`L${idx+1}: ${l.trim()}`);
    }
  }
});
