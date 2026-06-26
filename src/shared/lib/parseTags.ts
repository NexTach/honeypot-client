/** "#밈 고양이" → ['밈', '고양이'] */
export const parseTags = (input?: string): string[] =>
  (input ?? '')
    .split(/\s+/)
    .map((t) => t.replace(/^#/, '').trim())
    .filter(Boolean);
