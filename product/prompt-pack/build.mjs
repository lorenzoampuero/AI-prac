// Builds the paid "Prompt Pack Pro" (EN + ES) from the site's free template sets plus the pack-only
// sets in this folder. Output: product/prompt-pack/dist/prompt-pack-{en,es}.html and, when Playwright
// can be imported, the matching PDFs. Nothing here ships with the website build.
//
// Usage: node product/prompt-pack/build.mjs
// (PDF step: needs `playwright` resolvable, e.g. NODE_PATH=$(npm root -g) node product/prompt-pack/build.mjs)

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const out = join(here, 'dist');
mkdirSync(out, { recursive: true });

const VERSION = '1.0 · 2026-09';

const copy = {
  en: {
    lang: 'en',
    title: 'Prompt Pack Pro',
    subtitle: '100 prompt templates for work, study and everyday tasks',
    tagline: 'Named slots for what changes. Fixed rules for what usually goes wrong.',
    worksWith: 'Works with ChatGPT, Claude, Gemini, Copilot and any chat assistant.',
    contents: 'Contents',
    exclusive: 'Pack exclusive',
    templates: 'templates',
    useWhen: 'Use it when',
    why: 'Why it works',
    howTitle: 'How to use these templates',
    how: [
      'Replace every [SLOT] with your real information. If you cannot fill a slot, the task is not ready to delegate yet — that is the template doing its job.',
      'Paste your own material between <<< and >>>, so the model knows exactly where it starts and ends.',
      'Keep the rules. They are there because of a specific failure: invented facts, lost numbers, promises you cannot keep.',
      'Check the answer with the one-page checklist before you use it.',
    ],
    checklistTitle: 'Before you use an AI answer: the 8-point check',
    checklist: [
      'Every [SLOT] was filled with real information — nothing left for the model to guess.',
      'Numbers, names and dates match your source exactly.',
      'Every claim you will rely on has a source you opened yourself.',
      'Nothing is promised that you (or your company policy) cannot deliver.',
      'Time-sensitive facts — prices, laws, product features, roles — were checked against a current source.',
      'Quotes and citations exist and actually say what the answer claims.',
      'The answer covers the question you asked; nothing important was silently dropped.',
      'You can stand behind every sentence — you are the author, the AI was the assistant.',
    ],
    privacyTitle: 'Never paste into a chat assistant',
    privacy: 'Passwords and access keys · other people’s personal data (IDs, health, addresses) without permission · confidential company documents your policy does not allow · anything you would not want stored on someone else’s server.',
    licenseTitle: 'Licence',
    license:
      'For your personal and professional use. Use the templates and everything you create with them freely, at work or for clients. Please do not resell, share or republish the pack itself. Free templates and lessons: getaipractice.site',
  },
  es: {
    lang: 'es',
    title: 'Pack Pro de prompts',
    subtitle: '100 plantillas de prompts para el trabajo, el estudio y el día a día',
    tagline: 'Huecos con nombre para lo que cambia. Reglas fijas para lo que suele salir mal.',
    worksWith: 'Funcionan con ChatGPT, Claude, Gemini, Copilot y cualquier asistente de chat.',
    contents: 'Contenido',
    exclusive: 'Exclusivo del pack',
    templates: 'plantillas',
    useWhen: 'Úsalo cuando',
    why: 'Por qué funciona',
    howTitle: 'Cómo usar estas plantillas',
    how: [
      'Sustituye cada [HUECO] por tu información real. Si no puedes rellenar uno, la tarea aún no está lista para delegarla: la plantilla está haciendo su trabajo.',
      'Pega tu propio material entre <<< y >>>, para que el modelo sepa exactamente dónde empieza y dónde acaba.',
      'Mantén las reglas. Están ahí por un fallo concreto: datos inventados, cifras perdidas, promesas que no puedes cumplir.',
      'Revisa la respuesta con la lista de una página antes de usarla.',
    ],
    checklistTitle: 'Antes de usar una respuesta de IA: la revisión en 8 puntos',
    checklist: [
      'Cada [HUECO] se rellenó con información real: nada quedó para que el modelo lo adivinara.',
      'Las cifras, nombres y fechas coinciden exactamente con tu fuente.',
      'Cada afirmación en la que te vas a apoyar tiene una fuente que abriste tú.',
      'No se promete nada que tú (o la política de tu empresa) no pueda cumplir.',
      'Los datos que caducan —precios, leyes, funciones de productos, cargos— se comprobaron con una fuente actual.',
      'Las citas y referencias existen y dicen de verdad lo que afirma la respuesta.',
      'La respuesta cubre la pregunta que hiciste; no se quedó nada importante por el camino.',
      'Puedes responder de cada frase: el autor eres tú, la IA fue la ayudante.',
    ],
    privacyTitle: 'Nunca pegues en un asistente de chat',
    privacy: 'Contraseñas y claves de acceso · datos personales de otras personas (DNI, salud, direcciones) sin permiso · documentos confidenciales de la empresa que tu política no permite · nada que no querrías guardado en el servidor de otro.',
    licenseTitle: 'Licencia',
    license:
      'Para tu uso personal y profesional. Usa las plantillas y todo lo que crees con ellas con total libertad, en el trabajo o para clientes. Por favor, no revendas, compartas ni republiques el pack. Plantillas y lecciones gratis: getaipractice.site/es',
  },
};

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function siteSets(dir) {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace(/\.json$/, ''), ...JSON.parse(readFileSync(join(root, dir, f), 'utf8')) }))
    .filter((s) => !s.draft);
}

