import { Ingredient } from '@/app/api/api';

const unitNoPlural = ['g', 'ml', 'tsp', 'tbsp'];
const pluralise = ({ unit, quantityMin, quantityMax }: any) => {
  if (!unit || typeof quantityMin === 'undefined') return '';
  const isPlural =
    typeof quantityMin === 'number' ? quantityMin > 1 : quantityMax > 1;
  if (!isPlural || unitNoPlural.includes(unit)) return unit;
  return `${unit}s`;
};

const convertToFraction = (decimal: number) => {
  switch (decimal) {
    case 0.25:
      return '¼';
    case 0.5:
      return '½';
    default:
      return decimal;
  }
};
const formatQuantity = ({ quantityMin, quantityMax }: any) => {
  if (quantityMin === null) return '';
  if (typeof quantityMin === 'number') return convertToFraction(quantityMin);
  return `${quantityMin}-${quantityMax}`;
};
export const formatIngredient = ({
  quantityMin,
  quantityMax,
  unit,
  label,
}: any) => {
  const formattedQuantity = formatQuantity({ quantityMin, quantityMax });
  const units = pluralise({
    unit,
    quantityMin,
    quantityMax,
  });
  if (units) {
    return `${label} (${formattedQuantity} ${units})`;
  }
  return `${formattedQuantity} ${label.toLowerCase()}`;
};
export const getVegCountForRecipe = (ingredients: Ingredient[]) => {
  return ingredients.filter(
    (ingredient) => ingredient.foodGroup?.countsAsPlant === true
  ).length;
};

export const transformRecipe = (recipe: any) => {
  const ingredients = recipe.ingredients.map(
    ({ ingredient, ...rest }: any) => ({
      ...rest,
      ...ingredient,
    })
  );
  const images = recipe.images.map((image: any) => ({
    ...image.image,
  }));
  return {
    ...recipe,
    ingredients,
    images,
    vegCount: getVegCountForRecipe(ingredients),
  };
};
