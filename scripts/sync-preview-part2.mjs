/**
 * Ghi nội dung Part 2 từ supplements vào preview.html (thẻ <pre>).
 * Chạy khi preview.html trên đĩa còn thiếu sign (11.–15. trống).
 * node scripts/sync-preview-part2.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PART2 } from './exam-supplements.mjs';
import { PART2_3_20 } from './part2-all.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = path.join(root, 'preview.html');
const html = fs.readFileSync(previewPath, 'utf8');
const m = html.match(/<pre>([\s\S]*?)<\/pre>/);
if (!m) throw new Error('No <pre> in preview.html');

let text = m[1]
  .replace(/&#x27;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&');

const allPart2 = { ...PART2, ...PART2_3_20 };

function formatPart2Block(qNum, q) {
  const sign = (q.sign || '').trim();
  const lines = [`${qNum}.${sign.split('\n')[0]}`];
  if (sign.includes('\n')) lines.push(...sign.split('\n').slice(1));
  lines.push('What does the text say?');
  lines.push(`A. ${q.options.A}`);
  lines.push(`B. ${q.options.B}`);
  lines.push(`C. ${q.options.C}`);
  lines.push(`D. ${q.options.D}`);
  return lines.join('\n');
}

for (let t = 1; t <= 20; t++) {
  const part2 = allPart2[t];
  if (!part2) continue;
  const testRe = new RegExp(
    `(TEST\\s+${String(t).padStart(2, '0')}[\\s\\S]*?PART 2[^\\n]*\\n[^\\n]*\\n)([\\s\\S]*?)(\\nPART 3)`,
    'i'
  );
  const match = text.match(testRe);
  if (!match) continue;
  const part2Body = match[2].trim();
  const isEmpty = /^11\.\s*\n12\.\s*\n13\.\s*\n14\.\s*\n15\.\s*$/m.test(part2Body.replace(/\r/g, ''))
    || part2Body.length < 80;
  if (!isEmpty) continue;
  const blocks = [];
  for (let q = 11; q <= 15; q++) {
    if (part2[q]) blocks.push(formatPart2Block(q, part2[q]));
  }
  if (blocks.length) {
    text = text.replace(testRe, `$1${blocks.join('\n')}$3`);
  }
}

const newHtml = html.replace(m[0], `<pre>${text}</pre>`);
fs.writeFileSync(previewPath, newHtml, 'utf8');
fs.writeFileSync(path.join(root, 'exam-full.txt'), text, 'utf8');
console.log('Synced Part 2 into preview.html and exam-full.txt');
