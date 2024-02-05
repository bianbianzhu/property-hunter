<script lang="ts">
  import { onMount } from "svelte";
  import { scrollToBottom, scrollToTop } from "../utils";

  let isArrowUp = false;

  function setBtnArrowDirection() {
    // set instruction to "up" when scroll position is at the bottom
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      isArrowUp = true;
    } else {
      isArrowUp = false;
    }
  }

  onMount(() => {
    // the button arrow direction should be updated when the user scrolls
    window.addEventListener("scroll", setBtnArrowDirection);

    // the button arrow direction should be updated when the window is resized vertically
    const resizeObserver = new ResizeObserver((_) => {
      setBtnArrowDirection();
    });

    resizeObserver.observe(document.body);
  });
</script>

<div class="fixed bottom-10 right-10">
  <button
    class="rounded bg-green-400 p-3"
    on:click={isArrowUp ? scrollToTop : scrollToBottom}
    style={isArrowUp ? "transform: rotate(180deg)" : ""}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        color="white"
        d="M12 4v16m0 0l-8-8m8 8l8-8" />
    </svg>
  </button>
</div>
