<script lang="ts">
  import type { PageData } from './$types';
  import ServerCard from '$lib/components/ServerCard.svelte';

  export let data: PageData;
</script>

<ServerCard server={data.server} embed={true} />
