export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function extractBookTitle(url: string | undefined): string {
  if (!url) {
    return ""
  }
  const startIndex =
    url.indexOf("books-toscrape-com-catalogue") + "books-toscrape-com-catalogue".length;
  const endIndex = url.indexOf("-index-html");
  const bookTitle = url.substring(startIndex, endIndex).replace(/-/g, " ");
  return bookTitle.trim();
}
