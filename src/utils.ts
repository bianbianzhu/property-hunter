const START = "books-toscrape-com-catalogue" as const;
const END = "-index-html" as const;

export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * this function will compare the link retrieved from the `href` attribute of an `a` tag of the `customCard` with the `actionLink` property from the event detail of the `df-info-card-click` event
 * There are 2 types of resources represented by the `actionLink`:
 * 1. the link to a web page in the cloud storage
 * 2. the link to a PDF file in the cloud storage
 * When dealing with PDF, the `actionLink` may be not escaped, so it may contain special characters, and converting it to a URL object is necessary.
 * example: `https://storage.cloud.google.com/demo-real-estate-corelogic-v1/231128 - ANZ CoreLogic Housing Affordability Report.pdf#page=3`
 */
export const compareLinks = (
  aHref: string | undefined,
  actionLink: string | undefined
): boolean => {
  if (!aHref || !actionLink) {
    return false;
  }

  const aHrefUrl = new URL(aHref);
  const actionLinkUrl = new URL(actionLink);

  return aHrefUrl.href === actionLinkUrl.href;
};
