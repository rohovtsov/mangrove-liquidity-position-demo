import { Token } from '@/modules/api/entities';
import { useTokenPairState } from '@/modules/liquidity/state/token-pair-state';
import { useState } from 'react';
import { ChartStateResult, useChartState } from '@/modules/liquidity/state/chart-state';

type Result = {
  nAsk: number;
  nBid: number;
  baseToken: Token;
  quoteToken: Token;
  setBaseToken: (token: Token) => void;
  setQuoteToken: (token: Token) => void;
  setNAsk: (n: number) => void;
  setNBid: (n: number) => void;
  baseAmount: bigint;
  quoteAmount: bigint;
  setQuoteAmount: (n: bigint) => void;
  setBaseAmount: (n: bigint) => void;
} & ChartStateResult;

export function useAddLiquidityState(tokens: Token[]): Result {
  const [baseToken, quoteToken, setBaseToken, setQuoteToken] = useTokenPairState(tokens);
  const [nAsk, setNAsk] = useState<number>(5);
  const [nBid, setNBid] = useState<number>(5);
  const [baseAmount, setBaseAmount] = useState<bigint>(10n ** BigInt(baseToken.decimals));
  const [quoteAmount, setQuoteAmount] = useState<bigint>(10n ** BigInt(quoteToken.decimals));
  const chartState = useChartState(baseToken, quoteToken);

  return { baseToken, quoteToken, setBaseToken, setQuoteToken, nAsk, nBid, setNAsk, setNBid, quoteAmount, baseAmount, setQuoteAmount, setBaseAmount, ...chartState };
}
