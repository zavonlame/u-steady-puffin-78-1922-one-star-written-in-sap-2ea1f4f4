// One Star, Written in Sap — a houseplant's one-star review of its human.
// The review is built from three beats and checked against the gate
// (1-279 chars, single line, non-blank) before it is written out.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const STAR_LINE = "One star.";
const COMPLAINT =
  "He talks to me every morning, but only to whisper 'please don't die'";
const PUNCHLINE = "that is not a pep talk, that is a hostage negotiation.";

function composeReview(): string {
  // Beat order: rating, grievance, turn. One line, no line breaks.
  return [STAR_LINE, COMPLAINT, "—", PUNCHLINE].join(" ");
}

function gateCheck(text: string): void {
  if (text.length < 1 || text.length > 279) {
    throw new Error(`gate: length ${text.length} outside 1-279`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: blank entry");
  }
  if (text.includes("\n")) {
    throw new Error("gate: entry must be a single line");
  }
}

const review = composeReview();
gateCheck(review);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, review, "utf8");

// Read-back: the file on disk must be byte-identical to what we composed.
import { readFileSync } from "node:fs";
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== review) {
  throw new Error("read-back mismatch: entry.txt differs from composed review");
}
console.log(`wrote entry.txt (${review.length} chars, read-back verified)`);
