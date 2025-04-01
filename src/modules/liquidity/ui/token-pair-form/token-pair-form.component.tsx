'use client';
import style from './style.module.scss';
import TokenInput from '@/modules/liquidity/ui/token-input/token-input.component';
import { Token } from '@/modules/api/entities';
import OffersNumberInput from '@/modules/liquidity/ui/offers-number-input/offers-number-input.component';
import NumberInput from '@/modules/liquidity/ui/number-input/number-input.component';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';
import Icon from '@/modules/ui/icon/icon.component';
import { applyRangeMinMaxChange, MinMaxState, SetMinMaxStateFn } from '@/modules/liquidity/state/min-max-state';

interface Props {
  tokens: Token[];
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
  minMax: MinMaxState;
  setMinMax: SetMinMaxStateFn;
  handleSubmit: () => void;
}

export default function TokenPairForm({ tokens, baseToken, quoteToken, setBaseToken, setQuoteToken, nAsk, nBid, setNBid, setNAsk, quoteAmount, baseAmount, setQuoteAmount, setBaseAmount, minMax, setMinMax, handleSubmit }: Props) {
  return (
    <div className={style['pair-form']}>
      <div className={style['input']}>
        <TokenInput label="Base Deposit" value={baseAmount} selectedToken={baseToken} setSelectedToken={setBaseToken} onChange={setBaseAmount} tokens={tokens} />
        <OffersNumberInput label="Num of Asks" value={nAsk} onChange={setNAsk} />
      </div>
      <div className={style['input']}>
        <TokenInput label="Quote Deposit" value={quoteAmount} selectedToken={quoteToken} setSelectedToken={setQuoteToken} onChange={setQuoteAmount} tokens={tokens} />
        <OffersNumberInput label="Num of Bids" value={nBid} onChange={setNBid} />
      </div>
      <div className={style['inputs-wrap']}>
        <NumberInput label="Min Price" value={Number(minMax.rangeMin.toFixed(2))} onChange={(n) => setMinMax(applyRangeMinMaxChange('min', n, minMax))} />
        <NumberInput label="Max Price" value={Number(minMax.rangeMax.toFixed(2))} onChange={(n) => setMinMax(applyRangeMinMaxChange('max', n, minMax))} />
      </div>
      <PrettyButton size={'large'} onClick={() => handleSubmit()}>
        Create Position
        <span className="pretty-button-icon postfix"><Icon name="arrow_forward" source="material"/></span>
      </PrettyButton>
    </div>
  );
}
