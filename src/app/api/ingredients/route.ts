import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/prisma';
import { Prisma } from '.prisma/client';
import IngredientCreateInput = Prisma.IngredientCreateInput;

export async function GET(req: NextRequest) {
  const data = await prisma.ingredient.findMany({
    include: {
      foodGroup: true,
      servingUnit: true,
    },
    orderBy: [
      {
        label: 'asc',
      },
    ],
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { label, foodGroupId, servingUnitId } = await request.json();
  const data: IngredientCreateInput = {
    label,
    foodGroup: {
      connect: { id: foodGroupId },
    },
  };
  if (servingUnitId) {
    data.servingUnit = {
      connect: { id: servingUnitId },
    };
  }
  const ingredient = await prisma.ingredient.create({
    data,
    select: {
      id: true,
    },
  });

  return NextResponse.json({ recipeId: ingredient.id });
}
