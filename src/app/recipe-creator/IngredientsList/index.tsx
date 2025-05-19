import forms from '@/app/styles/forms.module.css';
import { List } from '@/components/List';
import { IconLeaf } from '@/images/icons/IconLeaf';
import {
  AddIngredient,
  IngredientPostData,
} from '@/app/recipe-creator/ChooseIngredient';
import { useEffect, useState } from 'react';
import { IconDelete } from '@/images/icons/IconDelete';
import { Ingredient } from '@prisma/client';
import { IngredientDetails } from '@/app/api/api.d';

interface Props {
  onIngredientAdded: (data: IngredientPostData) => void;
  onIngredientDeleted: (ingredientId: number) => void;
  availableIngredients: Ingredient[];
  selectedIngredients: IngredientDetails[];
}
export const IngredientsList = ({
  onIngredientAdded,
  onIngredientDeleted,
  availableIngredients,
  selectedIngredients,
}: Props) => {
  const [showAddIngredient, setShowAddIngredient] = useState(false);

  const [filteredAvailableIngredients, setFilteredAvailableIngredients] =
    useState(availableIngredients);

  useEffect(() => {
    if (!availableIngredients) return;
    const filtered = availableIngredients.filter((ingredient) => {
      return !selectedIngredients.find(
        ({ ingredientId }) => ingredientId === ingredient.id
      );
    });
    setFilteredAvailableIngredients(filtered);
  }, [selectedIngredients, availableIngredients]);

  return (
    <div className={forms.fieldGroup}>
      <h2 className={forms.subHeading}>Ingredients</h2>
      {selectedIngredients.length ? (
        <div className={'marginBottom4'}>
          <List
            // @ts-ignore
            list={selectedIngredients}
            renderItem={({
              ingredientId,
              label,
              foodGroup,
              quantityMin,
              quantityMax,
              servingUnit,
            }) => {
              return (
                <div className={'flexVerticalCenter flexGap4Units'}>
                  <span className={'flexVerticalCenter flexGap1Unit'}>
                    {label}
                    {foodGroup?.countsAsPlant ? (
                      <IconLeaf width={18} height={18} />
                    ) : null}{' '}
                  </span>
                  <span>
                    {quantityMin}
                    {quantityMax ? `-${quantityMax}` : ''}{' '}
                    {servingUnit?.label || ''}
                  </span>
                  <button
                    className={`buttonIcon textSecondary`}
                    type={'button'}
                    onClick={() => onIngredientDeleted(ingredientId)}
                  >
                    <IconDelete width={18} height={18} />
                    <span className={'visuallyHidden'}>Delete</span>
                  </button>
                </div>
              );
            }}
          />
        </div>
      ) : null}
      {showAddIngredient ? null : (
        <div>
          <button
            className={'buttonLink'}
            type={'button'}
            onClick={() => setShowAddIngredient(!showAddIngredient)}
          >
            Add ingredients
          </button>
        </div>
      )}
      {filteredAvailableIngredients && showAddIngredient ? (
        <AddIngredient
          onAdded={onIngredientAdded}
          ingredients={filteredAvailableIngredients}
        />
      ) : null}
    </div>
  );
};
