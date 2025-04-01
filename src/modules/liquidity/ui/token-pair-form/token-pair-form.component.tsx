'use client';
import style from './style.module.scss';
import TokenInput from '@/modules/liquidity/ui/token-input/token-input.component';
import { Token } from '@/modules/api/entities';
import { useState } from 'react';
import OffersNumberInput from '@/modules/liquidity/ui/offers-number-input/offers-number-input.component';
import NumberInput from '@/modules/liquidity/ui/number-input/number-input.component';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';
import Icon from '@/modules/ui/icon/icon.component';

interface Props {
  tokens: Token[];
}

export default function TokenPairForm({ tokens }: Props) {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [value, setValue] = useState<bigint>(0n);

  return (
    <div className={style['pair-form']}>
      <div className={style['input']}>
        <TokenInput label="Base Deposit" value={value} selectedToken={selectedToken} setSelectedToken={setSelectedToken} onChange={setValue} tokens={tokens} />
        <OffersNumberInput label="Num of Asks" value={0} onChange={() => {}} />
      </div>
      <div className={style['input']}>
        <TokenInput label="Quote Deposit" value={value} selectedToken={selectedToken} setSelectedToken={setSelectedToken} onChange={setValue} tokens={tokens} />
        <OffersNumberInput label="Num of Bids" value={0} onChange={() => {}} />
      </div>
      <div className={style['inputs-wrap']}>
        <NumberInput label="Min Price" value={0} onChange={() => {}} />
        <NumberInput label="Max Price" value={0} onChange={() => {}} />
      </div>
      <PrettyButton size={'large'}>
        Create Position
        <span className="pretty-button-icon postfix"><Icon name="arrow_forward" source="material"/></span>
      </PrettyButton>
    </div>
  );
}
