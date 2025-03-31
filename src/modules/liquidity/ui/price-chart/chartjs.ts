import Chart from 'chart.js/auto';
import { TokenPrice } from '@/modules/api/entities';

const backgroundGradientColor = ({ chart }: { chart: Chart }) => {
  const gradient = chart.ctx.createLinearGradient(
    0, 0, 0, chart.height
  );

  gradient.addColorStop(0, 'rgba(0, 191, 88, 0.35)');
  gradient.addColorStop(0.5, 'rgba(0, 191, 88, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 191, 88, 0.03)');

  return gradient;
};

export function registerChartJsTokenPrices(prices: TokenPrice[], canvas: HTMLCanvasElement): Chart {
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: prices.map(price => new Date(price.timestamp).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
      })),
      datasets: [
        {
          pointStyle: 'circle',
          data: prices.map(price => price.price),
          borderColor: '#00BF58',
          backgroundColor: backgroundGradientColor,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 5,
            maxRotation: 0,
            minRotation: 0,
            color: '#7bafb8',
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#7bafb8',
            callback: (value) => (value as number).toFixed(0).padStart(6, ' '),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    },
  });
}

export function registerChartJsLiquidityDistribution(prices: TokenPrice[], canvas: HTMLCanvasElement): Chart {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: prices.map(price => new Date(price.timestamp).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
      })),
      datasets: [
        {
          pointStyle: 'circle',
          data: prices.map(price => price.price),
          borderColor: '#00BF58',
          backgroundColor: backgroundGradientColor,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 1,
            maxRotation: 0,
            minRotation: 0,
            color: 'transparent',
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          offset: false,
        },
      },
    },
  });
}

export function updateChartMinMaxY(chart: Chart, min: number, max: number) {
  chart.options.scales = {
    ...chart.options.scales,
    y: {
      ...chart.options.scales?.y,
      min,
      max,
    },
  };
  chart.update('normal');
}
