// inspect_tables.js
const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\imgk3\\teamwork_projects\\colonoscopy_ai_guide';
const pagesDir = path.join(rootDir, 'pages');
const htmlFiles = [
  path.join(rootDir, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Find all table tags
  const tableMatches = content.match(/<table[\s\S]*?<\/table>/gi);
  if (tableMatches) {
    tableMatches.forEach((tbl, idx) => {
      if (/ColonDB/i.test(tbl) || /CVC-?300/i.test(tbl) || /ClinicDB/i.test(tbl)) {
        console.log(`\n--------------------------------------------------`);
        console.log(`Table #${idx + 1} in ${rel}:`);
        // Print table header (thead or first tr)
        const headerMatch = tbl.match(/<thead[\s\S]*?<\/thead>/i) || tbl.match(/<tr[\s\S]*?<\/tr>/i);
        if (headerMatch) {
          const cleanHeader = headerMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          console.log(`  Header: ${cleanHeader}`);
        }
        // Print first 3 rows
        const rows = tbl.match(/<tr[\s\S]*?<\/tr>/gi) || [];
        rows.slice(0, 4).forEach((r, rIdx) => {
          const cleanRow = r.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          console.log(`  Row ${rIdx}: ${cleanRow}`);
        });
      }
    });
  }
}
