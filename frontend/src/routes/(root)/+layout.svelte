<script lang="ts">
  import '../../app.css';
  import './body.css';
  import { theme } from '$lib/stores';
  import { browser } from '$app/environment';
  $: browser && (document.documentElement.className = $theme);
</script>

<svelte:head>
  <title>UAMonitor</title>
</svelte:head>

<header
  class="p-6 md:mt-2 mb-4 max-h-16 md:rounded-xl md:max-w-3xl max-w-full mx-auto bg-white dark:bg-neutral-900 rounded-none shadow-lg flex flex-row justify-start gap-5 items-center"
>
  <div class="flex flex-row basis-1/3 justify-start gap-5 items-center">
    <a href="/" class="focusable object-scale-down">
      <img src="/favicon.png" class="object-scale-down rounded-lg h-10 w-10" alt="UAMonitor" />
    </a>
    <a href="/about" class="focusable text-blue-500">Про сайт</a>
  </div>
  <div class="basis-2/3 float-right flex flex-row-reverse gap-3">
    <a href="https://github.com/Andrmist/uamonitor" class="focusable h-8 w-8"
      ><img
        class="w-full h-full"
        src={$theme === 'dark' ? 'img/github_light.svg' : '/img/github.svg'}
        alt="Github"
      /></a
    >
    <a
      href="#"
      class="focusable h-8 w-8"
      on:click={() => ($theme === 'dark' ? theme.set('light') : theme.set('dark'))}
      ><img
        class="w-full h-full"
        src={$theme === 'dark' ? 'img/light.svg' : '/img/dark.svg'}
        alt="Github"
      /></a
    >
  </div>
</header>

<div
  class="p-4 border-2 rounded dark:bg-amber-900 dark:bg-opacity-50 dark:text-amber-500 text-amber-700 bg-amber-100  border-amber-900/10"
  role="alert"
>
  <strong class="text-md font-medium"
    >З'явився телеграм канал з новинами розробки та обговореннями: <a
      class="text-blue-600 dark:text-blue-400"
      href="https://t.me/uamonitor_news">@uamonitor_news</a
    ></strong
  >
</div>
<div class="mt-4">
  <slot />
</div>
