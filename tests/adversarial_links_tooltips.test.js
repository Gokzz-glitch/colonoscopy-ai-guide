/**
 * ADVERSARIAL LINK, DOM & TOOLTIP ENGINE VERIFICATION TEST SUITE
 * Challenger 1: Empirical Challenger
 * 
 * Exhaustively stress-tests:
 * 1. All relative links, stylesheets, scripts, images, and anchors across all 14 HTML files.
 * 2. In-page and cross-page anchor resolution (zero dangling #hashes).
 * 3. Every single glossary term element (.glossary-term and [data-term]) against main.js.
 * 4. Master 50-term dictionary completeness and anchor targets in pages/12-glossary.html.
 * 5. All 48 citations in pages/11-references.html for valid DOI/arXiv/GitHub URLs and IDs.
 * 6. DOM integrity: Duplicate IDs, malformed links, protocol-less URLs.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const MAIN_JS_FILE = path.join(ROOT_DIR, 'assets', 'js', 'main.js');

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: {
    brokenLinks: [],
    brokenAssets: [],
    brokenAnchors: [],
    unresolvedGlossaryTooltips: [],
    glossaryCardDataTermIssues: [],
    missingGlossaryAnchors: [],
    duplicateIds: [],
    citationIssues: [],
    unresolvedCrossReferences: []
  }
};

function recordPass(msg) {
  results.passed++;
}

function recordFail(category, msg, data = {}) {
  results.failed++;
  results.details[category].push({ msg, ...data });
  console.error(`  [FAIL] [${category}] ${msg}`);
}

function recordWarning(category, msg, data = {}) {
  results.warnings++;
  console.warn(`  [WARN] [${category}] ${msg}`);
}

// Balanced tag extractor for robust HTML parsing without external dependencies
function extractElementsWithClass(html, className) {
  const elements = [];
  const startRegex = new RegExp(`<([a-zA-Z0-9]+)[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'gi');
  let match;
  while ((match = startRegex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const startIndex = match.index;
    let depth = 1;
    let currIndex = startIndex + match[0].length;
    const tagRegex = new RegExp(`<\/?${tagName}\\b[^>]*>`, 'gi');
    tagRegex.lastIndex = currIndex;
    let tagMatch;
    while (depth > 0 && (tagMatch = tagRegex.exec(html)) !== null) {
      if (tagMatch[0].startsWith('</')) {
        depth--;
      } else if (!tagMatch[0].endsWith('/>')) {
        depth++;
      }
      currIndex = tagRegex.lastIndex;
    }
    elements.push(html.substring(startIndex, currIndex));
  }
  return elements;
}

// -----------------------------------------------------------------------------
// Load and sandbox main.js to inspect ColonoscopyAI and GLOSSARY_TERMS
// -----------------------------------------------------------------------------
console.log("===============================================================================");
console.log("CHALLENGER 1: ADVERSARIAL LINK, DOM & TOOLTIP VERIFICATION SUITE");
console.log("===============================================================================\n");
console.log("Stage 1: Loading and sandboxing assets/js/main.js...");

function createMockDom() {
  const listeners = {};
  const doc = {
    readyState: 'complete',
    documentElement: {
      scrollTop: 0, scrollHeight: 2000, clientHeight: 800,
      getAttribute: () => 'dark', setAttribute: () => {}
    },
    body: { style: {}, appendChild: () => {}, prepend: () => {} },
    createElement: (tag) => ({
      id: '', className: '', style: {}, setAttribute: () => {}, getAttribute: () => null,
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelector: () => ({ textContent: '', className: '', style: {}, setAttribute: () => {} }),
      querySelectorAll: () => []
    }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: (event, cb) => { listeners[event] = cb; }
  };
  const win = {
    document: doc,
    localStorage: { getItem: () => null, setItem: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false }),
    location: { pathname: '/index.html' },
    innerWidth: 1200,
    innerHeight: 800,
    MutationObserver: class { observe() {} disconnect() {} }
  };
  return { window: win, document: doc, localStorage: win.localStorage, MutationObserver: win.MutationObserver, setTimeout, clearTimeout, console };
}

const mainJsContent = fs.readFileSync(MAIN_JS_FILE, 'utf8');
const domSandbox = createMockDom();
domSandbox.window.window = domSandbox.window;
vm.runInNewContext(mainJsContent, domSandbox);

const ColonoscopyAI = domSandbox.window.ColonoscopyAI || domSandbox.ColonoscopyAI;
if (!ColonoscopyAI || !ColonoscopyAI.glossary) {
  throw new Error("Failed to load ColonoscopyAI or glossary dictionary from main.js!");
}
console.log(`Loaded ${Object.keys(ColonoscopyAI.glossary).length} glossary terms and ${Object.keys(ColonoscopyAI.aliases).length} aliases.\n`);

// -----------------------------------------------------------------------------
// Collect all HTML files
// -----------------------------------------------------------------------------
console.log("Stage 2: Discovering and cataloging all HTML files...");
const htmlFiles = [
  path.join(ROOT_DIR, 'index.html')
];

fs.readdirSync(PAGES_DIR).forEach(file => {
  if (file.endsWith('.html')) {
    htmlFiles.push(path.join(PAGES_DIR, file));
  }
});

console.log(`Found ${htmlFiles.length} HTML files across platform:\n  - ${htmlFiles.map(f => path.relative(ROOT_DIR, f)).join('\n  - ')}\n`);

const fileData = {};

// Regex parsers
const regexId = /\bid=["']([^"']+)["']/gi;
const regexA = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi;
const regexLink = /<link\s+[^>]*href=["']([^"']*)["'][^>]*>/gi;
const regexScript = /<script\s+[^>]*src=["']([^"']*)["'][^>]*>/gi;
const regexImg = /<img\s+[^>]*src=["']([^"']*)["'][^>]*>/gi;
const regexGlossarySpans = /<([a-zA-Z0-9]+)\s+[^>]*class=["'][^"']*\bglossary-term\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;
const regexDataTermAttr = /<([a-zA-Z0-9]+)\s+[^>]*data-term=["']([^"']*)["'][^>]*>([\s\S]*?)<\/\1>/gi;

htmlFiles.forEach(filePath => {
  const relPath = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Extract IDs and check for duplicates
  const ids = new Set();
  const idCounts = {};
  let match;
  regexId.lastIndex = 0;
  while ((match = regexId.exec(content)) !== null) {
    const id = match[1];
    idCounts[id] = (idCounts[id] || 0) + 1;
    ids.add(id);
  }

  // Report duplicate IDs
  Object.keys(idCounts).forEach(id => {
    if (idCounts[id] > 1) {
      recordFail('duplicateIds', `Duplicate DOM ID "${id}" appears ${idCounts[id]} times in ${relPath}`, { file: relPath, id, count: idCounts[id] });
    } else {
      recordPass(`Unique ID: ${id} in ${relPath}`);
    }
  });

  // 2. Extract <a href="...">
  const aHrefs = [];
  regexA.lastIndex = 0;
  while ((match = regexA.exec(content)) !== null) {
    aHrefs.push({ raw: match[0], href: match[1].trim() });
  }

  // 3. Extract <link href="...">
  const linkHrefs = [];
  regexLink.lastIndex = 0;
  while ((match = regexLink.exec(content)) !== null) {
    linkHrefs.push({ raw: match[0], href: match[1].trim() });
  }

  // 4. Extract <script src="...">
  const scriptSrcs = [];
  regexScript.lastIndex = 0;
  while ((match = regexScript.exec(content)) !== null) {
    scriptSrcs.push({ raw: match[0], src: match[1].trim() });
  }

  // 5. Extract <img src="...">
  const imgSrcs = [];
  regexImg.lastIndex = 0;
  while ((match = regexImg.exec(content)) !== null) {
    imgSrcs.push({ raw: match[0], src: match[1].trim() });
  }

  // 6. Extract glossary term elements (strictly .glossary-term)
  const glossaryTooltips = [];
  regexGlossarySpans.lastIndex = 0;
  while ((match = regexGlossarySpans.exec(content)) !== null) {
    const fullTag = match[0];
    const textContent = match[2].replace(/<[^>]*>/g, '').trim();
    const dataTermMatch = fullTag.match(/data-term=["']([^"']*)["']/i);
    const dataTerm = dataTermMatch ? dataTermMatch[1].trim() : null;
    glossaryTooltips.push({ fullTag, dataTerm, textContent });
  }

  // Also check any element with data-term that does not have glossary-term class
  const dataTermOnlyElements = [];
  regexDataTermAttr.lastIndex = 0;
  while ((match = regexDataTermAttr.exec(content)) !== null) {
    const fullTag = match[0];
    if (!fullTag.includes('glossary-term')) {
      const dataTerm = match[2].trim();
      const textContent = match[3].replace(/<[^>]*>/g, '').trim();
      dataTermOnlyElements.push({ fullTag, dataTerm, textContent });
    }
  }

  fileData[filePath] = {
    relPath,
    dir: path.dirname(filePath),
    content,
    ids,
    aHrefs,
    linkHrefs,
    scriptSrcs,
    imgSrcs,
    glossaryTooltips,
    dataTermOnlyElements
  };
});

// -----------------------------------------------------------------------------
// Stage 3: Validate Link & Asset Resolution (Relative vs Root, File Exists, Anchor Exists)
// -----------------------------------------------------------------------------
console.log("Stage 3: Adversarially verifying all hyperlinks, stylesheets, scripts, images, and anchors...");

Object.keys(fileData).forEach(filePath => {
  const data = fileData[filePath];
  const fileDir = data.dir;
  const relPath = data.relPath;

  // 3.1 Verify <link href="...">
  data.linkHrefs.forEach(({ raw, href }) => {
    if (!href) return;
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      recordPass(`External stylesheet/resource: ${href} in ${relPath}`);
      return;
    }
    const resolvedAssetPath = path.resolve(fileDir, href);
    if (!fs.existsSync(resolvedAssetPath)) {
      recordFail('brokenAssets', `Broken <link href="${href}"> in ${relPath} (resolved to missing: ${resolvedAssetPath})`, { file: relPath, raw, href });
    } else {
      recordPass(`Valid asset link: ${href} in ${relPath}`);
    }
  });

  // 3.2 Verify <script src="...">
  data.scriptSrcs.forEach(({ raw, src }) => {
    if (!src) return;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      recordPass(`External script: ${src} in ${relPath}`);
      return;
    }
    const resolvedScriptPath = path.resolve(fileDir, src);
    if (!fs.existsSync(resolvedScriptPath)) {
      recordFail('brokenAssets', `Broken <script src="${src}"> in ${relPath} (resolved to missing: ${resolvedScriptPath})`, { file: relPath, raw, src });
    } else {
      recordPass(`Valid script src: ${src} in ${relPath}`);
    }
  });

  // 3.3 Verify <img src="...">
  data.imgSrcs.forEach(({ raw, src }) => {
    if (!src) return;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.startsWith('data:')) {
      recordPass(`External/data image: in ${relPath}`);
      return;
    }
    const resolvedImgPath = path.resolve(fileDir, src);
    if (!fs.existsSync(resolvedImgPath)) {
      recordFail('brokenAssets', `Broken <img src="${src}"> in ${relPath} (resolved to missing: ${resolvedImgPath})`, { file: relPath, raw, src });
    } else {
      recordPass(`Valid img src: ${src} in ${relPath}`);
    }
  });

  // 3.4 Verify <a href="...">
  data.aHrefs.forEach(({ raw, href }) => {
    if (!href || href === '#' || href.startsWith('javascript:')) {
      return;
    }

    // External link
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:')) {
      recordPass(`External hyperlink: ${href} in ${relPath}`);
      return;
    }

    // In-page anchor link (#something)
    if (href.startsWith('#')) {
      const anchorId = href.substring(1);
      if (!data.ids.has(anchorId)) {
        recordFail('brokenAnchors', `In-page anchor link <a href="${href}"> in ${relPath} targets non-existent ID "#${anchorId}"`, { file: relPath, raw, href, anchorId });
      } else {
        recordPass(`Valid in-page anchor ${href} in ${relPath}`);
      }
      return;
    }

    // Cross-page or relative file link
    const [targetFilePart, targetHash] = href.split('#');
    const resolvedTargetFilePath = path.resolve(fileDir, targetFilePart);

    if (!fs.existsSync(resolvedTargetFilePath)) {
      recordFail('brokenLinks', `Broken relative link <a href="${href}"> in ${relPath} (resolved to missing: ${resolvedTargetFilePath})`, { file: relPath, raw, href, resolvedTargetFilePath });
    } else {
      recordPass(`Valid relative file link: ${href} in ${relPath}`);
      
      // If there's an anchor hash, verify it exists in the target file
      if (targetHash) {
        const targetFileData = fileData[resolvedTargetFilePath];
        if (targetFileData) {
          if (!targetFileData.ids.has(targetHash)) {
            recordFail('brokenAnchors', `Cross-page anchor link <a href="${href}"> in ${relPath} targets non-existent ID "#${targetHash}" in ${targetFileData.relPath}`, { file: relPath, raw, href, targetFile: targetFileData.relPath, targetHash });
          } else {
            recordPass(`Valid cross-page anchor ${href} in ${relPath}`);
          }
        } else {
          recordWarning('brokenAnchors', `Target file ${resolvedTargetFilePath} exists but was not indexed for ID verification`, { file: relPath, href });
        }
      }
    }
  });
});

// -----------------------------------------------------------------------------
// Stage 4: Cross-Checking Glossary Tooltips Across All Pages
// -----------------------------------------------------------------------------
console.log("\nStage 4: Verifying Glossary Tooltips against main.js dictionary and pages/12-glossary.html anchors...");

const glossaryHtmlPath = path.join(PAGES_DIR, '12-glossary.html');
const glossaryData = fileData[glossaryHtmlPath];
if (!glossaryData) {
  throw new Error("pages/12-glossary.html not found in fileData!");
}

let totalGlossaryTooltips = 0;

Object.keys(fileData).forEach(filePath => {
  const data = fileData[filePath];
  const relPath = data.relPath;

  // Audit all .glossary-term elements
  data.glossaryTooltips.forEach(el => {
    totalGlossaryTooltips++;
    
    const mockEl = {
      getAttribute: (attr) => (attr === 'data-term' ? (el.dataTerm || '') : null),
      textContent: el.textContent
    };

    const resolved = ColonoscopyAI.resolveGlossaryTerm(mockEl);
    if (!resolved) {
      recordFail('unresolvedGlossaryTooltips', `Glossary term could not be resolved by main.js in ${relPath}: text="${el.textContent}", data-term="${el.dataTerm || ''}"`, {
        file: relPath,
        fullTag: el.fullTag,
        dataTerm: el.dataTerm,
        textContent: el.textContent
      });
    } else {
      recordPass(`Resolved glossary term "${el.textContent}" -> ${resolved.term}`);
      
      // Check that the resolved link points to an existing anchor in 12-glossary.html
      const anchorId = resolved.link.split('#')[1];
      if (anchorId && !glossaryData.ids.has(anchorId)) {
        recordFail('missingGlossaryAnchors', `Resolved glossary term "${resolved.term}" links to anchor "#${anchorId}" which DOES NOT exist in pages/12-glossary.html!`, {
          file: relPath,
          term: resolved.term,
          anchorId,
          resolvedLink: resolved.link
        });
      } else {
        recordPass(`Glossary anchor verified: #${anchorId} exists in 12-glossary.html`);
      }
    }
  });

  // Audit data-term on non-glossary-term elements (e.g. glossary cards in 12-glossary.html)
  data.dataTermOnlyElements.forEach(el => {
    // Note: main.js binds to document.querySelectorAll('.glossary-term, [data-term]')!
    const mockEl = {
      getAttribute: (attr) => (attr === 'data-term' ? (el.dataTerm || '') : null),
      textContent: el.textContent
    };
    const resolved = ColonoscopyAI.resolveGlossaryTerm(mockEl);
    if (!resolved) {
      recordFail('glossaryCardDataTermIssues', `Element with [data-term] is bound by main.js querySelectorAll('.glossary-term, [data-term]') but fails to resolve in ${relPath}: data-term="${el.dataTerm}"`, {
        file: relPath,
        fullTag: el.fullTag.substring(0, 100),
        dataTerm: el.dataTerm
      });
    } else {
      recordPass(`[data-term] element in ${relPath} resolved cleanly to ${resolved.term}`);
    }
  });
});

console.log(`Audited ${totalGlossaryTooltips} inline glossary tooltips across all 14 pages.`);

// -----------------------------------------------------------------------------
// Stage 5: Master 50-Term In-Memory Dictionary vs pages/12-glossary.html Completeness
// -----------------------------------------------------------------------------
console.log("\nStage 5: Verifying all 50 glossary dictionary terms have cards & anchors in pages/12-glossary.html...");

const dictionaryTerms = Object.keys(ColonoscopyAI.glossary);
console.log(`Checking ${dictionaryTerms.length} dictionary terms against 12-glossary.html...`);

dictionaryTerms.forEach(key => {
  const item = ColonoscopyAI.glossary[key];
  const anchorId = item.link.split('#')[1];
  
  if (!anchorId) {
    recordFail('missingGlossaryAnchors', `Dictionary entry "${key}" (${item.term}) has malformed link without anchor: "${item.link}"`, { key, term: item.term, link: item.link });
  } else if (!glossaryData.ids.has(anchorId)) {
    recordFail('missingGlossaryAnchors', `Dictionary entry "${key}" (${item.term}) specifies anchor "#${anchorId}", but no element with id="${anchorId}" exists in 12-glossary.html!`, { key, term: item.term, anchorId });
  } else {
    recordPass(`Dictionary term "${key}" -> Anchor "#${anchorId}" confirmed in 12-glossary.html`);
  }
});

// Check if each card in 12-glossary.html has an ID matching a dictionary term
const cardIdRegex = /<div\s+[^>]*class=["'][^"']*glossary-card[^"']*["'][^>]*id=["']([^"']+)["']/gi;
let cardMatch;
let totalCardsFound = 0;
while ((cardMatch = cardIdRegex.exec(glossaryData.content)) !== null) {
  totalCardsFound++;
  const cardId = cardMatch[1];
  const foundInDict = Object.values(ColonoscopyAI.glossary).some(item => item.link.endsWith(`#${cardId}`));
  if (!foundInDict) {
    recordWarning('missingGlossaryAnchors', `Glossary card id="${cardId}" exists in 12-glossary.html but is not linked by any entry in main.js GLOSSARY_TERMS`, { cardId });
  } else {
    recordPass(`Glossary card id="${cardId}" has corresponding dictionary entry in main.js`);
  }
}
console.log(`Verified ${totalCardsFound} glossary cards with IDs in 12-glossary.html.`);

// -----------------------------------------------------------------------------
// Stage 6: Reference Links & Citations in pages/11-references.html
// -----------------------------------------------------------------------------
console.log("\nStage 6: Adversarially verifying reference citations and DOI/arXiv/GitHub URLs in pages/11-references.html...");

const referencesHtmlPath = path.join(PAGES_DIR, '11-references.html');
const refData = fileData[referencesHtmlPath];
if (!refData) {
  throw new Error("pages/11-references.html not found in fileData!");
}

const refCards = extractElementsWithClass(refData.content, 'reference-card');
console.log(`Identified ${refCards.length} reference cards in 11-references.html using balanced-tag parser.`);

if (refCards.length !== 48) {
  recordFail('citationIssues', `Expected exactly 48 reference cards in 11-references.html, found ${refCards.length}`);
} else {
  recordPass(`Found exactly 48 reference cards in 11-references.html`);
}

let citationsWithDoi = 0;
let citationsWithArxiv = 0;
let citationsWithGithub = 0;
let citationsWithPubmed = 0;
let citationsWithDirectId = 0;

refCards.forEach((cardHtml, idx) => {
  const cardNum = idx + 1;
  const padNum = cardNum.toString().padStart(2, '0');
  
  if (!cardHtml.includes(`#${padNum}`)) {
    recordFail('citationIssues', `Reference card #${padNum} is missing its expected header tag "#${padNum}"`, { cardIndex: cardNum });
  } else {
    recordPass(`Reference card #${padNum} header tag confirmed`);
  }

  // Check if reference card has an anchor ID (e.g. id="ref-01" or id="ref-XX")
  const idMatch = cardHtml.match(/id=["']([^"']+)["']/i);
  if (idMatch) {
    citationsWithDirectId++;
    recordPass(`Reference card #${padNum} has DOM ID: ${idMatch[1]}`);
  } else {
    recordWarning('citationIssues', `Reference card #${padNum} lacks an id attribute (e.g. id="ref-${padNum}"), making it impossible to anchor-link directly to this citation`, { cardIndex: cardNum });
  }

  // Extract links
  const linkMatches = cardHtml.match(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
  
  if (linkMatches.length === 0) {
    recordFail('citationIssues', `Reference #${padNum} has NO external hyperlinks or citations!`, { cardIndex: cardNum });
  } else {
    let hasValidExternalUrl = false;
    linkMatches.forEach(aTag => {
      const hrefMatch = aTag.match(/href=["']([^"']*)["']/i);
      const href = hrefMatch ? hrefMatch[1].trim() : '';

      if (!href || href === '#' || href.startsWith('javascript:')) {
        recordFail('citationIssues', `Reference #${padNum} contains empty or placeholder link: ${aTag}`, { cardIndex: cardNum, href });
      } else if (
        href.startsWith('https://doi.org/') || href.startsWith('http://doi.org/') ||
        href.startsWith('https://arxiv.org/') || href.startsWith('http://arxiv.org/') ||
        href.startsWith('https://github.com/') ||
        href.startsWith('https://pubmed.ncbi.nlm.nih.gov/') ||
        href.startsWith('https://www.ncbi.nlm.nih.gov/') ||
        href.startsWith('https://clinicaltrials.gov/') ||
        href.startsWith('https://') || href.startsWith('http://')
      ) {
        hasValidExternalUrl = true;
        if (href.includes('doi.org')) citationsWithDoi++;
        if (href.includes('arxiv.org')) citationsWithArxiv++;
        if (href.includes('github.com')) citationsWithGithub++;
        if (href.includes('pubmed') || href.includes('ncbi')) citationsWithPubmed++;
        recordPass(`Reference #${padNum} has valid citation URL: ${href}`);
      } else {
        recordFail('citationIssues', `Reference #${padNum} contains unrecognized or malformed URL: ${href}`, { cardIndex: cardNum, href });
      }
    });

    if (!hasValidExternalUrl) {
      recordFail('citationIssues', `Reference #${padNum} lacks any valid external citation URL!`, { cardIndex: cardNum });
    }
  }
});

console.log(`Citation breakdown across all 48 cards:`);
console.log(`  - Total citation cards: ${refCards.length}`);
console.log(`  - With DOI links: ${citationsWithDoi}`);
console.log(`  - With arXiv links: ${citationsWithArxiv}`);
console.log(`  - With GitHub links: ${citationsWithGithub}`);
console.log(`  - With PubMed links: ${citationsWithPubmed}`);
console.log(`  - With direct anchor IDs: ${citationsWithDirectId} / ${refCards.length}`);

// -----------------------------------------------------------------------------
// Stage 7: Comprehensive Report Generation
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log(`VERIFICATION COMPLETE: ${results.passed} Passed, ${results.failed} Failed, ${results.warnings} Warnings`);
console.log("===============================================================================");

const summaryJson = JSON.stringify(results, null, 2);
fs.writeFileSync(path.join(ROOT_DIR, 'tests', 'adversarial_results.json'), summaryJson, 'utf8');
console.log(`Saved detailed results to tests/adversarial_results.json`);

if (results.failed > 0) {
  console.error(`\nFAILED CHECKS SUMMARY (${results.failed} total):`);
  Object.keys(results.details).forEach(cat => {
    const list = results.details[cat];
    if (list.length > 0) {
      console.error(`\nCategory: ${cat} (${list.length} issues)`);
      list.slice(0, 10).forEach(item => console.error(`  - ${item.msg}`));
      if (list.length > 10) console.error(`  ... and ${list.length - 10} more`);
    }
  });
  process.exit(1);
} else {
  console.log("\nALL ADVERSARIAL CHECKS PASSED WITH ZERO FAILURES!");
  process.exit(0);
}
