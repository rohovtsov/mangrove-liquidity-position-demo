import { getTokens } from '@/modules/api/tokens';
import { getTokensHistoricalPrice, getTokensLiquidityDistribution } from '@/modules/api/price';

const API = {
  getTokens,
  getTokensHistoricalPrice,
  getTokensLiquidityDistribution,
};

export default API;
