import { recipesData } from './[id]/data';
import { Recipe } from '@/app/api/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagId = searchParams && searchParams.get('tag');
  const filtered = tagId
    ? recipesData.filter((recipe: Recipe) =>
        recipe.tags.some(({ id }) => id === tagId)
      )
    : recipesData;
  return NextResponse.json(filtered);
}
