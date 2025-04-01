import { NextRequest, NextResponse } from 'next/server';
import API from '@/modules/api';
import { wait } from '@/modules/utils/promise';

export async function GET(request: NextRequest) {
  await wait(250);

  const base = request.nextUrl.searchParams.get('base');
  const quote = request.nextUrl.searchParams.get('quote');
  const prices = await API.getTokensHistoricalPrice();
  const liquidity = await API.getTokensLiquidityDistribution(prices);

  return NextResponse.json({
    base,
    quote,
    prices,
    liquidity,
  });
}
