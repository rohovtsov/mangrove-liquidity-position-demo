'use client';
import styles from '@/app/add-liquidity/page.module.scss';
import TokenPairForm from '@/modules/liquidity/ui/token-pair-form/token-pair-form.component';
import PriceChart from '@/modules/liquidity/ui/price-chart/price-chart.component';
import Background from '@/modules/ui/background/background.component';
import { Token } from '@/modules/api/entities';
import { useAddLiquidityState } from '@/modules/liquidity/state/state';
import SubmitPopup from '@/modules/liquidity/ui/submit-popup/submit-popup.component';

interface Props {
  tokens: Token[];
}

export default function AddLiquidityClient({ tokens }: Props) {
  const { prices, liquidity, ...state } = useAddLiquidityState(tokens);

  if (!prices || !liquidity) {
    return null;
  }

  return (
    <div className={`${styles.page} slide-animation`}>
      <div className="container">
        <h1>Liquidity Position</h1>
        <div className={styles['islands-wrap']}>
          <div className={`${styles['island']} ${styles['island-pair']}`}>
            <TokenPairForm {...state} tokens={tokens} />
          </div>
          <div className={`${styles['island']} ${styles['island-chart']}`}>
            {prices && liquidity && <PriceChart prices={prices} liquidity={liquidity} {...state} />}
          </div>
        </div>
      </div>
      <Background variant="mild-fancy"/>
      <SubmitPopup {...state} />
    </div>
  );
}
