<script lang="ts">
  import { A } from "flowbite-svelte";
  import GoogleCloudLink from "./GoogleCloudLink.svelte";
</script>

<p class="font-normal text-gray-700 dark:text-gray-400">
  Powered by <A
    class="font-medium text-green-400 hover:underline"
    href="https://cloud.google.com/generative-ai-app-builder">Vertex AI Conversation</A> and
  <A class="font-medium text-green-400 hover:underline" href="https://cloud.google.com/dialogflow"
    >Dialogflow CX</A>
  in <GoogleCloudLink />
</p>
