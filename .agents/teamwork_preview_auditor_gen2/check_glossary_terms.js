const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createMockDom() {
  const doc = {
    readyState: 'complete',
    documentElement: { scrollTop: 0, scrollHeight: 2000, clientHeight: 800, getAttribute: () => 'dark', setAttribute: () => {} },
    body: { style: {}, appendChild: () => {}, prepend: () => {} },
    createElement: () => ({ id: '', className: '', style: {}, setAttribute: () => {}, getAttribute: () => null, classList: { add: () => {}, remove: () => {}, contains: () => false }, addEventListener: () => {}, querySelector: () => ({ textContent: '', className: '', style: {}, setAttribute: () => {} }), querySelectorAll: () => [] }),
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {}
  };
  const win = { document: doc, localStorage: { getItem: () => null, setItem: () => {} }, addEventListener: () => {}, removeEventListener: () => {}, matchMedia: () => ({ matches: false }), location: { pathname: '/index.html' }, innerWidth: 1200, innerHeight: 800, MutationObserver: class { observe() {} disconnect() {} } };
  return { window: win, document: doc, localStorage: win.localStorage, MutationObserver: win.MutationObserver, setTimeout, clearTimeout, console };
}

const mainJsContent = fs.readFileSync('assets/js/main.js', 'utf8');
const sandbox = createMockDom();
sandbox.window.window = sandbox.window;
vm.runInNewContext(mainJsContent, sandbox);
const ColonoscopyAI = sandbox.window.ColonoscopyAI;

const rootDir = path.resolve('.');
const pagesDir = path.join(rootDir, 'pages');
const htmlFiles = [
  path.join(rootDir, 'index.html'),
  ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f))
];

let totalGlossaryTerms = 0;
let unresolved = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // match elements with class glossary-term
  const matches = content.matchAll(/<([a-z0-9]+)[^>]*class=["'][^"']*\bglossary-term\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi);
  for (const m of matches) {
    totalGlossaryTerms++;
    const fullTag = m[0];
    const innerText = m[2].replace(/<[^>]+>/g, '').trim();
    const dataTermMatch = fullTag.match(/data-term=["']([^"']+)["']/i);
    const termKey = dataTermMatch ? dataTermMatch[1] : innerText;
    
    const resolved = ColonoscopyAI.resolveGlossaryTerm({
      getAttribute: (attr) => attr === 'data-term' ? dataTermMatch ? dataTermMatch[1] : null : null,
      textContent: innerText
    });
    
    if (!resolved) {
      unresolved.push({ file: rel, termKey, innerText, fullTag: fullTag.slice(0, 100) });
    }
  }
}

console.log(`Total .glossary-term elements: ${totalGlossaryTerms}`);
console.log(`Unresolved .glossary-term elements: ${unresolved.length}`);
unresolved.forEach(u => console.log(`  ✗ ${u.file}: termKey='${u.termKey}' (text='${u.innerText}')`));
