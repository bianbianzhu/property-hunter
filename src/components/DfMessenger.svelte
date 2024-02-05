<script lang="ts">
  import { onMount } from "svelte";

  type ParamKey = "k";

  const BASE_URL: string = "https://www.amazon.com.au/";
  const paramKeys: ParamKey[] = ["k"];
  const url = new URL(BASE_URL);

  function isCustomEvent(event: Event): event is CustomEvent {
    return "detail" in event;
  }

  onMount(() => {
    const dfMessenger = document.querySelector("df-messenger");
    dfMessenger?.addEventListener("df-info-card-clicked", function (event) {
      if (isCustomEvent(event)) {
        url.searchParams.set(paramKeys[0], "123");
        console.log(url.href);
      }
    });
  });

  function extractBookTitle(url: string): string {
    const startIndex =
      url.indexOf("books-toscrape-com-catalogue") + "books-toscrape-com-catalogue".length;
    const endIndex = url.indexOf("-index-html.html?");
    const bookTitle = url.substring(startIndex, endIndex).replace(/-/g, " ");
    return bookTitle.trim();
  }
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
