import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { WORD } from './word.ts';

// Write exactly one word to the gate's output file. The gate wants UTF-8 text
// of 1 to 30 code points that is not only whitespace, and the judge compares
// two words at a time: the single word a grandmother would text about AI beats
// a sentence, a phrase or an explanation. Check the whole shape before writing.
const text = WORD;
const size = [...text].length;
if (size < 1 || size > 30) {
  throw new Error(`a grandma word must be 1-30 code points, got ${size}`);
}
if (!text.trim()) {
  throw new Error('a grandma word must not be only whitespace');
}
if (!/^\p{L}+$/u.test(text)) {
  throw new Error('a grandma word must be one bare word with no spaces or punctuation');
}
if (/[\u0000-\u001f\u007f\u200b-\u200f\ufeff]/.test(text)) {
  throw new Error('a grandma word must carry no control or invisible characters');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-code-point, single-word grandma text to ${target}`);
