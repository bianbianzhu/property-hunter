<script lang="ts">
  import { deleteSavedItem, savedItemState, showBookShelf } from "../store/saved-response";
  import { capitalize } from "../utils";

  const close = () => {
    showBookShelf.update(() => false);
  };

  const remove = (actionLink: string) => () => deleteSavedItem(actionLink);
</script>

<ul
  role="list"
  class="relative max-w-md divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-xl">
  {#each $savedItemState.entities as entity (entity.actionLink)}
    <li class="flex justify-between gap-x-3 p-3 py-5 odd:bg-amber-50">
      <div class="flex min-w-0 gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src={""} alt="" />
        <div class="min-w-0 flex-auto">
          <a href={entity.actionLink} target="_blank">{capitalize(entity.title)}</a>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{entity.agentResponse}</p>
        </div>
      </div>

      <button on:click={remove(entity.actionLink)} class="scale-75">
        <svg
          fill="#D97706"
          width="24px"
          height="24px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg">
          <path
            class="clr-i-outline clr-i-outline-path-1"
            d="M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z" /><path
            class="clr-i-outline clr-i-outline-path-2"
            d="M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z" /><rect
            class="clr-i-outline clr-i-outline-path-3"
            x="21"
            y="13"
            width="2"
            height="15" /><rect
            class="clr-i-outline clr-i-outline-path-4"
            x="13"
            y="13"
            width="2"
            height="15" /><path
            class="clr-i-outline clr-i-outline-path-5"
            d="M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z" />
          <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
        </svg>
      </button>
    </li>
  {/each}
</ul>

<button
  class="absolute -right-3 -top-3 inline-block flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 leading-none text-white shadow-lg hover:bg-amber-600"
  on:click={close}>
  <svg
    class="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
