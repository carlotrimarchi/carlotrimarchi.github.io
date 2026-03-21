import { createHighlighter } from "shiki";

let highlighter;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript", "typescript", "html", "css", "bash", "json", "typ"],
    });
  }
  return highlighter;
}
