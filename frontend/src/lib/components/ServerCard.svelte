<script lang="ts">
	import type { Server } from '$lib/types';
	// import Chart from 'chart.js/auto';
	import highcharts from '$lib/highcharts';

	import { onMount } from 'svelte';

	export let server: Server;
	//@ts-ignore
	import tippy from 'sveltejs-tippy';
	import Button from '$lib/components/Button.svelte';
	import { identity } from 'svelte/internal';

	const tippyProps = {
		content: server.statuses[0]?.version
	};

	const config = {
		credits: undefined,
		exporting: {
			enabled: false
		},
		chart: {
			//styledMode: true,
			backgroundColor: '#ffffff',
			spacing: [-10, 0, 0, 0],
			height: 98,
			borderRadius: '10px radius'
		},
		title: {
			style: {
				display: 'none'
			}
		},
		xAxis: {
			type: 'datetime',
			labels: {
				enabled: false
			},
			visible: false,
			minPadding: 0,
			maxPadding: 0
		},
		yAxis: {
			gridLineWidth: 0,
			minPadding: 0,
			maxPadding: 0,
			title: {
				style: {
					display: 'none'
				}
			},
			visible: false,
			labels: {
				enabled: false
			}
		},
		legend: {
			enabled: false
		},
		time: {
			useUTC: false
		},
		plotOptions: {
			area: {
				fillColor: 'var(--color-green-400)',
				fillOpacity: 0.57,
				states: {
					hover: {
						lineWidthPlus: 0,
						halo: {
							size: 0
						}
					}
				},
				marker: {
					radius: 0.01,
					lineWidth: 4,
					lineColor: 'var(--color-green-600)',
					fillColor: 'var(--color-green-600)',
					states: {
						hover: {
							lineWidthPlus: 1,
							radiusPlus: 3
						},
						select: {
							enabled: false
						}
					}
				},
				lineWidth: 4,
				lineColor: 'var(--color-green-600)',
				threshold: null
			}
		},
		tooltip: {
			borderRadius: 8,
			borderWidth: 0,
			padding: 12,
			hideDelay: 0,
			headerFormat: '<span>{point.key}</span><br>',
			pointFormat: '<span>Гравців: {point.y}</span>',
			shadow: false,
			backgroundColor: 'var(--color-neutral-900)',
			style: {
				color: 'var(--color-white)',
				// fontWeight: 'bold',
				fontSize: '14px'
			}
		},

		series: [
			{
				type: 'area',
				data: server.graph.data
					.map((data) => [
						`${new Date(data.date).toLocaleDateString('uk-UA', { weekday: 'long' })} ${new Date(
							data.date
						).getDate()}, ${new Date(data.date).getHours()}:${new Date(data.date).getMinutes()}`,
						data.onlineCount
					])
					.reverse()
			}
		]
	};

	const copy = (text: string) => {
		navigator.clipboard.writeText(text);
	};
</script>

<div class="rounded-xl mx-2 md:mx-24 mb-8 h-64 flex flex-col" style="border: 1px solid lightgrey;">
	<div class="min-w-max basis-3/5 px-4 p-4 flex flex-row">
		<div class="basis-2/3 flex flex-row items-center gap-6">
			<img
				class="rounded-lg w-20 h-20"
				src={server.icon ? server.icon : '/favicon.png'}
				alt="{server.name} icon"
			/>
			<div class="flex flex-col">
				<h1 class="font-bold text-lg">{server.name}</h1>
				<div
					class="transition flex ease-in-out delay-50 p-2 bg-gray-200 rounded-md flex-row gap-2 items-center justify-center hover:bg-zinc-300"
				>
					<p class="text-sm hidden md:block">
						{server.ip}{server.port !== '25565' ? `:${server.port}` : ''}
					</p>
					<input
						class="md:w-5 md:h-5 w-7 h-7"
						type="image"
						src="/img/clipboard.svg"
						value="{server.ip}{server.port !== '25565' ? `:${server.port}` : ''}"
						alt="Копіювати до буферу обміну"
						on:click={(event) =>
							copy(`${server.ip}${server.port !== '25565' ? `:${server.port}` : ''}`)}
						use:tippy={{ content: 'Копіювати до буферу обміну' }}
					/>
				</div>
			</div>
		</div>
		<div class="basis-1/3 flex flex-col items-end flex-wrap grow-0 relative gap-1">
			{#if server.statuses[0]?.isOnline}
				<p class="flex flex-row gap-2">
					Онлайн <span class="block w-4 h-4 mt-1 circle pulse bg-green-600" />
				</p>
				<p class="text-slate-600">
					{server.statuses[0]?.onlineCount}/{server.statuses[0]?.maxOnline}
				</p>
				<p class="text-slate-600 inline-block truncate w-0 min-w-full" use:tippy={tippyProps}>
					{server.statuses[0]?.version}
				</p>
			{:else}
				<p class="flex flex-row gap-2">
					Офлайн <span class="block w-4 h-4 mt-1 circle pulse bg-red-600" />
				</p>
			{/if}
			<div class="flex flex-row gap-2">
				{#if server.link}
					<Button svg="/img/link.svg" href={server.link} target="blank" />
				{/if}
				{#if server.telegram}
					<Button svg="/img/telegram.svg" href={`https://t.me/${server.telegram}`} target="blank" />
				{/if}
				{#if server.discord}
					<Button
						svg="/img/discord.svg"
						href={`https://discord.gg/${server.discord}`}
						target="blank"
					/>
				{/if}
			</div>
		</div>
	</div>
	<div class="relative min-w-max basis-2/5 rounded-lg" use:highcharts={config} />
</div>
