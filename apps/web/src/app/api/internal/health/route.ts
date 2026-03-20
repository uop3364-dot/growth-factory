import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'growth-factory-web',
    version: '0.1.0',
    sha: process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev',
    timestamp: new Date().toISOString(),
  });
}
