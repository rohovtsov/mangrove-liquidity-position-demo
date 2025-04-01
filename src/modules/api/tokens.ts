import { Token } from '@/modules/api/entities';

export async function getTokens(): Promise<Token[]> {
  return [
    {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbol: 'USDC',
      decimals: 6,
      icon: 'https://etherscan.io/token/images/usdc_ofc_32.svg'
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
      decimals: 18,
      icon: 'https://etherscan.io/token/images/weth_28.png?v=2'
    },
    {
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      symbol: 'UNI',
      decimals: 18,
      icon: 'https://etherscan.io/token/images/uniswap_ofc_32.svg'
    },
    {
      address: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
      symbol: 'PEPE',
      decimals: 18,
      icon: 'https://etherscan.io/token/images/pepe_32.svg'
    }
  ]
}
