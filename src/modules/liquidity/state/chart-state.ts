import { LiquidityEntry, Token, TokenPrice } from '@/modules/api/entities';
import { useEffect, useState } from 'react';
import {
  initMinMaxState,
  MinMaxState,
  SetMinMaxStateFn,
  useMinMaxState
} from '@/modules/liquidity/state/min-max-state';


export interface ChartStateResult {
  prices: TokenPrice[] | null;
  liquidity: LiquidityEntry[] | null;
  minMax: MinMaxState;
  setMinMax: SetMinMaxStateFn;
}

export function useChartState(base: Token, quote: Token): ChartStateResult {
  const [data, setData] = useState<{ prices: TokenPrice[], liquidity: LiquidityEntry[] } | null>(null);
  const [minMax, setMinMax] = useMinMaxState();

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      const data = await fetch(`/api/tokens/price-n-liquidity/?base=${base.address}&quote=${quote.address}`)
        .then(res => res.json());

      if (isCancelled) {
        return;
      }

      setMinMax(initMinMaxState(data.prices, data.liquidity));
      setData(data);
    })();

    return () => {
      isCancelled = true;
    };
  }, [base, quote, setMinMax]);

  return {
    prices: data?.prices ?? null,
    liquidity: data?.liquidity ?? null,
    setMinMax,
    minMax,
  };
}
