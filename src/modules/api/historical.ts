import { TokenPrice } from '@/modules/api/entities';

export async function getTokensHistoricalPrice(): Promise<TokenPrice[]> {
  const date = Date.now();
  const prices: TokenPrice[] = [];
  let price = Math.random() * 1500;

  for (let i = 0; i < 365; i++) {
    const timestamp = date - (i * 24 * 60 * 60 * 1000);

    const sign = Math.random() > 0.95 ? 1 : -1;
    const magnitude = Math.random() > 0.75 ? 2 : 1;
    price += sign * Math.random() * (10 ^ magnitude);
    price = Math.max(price, 100);

    prices.push({
      timestamp,
      price
    });
  }

  return prices;
}
