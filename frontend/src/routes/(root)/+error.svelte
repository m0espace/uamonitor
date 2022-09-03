<script context="module" lang="ts">
  // throw new Error("@migration task: Replace error load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3293209)");

  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Упс, {$page.status}</title>
</svelte:head>

<h1>Упс, {$page.status}</h1>
