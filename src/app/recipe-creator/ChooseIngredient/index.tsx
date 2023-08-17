import { useRef, useEffect, useState } from 'react';
import forms from '@/app/styles/forms.module.scss';
import flex from '@/app/styles/flex.module.scss';
import { IngredientDetails } from '@/app/api/api';

export interface IngredientPostData {
  ingredientId: number;
  quantityMin: number;
  quantityMax: number;
}
export const AddIngredient = ({
  ingredients,
  onAdded,
}: {
  ingredients: IngredientDetails[];
  onAdded: (data: IngredientPostData) => void;
}) => {
  const [ingredientId, setIngredientId] = useState(
    ingredients[0].id.toString()
  );
  const [quantityMin, setQuantityMin] = useState('');
  const [quantityMax, setQuantityMax] = useState('');
  const currentIngredient = ingredients.find(
    ({ id }) => id.toString() === ingredientId
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef?.current?.focus();
  }, [selectRef]);

  useEffect(() => {
    setIngredientId(ingredients[0].id.toString());
  }, [ingredients]);
  const onAddClicked = () => {
    onAdded({
      ingredientId: parseInt(ingredientId, 10),
      quantityMin: parseFloat(quantityMin),
      quantityMax: parseFloat(quantityMax),
    });
    setQuantityMin('');
    setQuantityMax('');
    selectRef?.current?.focus();
  };

  return (
    <div className={`${flex.flexVerticalEnd} ${flex.flexGap4Units}`}>
      <div>
        <label className={forms.label} htmlFor={'add-ingredient-list'}>
          Ingredient
        </label>
        <select
          ref={selectRef}
          className={forms.select}
          id={'add-ingredient-list'}
          onChange={(e) => setIngredientId(e.target.value)}
          value={ingredientId}
        >
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.label}
            </option>
          ))}
        </select>
      </div>
      <div className={flex.flexAlignSelfStretch}>
        <div className={forms.label}>Unit</div>
        <div className={forms.input}>
          {currentIngredient?.servingUnit?.label || 'None'}
        </div>
      </div>
      <div>
        <label className={forms.label} htmlFor={'add-ingredient-min-quantity'}>
          Min
        </label>
        <input
          name={'quantityMin'}
          className={forms.input}
          id={'add-ingredient-min-quantity'}
          type={'text'}
          size={4}
          onChange={(e) => setQuantityMin(e.target.value)}
          value={quantityMin}
        />
      </div>
      <div>
        <label className={forms.label} htmlFor={'add-ingredient-max-quantity'}>
          Max
        </label>
        <input
          name={'quantityMax'}
          className={forms.input}
          id={'add-ingredient-max-quantity'}
          type={'text'}
          size={4}
          onChange={(e) => setQuantityMax(e.target.value)}
          value={quantityMax}
        />
      </div>
      <button
        className={forms.buttonInline}
        type="button"
        onClick={onAddClicked}
      >
        Add
      </button>
    </div>
  );
};
