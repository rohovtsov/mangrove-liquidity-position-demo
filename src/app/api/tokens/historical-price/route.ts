import { NextResponse } from 'next/server';
import API from '@/modules/api';

export async function GET() {
  return NextResponse.json({
    prices: await API.getTokensHistoricalPrice()
  });
}
