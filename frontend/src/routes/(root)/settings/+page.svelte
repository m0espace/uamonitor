<script lang="ts">
  import api from '$lib/api';
  import Button from '$lib/components/Button.svelte';
  import type { User } from '$lib/types';
  import { form, field } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  const name = field('name', '', [required()]);
  const getUser = () => api(true).url('user').get().json<User>();
</script>

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

  <!-- <section class="flex flex-col gap-3">
    <div></div>
  </section> -->
</div>
