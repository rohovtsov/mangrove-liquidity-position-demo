'use client';
import style from './style.module.scss';
import { TokenPrice } from '@/modules/api/entities';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/modules/ui/icon/icon.component';
import {
  registerChartJsLiquidityDistribution,
  registerChartJsTokenPrices,
  updateChartMinMaxY
} from '@/modules/liquidity/ui/price-chart/chartjs';
import { useRange } from '@/modules/liquidity/ui/price-chart/range';
import Chart from 'chart.js/auto';

interface Props {
  prices: TokenPrice[];
}

export default function PriceChart({prices}: Props) {
  const canvasPriceRef = useRef<HTMLCanvasElement | null>(null);
  const canvasLiquidityRef = useRef<HTMLCanvasElement | null>(null);
  const [chartPrice, setChartPrice] = useState<Chart | null>(null);
  const [chartLiquidity, setChartLiquidity] = useState<Chart | null>(null);
  const { rangeMinRel, rangeMaxRel, min, max, rangeMin, rangeMax, currentPrice, grabbing, setGrabbing } = useRange(prices);

  useEffect(() => {
    if (!canvasPriceRef.current || !canvasLiquidityRef.current || !prices.length) {
      return;
    }

    const chartPrice = registerChartJsTokenPrices(prices, canvasPriceRef.current);
    const chartLiquidity = registerChartJsLiquidityDistribution(prices, canvasLiquidityRef.current);
    setChartPrice(chartPrice);
    setChartLiquidity(chartLiquidity);

    return () => {
      chartPrice.destroy();
      chartLiquidity.destroy();
    };
  }, [prices]);

  useEffect(() => {
    if (!chartPrice || !chartLiquidity) {
      return;
    }

    updateChartMinMaxY(chartPrice, min, max);
    updateChartMinMaxY(chartLiquidity, min, max);
  }, [min, max, chartPrice, chartLiquidity]);

  const maxRel = ((rangeMax / currentPrice - 1) * 100).toFixed(2);
  const minRel = ((rangeMin / currentPrice - 1) * 100).toFixed(2);

  return (
    <div className={style['chart']}>
      <div className={style['price-chart']}>
        <canvas ref={canvasPriceRef}></canvas>
      </div>
      <div className={style['liquidity-chart']}>
        <canvas ref={canvasLiquidityRef}></canvas>
      </div>
      <div className={style['chart-range-wrap']}>
        <div
          className={`${style['chart-range']} ${grabbing ? style['grabbing'] : ''}`}
          style={{ '--min': `${rangeMinRel}`, '--max': `${rangeMaxRel}` } as any}
        >
          <div
            className={`${style['chart-range-toggle']} ${style['max']} ${grabbing === 'max' ? style['grabbing'] : ''}`}
            onMouseDown={() => setGrabbing('max')}
          >
            <Icon name="drag_indicator" source="material" />
            Max {rangeMax.toFixed(2)}, {Number(maxRel) > 0 ? '+' : ''}{maxRel}%
          </div>
          <div
            className={`${style['chart-range-toggle']} ${style['min']} ${grabbing === 'min' ? style['grabbing'] : ''}`}
            onMouseDown={() => setGrabbing('min')}
          >
            <Icon name="drag_indicator" source="material" />
            Min {rangeMin.toFixed(2)}, {Number(minRel) > 0 ? '+' : ''}{minRel}%
          </div>
        </div>
      </div>
    </div>
  );
}
