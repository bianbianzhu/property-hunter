type Option = {
  document: Document;
  onClick: (e: MouseEvent) => void;
  icon?: HTMLElement;
};

export const CARD_ACTION_BTN_UNIQUE_ID = "df-info-card-action-btn";

export const cardActionBtnGenerator = (option: Option): HTMLButtonElement => {
  const { document, onClick, icon } = option;
  const btn = document.createElement("button");
  btn.style.position = "absolute";
  btn.style.bottom = "-0.25rem"; // -bottom-3
  btn.style.right = "-0.25rem"; // -right-2
  btn.style.display = "flex"; // flex
  btn.style.height = "2.5rem"; // h-6
  btn.style.width = "2.5rem"; // w-6
  btn.style.alignItems = "center"; // items-center
  btn.style.justifyContent = "center"; // justify-center
  btn.style.borderRadius = "50%"; // rounded-full
  btn.style.backgroundColor = "#FBBF24";
  btn.style.color = "white"; // text-white
  btn.style.zIndex = "2";
  btn.style.boxShadow = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
  btn.style.fontWeight = "bold";
  btn.style.fontSize = "1.5rem";
  btn.style.lineHeight = "1";
  btn.id = CARD_ACTION_BTN_UNIQUE_ID;
  if (!icon) {
    btn.innerHTML = "+";
  } else {
    btn.appendChild(icon);
  }
  btn.onclick = onClick;

  return btn;
};
