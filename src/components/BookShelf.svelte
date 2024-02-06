<script lang="ts">
  import { savedItemState } from "../store";
</script>

<ul>
  {#each $savedItemState.entities as entity (entity.actionLink)}
    <li>
      <a href={entity.purchaseLink} target="_blank">{entity.title}</a>
    </li>
  {/each}
</ul>
