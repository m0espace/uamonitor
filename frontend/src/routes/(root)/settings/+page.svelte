<script lang="ts">
  import api from '$lib/api';
  import auth from '$lib/auth';
  import Button from '$lib/components/Button.svelte';
  import type { User, Server } from '$lib/types';
  import { onMount } from 'svelte';
  import { form, field } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { writable } from 'svelte/store';

  let servers = writable<Server[]>([]);
  const name = field('name', '', [required()]);
  const getUser = () => api(true).url('user').get().json<User>();

  auth.subscribe(
    authData =>
      authData?.access_token &&
      api(true)
        .url('user/servers')
        .get()
        .json<Server>()
        .then(serversData => servers.set($servers.concat(serversData)))
  );
</script>

{#if $auth}
  <div class="flex flex-col gap-5">
    <section class="flex flex-col gap-4">
      <p class="text-3xl">Налаштування</p>

      <!-- svelte-ignore component-name-lowercase -->
      <form
        on:submit|preventDefault={() =>
          api(true)
            .url('user')
            .headers({ 'Content-type': 'application/json' })
            .body(JSON.stringify({ name: $name.value }))
            .put()
            .res()
            .then(() => location.reload())}
      >
        <div class="mb-4">
          <label for="userName" class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >Ім'я</label
          >
          <input
            type="text"
            id="userName"
            class="transition ease-in-out delay-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Anon"
            required
            bind:value={$name.value}
          />
        </div>
        <button
          type="submit"
          class="transition ease-in-out delay-50 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Змінити</button
        >
      </form>
    </section>

    <section class="flex flex-col gap-3">
      <p class="text-3xl">Прив'язати Telegram</p>
      <p>Ви можете отримувати повідомлення про статус вашого серверу через бот в Telegram</p>
      {#await getUser() then user}
        {#if user.chatId}
          <p class="dark:text-neutral-200 text-neutral-600">
            Ви вже прив'язали, але можете в будь-який момент переприв'язати ще раз.
          </p>
        {/if}
        <Button target="_blank" href={`https://telegram.me/istmesbot?start=${user.telegramCode}`}
          >Прив'язати</Button
        >
      {/await}
    </section>

    <section class="flex flex-col gap-3">
      <div class="flex flex-row items-center justify-start gap-3">
        <p class="text-3xl">Сервери</p>
        <Button
          class="dark:bg-green-600 dark:hover:bg-green-700 bg-green-600 hover:bg-green-700 text-white"
          on:click={() =>
            servers.set(
              $servers.concat([
                {
                  id: -1,
                  name: '',
                  description: '',
                  ip: '',
                  port: '',
                  icon: '',
                  link: '',
                  telegram: '',
                  discord: '',
                  youtube: '',
                  statuses: [],
                  isOnline: true,
                  onlineCount: null,
                  maxOnline: null,
                  version: null,
                  graph: { id: -1, data: [] }
                }
              ])
            )}>Створити</Button
        >
      </div>
      {#if $servers.length > 0}
        <div class="hs-accordion-group">
          <div class="hs-accordion active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
            <button
              class="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
            >
              Accordion #1
              <svg
                class="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-one"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <p class="text-gray-800 dark:text-gray-200">
                <em>This is the third item's accordion body.</em> It is hidden by default, until the
                collapse plugin adds the appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing and hiding via CSS transitions.
              </p>
            </div>
          </div>
        </div>
      {:else}
        <p>У вас поки що немає серверів. Натисніть кнопку "Створити", щоб почати роботу.</p>
      {/if}
    </section>

    <!-- <section class="flex flex-col gap-3">
    <div></div>
  </section> -->
  </div>
{:else}
  Завантаження...
{/if}
