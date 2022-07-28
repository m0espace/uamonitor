<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher(),
    close = (success: boolean) => {
      dispatch(success ? 'click' : 'close');
      open = false;
    };

  let dialog: HTMLDialogElement;

  export let open = true,
    title: string;

  $: if (open) setTimeout(() => !dialog?.open && dialog.showModal(), 0);
  $: dialog?.addEventListener('close', () => close(false));
</script>

{#if open}
  <dialog
    bind:this={dialog}
    on:click={event => (event.target === dialog ? close(false) : '')}
    class="fixed my-auto w-full max-w-xl space-y-3 rounded-xl bg-zinc-200 p-4 backdrop:bg-black backdrop:bg-opacity-50"
  >
    <h1 class="flex items-center justify-between gap-4 text-2xl text-black font-bold">
      {title}
    </h1>
    <slot />
  </dialog>
{/if}
