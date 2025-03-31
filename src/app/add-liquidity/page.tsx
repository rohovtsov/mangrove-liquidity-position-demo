import styles from "./page.module.scss";
import TokenPairForm from '@/modules/liquidity/ui/token-pair-form/token-pair-form.component';
import API from '@/modules/api';
import PriceChart from '@/modules/liquidity/ui/price-chart/price-chart.component';

export default async function AddLiquidity() {
  const tokens = await API.getTokens();
  const prices = await API.getTokensHistoricalPrice();

  return (
    <div className={`${styles.page} slide-animation`}>
      <div className="container">
        <h1>Add Liquidity Position</h1>
        <TokenPairForm tokens={tokens} />
        <PriceChart prices={prices} />
      </div>
    </div>
  );
}
