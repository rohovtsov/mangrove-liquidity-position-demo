import styles from "./page.module.scss";
import TokenPairForm from '@/modules/liquidity/ui/token-pair-form/token-pair-form.component';

export default function AddLiquidity() {
  return (
    <div className={`${styles.page} slide-animation`}>
      <div className="container">
        <h1>Add Liquidity Position</h1>
        <TokenPairForm />
        <div style={{ background: "green" }}>
          <p>Select Range</p>
        </div>
        <div style={{ background: "blue" }}>
          <p>Select Amounts</p>
        </div>
      </div>
    </div>
  );
}
