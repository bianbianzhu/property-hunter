<script lang="ts">
  import { onMount } from "svelte";
  import { extractBookTitle } from "../utils";
  import { globalState } from "../store";

  type ParamKey = "k";

  type InfoCardEventDetail = {
    title?: string;
    image?: {
      src: { rawUrl: string };
    };
    actionLink?: string;
  };

  const BASE_URL: string = "https://www.amazon.com.au";
  const paramKeys: ParamKey[] = ["k"];
  const url = new URL(BASE_URL);
  url.pathname = "/s";

  function isCustomEvent(event: Event): event is CustomEvent<InfoCardEventDetail> {
    return "detail" in event;
  }

  onMount(() => {
    // querySelector seems not able to select through a shadowRoot layer
    const dfMessenger = document.querySelector("df-messenger");
    const dfMessengerChat = dfMessenger?.querySelector("df-messenger-chat");
    const dfMessengerMessageList = dfMessengerChat?.shadowRoot?.querySelector(
      "df-messenger-message-list"
    );
    const dfMessengerMessageListWrapper =
      dfMessengerMessageList?.shadowRoot?.querySelector(".message-list-wrapper");
    const dfMessengerListContent = dfMessengerMessageListWrapper?.querySelector("div.content");

    // this works
    // const botEntries = dfMessengerListContent?.getElementsByClassName("entry bot") ?? [];

    

    dfMessenger?.addEventListener("df-info-card-clicked", function (event) {
      if (!isCustomEvent(event)) {
        return;
      }

      const { actionLink } = event.detail;

      url.searchParams.set(paramKeys[0], extractBookTitle(actionLink));

      // when df-info-card gets clicked meaning we already have user & bot entry
      // if outside listener callback, only this getElementsByClassName('entry bot') works
      // inside cb, querySelectorAll works
      const botEntries = dfMessengerListContent?.querySelectorAll("div.entry.bot") ?? [];

      const links = [...botEntries].map((entry) =>
        entry
          .querySelector("df-messenger-utterance")
          ?.shadowRoot?.querySelector("df-card")
          ?.shadowRoot?.querySelector("df-title")
          ?.shadowRoot?.querySelector(`a`)
      );

      const selectedLink = links.find((link) => link?.href === actionLink) as HTMLAnchorElement;

      selectedLink.style.position = "relative";

      // const dfMessengerUtterance = botEntries[0].querySelector("df-messenger-utterance");
      // const dfCard = dfMessengerUtterance?.shadowRoot?.querySelector("df-card");
      // const dfTitle = dfCard?.shadowRoot?.querySelector("df-title");
      // const link = dfTitle?.shadowRoot?.querySelector(`a[href="${actionLink}"`);

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

      // Append the mask to the target element
      selectedLink?.appendChild(mask);

      const shoppingCartIcon = document.createElement("svg");
      shoppingCartIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg")
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

      shoppingCartIcon.appendChild(path)

      const purchaseBtn = document.createElement("div");
      purchaseBtn.style.position = "absolute";
      purchaseBtn.style.bottom = "-0.25rem"; // -bottom-3
      purchaseBtn.style.right = "-0.25rem"; // -right-2
      purchaseBtn.style.display = "flex"; // flex
      purchaseBtn.style.height = "2.5rem"; // h-6
      purchaseBtn.style.width = "2.5rem"; // w-6
      purchaseBtn.style.alignItems = "center"; // items-center
      purchaseBtn.style.justifyContent = "center"; // justify-center
      purchaseBtn.style.borderRadius = "50%"; // rounded-full
      purchaseBtn.style.backgroundColor = "#10B981"; // bg-emerald-500
      purchaseBtn.style.color = "white"; // text-white
      purchaseBtn.style.zIndex = "2";
      purchaseBtn.style.boxShadow =
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
      purchaseBtn.style.fontWeight = 'bold'
      purchaseBtn.style.fontSize = '1.5rem'
      purchaseBtn.style.lineHeight = '1'
      purchaseBtn.innerHTML = "+"
      purchaseBtn.onclick = (e) => {
         console.log(e);
        window.open(url, "_blank")
      }

      // purchaseBtn.appendChild(shoppingCartIcon);
      selectedLink?.appendChild(purchaseBtn);

      console.log(selectedLink);
    });
  });
</script>

<div class="h-full">
  <script
    src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
  <df-messenger
    project-id="project-xiaobao-20240126"
    agent-id="93e4a95f-fea4-476a-af54-222ab3502d08"
    language-code="en"
    storage-option="none"
    class="drop-shadow-lg"
    max-query-length="-1">
    <df-messenger-chat
      chat-title="Book.com - Chat with our Literary Bot"
      bot-writing-text="..."
      placeholder-text="Ask me anything about the Book.com..." />
  </df-messenger>
</div>
