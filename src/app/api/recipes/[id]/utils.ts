const pluralise = ({ units, quantity }) => {
  if (!units) return '';
  const isPlural =
    typeof quantity === 'number' ? quantity > 1 : quantity.max > 1;
  if (!isPlural) return units.standard;
  return units.standardPlural || `${units.standard}s`;
};
export const formatQuantity = ({ quantity, units, label }: any) => {
  const formattedQuantity =
    typeof quantity === 'number' ? quantity : `${quantity.min}-${quantity.max}`;

  const unit = pluralise({
    units,
    quantity,
  });
  if (unit) {
    return `${label} (${formattedQuantity} ${unit})`;
  }
  return `${formattedQuantity} ${label.toLowerCase()}`;
};
