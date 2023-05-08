import { recipesData } from './data';
import { formatQuantity } from './utils';
import { NextResponse } from 'next/server';

import { ingredientsData } from './ingredients';
import { IngredientDetails, Recipe } from '@/app/api/api';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  const found = recipesData.find((recipe: Recipe) => recipe.id === id);
  if (!found) {
    return new Response('Not found', { status: 404 });
  }
  const mainIngredients = found.ingredients.main.map((ingredient) => {
    const ingredientDetail = ingredientsData.find(
      (ingredientData: IngredientDetails) => ingredientData.id === ingredient.id
    );
    return formatQuantity({ ...ingredient, ...ingredientDetail });
  });
  const flavourBoosters = found.ingredients.flavourBoosters.map(
    (item) => item.description
  );
  return NextResponse.json({
    ...found,
    ingredients: { flavourBoosters, main: mainIngredients },
  });
}
