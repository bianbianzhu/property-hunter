const shoppingCardIconGenerator = (document: Document) => {
  const shoppingCartIcon = document.createElement("svg");
  shoppingCartIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  shoppingCartIcon.setAttribute("fill", "none");
  shoppingCartIcon.setAttribute("viewBox", "0 0 24 24");
  shoppingCartIcon.setAttribute("stroke", "white");
  shoppingCartIcon.setAttribute("height", "1rem");
  shoppingCartIcon.setAttribute("width", "1rem");

  const path = document.createElement("path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute(
    "d",
    "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293-.511A1 1 0 013 12V4a1 1 0 011-1h4a1 1 0 011 1v1h10a1 1 0 011 1v6a1 1 0 01-.768.643L15.307 13H7zm0 0v5a1 1 0 001 1h2a1 1 0 001-1v-5H7z"
  );

  shoppingCartIcon.appendChild(path);

  return shoppingCartIcon;
};
