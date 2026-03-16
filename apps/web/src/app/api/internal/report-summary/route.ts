import { NextResponse } from 'next/server';
import { buildSummaryReport } from '@/lib/internal-api';

export async function GET() {
  return NextResponse.json(buildSummaryReport());
}
