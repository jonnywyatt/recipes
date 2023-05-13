import { recipesData } from '../../data/recipes';
import { Recipe } from '@/app/api/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagIds = searchParams && searchParams.get('tags');
  const filtered = tagIds
    ? recipesData.filter((recipe: Recipe) =>
        recipe.tags.some(({ id }) => tagIds.includes(id))
      )
    : recipesData;
  return NextResponse.json(filtered);
}
