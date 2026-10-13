import { readFileSync, writeFileSync } from 'node:fs';
const css = readFileSync(new URL('../ui/dashboard.css', import.meta.url), 'utf8');
if (css.includes('</style')) throw new Error('Invalid shared CSS');
for (const name of ['index','checklist','commerce','costs']) {
 const file = new URL(`../ui/${name}.html`, import.meta.url);
 let html = readFileSync(file, 'utf8');
 const old = /<style id="dashboard-shell-styles">[\s\S]*?<\/style>/;
 const tag = `<style id="dashboard-shell-styles">${css}</style>`;
 if (old.test(html)) html = html.replace(old, () => tag);
 else if (html.includes('<link rel="stylesheet" href="/dashboard.css">')) html = html.replace('<link rel="stylesheet" href="/dashboard.css">', () => tag);
 else throw new Error(`Missing shared style slot: ${name}`);
 writeFileSync(file, html);
}
