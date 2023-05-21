import { recipesData } from '../../../data/recipes';
import { formatIngredient } from './utils';
import { NextResponse } from 'next/server';

import { ingredientsData } from '../../../data/ingredients';
import { Ingredient, IngredientDetails, Recipe } from '@/app/api/api';
import { getVegCountForRecipe } from './utils';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  const found = recipesData.find((recipe: Recipe) => recipe.id === id);
  if (!found) {
    return new Response('Not found', { status: 404 });
  }
  const decoratedMainIngredients = found.ingredients.main.map((ingredient) => {
    const ingredientDetail = ingredientsData.find(
      (ingredientData: IngredientDetails) => ingredientData.id === ingredient.id
    );
    return { ...ingredient, ...ingredientDetail };
  });
  const mainIngredientsList = decoratedMainIngredients.map((ingredient) => {
    return formatIngredient(ingredient);
  });

  const flavourBoosters = found.ingredients.flavourBoosters.map(
    (item) => item.description
  );
  return NextResponse.json({
    ...found,
    vegCount: getVegCountForRecipe(decoratedMainIngredients as Ingredient[]),
    ingredients: { flavourBoosters, main: mainIngredientsList },
  });
}
