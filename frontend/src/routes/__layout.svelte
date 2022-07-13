<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>UAMonitor</title>

	<meta property="og:url" content="https://stats.m0e.space" />
	<meta property="og:title" content="UAMonitor" />
	<meta property="og:description" content="Безкоштовний моніторинг українських серверів" />
	<meta property="og:image" content="https://stats.m0e.space/favicon.png" />
</svelte:head>

<header
	class="p-6 mt-2 mb-4 max-h-16 md:rounded-xl md:max-w-3xl max-w-full mx-auto bg-white rounded-none shadow-lg flex flex-row justify-start gap-5 items-center"
>
	<div class="flex flex-row basis-1/3 justify-start gap-5 items-center">
		<a href="/" class="focusable object-scale-down">
			<img src="/favicon.png" class="object-scale-down rounded-lg h-10 w-10" alt="UAMonitor" />
		</a>
		<a href="/about" class="focusable text-blue-500">Про сайт</a>
	</div>
	<div class="basis-2/3 float-right flex flex-row-reverse">
		<a href="https://github.com/Andrmist/uamonitor" class="focusable text-blue-500"
			><img class="h-10 w-10 object-scale-down" src="/img/github.svg" alt="Github" /></a
		>
	</div>
</header>

<div class="p-4 border rounded text-amber-700 bg-amber-50 border-amber-900/10" role="alert">
	<strong class="text-md font-medium"
		>З'явився телеграм канал з новинами розробки та обговореннями: <a
			class="text-blue-600"
			href="https://t.me/uamonitor_news">@uamonitor_news</a
		></strong
	>
</div>
<div class="mt-4">
	<slot />
</div>
