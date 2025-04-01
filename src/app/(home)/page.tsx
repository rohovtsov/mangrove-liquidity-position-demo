import style from "./page.module.scss";
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';
import Icon from '@/modules/ui/icon/icon.component';
import { randomStr } from '@/modules/utils/random';
import Background from '@/modules/ui/background/background.component';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={`${style.page} slide-animation`}>
      <div className="container">
        <div className={style['page-inner']}>
          <h1>Concentrated Liquidity<br/>Reinvented.</h1>
          <p>Deploy capital efficiently, automate strategies, and maximize yields with every position. Smarter liquidity management means higher returns with less effort.</p>
          <div className={style['buttons-wrap']}>
            <PrettyButton href="/add-liquidity" size="large">
              Launch App
              <span className="pretty-button-icon postfix"><Icon name="arrow_forward" source="material"/></span>
            </PrettyButton>
            <PrettyButton href={`/not-found-${randomStr(10)}`} size="large" variant="secondary">
              Check out 404
              <span className="pretty-button-icon postfix"><Icon name="search" source="material"/></span>
            </PrettyButton>
          </div>
          <div className={style['screenshot']}>
            <Image src={'/assets/example.png'} alt={'Screenshot'} width={2166} height={840} />
          </div>
        </div>
      </div>
      <Background variant="full-fancy"/>
    </div>
  );
}
