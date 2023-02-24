<script lang="ts">
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<div
  class="rounded-xl h-64 flex flex-col dark:bg-neutral-900 bg-white dark:border-gray-900 border-zinc-200 border dark:text-slate-200 shadow-lg"
  transition:scale={{ duration: 400, easing: quintOut }}
>
  <slot />
</div>
