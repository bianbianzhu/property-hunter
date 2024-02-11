<script lang="ts">
  import { Heading } from "flowbite-svelte";
  import { onMount } from "svelte";
  import DialogBox from "../components/DialogBox.svelte";
  import FloatingActionBtn from "../components/FloatingActionBtn.svelte";
  import GradientWave from "../components/GradientWave.svelte";
  import DfMessenger from "../components/DfMessenger.svelte";
  import TopNav from "../components/TopNav.svelte";
  import BottomBar from "../components/BottomBar.svelte";
  import BookShelf from "../components/BookShelf.svelte";
  import { savedItemState, showBookShelf } from "../store/saved-response";
  import ShoppingCartBtn from "../components/ShoppingCartBtn.svelte";

  let showFloatingActionBtn: Boolean = false;

  function sendInput(text: string, time: number) {
    const dfMessenger = document.querySelector("df-messenger");
    const dfMessengerChat = dfMessenger?.querySelector("df-messenger-chat");
    const dfMessengerUserInput =
      dfMessengerChat?.shadowRoot?.querySelector("df-messenger-user-input");
    const textarea = dfMessengerUserInput?.shadowRoot?.querySelector("textarea");
    const button = dfMessengerUserInput?.shadowRoot?.querySelector("button");

    setTimeout(function () {
      if (textarea) {
        textarea.value = text;
      }
    }, time);

    setTimeout(function () {
      if (textarea) {
        textarea.dispatchEvent(new Event("input"));
      }
    }, time + 100);

    setTimeout(function () {
      if (button) {
        button.click();
      }
    }, time + 1000);
  }

  onMount(() => {
    // Write and send sample questions to chatbot
    // sendInput("Hello", 2000);
    sendInput("How much Melbourne home prices could rise in 2024?", 100);
    sendInput("What is the housing affordability in 2023", 5000);

    const resizeObserver = new ResizeObserver((entries) => {
      // entries[0].target.clientHeight is equal to document.body.scrollHeight
      showFloatingActionBtn = entries[0].target.clientHeight > window.innerHeight;
    });

    resizeObserver.observe(document.body);
  });
</script>

<TopNav />

<div class="container mx-auto flex flex-col items-center">
  <div class="max-h-full w-full">
    <Heading tag="h1" class="mb-2 mt-[5vh] text-center text-5xl font-bold leading-snug"
      >Property Hunter, Your Ultimate Property Guide.</Heading>
    <div class="mt-[8vh] flex min-h-[55vh] gap-16">
      <div class="w-2/5">
        <p class="mt-5 font-normal text-gray-500 dark:text-gray-400">
          Discover. Connect. Secure Your Dream Home.
        </p>

        <Heading tag="h5" class="my-2 mt-6 text-amber-500">How it works</Heading>
        Ask a question and get a response from our AI agent. For example:

        <DialogBox prompt="what is the housing market like in Melbourne?" boxWidth={75} />
        <span class="text-bold font-bold">Or</span>
        <DialogBox prompt="which suburb in melbourne grows the fastest?" boxWidth={75} />
      </div>

      <div class="w-3/5">
        <DfMessenger />
      </div>
    </div>
  </div>

  <div class="mb-2 mt-[8vh]">
    <BottomBar />
  </div>
</div>

<GradientWave />

{#if showFloatingActionBtn}
  <div class="fixed bottom-10 right-10">
    <FloatingActionBtn />
  </div>
{/if}

{#if $savedItemState.entities.length > 0}
  <div class="fixed bottom-10 left-10">
    <ShoppingCartBtn />
  </div>

  {#if $showBookShelf}
    <div class="fixed bottom-24 left-24">
      <BookShelf />
    </div>
  {/if}
{/if}
