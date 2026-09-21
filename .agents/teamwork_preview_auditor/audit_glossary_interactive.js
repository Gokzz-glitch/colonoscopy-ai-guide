// audit_glossary_interactive.js
const fs = require('fs');

const content = fs.readFileSync('pages/12-glossary.html', 'utf8');
const terms = content.match(/class="glossary-card"/g) || [];
console.log('Glossary cards in 12-glossary.html:', terms.length);

const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');
const jsTerms = mainJs.match(/id:\s*['"][^'"]+['"]/g) || [];
console.log('Terms in main.js GLOSSARY:', jsTerms.length);
