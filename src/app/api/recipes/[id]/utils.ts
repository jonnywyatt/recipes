import { Ingredient } from '@/app/api/api';

const unitsNoPlural = ['g', 'ml', 'tsp', 'tbsp'];
const pluralise = ({ units, quantity }: any) => {
  if (!units || typeof quantity === 'undefined') return '';
  const isPlural =
    typeof quantity === 'number' ? quantity > 1 : quantity.max > 1;
  if (!isPlural || unitsNoPlural.includes(units.standard))
    return units.standard;
  return units.standardPlural || `${units.standard}s`;
};

const convertToFraction = (decimal: number) => {
  switch (decimal) {
    case 0.25:
      return '1/4';
    case 0.5:
      return '1/2';
    default:
      return decimal;
  }
};
const formatQuantity = ({ quantity }: any) => {
  if (typeof quantity === 'undefined') return '';
  if (typeof quantity === 'number') return convertToFraction(quantity);
  return `${quantity.min}-${quantity.max}`;
};
export const formatIngredient = ({ quantity, units, label }: any) => {
  const formattedQuantity = formatQuantity({ quantity });
  const unit = pluralise({
    units,
    quantity,
  });
  if (unit) {
    return `${label} (${formattedQuantity} ${unit})`;
  }
  return `${formattedQuantity} ${label.toLowerCase()}`;
};
export const getVegCountForRecipe = (ingredients: Ingredient[]) => {
  return ingredients.filter(
    (ingredient) => ingredient.foodGroup?.countsAsPlant === true
  ).length;
};
