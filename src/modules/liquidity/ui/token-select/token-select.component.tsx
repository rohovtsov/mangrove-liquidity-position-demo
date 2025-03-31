'use client';
import style from './style.module.scss';
import { Token } from '@/modules/api/entities';
import TokenIcon from '@/modules/liquidity/ui/token-icon/token-icon.component';
import Icon from '@/modules/ui/icon/icon.component';
import { useEffect, useRef, useState } from 'react';
import { hasParentElement } from '@/modules/utils/dom';

interface Props {
  value: Token;
  onChange: (token: Token) => void;
  tokens: Token[];
}

export default function TokenSelect({value, onChange, tokens}: Props) {
  const [expanded, setExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target !== selectRef.current && !hasParentElement(target, selectRef.current!)) {
        setExpanded(false);
      }
    };

    window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div ref={selectRef} className={`${style['select']} ${expanded ? style['expanded'] : ''}`} onClick={(e) => e.preventDefault()}>
      <div className={style['select-title']} onClick={() => setExpanded(!expanded)}>
        <div className={style['select-title-inner']}>
          <TokenIcon token={value}/>
          {value.symbol}
        </div>
        <Icon className={style['select-arrow']} name="keyboard_arrow_down" source="material" />
      </div>

      <div className={style['select-dropdown']}>
        <ul>
          {tokens.map((token) => {
            return (
              <li key={token.address}>
                <button onClick={() => {
                  onChange(token);
                  setExpanded(false);
                }}>
                  <TokenIcon token={token}/>
                  {token.symbol}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
