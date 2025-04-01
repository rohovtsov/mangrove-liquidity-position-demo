import { useState } from 'react';
import { LiquidityEntry, TokenPrice } from '@/modules/api/entities';
import { clamp } from '@/modules/utils/math';

export interface MinMaxState {
  min: number;
  max: number;
  rangeMin: number;
  rangeMax: number;
  absoluteMax: number;
  absoluteMin: number;
  liquidityScale: number;
}

export type SetMinMaxStateFn = (partial: Partial<MinMaxState>) => void;

export function useMinMaxState(): [MinMaxState, SetMinMaxStateFn] {
  const [state, setState] = useState<MinMaxState>({ min: 0, max: 0, rangeMin: 0, rangeMax: 0, absoluteMax: 0, absoluteMin: 0, liquidityScale: 0 });
  const setPartialState = (partial: Partial<MinMaxState>) => setState(prev => ({ ...prev, ...partial }));

  return [state, setPartialState];
}

export function initMinMaxState(prices: TokenPrice[], liquidity: LiquidityEntry[]): MinMaxState {
  const minPrice = prices.reduce((min, price) => Math.min(min, price.price), Infinity);
  const maxPrice = prices.reduce((max, price) => Math.max(max, price.price), -Infinity);
  const currentPrice = prices[prices.length - 1].price;
  const absoluteMax = liquidity[liquidity.length - 1].price - 1;
  const absoluteMin = 0;
  const liquidityScale = (liquidity?.[1]?.price ?? 1) - (liquidity?.[0]?.price ?? 0);

  const min = Math.max(currentPrice - (maxPrice - minPrice), absoluteMin);
  const max = Math.min(currentPrice + (maxPrice - minPrice), absoluteMax);

  const rangeMin = currentPrice - (currentPrice - min) * 0.66;
  const rangeMax = currentPrice + (max - currentPrice) * 0.66;

  return {
    min,
    max,
    rangeMin,
    rangeMax,
    absoluteMin,
    absoluteMax,
    liquidityScale,
  };
}

export function applyRangeMinMaxChange(change: 'min' | 'max', value: number, oldMinMax: MinMaxState): Partial<MinMaxState> {
  let newRange = 0;
  let centerRange = 0;

  if (change === 'max') {
    value = clamp(value, oldMinMax.rangeMin + 1, oldMinMax.absoluteMax);
    newRange = (value - oldMinMax.rangeMin);
    centerRange = (oldMinMax.rangeMin + value) / 2;
  } else if (change === 'min') {
    value = clamp(value, oldMinMax.absoluteMin, oldMinMax.rangeMax - 1);
    newRange = (oldMinMax.rangeMax - value);
    centerRange = (oldMinMax.rangeMax + value) / 2;
  }

  const newMax = Math.min(centerRange + newRange / 0.66 / 2, oldMinMax.absoluteMax);
  const newMin = Math.max(centerRange - newRange / 0.66 / 2, oldMinMax.absoluteMin);

  if (change === 'max') {
    return { min: newMin, max: newMax, rangeMax: value };
  } else if (change === 'min') {
    return { min: newMin, max: newMax, rangeMin: value };
  }

  throw new Error('Invalid Change');
}
