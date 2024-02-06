export const MASK_UNIQUE_ID = "df-info-card-mask";

export const maskGenerator = (document: Document): HTMLDivElement => {
  // Create a new div element
  const mask = document.createElement("div");

  // Set the style of the mask
  mask.style.position = "absolute";
  mask.style.top = "0";
  mask.style.left = "0";
  mask.style.width = "100%";
  mask.style.height = "100%";
  mask.style.background = "linear-gradient(rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5))";
  mask.style.zIndex = "1"; // Ensure the mask is above other elements

  mask.id = MASK_UNIQUE_ID;

  return mask;
};
