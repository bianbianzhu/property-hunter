<script lang="ts">
  import { onMount } from "svelte";
  import { compareLinks } from "../utils";
  import { MASK_UNIQUE_ID, maskGenerator } from "./generated-elements/mask";
  import {
    isCustomEvent,
    type DfResponseEventDetail,
    type DfInfoCardEventDetail,
  } from "../types/dfMessenger-types";
  import {
    addResponse,
    dfMessengerResponseState,
    setCustomCardClicked,
  } from "../store/dfMessenger-response";
  import HistoryBtn from "./HistoryBtn.svelte";

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

    dfMessenger?.addEventListener("df-response-received", function (event) {
      if (!isCustomEvent<DfResponseEventDetail>(event)) {
        return;
      }

      if (event.detail.raw.queryResult.match.matchType !== "KNOWLEDGE_CONNECTOR") {
        return;
      }

      addResponse({
        id: event.detail.raw.responseId,
        botMessages: event.detail.messages,
        userQuery: event.detail.raw.queryResult.text,
        retrievedSnippets:
          event.detail.raw.queryResult.match.knowledgeConnectorAnswer[0].generativePrediction
            .snippets,
        hasCustomCardClicked: false,
        saved: false,
      });
    });

    dfMessenger?.addEventListener("df-info-card-clicked", function (event) {
      if (!isCustomEvent<DfInfoCardEventDetail>(event)) {
        return;
      }

      const { actionLink } = event.detail;

      if (!actionLink) {
        throw new Error("actionLink is not provided");
      }

      setCustomCardClicked(actionLink);

      // When df-info-card is clicked, it means we already have user and bot entries.
      // If outside the listener callback, only getElementsByClassName('entry bot') works.
      // Inside the callback, querySelectorAll works.
      const botEntries = dfMessengerListContent?.querySelectorAll("div.entry.bot");

      if (!botEntries) {
        return;
      }

      // Get all cards from the bot entries and find the one that matches the actionLink
      const cards = [...botEntries].map((entry) =>
        entry.querySelector("df-messenger-utterance")?.shadowRoot?.querySelector("df-card")
      );

      const selectedCard = cards.find((card) => {
        if (!card) {
          return false;
        }

        // the `a` tag
        const link = card.shadowRoot?.querySelector("df-title")?.shadowRoot?.querySelector(`a`);

        return compareLinks(link?.href, actionLink);
      });

      // Append the mask to the target card only once
      const cardWrapper = selectedCard?.shadowRoot?.querySelector(
        ".card-wrapper"
      ) as HTMLDivElement;

      if (!cardWrapper) {
        throw new Error("cardWrapper is not found");
      }
      cardWrapper.style.position = "relative";

      const mask = maskGenerator(document);
      if (!cardWrapper.querySelector(`#${MASK_UNIQUE_ID}`)) {
        cardWrapper.appendChild(mask);
      }
    });
  });
</script>

<div class="h-full">
  <df-messenger
    project-id={import.meta.env.VITE_PROJECT_ID}
    agent-id={import.meta.env.VITE_AGENT_ID}
    language-code="en"
    storage-option="none"
    class="drop-shadow-lg"
    max-query-length="-1">
    <df-messenger-chat
      chat-title="Ask AI Assistant: Get Instant Help"
      bot-writing-text="..."
      placeholder-text="How can I assist you today? Type your question here..." />
    <div class="absolute right-3 top-3 flex items-center justify-center">
      <HistoryBtn total={$dfMessengerResponseState.entities.length} />
    </div>
  </df-messenger>
</div>
