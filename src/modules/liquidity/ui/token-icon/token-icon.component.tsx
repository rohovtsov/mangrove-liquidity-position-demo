'use client';
import style from './style.module.scss';
import { Token } from '@/modules/api/entities';
import Image from 'next/image';

interface Props {
  token: Token;
}

export default function TokenIcon({ token }: Props) {
  return (
    <div className={style['token-icon']}>
      <Image src={token.icon} alt={token.symbol} width={64} height={64} />
    </div>
  );
}
