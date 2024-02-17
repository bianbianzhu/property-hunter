<script lang="ts">
  import { dfMessengerResponseState } from "../../store/dfMessenger-response";
  import GradientWave from "../../components/GradientWave.svelte";
  import TopNav from "../../components/TopNav.svelte";
  import ListItem from "../../components/ListItem.svelte";
</script>

<TopNav />

{#if $dfMessengerResponseState.entities.length === 0}
  <div class="container relative mx-auto w-full text-center">
    <div class="h-[15vh]" />
    <div class="mb-2 text-3xl font-bold text-gray-800">No history</div>
    <div class="text-lg text-gray-600">You have not interacted with the chatbot yet.</div>
  </div>
{:else}
  <div
    class="container relative mx-auto flex min-h-screen max-w-[90vw] items-start justify-center pb-8 md:max-w-[60vw]">
    <ul class="mt-[6vh] flex flex-col gap-2 rounded bg-slate-50 p-4 shadow-lg">
      {#each $dfMessengerResponseState.entities as response, i (response.id)}
        <ListItem {response} index={i} />
      {/each}
    </ul>
  </div>
{/if}

<GradientWave />
