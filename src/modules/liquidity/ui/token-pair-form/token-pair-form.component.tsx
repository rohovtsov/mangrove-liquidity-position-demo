import style from './style.module.scss';
import TokenInput from '@/modules/liquidity/ui/token-input/token-input.component';

export default function TokenPairForm() {
  return (
    <>
      <TokenInput />
      <TokenInput />
    </>
  );
}
