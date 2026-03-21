import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    commit: process.env.NEXT_PUBLIC_BUILD_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    buildTime: process.env.BUILD_TIME || 'unknown',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    node: process.version,
  });
}
