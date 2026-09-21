const fs = require('fs');
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

console.log("50 Glossary Keys:");
console.log(Object.keys(ColonoscopyAI.glossary));
console.log("\nAliases:");
console.log(ColonoscopyAI.aliases);
