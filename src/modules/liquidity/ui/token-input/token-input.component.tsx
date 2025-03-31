'use client';
import style from './style.module.scss';
import { Token } from '@/modules/api/entities';
import { bigintToString, stringToBigint } from '@/modules/utils/decimals';
import { ChangeEvent, useEffect, useState } from 'react';
import TokenSelect from '@/modules/liquidity/ui/token-select/token-select.component';

interface Props {
  label: string;
  selectedToken: Token;
  setSelectedToken: (token: Token) => void;
  value: bigint;
  onChange: (value: bigint) => void;
  tokens: Token[];
}

export default function TokenInput({value, label, onChange, selectedToken, setSelectedToken, tokens}: Props) {
  const [inputValue, setInputValue] = useState(bigintToString(value, selectedToken.decimals));

  useEffect(() => {
    setInputValue(bigintToString(value, selectedToken.decimals));
  }, [value, selectedToken]);

  const handleInputBlur = () => {
    setInputValue(bigintToString(stringToBigint(inputValue, selectedToken.decimals), selectedToken.decimals));
    onChange(stringToBigint(inputValue, selectedToken.decimals));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/^0+(?!\.|$)/, '');
    if (/^\d*(\.?\d*)?$/.test(input) || input === '0.') {
      setInputValue(input);

      if (input === bigintToString(stringToBigint(input, selectedToken.decimals), selectedToken.decimals)) {
        onChange(stringToBigint(input, selectedToken.decimals));
      }
    }
  };

  const handleSelectChange = (newToken: Token) => {
    const newValue = stringToBigint(bigintToString(value, selectedToken.decimals), newToken.decimals);
    setSelectedToken(newToken);
    onChange(newValue);
  }

  return (
    <label className={style['token-input']}>
      <div className={style['token-input-inner']}>
        <span className={style['token-input-label']}>{label}</span>
        <input
          type="text"
          value={inputValue === '0' ? '' : inputValue}
          placeholder={'0'}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
      <TokenSelect value={selectedToken} onChange={handleSelectChange} tokens={tokens}/>
    </label>
  );
}
