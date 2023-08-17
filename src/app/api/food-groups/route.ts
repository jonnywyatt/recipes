import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/prisma';

export async function GET(req: NextRequest) {
  const data = await prisma.foodGroup.findMany({
    orderBy: [
      {
        category: 'asc',
      },
    ],
  });
  return NextResponse.json(data);
}
