// count_glossary_keys.js
const fs = require('fs');

const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');
const match = mainJs.match(/const GLOSSARY_TERMS = \{([\s\S]*?)\n  \};/);
if (match) {
  // eval or parse keys
  const block = match[1];
  const keys = block.match(/"[a-z0-9-]+":\s*\{/g) || [];
  console.log('Keys in GLOSSARY_TERMS:', keys.length);
} else {
  console.log('Could not find GLOSSARY_TERMS block');
}
