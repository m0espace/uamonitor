<script lang="ts">
  import { browser, dev } from '$app/environment';
  import tippy from 'svelte-tippy';
  import ServerCard from '$lib/components/ServerCard.svelte';
  import type { GraphServer, Server } from '$lib/types';
  import { onMount } from 'svelte';
  import api from '$lib/api';
  import auth, { type AuthData } from '$lib/auth';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const servers = api()
    .polyfills({ fetch })
    .url(
      dev
        ? 'http://127.0.0.1:8080/api/servers'
        : `${browser ? '' : 'http://stats.m0e.space'}/api/servers`,
      true
    )
    .get()
    .badRequest(e => {
      throw new Error('');
    })
    .json<Server[]>()
    .then(servers =>
      servers
        .filter(server => server.onlineCount)
        .sort((a: Server, b: Server) =>
          a.onlineCount && b.onlineCount ? b.onlineCount - a.onlineCount : 0
        )
        .concat(servers.filter(server => !server.onlineCount))
    );

  onMount(() => {
    if (!$auth && $page.url.searchParams.has('code'))
      api(false)
        .url('auth/discord')
        .options({ credentials: 'include' })
        .post({ code: $page.url.searchParams.get('code') })
        .badRequest(() => goto('/'))
        .json<AuthData>()
        .then(data => {
          auth.set(data);
          goto('/');
        });
  });

  // export let data: PageData;
  let visible: boolean = false;
  let parsedServers: Server[];
  // $: if (!visible) parsedServers = data.servers.filter(server => server.statuses[0]?.isOnline);
  // else parsedServers = data.servers;
</script>

<div class="mx-2 md:mx-24 flex flex-col gap-8">
  {#await servers then serversData}
    {#each serversData as server}
      <ServerCard {server} />
    {/each}
  {/await}
  <!-- {#each parsedServers as server}
    <ServerCard {server} />
  {/each} -->
  <!-- <a
    on:click={() => (visible = !visible)}
    href="#"
    class="transition ease-in-out delay-50 rounded-lg bg-zinc-700 h-14 flex justify-center items-center hover:bg-zinc-600 text-white"
    >{visible ? 'Сховати сервери офлайн' : 'Показати сервери офлайн'}</a
  > -->
</div>
<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
