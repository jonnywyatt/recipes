import { NextRequest, NextResponse } from 'next/server';
import { tagsData } from '@/app/data/tags';

export async function GET(req: NextRequest) {
  return NextResponse.json(tagsData);
}
