export interface Token {
  address: string;
  decimals: number;
  symbol: string;
  icon: string;
}

export interface TokenPrice {
  price: number;
  timestamp: number;
}
