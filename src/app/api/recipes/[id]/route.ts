import { formatIngredient, transformRecipe } from './utils';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/api/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  let found = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
      images: {
        include: {
          image: true,
        },
      },
      ingredients: {
        include: {
          ingredient: {
            include: {
              foodGroup: true,
            },
          },
        },
      },
    },
  });
  if (!found) {
    return new Response('Not found', { status: 404 });
  }
  found = transformRecipe(found);
  const mainIngredientsList = found?.ingredients.map((ingredient) => {
    return { ...ingredient, label: formatIngredient(ingredient) };
  });
  return NextResponse.json({
    ...found,
    ingredients: mainIngredientsList,
  });
}
