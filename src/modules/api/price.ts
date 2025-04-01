import { LiquidityEntry, TokenPrice } from '@/modules/api/entities';

export async function getTokensHistoricalPrice(): Promise<TokenPrice[]> {
  const date = Date.now();
  const prices: TokenPrice[] = [];
  let price = 750 + Math.random() * 200;

  for (let i = 0; i < 365; i++) {
    const timestamp = date - (i * 24 * 60 * 60 * 1000);

    const sign = Math.random() > 0.5 ? 1 : -1;
    const magnitude = Math.random() > 0.75 ? 2 : 1;
    price += sign * Math.random() * (10 ^ magnitude);
    price = Math.min(Math.max(price, 100), 2000);

    prices.push({
      timestamp,
      price
    });
  }

  return prices;
}

export async function getTokensLiquidityDistribution(prices: TokenPrice[]): Promise<LiquidityEntry[]> {
  const currentPrice = prices[prices.length - 1].price;
  const liq: LiquidityEntry[] = [];
  let liquidity = 250;

  for (let i = 0; i < 500; i++) {
    const price = i * 10;
    const distance = currentPrice - price;

    const probability = distance > 0 ? 0.35 : 0.65;
    const sign = Math.random() > probability ? 1 : -1;
    const magnitude = Math.random() > 0.5 ? 150 : 75;
    liquidity += sign * Math.random() * magnitude;
    liquidity = Math.min(Math.max(liquidity, 10), 5000);

    liq.push({
      liquidity,
      price
    });
  }

  return liq;
}
