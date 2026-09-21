const fs = require('fs');
const content = fs.readFileSync('pages/03-ai-history.html', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (/MILESTONE|card-footer|Primary Breakthrough|Key Limitation|mDice|ClinicDB/i.test(l)) {
    console.log(`L${idx+1}: ${l.trim()}`);
  }
});
