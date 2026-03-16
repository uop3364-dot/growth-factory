import { NextResponse } from 'next/server';
import { buildGenerationReport } from '@/lib/internal-api';

export async function POST() {
  return NextResponse.json(buildGenerationReport());
}
