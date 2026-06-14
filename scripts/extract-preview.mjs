import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'preview.html'), 'utf8');
const m = html.match(/<pre>([\s\S]*?)<\/pre>/);
if (!m) throw new Error('No pre block');
let text = m[1]
  .replace(/&#x27;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');
fs.writeFileSync(path.join(root, 'exam-full.txt'), text, 'utf8');
console.log('Extracted', text.length, 'chars to exam-full.txt');
