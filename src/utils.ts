const START = "books-toscrape-com-catalogue" as const;
const END = "-index-html" as const;

export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * this function will extract the book title from the url
 * @param url
 * @returns the book title
 */
export function extractBookTitle(url: string | undefined): string {
  if (!url) {
    return "";
  }
  const startIndex = url.indexOf(START) + "books-toscrape-com-catalogue".length;
  const endIndex = url.indexOf(END);
  const bookTitle = url.substring(startIndex, endIndex).replace(/-/g, " ");
  return bookTitle.trim();
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
