<script context="module" lang="ts">
	// @ts-ignore
	export const load = ({ status }) => ({ props: { status } });
</script>

<script lang="ts">
	export let status: number;
</script>

<svelte:head>
	<title>Упс, {status}</title>
</svelte:head>

<h1>Упс, {status}</h1>
