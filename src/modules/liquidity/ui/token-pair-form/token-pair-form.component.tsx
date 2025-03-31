'use client';
import style from './style.module.scss';
import TokenInput from '@/modules/liquidity/ui/token-input/token-input.component';
import { Token } from '@/modules/api/entities';
import { useState } from 'react';

interface Props {
  tokens: Token[];
}

export default function TokenPairForm({ tokens }: Props) {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [value, setValue] = useState<bigint>(0n);

  return (
    <div className={style['pair-form']}>
      <TokenInput label="Base Deposit" value={value} selectedToken={selectedToken} setSelectedToken={setSelectedToken} onChange={setValue} tokens={tokens} />
      <TokenInput label="Quote Deposit" value={value} selectedToken={selectedToken} setSelectedToken={setSelectedToken} onChange={setValue} tokens={tokens} />
    </div>
  );
}
