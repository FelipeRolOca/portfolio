import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderPost() {
  // Find valid browser executable
  const possiblePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  let executablePath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }

  if (!executablePath) {
    console.error('No se encontró un navegador compatible (Edge o Chrome).');
    process.exit(1);
  }

  console.log(`[FRO Renderer] Usando navegador: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--allow-file-access-from-files'
    ]
  });

  const page = await browser.newPage();

  // 1080x1350 at 2x scale for ultra-crisp social media upload
  await page.setViewport({
    width: 1080,
    height: 1350,
    deviceScaleFactor: 2
  });

  const htmlPath = path.join(__dirname, 'post.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`[FRO Renderer] Cargando: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Wait for Google Fonts to be ready
  await page.evaluate(async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
  });

  // Short pause for image painting & drop-shadow rendering
  await new Promise((resolve) => setTimeout(resolve, 800));

  const outputPath = path.join(__dirname, 'post_01_catalogo_web.png');
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1080,
      height: 1350
    }
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`[FRO Renderer] ✅ ¡Post exportado con éxito!`);
  console.log(`[FRO Renderer] Archivo: ${outputPath} (${sizeMb} MB)`);
}

renderPost().catch((err) => {
  console.error('[FRO Renderer] Error al renderizar:', err);
  process.exit(1);
});
