'use client';
import style from './style.module.scss';
import { LiquidityEntry, TokenPrice } from '@/modules/api/entities';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/modules/ui/icon/icon.component';
import {
  registerChartJsLiquidityDistribution,
  registerChartJsTokenPrices,
  updateChartMinMax
} from '@/modules/liquidity/ui/price-chart/chartjs';
import { useChartRange } from '@/modules/liquidity/ui/price-chart/chart-range';
import Chart from 'chart.js/auto';
import { SetMinMaxStateFn, MinMaxState } from '@/modules/liquidity/state/min-max-state';

interface Props {
  prices: TokenPrice[];
  liquidity: LiquidityEntry[];
  minMax: MinMaxState;
  setMinMax: SetMinMaxStateFn;
}

export default function PriceChart({ prices, liquidity, minMax, setMinMax }: Props) {
  const canvasPriceRef = useRef<HTMLCanvasElement | null>(null);
  const canvasLiquidityRef = useRef<HTMLCanvasElement | null>(null);
  const rangeRootRef = useRef<HTMLDivElement | null>(null);
  const [chartPrice, setChartPrice] = useState<Chart | null>(null);
  const [chartLiquidity, setChartLiquidity] = useState<Chart | null>(null);
  const { min, max, rangeMin, rangeMax, currentPrice, grabbing, setGrabbing, locked, liquidityScale } = useChartRange(prices, minMax, setMinMax, rangeRootRef);

  useEffect(() => {
    if (!canvasPriceRef.current || !canvasLiquidityRef.current || !prices.length || !liquidity.length) {
      return;
    }

    const chartPrice = registerChartJsTokenPrices(prices, canvasPriceRef.current);
    const chartLiquidity = registerChartJsLiquidityDistribution(liquidity, canvasLiquidityRef.current);
    setChartPrice(chartPrice);
    setChartLiquidity(chartLiquidity);

    return () => {
      chartPrice.destroy();
      chartLiquidity.destroy();
    };
  }, [prices, liquidity]);

  useEffect(() => {
    if (!chartPrice || !chartLiquidity) {
      return;
    }

    updateChartMinMax('y',chartPrice, min, max);
    updateChartMinMax('y', chartLiquidity, min / liquidityScale, max / liquidityScale);
  }, [min, max, chartPrice, chartLiquidity, liquidityScale]);

  const maxRel = ((rangeMax / currentPrice - 1) * 100).toFixed(2);
  const minRel = ((rangeMin / currentPrice - 1) * 100).toFixed(2);

  const rangeMinRel = (rangeMin - min) / (max - min);
  const rangeMaxRel = (rangeMax - min) / (max - min);

  return (
    <div className={`${style['chart']} ${locked ? style['locked'] : ''}`}>
      <div className={style['price-chart']}>
        <canvas ref={canvasPriceRef}></canvas>
      </div>
      <div className={style['liquidity-chart']}>
        <canvas ref={canvasLiquidityRef}></canvas>
      </div>
      <div ref={rangeRootRef} className={style['chart-range-wrap']}>
        <div
          className={`${style['chart-range']} ${grabbing ? `${style['grabbing']} ${style['grabbing-' + grabbing]}` : ''}`}
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
