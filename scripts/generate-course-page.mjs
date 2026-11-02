import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const base = 'https://academy.evocons.it';
const route = '/corsi/ai-per-il-lavoro/';
const url = base + route;
const title = 'AI per il lavoro: strumenti e produttività | Evocons Academy';
const description = 'Micro-corso online in diretta di 10 ore: impara a utilizzare l’AI generativa nel lavoro, con esercitazioni pratiche e confronto con il docente.';
const htmlPath = join('dist', 'index.html');
let html = await readFile(htmlPath, 'utf8');

function replaceTag(selector, value) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b(?:name|property)="${escaped}")[^>]*>`, 'i');
  const original = html.match(pattern)?.[0];
  if (!original) throw new Error(`Meta tag missing: ${selector}`);
  html = html.replace(pattern, original.replace(/\bcontent="[^"]*"/i, `content="${value}"`));
}
function replaceLink(rel, href) {
  const pattern = new RegExp(`<link\\b(?=[^>]*\\brel="${rel}")[^>]*>`, 'i');
  const original = html.match(pattern)?.[0];
  if (!original) throw new Error(`Link missing: ${rel}`);
  html = html.replace(pattern, original.replace(/\bhref="[^"]*"/i, `href="${href}"`));
}
html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
replaceTag('description', description);
replaceLink('canonical', url);
replaceTag('og:title', title);
replaceTag('og:description', description);
replaceTag('og:url', url);
replaceTag('og:type', 'article');
replaceTag('twitter:title', title);
replaceTag('twitter:description', description);

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://www.evocons.it/#organization', name: 'Evocons', url: 'https://www.evocons.it/' },
    { '@type': 'WebSite', '@id': `${base}/#website`, name: 'Evocons Academy', url: `${base}/`, publisher: { '@id': 'https://www.evocons.it/#organization' } },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'it-IT', isPartOf: { '@id': `${base}/#website` }, mainEntity: { '@id': `${url}#course` } },
    { '@type': 'Course', '@id': `${url}#course`, name: 'AI per il lavoro', description, url, inLanguage: 'it-IT', provider: { '@id': 'https://www.evocons.it/#organization' }, timeRequired: 'PT10H', educationalLevel: 'Beginner' }
  ]
};
const jsonLd = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
const existingSchema = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
if (!existingSchema.test(html)) throw new Error('JSON-LD block missing');
html = html.replace(existingSchema, jsonLd);

const dest = join('dist', 'corsi', 'ai-per-il-lavoro');
await mkdir(dest, { recursive: true });
await writeFile(join(dest, 'index.html'), html);
console.log(`Generated static SEO entry: ${route}`);