function build(locale) {
  const c = copy[locale];
  const free = siteSets(locale === 'es' ? 'src/content/prompts-es' : 'src/content/prompts');
  const extra = JSON.parse(readFileSync(join(here, `exclusive-${locale}.json`), 'utf8')).map((s) => ({ ...s, exclusive: true }));
  const sets = [...free, ...extra].sort((a, b) => a.order - b.order);
  const total = sets.reduce((n, s) => n + s.templates.length, 0);
  if (total !== 100) throw new Error(`${locale}: expected 100 templates, got ${total}`);

  let n = 0;
  const sections = sets
    .map((set) => {
      const items = set.templates
        .map((t) => {
          n += 1;
          return `<article class="tpl"><h3><span class="num">${n}</span>${esc(t.title)}</h3>
<p class="when"><strong>${c.useWhen}:</strong> ${esc(t.useWhen.charAt(0).toLowerCase() + t.useWhen.slice(1))}</p>
<pre>${esc(t.prompt)}</pre>
<p class="why"><strong>${c.why}:</strong> ${esc(t.why)}</p></article>`;
        })
        .join('\n');
      return `<section class="set" id="${set.slug}"><p class="kicker">${set.exclusive ? c.exclusive : '&nbsp;'}</p><h2>${esc(set.name)}</h2><p class="intro">${esc(set.intro)}</p>${items}</section>`;
    })
    .join('\n');

  const toc = sets
    .map((s) => `<li><a href="#${s.slug}">${esc(s.name)}</a> <span>${s.templates.length} ${c.templates}${s.exclusive ? ` · ${c.exclusive}` : ''}</span></li>`)
    .join('');

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${c.title}</title><style>
@page { size: A4; margin: 18mm 16mm 18mm; }
* { box-sizing: border-box; }
body { font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; color: #211b14; font-size: 10.5pt; line-height: 1.5; margin: 0; }
h1, h2, h3 { font-family: Georgia, 'Source Serif 4', serif; line-height: 1.2; }
.cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; page-break-after: always; border-left: 6mm solid #14584a; padding-left: 12mm; }
.cover h1 { font-size: 40pt; margin: 0 0 4mm; color: #14584a; }
.cover .sub { font-size: 16pt; margin: 0 0 10mm; }
.cover .tag { font-size: 12pt; color: #6f665a; margin: 0 0 2mm; }
.cover .ver { margin-top: 30mm; color: #6f665a; font-size: 9pt; }
.page { page-break-after: always; }
h2 { font-size: 20pt; color: #14584a; margin: 0 0 3mm; }
.kicker { text-transform: uppercase; letter-spacing: .08em; font-size: 8pt; color: #b45309; font-weight: 700; margin: 0 0 1mm; }
.intro { color: #6f665a; margin: 0 0 6mm; }
.set { page-break-before: always; }
.tpl { break-inside: avoid; border: 1px solid #e7e0d1; border-radius: 3mm; padding: 4mm 5mm; margin: 0 0 5mm; background: #fffdf9; }
.tpl h3 { font-size: 12.5pt; margin: 0 0 2mm; display: flex; gap: 3mm; align-items: baseline; }
.num { font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #fff; background: #14584a; border-radius: 99px; padding: .5mm 2.2mm; }
.when, .why { margin: 0 0 2mm; }
.why { color: #6f665a; margin: 0; }
pre { white-space: pre-wrap; font-family: 'Cascadia Code', Menlo, Consolas, monospace; font-size: 9pt; background: #f2eee4; border-radius: 2mm; padding: 3mm 4mm; margin: 0 0 2mm; }
ol.check li, ol.how li { margin-bottom: 2.5mm; }
ol.check { counter-reset: none; }
.toc { list-style: none; padding: 0; columns: 1; }
.toc li { display: flex; justify-content: space-between; border-bottom: 1px dotted #d9cfbc; padding: 1.8mm 0; }
.toc a { color: #211b14; text-decoration: none; font-weight: 600; }
.toc span { color: #6f665a; font-size: 9pt; }
.box { border: 1px solid #b45309; background: rgba(180,83,9,.07); border-radius: 3mm; padding: 4mm 5mm; margin-top: 6mm; }
.box h3 { margin: 0 0 2mm; font-size: 12pt; }
.box p { margin: 0; }
.license { font-size: 9pt; color: #6f665a; }
</style></head><body>
<section class="cover"><h1>${c.title}</h1><p class="sub">${c.subtitle}</p><p class="tag">${c.tagline}</p><p class="tag">${c.worksWith}</p><p class="ver">${VERSION} · getaipractice.site</p></section>
<section class="page"><h2>${c.contents}</h2><ol class="toc">${toc}</ol>
<h2 style="margin-top:10mm">${c.howTitle}</h2><ol class="how">${c.how.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></section>
<section class="page"><h2>${c.checklistTitle}</h2><ol class="check">${c.checklist.map((s) => `<li>☐ ${esc(s)}</li>`).join('')}</ol>
<div class="box"><h3>${c.privacyTitle}</h3><p>${esc(c.privacy)}</p></div>
<h3 style="margin-top:10mm">${c.licenseTitle}</h3><p class="license">${esc(c.license)}</p></section>
${sections}
</body></html>`;
}

const files = [];
for (const locale of ['en', 'es']) {
  const file = join(out, `prompt-pack-${locale}.html`);
  writeFileSync(file, build(locale));
  files.push(file);
  console.log('wrote', file);
}

let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  console.log('playwright not found — open the HTML files and "Print to PDF" (A4), or set NODE_PATH.');
  process.exit(0);
}
const browser = await chromium.launch();
for (const file of files) {
  const page = await browser.newPage();
  await page.goto(`file://${file}`, { waitUntil: 'load' });
  const pdf = file.replace(/\.html$/, '.pdf');
  await page.pdf({ path: pdf, format: 'A4', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:8px;color:#8a8172;width:100%;text-align:center;"><span class="pageNumber"></span></div>',
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' } });
  console.log('wrote', pdf);
  await page.close();
}
await browser.close();
