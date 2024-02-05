<script lang="ts">
  export let prompt = "Suggest me a book?";
  export let boxWidth = 70;
</script>

<div class={`relative my-3 rounded-lg bg-white p-3 shadow-lg`} style="width: {boxWidth}%;">
  <div
    class="absolute -bottom-3 -right-2 flex h-6 w-6 rotate-90 items-center justify-center rounded-full bg-emerald-500 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-4 w-4">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  </div>
  <p
    class="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-black">
    {prompt}
  </p>
</div>
