import { Recipe } from '@prisma/client';
import { IngredientPostData } from '@/app/recipe-creator/AddIngredient';
import { Ingredient } from '@prisma/client';

namespace Api {
  interface Tag {
    id: number;
    label: string;
  }
}

export interface DecoratedTag extends Api.Tag {
  isSelected: boolean;
  href: string;
}

interface Image {
  fileName: string;
  width: number;
}

export interface RecipeDecorated extends Recipe {
  images: Image[];
  tags: Tag[];
  vegCount: number;
  ingredients: IngredientWithFoodGroup[];
}

interface IngredientWithFoodGroup extends Ingredient {
  id: number;
  label: string | null;
  unit: string;
  foodGroup?: {
    category: string;
    countsAsPlant: boolean | null;
  };
  servingUnit?: {
    id: number;
    label: string;
  };
}

export type IngredientDetails = IngredientPostData & IngredientWithFoodGroup;
