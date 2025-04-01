import API from '@/modules/api';
import AddLiquidityClient from '@/app/add-liquidity/page.client';

export default async function AddLiquidity() {
  const tokens = await API.getTokens();

  return <AddLiquidityClient tokens={tokens} />;
}
