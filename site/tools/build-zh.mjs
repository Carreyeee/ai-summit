// Build the Chinese page (zh.html) from the English source (index.html) + i18n/zh.json.
// Run from anywhere:  node site/tools/build-zh.mjs   (or `cd site && node tools/build-zh.mjs`)
//
// Why: each language is its own static, fully-crawlable page (/, /zh.html) with its
// own <title>/description/OG and correct hreflang — instead of client-side text swapping
// that search engines (esp. Baidu) can't see. English index.html stays the single source
// of structure; this script bakes the Chinese strings in. Re-run after editing index.html
// or i18n/zh.json.  No dependencies — plain Node ≥ 16.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://aisummit-weld.vercel.app';

const html = readFileSync(join(SITE, 'index.html'), 'utf8');
const dict = JSON.parse(readFileSync(join(SITE, 'i18n', 'zh.json'), 'utf8'));
const seo = dict._seo;

let out = html;

// 1) Document language
out = out.replace('<html lang="en">', '<html lang="zh-Hans">');

// 2) Head: title + meta (description / keywords) + social, swapped to the zh _seo block
out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);
out = out.replace(/(<meta name="description" content=")[\s\S]*?(" \/>)/, `$1${seo.description}$2`);
out = out.replace(/(<meta name="keywords" content=")[\s\S]*?(" \/>)/, `$1${seo.keywords}$2`);
out = out.replace(/(<meta property="og:title" content=")[\s\S]*?(" \/>)/, `$1${seo.ogTitle}$2`);
out = out.replace(/(<meta property="og:description" content=")[\s\S]*?(" \/>)/, `$1${seo.ogDescription}$2`);
out = out.replace(/(<meta name="twitter:title" content=")[\s\S]*?(" \/>)/, `$1${seo.twTitle}$2`);
out = out.replace(/(<meta name="twitter:description" content=")[\s\S]*?(" \/>)/, `$1${seo.twDescription}$2`);

// 3) Per-page URLs + locale: this page is the zh canonical; alternate is en
out = out.replace(`<link rel="canonical" href="${ORIGIN}/" />`, `<link rel="canonical" href="${ORIGIN}/zh.html" />`);
out = out.replace(`<meta property="og:url" content="${ORIGIN}/" />`, `<meta property="og:url" content="${ORIGIN}/zh.html" />`);
out = out.replace('<meta property="og:locale" content="en_AU" />', '<meta property="og:locale" content="zh_CN" />');
out = out.replace('<meta property="og:locale:alternate" content="zh_CN" />', '<meta property="og:locale:alternate" content="en_AU" />');

// 4) Language toggle → link back to English, mark 中文 active
out = out.replace(
  '<a class="lang-toggle is-en" id="langToggle" href="zh.html" hreflang="zh-Hans" aria-label="切换到中文 / Switch to Chinese">',
  '<a class="lang-toggle is-zh" id="langToggle" href="index.html" hreflang="en" aria-label="Switch to English / 切换到英文">'
);

// 5) Body: replace innerHTML of every [data-i18n] element with its zh string
const missing = [];
out = out.replace(/(\sdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/)/g, (m, open, key, _inner, close) => {
  if (Object.prototype.hasOwnProperty.call(dict, key) && typeof dict[key] === 'string') {
    return open + dict[key] + close;
  }
  missing.push(key);
  return m;
});

writeFileSync(join(SITE, 'zh.html'), out, 'utf8');

if (missing.length) {
  console.warn('⚠ Missing zh translations (left in English):', [...new Set(missing)].join(', '));
}
console.log('✓ Wrote zh.html');
