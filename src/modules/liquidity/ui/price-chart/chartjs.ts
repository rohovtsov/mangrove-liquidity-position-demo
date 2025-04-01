import Chart from 'chart.js/auto';
import { LiquidityEntry, TokenPrice } from '@/modules/api/entities';

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
      layout: {
        autoPadding: false,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    },
  });
}

export function registerChartJsLiquidityDistribution(liquidity: LiquidityEntry[], canvas: HTMLCanvasElement): Chart {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: liquidity.map(item => item.price),
      datasets: [
        {
          pointStyle: 'circle',
          data: liquidity.map(item => item.liquidity),
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
            maxTicksLimit: 5,
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
          reverse: true,
        },
      },
      layout: {
        autoPadding: false,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    },
  });
}

export function updateChartMinMax(target: 'x' | 'y', chart: Chart, min: number, max: number) {
  try {
    chart.options.scales = {
      ...chart.options.scales,
      [target]: {
        ...chart.options.scales?.[target],
        min,
        max,
      },
    };
    chart.update();
  } catch {}
}
