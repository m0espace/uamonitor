<script lang="ts">
  export let href = '#';
  export let target = '';
</script>

<a
  {href}
  {target}
  on:click
  class="transition ease-in-out delay-50 px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-black dark:text-white dark:bg-neutral-600 flex justify-center items-center dark:hover:bg-neutral-700 {$$props.class ||
    ''}"
>
  <slot />
</a>
