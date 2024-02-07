<script lang="ts">
  import { onMount } from "svelte";
  import { extractBookTitle } from "../utils";
  import { type InfoCardEventDetail, addSavedItem } from "../store";
  import { MASK_UNIQUE_ID, maskGenerator } from "./generated-elements/mask";
  import {
    CARD_ACTION_BTN_UNIQUE_ID,
    cardActionBtnGenerator,
  } from "./generated-elements/cardActionBtn";

  type ParamKey = "k";
  const paramKeys: ParamKey[] = ["k"];

  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  // TODO: use zod to validate the return type
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
      const title = extractBookTitle(actionLink);

      if (!actionLink) {
        throw new Error("actionLink is not provided");
      }

      // url must be initialized here, otherwise, it will get replaced each time the event is fired
      const url = new URL(BASE_URL);
      url.pathname = "/s";
      url.searchParams.set(paramKeys[0], title);

      // When df-info-card is clicked, it means we already have user and bot entries.
      // If outside the listener callback, only getElementsByClassName('entry bot') works.
      // Inside the callback, querySelectorAll works.
      const botEntries = dfMessengerListContent?.querySelectorAll("div.entry.bot");

      if (!botEntries) {
        return;
      }

      const links = [...botEntries].map((entry) =>
        entry
          .querySelector("df-messenger-utterance")
          ?.shadowRoot?.querySelector("df-card")
          ?.shadowRoot?.querySelector("df-title")
          ?.shadowRoot?.querySelector(`a`)
      );

      // For debugging
      // const dfMessengerUtterance = botEntries[0].querySelector("df-messenger-utterance");
      // const dfCard = dfMessengerUtterance?.shadowRoot?.querySelector("df-card");
      // const dfTitle = dfCard?.shadowRoot?.querySelector("df-title");
      // const link = dfTitle?.shadowRoot?.querySelector(`a[href="${actionLink}"`);

      // Find the link that matches the actionLink - the link that was clicked
      const selectedLink = links.find((link) => link?.href === actionLink) as HTMLAnchorElement;

      // Add a mask to the selected link
      // 1. modify the position of the selected link to relative, so the mask can be covered on top of it
      selectedLink.style.position = "relative";

      const mask = maskGenerator(document);

      // Append the mask to the target element only once
      if (!selectedLink.querySelector(`#${MASK_UNIQUE_ID}`)) {
        selectedLink.appendChild(mask);
      }

      const onClick = (e: MouseEvent) => {
        e.preventDefault();
        addSavedItem({ title, actionLink, purchaseLink: url.href });
      };

      const addBtn = cardActionBtnGenerator({
        document,
        onClick,
      });

      if (!selectedLink.querySelector(`#${CARD_ACTION_BTN_UNIQUE_ID}`)) {
        selectedLink.appendChild(addBtn);
      }

      // console.log(get(savedItemState));
    });
  });
</script>

<div class="h-full">
  <script
    src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
  <df-messenger
    project-id={import.meta.env.VITE_PROJECT_ID}
    agent-id={import.meta.env.VITE_AGENT_ID}
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
