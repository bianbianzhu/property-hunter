<script lang="ts">
  import { goto } from "$app/navigation";
  export let total = 0;

  const handleClick = () => {
    goto("/history");
  };
</script>

<button class="relative rounded-full" on:click={handleClick}>
  <svg fill="#fff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.62a1,1,0,0,0,0-2H6.22A8,8,0,1,1,4,12a1,1,0,0,0-2,0A10,10,0,1,0,12,2Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H13V9A1,1,0,0,0,12,8Z" /></svg>
</button>
{#if total > 0}
  <div
    class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-xs text-white">
    {total}
  </div>
{/if}
