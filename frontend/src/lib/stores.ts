import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import url from 'url';

export const theme = writable(
  (browser && localStorage.getItem('theme')) ||
    (browser &&
      window.location.search
        .slice(1)
        .split('&')
        .find(e => e.split('=')[0] === 'theme')
        ?.split('=')[1]) ||
    'light'
);
theme.subscribe(value => browser && localStorage.setItem('theme', value));
