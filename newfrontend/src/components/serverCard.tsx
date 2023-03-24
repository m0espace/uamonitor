import Image from 'next/image';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import { Options as HighChartsOptions } from 'highcharts';
import { GraphServer } from '../interfaces';

import { useAppSelector } from '@/hooks';
import { useRef, useState } from 'react';
import { Server } from '../interfaces';
import Modal from './modal';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

interface Props {
  server: Server;
}

const ServerCard = (props: Props) => {
  const { server } = props;
  const theme = useAppSelector((state) => state.theme.theme);
  const graph = useAppSelector((state) => state.graphData.data);

  const [isModalActive, setIsModalActive] = useState(false);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(server.ip);
  };

  const neededGraph: GraphServer[] = graph.filter(
    (graph) => graph.id === server.id
  );

  const config: HighChartsOptions = {
    credits: undefined,
    exporting: {
      enabled: false,
    },
    chart: {
      backgroundColor: theme === 'dark' ? '#171717' : '#ffffff',
      spacing: [0, 0, 0, 0],
      height: 98,
      borderRadius: 10,
    },
    title: {
      style: {
        display: 'none',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        enabled: false,
      },
      visible: false,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      gridLineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      title: {
        style: {
          display: 'none',
        },
      },
      visible: false,
      labels: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    time: {
      useUTC: false,
    },
    plotOptions: {
      area: {
        fillColor: '#22c55e',
        fillOpacity: 0.57,
        states: {
          hover: {
            lineWidthPlus: 0,
            halo: {
              size: 0,
            },
          },
        },
        marker: {
          radius: 0.01,
          lineWidth: 4,
          lineColor: '#16a34a',
          fillColor: '#16a34a',
          states: {
            hover: {
              lineWidthPlus: 1,
              radiusPlus: 3,
            },
            select: {
              enabled: false,
            },
          },
        },
        lineWidth: 4,
        lineColor: '#16a34a',
        threshold: null,
      },
    },
    tooltip: {
      borderRadius: 8,
      borderWidth: 0,
      padding: 12,
      hideDelay: 0,
      headerFormat: '<span>{point.key}</span><br>',
      pointFormat: '<span>Гравців: {point.y}</span>',
      shadow: false,
      backgroundColor: theme === 'dark' ? '#475569' : '#171717',
      style: {
        color: '#FFFFFF',
        fontSize: '14px',
      },
    },
    series: [
      {
        type: 'area',
        data: neededGraph[0]?.data
          .map((data) => [
            `${new Date(data.date).toLocaleDateString('uk-UA', {
              weekday: 'long',
            })} ${new Date(data.date).getDate()}, ${new Date(
              data.date
            ).getHours()}:${new Date(data.date).getMinutes()}`,
            data.online,
          ])
          .reverse(),
      },
    ],
  };

  return (
    <div className="overflow-hidden mt-5 rounded-xl h-63 flex flex-col dark:bg-neutral-900 bg-white dark:border-gray-900 border-zinc-200 border dark:text-slate-200 shadow-lg">
      <div className="min-w-max basis-3/5 p-4 flex flex-row">
        <div className="basis-2/3 flex flex-row items-center gap-6">
          {server.icon ? (
            <a
              className="w-24 rounded-lg"
              href="#"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <Image
                unoptimized
                src={server.icon}
                width={96}
                height={96}
                className=""
                alt={`${server.name} icon`}
              />
            </a>
          ) : (
            <a
              className="w-24 rounded-lg"
              href="#"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <Image
                unoptimized
                src={'favicon.png'}
                width={96}
                height={96}
                className=""
                alt={`${server.name} icon`}
              />
            </a>
          )}
          <div className="flex flex-col w-full gap-2">
            <h1 className="font-bold text-lg truncate w-0 min-w-full drop-shadow-none">
              {server.name}
            </h1>
            <div className="w-11 sm:w-fit transition flex ease-in-out delay-50 p-2 bg-gray-200 rounded-md flex-row gap-2 items-center justify-center hover:bg-zinc-200 shadow-md">
              <p className="text-sm hidden sm:block dark:text-black">
                {server.ip}
              </p>
              <Image
                width={28}
                height={28}
                className="sm:w-5 sm:h-5 w-7 h-7 cursor-pointer"
                onClick={handleCopyClick}
                src="/img/clipboard.svg"
                alt="Копіювати до буферу обміну"
              />
            </div>
          </div>
        </div>
        <div className="basis-1/3 flex flex-col items-end flex-wrap grow-0 relative gap-1">
          {server.isOnline ? (
            <div>
              <p className="flex flex-row gap-2">
                {'Онлайн'}
                <span className="block w-4 h-4 mt-1 circle pulse bg-green-600" />
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {server.onlineCount || 0}/{server.maxOnline || 0}
              </p>
            </div>
          ) : (
            <p className="flex flex-row gap-2 mb-5">
              {'Офлайн'}
              <span className="block w-4 h-4 mt-1 circle pulse bg-red-600" />
            </p>
          )}

          <p className="text-slate-600 dark:text-slate-400 inline-block truncate w-0 min-w-full text-right">
            {server.version}
          </p>
          <div className="flex flex-row gap-2 drop-shadow-md">
            {server.telegram && (
              <div className="w-10 h-10 flex flex-col ">
                <a
                  href={'https://t.me/' + server.telegram}
                  target="blank"
                  className="transition ease-in-out delay-50 rounded-lg bg-zinc-200 h-14 flex justify-center items-center hover:bg-zinc-400 "
                >
                  <Image
                    width={32}
                    height={32}
                    className="w-6 h-6"
                    src="/img/telegram.svg"
                    alt=""
                  />
                </a>
              </div>
            )}
            {server.discord && (
              <div className="w-10 h-10 flex flex-col ">
                <a
                  href={server.discord}
                  target="blank"
                  className="transition ease-in-out delay-50 rounded-lg bg-zinc-200 h-14 flex justify-center items-center hover:bg-zinc-400 "
                >
                  <Image
                    width={32}
                    height={32}
                    className="w-6 h-6"
                    src="/img/discord.svg"
                    alt=""
                  />
                </a>
              </div>
            )}
            <div className="w-10 h-10 flex flex-col ">
              <a
                href="#"
                target=""
                className="transition ease-in-out delay-50 rounded-lg bg-zinc-200 h-14 flex justify-center items-center hover:bg-zinc-400 "
              >
                <Image
                  width={32}
                  height={32}
                  className="w-6 h-6"
                  src="/img/info.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <HighchartsReact
          options={config}
          highcharts={Highcharts}
          ref={chartComponentRef}
        />
      </div>

      {isModalActive && (
        <Modal
          handler={setIsModalActive}
          server={{
            id: server.id,
            name: server.name,
            description: server.description,
          }}
        />
      )}
    </div>
  );
};

export default ServerCard;
