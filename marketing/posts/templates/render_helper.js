import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

/**
 * Renders any post HTML file to a crisp Retina PNG (1080x1350 @ 2x = 2160x2700)
 * @param {string} htmlFilePath - Absolute or relative path to post.html
 * @param {string} outputPngPath - Absolute or relative path to output.png
 */
export async function renderPostToImage(htmlFilePath, outputPngPath) {
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
    throw new Error('No se encontró un navegador compatible (Edge o Chrome).');
  }

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

  await page.setViewport({
    width: 1080,
    height: 1350,
    deviceScaleFactor: 2
  });

  const resolvedHtml = path.resolve(htmlFilePath);
  const fileUrl = `file:///${resolvedHtml.replace(/\\/g, '/')}`;

  console.log(`[FRO Renderer] Cargando: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  if (page.evaluate) {
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const resolvedOutput = path.resolve(outputPngPath);
  await page.screenshot({
    path: resolvedOutput,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1080,
      height: 1350
    }
  });

  await browser.close();

  const stats = fs.statSync(resolvedOutput);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`[FRO Renderer] ✅ Post exportado: ${resolvedOutput} (${sizeMb} MB)`);
}
