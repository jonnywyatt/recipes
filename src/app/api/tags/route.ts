import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/prisma';

export async function GET(req: NextRequest) {
  const tagsData = await prisma.tag.findMany();
  return NextResponse.json(tagsData);
}
