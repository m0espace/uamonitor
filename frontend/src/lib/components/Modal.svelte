<script lang="ts">
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Highlight } from 'svelte-highlight';
  import html from 'svelte-highlight/languages/xml';
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-hard';

  const dispatch = createEventDispatcher(),
    close = (success: boolean) => {
      dispatch(success ? 'click' : 'close');
      open = false;
    };

  let dialog: HTMLDialogElement;
  let isModalOpen = false;

  export let open = true,
    title: string,
    type: 'server' | 'embed' = 'embed',
    server_id: number = 0;

  let code = `<iframe id="card"
  title="UAMonitor"
  scrolling="no"
  height="256"
  width="500"
  src="https://stats.m0e.space/s/${server_id}?theme=dark">
</iframe>`;

  $: if (open) setTimeout(() => !dialog?.open && dialog.showModal(), 0);
  $: dialog?.addEventListener('close', () => close(false));
</script>

<svelte:head>
  {@html gruvbox}
</svelte:head>

{#if open}
  <dialog
    bind:this={dialog}
    on:click={event => (event.target === dialog ? close(false) : '')}
    class="fixed my-auto w-full max-w-xl space-y-3 rounded-xl bg-zinc-200 dark:bg-zinc-800 p-4 backdrop:bg-black backdrop:bg-opacity-50"
  >
    <h1
      class="flex items-center justify-between gap-4 text-2xl text-black dark:text-white font-bold"
    >
      {title}
    </h1>
    <slot />
    {#if type === 'server'}
      <a href="#" on:click={() => (isModalOpen = true)}>ID: {server_id}</a>
      <Modal bind:open={isModalOpen} title="Додати моніторинг собі на сторінку" type="embed">
        <div class="dark:text-white text-black">
          <p>Додати можна за допомогою &#60;iframe&#62;:</p>
          <div class="m-4">
            <Highlight language={html} {code} />
          </div>
          <p>Де:</p>
          <ul class="list-disc">
            <li class="ml-8"><strong>theme=dark</strong> можна змінювати на світлу "light"</li>
            <li class="ml-8"><strong>{server_id}</strong> - ідентифікатор серверу</li>
          </ul>
        </div>
      </Modal>
    {/if}
  </dialog>
{/if}
