const fs = require('fs');
const path = require('path');
function fixMojibake(text) {
  return text
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã /g, 'Á')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã\x8D/g, 'Í')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã‘/g, 'Ñ')
    .replace(/Â¿/g, '¿')
    .replace(/Â¡/g, '¡');
}
function walkSync(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(walkSync(fullPath));
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}
const files = walkSync('src');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const fixed = fixMojibake(content);
  if (content !== fixed) {
    fs.writeFileSync(file, fixed, 'utf8');
    console.log('Fixed', file);
  }
}
