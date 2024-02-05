<script lang="ts">
  import { Heading } from "flowbite-svelte";
  import { onMount } from "svelte";
  import DialogBox from "../components/DialogBox.svelte";
  import FloatingActionBtn from "../components/FloatingActionBtn.svelte";
  import GradientWave from "../components/GradientWave.svelte";
  import DfMessenger from "../components/DfMessenger.svelte";
  import TopNav from "../components/TopNav.svelte";
  import BottomBar from "../components/BottomBar.svelte";

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
    // sendInput("Suggest me a book?", 6000);

    const resizeObserver = new ResizeObserver((entries) => {
      // entries[0].target.clientHeight is equal to document.body.scrollHeight
      showFloatingActionBtn = entries[0].target.clientHeight > window.innerHeight;
    });

    resizeObserver.observe(document.body);
  });
</script>

<TopNav />

<div class="container mx-auto flex flex-col items-center">
  <div class="max-h-full max-w-full">
    <div class="mt-[15vh] flex gap-12">
      <div class="w-2/5">
        <Heading tag="h1" class="mb-2 text-5xl font-bold leading-snug"
          >Find the book you’re looking for in a second.</Heading>
        <p class="mt-5 font-normal text-gray-500 dark:text-gray-400">
          The most appropriate AI book site to reach books
        </p>

        <Heading tag="h5" class="my-2 mt-6 text-green-400">How it works</Heading>
        Ask the chatbot on the right about books in our Store, such as
        <DialogBox prompt="Suggest me a book about AI?" boxWidth={50} />
        <span class="text-bold font-bold">Or</span>
        <DialogBox prompt="What are the best books for beginners?" />
      </div>

      <div class="w-3/5">
        <DfMessenger />
      </div>
    </div>
  </div>

  <div class="mb-2 mt-[10vh]">
    <BottomBar />
  </div>
</div>

<GradientWave />

{#if showFloatingActionBtn}
  <FloatingActionBtn />
{/if}
