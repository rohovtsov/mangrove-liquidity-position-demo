import style from './style.module.scss';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
}

export default function Liane({ className }: Props) {
  return (
    <div className={`${style['liane']} ${className}`}>
      <svg viewBox="0 0 670 2850" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className={style['liane-p1']} style={{ '--len': 2991 } as CSSProperties}
          d="M615.5 0V22.5C615.5 93.5 413 124.5 413 376C413 551.2 413 730.667 413 798.5C413 1034 288.5 1074 288.5 1378.5C288.5 1618.5 288.5 1820.5 288.5 1891.5C288.5 2215.5 524.5 2222 524.5 2604.5C524.5 2604.5 525.667 2800.83 524.5 2850"
          stroke="#03614B" strokeWidth="4.5"/>
        <path
          className={style['liane-p2']} style={{ '--len': 421 } as CSSProperties}
          d="M184.5 0V55C184.5 82 211.1 138.6 283.5 203C347 259.483 372.5 325 382.5 356.5" stroke="#03614B"
          strokeWidth="4.5"/>
        <path
          className={style['liane-p3']} style={{ '--len': 846 } as CSSProperties}
          d="M671.5 453L593.5 531C562.5 562 517 649.5 517 783.5C517 917.5 517 1150.67 517 1250.5" stroke="#06302B"
          strokeWidth="4.5"/>
        <path
          className={style['liane-p4']} style={{ '--len': 1002 } as CSSProperties}
          d="M247.5 0V810.5C247.5 861.5 260 914.9 306 990.5" stroke="#17866C"
          strokeWidth="4.5"/>
        <path
          className={style['liane-p5']} style={{ '--len': 630 } as CSSProperties}
          d="M566.5 0V630" stroke="#0B453A"
          strokeWidth="4.5"/>
      </svg>
    </div>
  )
}
