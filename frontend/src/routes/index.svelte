<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { dev, browser } from '$app/env';
  import api from '$lib/api';
  import tippy from 'svelte-tippy';

  export const load: Load = async ({ fetch }) => {
    const servers = await api()
      .polyfills({ fetch })
      .url(
        dev
          ? 'http://127.0.0.1:8080/api/graph'
          : `${browser ? '' : 'http://stats.m0e.space'}/api/graph`,
        true
      )
      .get()
      .badRequest(e => ({ error: e, status: 500 }))
      .json();

    const serversData = await Promise.all(
      servers.map((server: GraphServer, i: number) =>
        api()
          .polyfills({ fetch })
          .url(
            dev
              ? `http://127.0.0.1:8080/api/servers/${server.id}`
              : `${browser ? '' : 'http://stats.m0e.space'}/api/servers/${server.id}`,
            true
          )
          .get()
          .badRequest(e => ({ error: e, status: 500 }))
          .json(serverData => ({ ...serverData, graph: servers[i] }))
      )
    );
    return { props: { servers: await serversData } };
  };
</script>

<script lang="ts">
  import ServerCard from '$lib/components/ServerCard.svelte';
  import type { Server, GraphServer } from '$lib/types';

  export let servers: Server[];
  export let visible: boolean = false;
  let parsedServers: Server[] = servers.sort(
    (a: Server, b: Server) => b.statuses[0]?.onlineCount - a.statuses[0]?.onlineCount
  );
  $: if (!visible) parsedServers = servers.filter(server => server.statuses[0]?.isOnline);
  else parsedServers = servers;
</script>

<div class="fixed w-14 bottom-5 left-5  z-50 flex flex-col">
  <a
    href="#"
    class="transition ease-in-out delay-50 rounded-lg bg-zinc-300 h-14 flex justify-center items-center hover:bg-zinc-400"
    on:click={() => (visible = !visible)}
    use:tippy={{
      content: visible ? 'Сховати сервери офлайн' : 'Показати сервери офлайн',
      animation: 'shift-away-extreme'
    }}
  >
    <img
      class="w-8 h-8"
      src={visible ? '/img/hide.svg' : '/img/show.svg'}
      alt={visible ? 'Сховати сервери офлайн' : 'Показати сервери офлайн'}
    />
  </a>
</div>

{#each parsedServers as server}
  <ServerCard {server} />
{/each}
<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
