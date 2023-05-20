import { recipesData } from '../../data/recipes';
import { Ingredient, IngredientDetails, Recipe } from '@/app/api/api';
import { NextResponse } from 'next/server';
import { ingredientsData } from '@/app/data/ingredients';
import { getVegCountForRecipe } from '@/app/api/recipes/[id]/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagIds = searchParams && searchParams.get('tags');
  const filtered = tagIds
    ? recipesData.filter((recipe: Recipe) =>
        recipe.tags.some(({ id }) => tagIds.includes(id))
      )
    : recipesData;
  const decorated = filtered.map((recipe: Recipe) => {
    const mainIngredients = recipe.ingredients.main.map((ingredient) => {
      const data = ingredientsData.find(
        (ingredientData: IngredientDetails) =>
          ingredientData.id === ingredient.id
      );
      return { ...ingredient, ...data };
    });
    return {
      ...recipe,
      vegCount: getVegCountForRecipe(mainIngredients as Ingredient[]),
      ingredients: { ...recipe.ingredients, main: mainIngredients },
    };
  });
  return NextResponse.json(decorated);
}
