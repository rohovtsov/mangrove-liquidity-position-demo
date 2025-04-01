import styles from "./page.module.scss";
import TokenPairForm from '@/modules/liquidity/ui/token-pair-form/token-pair-form.component';
import API from '@/modules/api';
import PriceChart from '@/modules/liquidity/ui/price-chart/price-chart.component';

export default async function AddLiquidity() {
  const tokens = await API.getTokens();
  const prices = await API.getTokensHistoricalPrice();
  const liquidity = await API.getTokensLiquidityDistribution(prices);

  return (
    <div className={`${styles.page} slide-animation`}>
      <div className="container">
        <h1>Create Liquidity Position</h1>
        <div className={styles['islands-wrap']}>
          <div className={`${styles['island']} ${styles['island-pair']}`}>
            <TokenPairForm tokens={tokens} />
          </div>
          <div className={`${styles['island']} ${styles['island-chart']}`}>
            <PriceChart prices={prices} liquidity={liquidity} />
          </div>
        </div>
      </div>
    </div>
  );
}
