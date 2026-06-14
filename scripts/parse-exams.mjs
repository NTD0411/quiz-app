/**
 * Parse exam-full.txt -> exam-bank.json
 * Run: node scripts/parse-exams.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'exam-full.txt');
const outPath = path.join(root, 'exam-bank.json');

const ANSWER_KEYS = {
  1: {1:'A',2:'B',3:'B',4:'B',5:'C',6:'D',7:'A',8:'A',9:'A',10:'A',11:'A',12:'B',13:'B',14:'A',15:'A',16:'A',17:'A',18:'C',19:'A',20:'C',21:'A',22:'B',23:'A',24:'A',25:'C',26:'C',27:'D',28:'A',29:'A',30:'A'},
  2: {1:'D',2:'A',3:'A',4:'C',5:'B',6:'A',7:'A',8:'A',9:'A',10:'A',11:'B',12:'A',13:'B',14:'A',15:'C',16:'C',17:'A',18:'B',19:'A',20:'A',21:'A',22:'B',23:'D',24:'A',25:'B',26:'A',27:'D',28:'B',29:'C',30:'A'},
  3: {1:'C',2:'B',3:'B',4:'C',5:'A',6:'C',7:'A',8:'A',9:'A',10:'A',11:'A',12:'A',13:'C',14:'A',15:'C',16:'A',17:'B',18:'A',19:'C',20:'C',21:'A',22:'C',23:'B',24:'D',25:'A',26:'C',27:'D',28:'A',29:'B',30:'C'},
  4: {1:'C',2:'D',3:'A',4:'A',5:'B',6:'A',7:'A',8:'A',9:'A',10:'A',11:'A',12:'A',13:'B',14:'C',15:'C',16:'A',17:'A',18:'B',19:'A',20:'B',21:'B',22:'C',23:'B',24:'D',25:'A',26:'C',27:'D',28:'A',29:'B',30:'C'},
  5: {1:'C',2:'C',3:'A',4:'C',5:'A',6:'B',7:'A',8:'A',9:'A',10:'A',11:'A',12:'C',13:'B',14:'B',15:'A',16:'B',17:'A',18:'A',19:'C',20:'C',21:'C',22:'A',23:'B',24:'D',25:'A',26:'C',27:'A',28:'B',29:'D',30:'A'},
  6: {1:'B',2:'C',3:'B',4:'A',5:'C',6:'D',7:'A',8:'A',9:'A',10:'A',11:'C',12:'C',13:'B',14:'C',15:'C',16:'D',17:'B',18:'A',19:'C',20:'A',21:'B',22:'D',23:'D',24:'B',25:'C',26:'A',27:'D',28:'A',29:'B',30:'C'},
  7: {1:'B',2:'C',3:'A',4:'B',5:'C',6:'B',7:'A',8:'A',9:'A',10:'A',11:'B',12:'C',13:'C',14:'A',15:'B',16:'A',17:'C',18:'B',19:'A',20:'C',21:'B',22:'A',23:'D',24:'C',25:'B',26:'A',27:'D',28:'C',29:'B',30:'A'},
  8: {1:'D',2:'A',3:'B',4:'C',5:'C',6:'A',7:'A',8:'A',9:'A',10:'A',11:'A',12:'C',13:'C',14:'C',15:'B',16:'B',17:'C',18:'A',19:'C',20:'A',21:'D',22:'A',23:'B',24:'D',25:'A',26:'B',27:'C',28:'A',29:'D',30:'A'},
  9: {1:'D',2:'B',3:'B',4:'C',5:'A',6:'B',7:'A',8:'A',9:'A',10:'A',11:'A',12:'C',13:'D',14:'D',15:'C',16:'B',17:'A',18:'B',19:'C',20:'A',21:'A',22:'A',23:'A',24:'A',25:'C',26:'C',27:'C',28:'C',29:'D',30:'D'},
  10: {1:'B',2:'A',3:'C',4:'D',5:'B',6:'B',7:'A',8:'A',9:'A',10:'A',11:'C',12:'A',13:'C',14:'C',15:'A',16:'C',17:'D',18:'A',19:'B',20:'A',21:'A',22:'B',23:'D',24:'C',25:'D',26:'C',27:'A',28:'B',29:'D',30:'A'},
  11: {1:'A',2:'D',3:'B',4:'C',5:'B',6:'D',7:'A',8:'A',9:'A',10:'A',11:'C',12:'A',13:'B',14:'D',15:'B',16:'B',17:'C',18:'A',19:'D',20:'C',21:'A',22:'B',23:'D',24:'C',25:'C',26:'A',27:'D',28:'A',29:'B',30:'A'},
  12: {1:'C',2:'B',3:'C',4:'D',5:'B',6:'C',7:'A',8:'A',9:'A',10:'A',11:'B',12:'D',13:'A',14:'B',15:'C',16:'A',17:'B',18:'D',19:'C',20:'A',21:'D',22:'C',23:'D',24:'A',25:'B',26:'C',27:'C',28:'D',29:'A',30:'B'},
  13: {1:'C',2:'B',3:'B',4:'C',5:'D',6:'B',7:'A',8:'A',9:'A',10:'A',11:'A',12:'B',13:'B',14:'A',15:'C',16:'B',17:'C',18:'A',19:'A',20:'B',21:'D',22:'C',23:'A',24:'C',25:'D',26:'B',27:'A',28:'C',29:'C',30:'A'},
  14: {1:'B',2:'C',3:'B',4:'A',5:'C',6:'D',7:'A',8:'A',9:'A',10:'A',11:'A',12:'C',13:'B',14:'C',15:'B',16:'B',17:'A',18:'A',19:'C',20:'A',21:'B',22:'A',23:'D',24:'B',25:'A',26:'C',27:'D',28:'A',29:'C',30:'A'},
  15: {1:'A',2:'A',3:'C',4:'D',5:'A',6:'A',7:'A',8:'A',9:'A',10:'A',11:'D',12:'B',13:'B',14:'C',15:'A',16:'B',17:'A',18:'C',19:'B',20:'C',21:'B',22:'C',23:'D',24:'A',25:'B',26:'A',27:'D',28:'B',29:'C',30:'A'},
  16: {1:'B',2:'A',3:'B',4:'B',5:'C',6:'B',7:'B',8:'A',9:'A',10:'D',11:'B',12:'A',13:'B',14:'C',15:'A',16:'A',17:'A',18:'B',19:'C',20:'B',21:'',22:'C',23:'C',24:'A',25:'B',26:'D',27:'B',28:'D',29:'D',30:'B'},
  17: {1:'B',2:'A',3:'C',4:'A',5:'B',6:'A',7:'A',8:'D',9:'D',10:'A',11:'A',12:'B',13:'C',14:'B',15:'A',16:'B',17:'A',18:'C',19:'A',20:'B',21:'D',22:'D',23:'C',24:'A',25:'B',26:'A',27:'C',28:'B',29:'B',30:'A'},
  18: {1:'B',2:'D',3:'B',4:'D',5:'A',6:'C',7:'C',8:'C',9:'D',10:'B',11:'C',12:'A',13:'B',14:'A',15:'B',16:'C',17:'A',18:'B',19:'A',20:'B',21:'B',22:'C',23:'D',24:'A',25:'B',26:'A',27:'C',28:'A',29:'B',30:'D'},
  19: {1:'D',2:'C',3:'B',4:'D',5:'A',6:'B',7:'C',8:'D',9:'B',10:'C',11:'A',12:'A',13:'A',14:'C',15:'C',16:'A',17:'C',18:'A',19:'B',20:'A',21:'B',22:'A',23:'B',24:'D',25:'C',26:'C',27:'B',28:'A',29:'B',30:'D'},
  20: {1:'C',2:'C',3:'C',4:'C',5:'B',6:'C',7:'B',8:'B',9:'C',10:'A',11:'A',12:'A',13:'C',14:'C',15:'A',16:'B',17:'A',18:'B',19:'A',20:'C',21:'B',22:'D',23:'A',24:'D',25:'C',26:'C',27:'A',28:'B',29:'B',30:'C'}
};

function normalize(text) {
  return text
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[\t]+/g, '\t')
    .trim();
}

function parseOptions(block) {
  const opts = { A: '', B: '', C: '', D: '' };
  const re = /A\.\s*([\s\S]*?)(?=\tB\.|\nB\.|$)/i;
  const parts = block.split(/\t(?=[ABCD]\.)/).length > 1
    ? block.split(/\t(?=[ABCD]\.)/)
    : block.split(/\n(?=[ABCD]\.)/);
  for (const p of parts) {
    const m = p.trim().match(/^([ABCD])\.\s*(.+)$/is);
    if (m) opts[m[1]] = m[2].trim().replace(/\s+/g, ' ');
  }
  if (!opts.A && !opts.B) {
    ['A','B','C','D'].forEach((letter, i) => {
      const rx = new RegExp(`${letter}\\.\\s*([^\\n]+)`, 'i');
      const m = block.match(rx);
      if (m) opts[letter] = m[1].trim();
    });
  }
  return opts;
}

function findOptionStart(chunk) {
  const patterns = [/\n\s*A\./i, /\tA\./i, /\s+A\.\s+\S/i];
  for (const p of patterns) {
    const idx = chunk.search(p);
    if (idx >= 0) return idx;
  }
  return -1;
}

function parsePart1Unnumbered(text) {
  const questions = {};
  let body = text.replace(/^[\s\S]*?PART 1[^\n]*\n/i, '');
  body = body.replace(/^(?:Choose|Circle)[^\n]*\n/im, '');
  const cut = body.search(/\nPART 2\b/i);
  if (cut >= 0) body = body.slice(0, cut);
  const segments = body.split(/(?=\nA\.|\tA\.)/i).filter(Boolean);
  let num = 0;
  for (let i = 0; i < segments.length; i++) {
    let chunk = segments[i].trim();
    if (!chunk || /^(PART|TEST|\d+\.)/i.test(chunk)) continue;
    if (/^A\./i.test(chunk)) continue;
    const optIdx = findOptionStart('\n' + chunk);
    if (optIdx === -1 && i + 1 < segments.length && /^A\./i.test(segments[i + 1].trim())) {
      const qText = chunk.replace(/\s+/g, ' ').trim();
      const opts = parseOptions(segments[i + 1]);
      if (qText.length >= 8 && opts.A) {
        num++;
        if (num <= 10) questions[num] = { text: qText, options: opts };
      }
      i++;
      continue;
    }
    if (optIdx === -1) continue;
    const qText = chunk.slice(0, optIdx).replace(/\s+/g, ' ').trim();
    const opts = parseOptions(chunk.slice(optIdx));
    if (qText.length >= 8 && opts.A) {
      num++;
      if (num <= 10) questions[num] = { text: qText, options: opts };
    }
  }
  return questions;
}

function parsePart1(text) {
  const questions = {};
  const re = /(?:^|\n)(\d{1,2})\.\s*([\s\S]*?)(?=\n(?:\d{1,2})\.\s*|\nPART |\nTEST |$)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const num = parseInt(m[1], 10);
    if (num < 1 || num > 10) continue;
    const chunk = m[2];
    const optIdx = findOptionStart(chunk);
    if (optIdx === -1) continue;
    const qText = chunk.slice(0, optIdx).replace(/\s+/g, ' ').trim();
    const optBlock = chunk.slice(optIdx);
    const opts = parseOptions(optBlock);
    questions[num] = { text: qText, options: opts };
  }
  if (Object.keys(questions).length < 10) {
    const un = parsePart1Unnumbered(text);
    for (let i = 1; i <= 10; i++) {
      if (!questions[i] && un[i]) questions[i] = un[i];
    }
  }
  return questions;
}

function cleanSignText(sign) {
  return sign
    .split('\n')
    .filter((line) => {
      const l = line.trim().toLowerCase();
      if (!l) return false;
      if (l.startsWith('what does the text')) return false;
      if (l.startsWith('what does it')) return false;
      if (/should:?\s*$/.test(l)) return false;
      return true;
    })
    .join('\n')
    .trim();
}

function parsePart2(text) {
  const questions = {};
  const re = /(?:^|\n)(\d{1,2})\.\s*([\s\S]*?)(?=\n(?:\d{1,2})\.\s*|\nPART |\nTEST |$)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const num = parseInt(m[1], 10);
    if (num < 11 || num > 15) continue;
    const chunk = m[2].trim();
    if (!chunk) continue;
    const optIdx = findOptionStart(chunk);
    if (optIdx === -1) continue;
    const sign = cleanSignText(chunk.slice(0, optIdx));
    const opts = parseOptions(chunk.slice(optIdx));
    questions[num] = {
      text: 'What does it say? Choose the correct explanation.',
      sign: sign || undefined,
      options: opts
    };
  }
  return questions;
}

function parsePart3(text) {
  const result = { passage: { title: 'READING PASSAGE', text: '' }, questions: {} };
  const qStart = text.search(/\n16\.\s/);
  if (qStart === -1) return result;
  const passageBlock = text.slice(0, qStart).trim();
  const qBlock = text.slice(qStart);
  const lines = passageBlock.split('\n').map(l => l.trim()).filter(Boolean);
  const instrWords = ['read the text', 'for each question'];
  while (lines.length && instrWords.some(w => lines[0].toLowerCase().includes(w))) {
    lines.shift();
  }
  if (lines.length) {
    result.passage.title = lines[0].toUpperCase();
    result.passage.text = lines.slice(1).join('\n\n').trim();
  }
  const re = /(?:^|\n)(1[6-9]|20)\.\s+([\s\S]*?)(?=\n(?:1[6-9]|20)\.\s|\nPART |\nTEST |$)/g;
  let m;
  while ((m = re.exec(qBlock)) !== null) {
    const num = parseInt(m[1], 10);
    const chunk = m[2];
    const optIdx = chunk.search(/\n\s*A\./i) >= 0 ? chunk.search(/\n\s*A\./i) : chunk.search(/\tA\./i);
    if (optIdx === -1) continue;
    const qText = chunk.slice(0, optIdx).replace(/\s+/g, ' ').trim();
    const opts = parseOptions(chunk.slice(optIdx));
    result.questions[num] = { text: qText, options: opts };
  }
  return result;
}

function parsePart4(text) {
  const result = { passage: { title: 'CLOZE TEST', text: '' }, questions: {} };
  const firstQ = text.search(/\n21\.?\s*\t?A\./i);
  if (firstQ === -1) return result;
  let passageBlock = text.slice(0, firstQ).trim();
  const qBlock = text.slice(firstQ);
  const lines = passageBlock.split('\n').map(l => l.trim()).filter(Boolean);
  const skip = ['read the text', 'choose the correct word', 'tick the correct'];
  while (lines.length && skip.some(s => lines[0].toLowerCase().includes(s))) lines.shift();
  if (lines.length) {
    const titleLine = lines.find(l => l === l.toUpperCase() && l.length > 3 && !l.includes('('));
    if (titleLine) {
      result.passage.title = titleLine;
      const ti = lines.indexOf(titleLine);
      result.passage.text = lines.slice(ti + 1).join('\n\n').trim();
    } else {
      result.passage.text = lines.join('\n\n').trim();
    }
  }
  const re = /(?:^|\n)(2[1-9]|30)\.?\s*\t?([\s\S]*?)(?=\n(?:2[1-9]|30)\.?\s|\nPART |\nTEST |$)/g;
  let m;
  while ((m = re.exec(qBlock)) !== null) {
    const num = parseInt(m[1], 10);
    const opts = parseOptions(m[2]);
    result.questions[num] = {
      text: `Question ${num}:`,
      options: opts
    };
  }
  return result;
}

function parseTest(testNum, body) {
  const parts = body.split(/(?=PART \d+)/i);
  const test = { questions: {} };
  for (const part of parts) {
    const pm = part.match(/^PART (\d+)/i);
    if (!pm) continue;
    const p = parseInt(pm[1], 10);
    const content = part.replace(/^PART \d+[^:]*:\s*/i, '').trim();
    if (p === 1) Object.assign(test.questions, parsePart1(content));
    else if (p === 2) Object.assign(test.questions, parsePart2(content));
    else if (p === 3) {
      const p3 = parsePart3(content);
      test.part3_passage = p3.passage;
      Object.assign(test.questions, p3.questions);
    } else if (p === 4) {
      const p4 = parsePart4(content);
      test.part4_passage = p4.passage;
      Object.assign(test.questions, p4.questions);
    }
  }
  return test;
}

function main() {
  if (!fs.existsSync(srcPath)) {
    console.error('Missing exam-full.txt');
    process.exit(1);
  }
  const raw = normalize(fs.readFileSync(srcPath, 'utf8'));
  const chunks = raw.split(/(?=TEST\s+\d+)/i).filter(Boolean);
  const tests = {};
  for (const chunk of chunks) {
    const tm = chunk.match(/^TEST\s+(\d+)/i);
    if (!tm) continue;
    const num = parseInt(tm[1], 10);
    const body = chunk.replace(/^TEST\s+\d+\s*/i, '');
    tests[String(num)] = parseTest(num, body);
  }
  const bank = { answers: ANSWER_KEYS, tests };
  fs.writeFileSync(outPath, JSON.stringify(bank, null, 2), 'utf8');
  console.log('Wrote', outPath, '- tests:', Object.keys(tests).length);
  for (let i = 1; i <= 20; i++) {
    const q = Object.keys(tests[String(i)]?.questions || {}).length;
    console.log(`  TEST ${String(i).padStart(2,'0')}: ${q} questions`);
  }
}

main();
