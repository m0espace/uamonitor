<script lang="ts">
  import tippy from 'svelte-tippy';
  import type { PageData } from '../$types';
  import ServerCard from '$lib/components/ServerCard.svelte';
  import type { Server } from '$lib/types';

  export let data: PageData;
  let visible: boolean = false;
  let parsedServers: Server[] = data.servers.sort(
    (a: Server, b: Server) => b.statuses[0]?.onlineCount - a.statuses[0]?.onlineCount
  );
  $: if (!visible) parsedServers = data.servers.filter(server => server.statuses[0]?.isOnline);
  else parsedServers = data.servers;
</script>

<div class="mx-2 md:mx-24 flex flex-col gap-8">
  {#each parsedServers as server}
    <ServerCard {server} />
  {/each}
  <a
    on:click={() => (visible = !visible)}
    href="#"
    class="transition ease-in-out delay-50 rounded-lg bg-zinc-200 h-14 flex justify-center items-center hover:bg-zinc-400 text-black"
    >{visible ? 'Сховати сервери офлайн' : 'Показати сервери офлайн'}</a
  >
</div>
<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
