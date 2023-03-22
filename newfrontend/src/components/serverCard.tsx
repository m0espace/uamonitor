import { useEffect, useState, useRef } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import { Options as HighChartsOptions } from 'highcharts';

import { GraphServer, GraphPointData } from '@/interfaces';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const ServerCard = () => {
  const [theme, setTheme] = useState('dark');
  const [graph, setGraph] = useState<GraphServer[]>([]);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://stats.m0e.space/api/graph', {
        mode: 'cors',
      });
      const data = await response.json();
      console.log(data);
      setGraph(data);
    }
    fetchData();
  }, []);

  const config: HighChartsOptions = {
    credits: undefined,
    exporting: {
      enabled: false,
    },
    chart: {
      //styledMode: true,
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
        // fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    series: [
      {
        type: 'area',
        data: graph[0]?.data
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
    <div>
      <HighchartsReact
        options={config}
        highcharts={Highcharts}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default ServerCard;
