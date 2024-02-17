<script lang="ts">
  import type { DfMessengerResponse } from "../store/dfMessenger-response";

  export let response: DfMessengerResponse;
  export let index: number;

  let isCollapsed = true;

  const { userQuery, botMessages, retrievedSnippets } = response;

  const toggleCollapse = () => {
    isCollapsed = !isCollapsed;
  };
</script>

<li class="w-full">
  <button
    class="flex w-full transform cursor-pointer select-none flex-col items-center rounded-md bg-orange-100 p-4 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg md:flex-row"
    on:click={toggleCollapse}>
    <div
      class="mr-0 flex h-10 w-10 items-center justify-center rounded-md bg-amber-500 text-white md:mr-4">
      {index + 1}
    </div>
    <div class="mr-0 flex-1 md:mr-16">
      <div class="text-start font-medium">{userQuery}</div>
      <div class="text-start text-sm text-gray-600">
        {botMessages?.[1]?.type === "customCard"
          ? botMessages?.[1]?.richElements?.[0]?.subtitle
          : "No data found"}
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      style={isCollapsed ? "" : "transform: rotate(180deg);"}>
      <polygon points="0,6 12,18 24,6" fill="#F59E0B" />
    </svg>
  </button>
  {#if !isCollapsed}
    <h3 class="relative mb-2 mt-2 overflow-hidden pl-4 text-lg font-thin text-zinc-500">
      Relevant Readings
      <div class="absolute left-[175px] top-[50%] h-[1px] w-full bg-zinc-300" />
    </h3>

    <ul>
      {#each retrievedSnippets as snippet, i (snippet.uri)}
        <li
          class="relative flex overflow-hidden border-b p-4 first:rounded-lg first:border first:border-amber-500 last:border-b-0"
          style={retrievedSnippets.length === 1 ? "border-bottom-width: 1px" : ""}>
          <a class="flex-1" href={snippet.uri} target="_blank" id="selected-snippet">
            <p
              class="text-start text-sm
                font-normal">
              {snippet.text}
            </p>
            <p
              class="text-start
                    text-xs text-gray-600">
              {snippet.title}
            </p>
          </a>
          <div
            class="absolute -right-5 top-2.5 flex h-5 w-20 rotate-[45deg] items-center justify-center bg-orange-500 text-xs font-bold text-white"
            style={i === 0 ? "" : "display: none"}>
            Selected
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</li>
