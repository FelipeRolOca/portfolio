import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderPresentationPost() {
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

  // 1080x1350 @ 2x Retina resolution = 2160x2700
  await page.setViewport({
    width: 1080,
    height: 1350,
    deviceScaleFactor: 2
  });

  const htmlPath = path.join(__dirname, 'post.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`[FRO Renderer] Cargando: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  await page.evaluate(async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
  });

  // Short pause for high-res drop-shadows and font rasterization
  await new Promise((resolve) => setTimeout(resolve, 800));

  const localOutput = path.join(__dirname, 'post_presentacion_fro.png');
  const exportOutput = path.resolve(__dirname, '../../exports/posts/post_00_presentacion_fro.png');

  await page.screenshot({
    path: localOutput,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1080,
      height: 1350
    }
  });

  // Ensure export dir exists and copy
  fs.mkdirSync(path.dirname(exportOutput), { recursive: true });
  fs.copyFileSync(localOutput, exportOutput);

  await browser.close();

  const stats = fs.statSync(localOutput);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`[FRO Renderer] ✅ ¡Post de Presentación exportado con éxito!`);
  console.log(`[FRO Renderer] Archivo local: ${localOutput} (${sizeMb} MB)`);
  console.log(`[FRO Renderer] Archivo en exports: ${exportOutput}`);
}

renderPresentationPost().catch((err) => {
  console.error('[FRO Renderer] Error al renderizar:', err);
  process.exit(1);
});
