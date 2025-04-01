import { NextResponse } from 'next/server';
import API from '@/modules/api';
import { wait } from '@/modules/utils/promise';

export async function GET() {
  await wait(250);

  return NextResponse.json({
    tokens: await API.getTokens()
  });
}
