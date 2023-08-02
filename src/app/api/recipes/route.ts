import { NextResponse } from 'next/server';
import { transformRecipe } from '@/app/api/recipes/[id]/utils';
import { prisma } from '@/app/api/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagIds = searchParams && searchParams.get('tags');
  const recipesData = await prisma.recipe.findMany({
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
  const filtered = tagIds
    ? recipesData.filter((recipe) =>
        recipe.tags.some(({ id }) => tagIds.includes(id.toString()))
      )
    : recipesData;
  const decorated = filtered.map(transformRecipe);
  return NextResponse.json(decorated);
}
