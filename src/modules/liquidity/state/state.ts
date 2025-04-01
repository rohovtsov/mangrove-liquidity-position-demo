import { Token } from '@/modules/api/entities';
import { useTokenPairState } from '@/modules/liquidity/state/token-pair-state';
import { useCallback, useState } from 'react';
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
  submitData: object | null;
  handleSubmit: () => void;
  clearSubmit: () => void;
} & ChartStateResult;

export function useAddLiquidityState(tokens: Token[]): Result {
  const [baseToken, quoteToken, setBaseToken, setQuoteToken] = useTokenPairState(tokens);
  const [nAsk, setNAsk] = useState<number>(5);
  const [nBid, setNBid] = useState<number>(5);
  const [baseAmount, setBaseAmount] = useState<bigint>(10n ** BigInt(baseToken.decimals));
  const [quoteAmount, setQuoteAmount] = useState<bigint>(10n ** BigInt(quoteToken.decimals));
  const chartState = useChartState(baseToken, quoteToken);
  const [submitData, setSubmitData] = useState<object | null>(null);

  const handleSubmit = useCallback(() => {
    setSubmitData({
      baseToken: baseToken.address,
      quoteToken: quoteToken.address,
      baseTokenDecimals: baseToken.decimals,
      quoteTokenDecimals: quoteToken.decimals,
      baseTokenSymbol: baseToken.symbol,
      quoteTokenSymbol: quoteToken.symbol,
      nAsk,
      nBid,
      baseAmount,
      quoteAmount,
      min: chartState.minMax.rangeMin,
      max: chartState.minMax.rangeMax
    });
  }, [baseToken, quoteToken, nAsk, nBid, baseAmount, quoteAmount, chartState.minMax]);

  const clearSubmit = useCallback(() => {
    setSubmitData(null);
  }, []);

  return { baseToken, quoteToken, setBaseToken, setQuoteToken, nAsk, nBid, setNAsk, setNBid, quoteAmount, baseAmount, setQuoteAmount, setBaseAmount, submitData, clearSubmit, handleSubmit, ...chartState };
}
