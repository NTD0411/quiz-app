/**
 * Build exam-bank.json from preview.html + supplements
 * node scripts/build-exam-bank.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import { PART2, PART4_PASSAGES, PART1_FIXES } from './exam-supplements.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

// 0. Sync Part 2 signs into preview.html if needed
spawnSync('node', ['scripts/sync-preview-part2.mjs'], { cwd: root, stdio: 'inherit' });

// 1. Extract text from preview.html
spawnSync('node', ['scripts/extract-preview.mjs'], { cwd: root, stdio: 'inherit' });

// 2. Parse to exam-bank.json
spawnSync('node', ['scripts/parse-exams.mjs'], { cwd: root, stdio: 'inherit' });

const bankPath = path.join(root, 'exam-bank.json');
const supPath = path.join(root, 'exam-supplements.json');
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));

function mergeSupplements(sup) {
  for (const [testKey, data] of Object.entries(sup)) {
    const t = bank.tests[testKey];
    if (!t) continue;
    if (data.part2) {
      for (const [qKey, qData] of Object.entries(data.part2)) {
        t.questions[qKey] = qData;
      }
    }
    if (data.part3_passage) t.part3_passage = data.part3_passage;
    if (data.part4_passage) t.part4_passage = data.part4_passage;
  }
}

// Merge from exam-supplements.mjs (official Part 2 signs + missing Part 4 passages)
for (const [testKey, part2] of Object.entries(PART2)) {
  if (!bank.tests[testKey]) bank.tests[testKey] = { questions: {} };
  for (const [qKey, qData] of Object.entries(part2)) {
    bank.tests[testKey].questions[qKey] = qData;
  }
}
for (const [testKey, passage] of Object.entries(PART4_PASSAGES)) {
  if (!bank.tests[testKey]) bank.tests[testKey] = { questions: {} };
  if (!bank.tests[testKey].part4_passage?.text) {
    bank.tests[testKey].part4_passage = passage;
  }
}
for (const [testKey, part1] of Object.entries(PART1_FIXES)) {
  if (!bank.tests[testKey]) bank.tests[testKey] = { questions: {} };
  for (const [qKey, qData] of Object.entries(part1)) {
    bank.tests[testKey].questions[qKey] = qData;
  }
}

if (fs.existsSync(supPath)) {
  mergeSupplements(JSON.parse(fs.readFileSync(supPath, 'utf8')));
}

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log('Merged supplements into exam-bank.json');

// 3. Generate exam-bank.js for offline file:// usage
const js = `window.EXAM_BANK = ${JSON.stringify(bank)};\n`;
fs.writeFileSync(path.join(root, 'exam-bank.js'), js, 'utf8');
console.log('Wrote exam-bank.js (' + Math.round(js.length / 1024) + ' KB)');
