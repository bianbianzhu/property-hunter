<script lang="ts">
  import { dfMessengerResponseState } from "../../store/dfMessenger-response";
  import GradientWave from "../../components/GradientWave.svelte";

  console.log($dfMessengerResponseState);
</script>

{#if $dfMessengerResponseState.entities.length === 0}
  <div class="container relative mx-auto flex min-h-screen w-full items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="mb-2 text-3xl font-bold text-gray-800">No history</div>
      <div class="text-lg text-gray-600">You have not interacted with the chatbot yet.</div>
    </div>
  </div>
{/if}
<div class="justify-cente container relative mx-auto flex min-h-screen w-full items-center">
  <ul class="flex flex-col bg-gray-300 p-4">
    {#each $dfMessengerResponseState.entities as response, i (response.id)}
      <li class="mb-2 flex flex-row border-gray-400">
        <div
          class="flex flex-1 transform cursor-pointer select-none items-center rounded-md bg-gray-200 p-4 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg">
          <div
            class="mr-4 flex h-10 w-10 flex-col items-center justify-center rounded-md bg-gray-300">
            ?
          </div>
          <div class="mr-16 flex-1 pl-1">
            <div class="font-medium">{response.userQuery}</div>
            <div class="text-sm text-gray-600">
              {response.botMessages[1].type === "customCard"
                ? response.botMessages[1].richElements[0].subtitle
                : "no data"}
            </div>
          </div>
          <div class="text-xs text-gray-600">6:00 AM</div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<GradientWave />
