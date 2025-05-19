import { NextResponse } from 'next/server';
import { transformRecipe } from '@/app/api/recipes/[id]/utils';
import { prisma } from '@/app/api/prisma';
import { Image, RecipeIngredients } from '@prisma/client';
import { RecipeDecorated } from '@/app/api/api.d';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagIds = searchParams && searchParams.get('tags');
  const recipesData = await prisma.recipe.findMany({
    include: {
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
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  const filtered = tagIds
    ? recipesData.filter((recipe) =>
        recipe.tags.some(({ tagId }) => tagIds.includes(tagId.toString()))
      )
    : recipesData;
  const decorated: RecipeDecorated[] = filtered.map(transformRecipe);
  return NextResponse.json(decorated);
}

export async function POST(request: Request) {
  const { title, preparationTimeMin, tags, ingredients, images, steps } =
    await request.json();
  const recipe = await prisma.recipe.create({
    data: {
      title,
      preparationTimeMin,
      steps,
    },
    select: {
      id: true,
    },
  });

  const imageIds = await Promise.all(
    images.map((image: Image) =>
      prisma.image.create({
        data: image,
        select: {
          id: true,
        },
      })
    )
  );

  await prisma.recipeImages.createMany({
    data: imageIds.map(({ id }) => ({
      imageId: id,
      recipeId: recipe.id,
    })),
  });

  await prisma.recipeIngredients.createMany({
    data: ingredients.map(
      ({ ingredientId, quantityMin, quantityMax }: RecipeIngredients) => ({
        ingredientId,
        quantityMin,
        quantityMax,
        recipeId: recipe.id,
      })
    ),
  });
  await prisma.recipeTags.createMany({
    data: tags.map((tagId: number) => ({
      tagId,
      recipeId: recipe.id,
    })),
  });
  return NextResponse.json({ recipeId: recipe.id });
}
