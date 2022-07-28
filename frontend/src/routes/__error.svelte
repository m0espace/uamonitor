<script context="module" lang="ts">
  // @ts-ignore
  export const load = ({ error, status }) => ({ props: { error, status } });
</script>

<script lang="ts">
  export let status: number;
  export let error: Error;
</script>

<svelte:head>
  <title>Упс, {status}</title>
</svelte:head>

<h1>Упс, {status}</h1>
