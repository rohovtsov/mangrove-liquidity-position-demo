import style from "./page.module.scss";
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component';
import Icon from '@/modules/ui/icon/icon.component';
import { randomStr } from '@/modules/utils/random';

export default function Home() {
  return (
    <div className={`${style.page} slide-animation`}>
      <div className="container">
        <h1>Create your concentrated liquidity</h1>
        <PrettyButton href="/add-liquidity">
          Create Liquidity Position
          <span className="pretty-button-icon postfix"><Icon name="add" source="material"/></span>
        </PrettyButton>
        <PrettyButton href={`/not-found-${randomStr(10)}`} variant="secondary">
          Check out 404
          <span className="pretty-button-icon postfix"><Icon name="search" source="material"/></span>
        </PrettyButton>
      </div>
    </div>
  );
}
