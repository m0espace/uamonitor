<script lang="ts">
  //@ts-ignore
  import tippy from 'svelte-tippy';

  export let svg: string;
  export let text = '';
  export let tooltip = false;
  export let classes = '';
  export let href = '#';
  export let target = '';
  export let aClasses = '';
</script>

<div class="w-10 h-10 flex flex-col {classes}" on:click>
  <a
    {href}
    {target}
    class="transition ease-in-out delay-50 rounded-lg bg-zinc-300 h-14 flex justify-center items-center hover:bg-zinc-400 {aClasses}"
  >
    {#if tooltip}
      <img class="w-6 h-6" src={svg} alt={text} use:tippy={{ content: text }} />
    {:else}
      <img class="w-6 h-6" src={svg} alt={text} />
    {/if}
  </a>
</div>
