'use client';

import grid from '@/app/styles/grid.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import forms from '@/app/styles/forms.module.scss';
import { fetchHelper } from '@/app/utils/fetchHelper';
import { useClientDataOnMount } from '@/app/utils/useFetchHelper';
import { IngredientDetails, IngredientWithFoodGroup } from '@/app/api/api';
import { FoodGroup, ServingUnit } from '@prisma/client';
import flex from '@/app/styles/flex.module.scss';

export default function NewIngredients() {
  const [foodGroupId, setFoodGroupId] = useState('');
  const [servingUnitId, setServingUnitId] = useState('');
  const [label, setLabel] = useState('');
  const [ingredients, setIngredients] = useState<IngredientDetails>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: availableIngredients } =
    useClientDataOnMount<IngredientWithFoodGroup[]>('/api/ingredients');
  const { data: foodGroups } =
    useClientDataOnMount<FoodGroup[]>('/api/food-groups');
  const { data: servingUnits } =
    useClientDataOnMount<ServingUnit[]>('/api/serving-units');

  useEffect(() => {
    availableIngredients && setIngredients([...availableIngredients]);
  }, [availableIngredients]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ingredient = await fetchHelper('/api/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        label,
        foodGroupId: parseInt(foodGroupId, 10),
        servingUnitId: servingUnitId ? parseInt(servingUnitId, 10) : undefined,
      }),
    });
    setLabel('');
    setFoodGroupId('');
    setServingUnitId('');
    inputRef?.current?.focus();
    const ingredients = await fetchHelper('/api/ingredients');
    setIngredients(ingredients);
  };

  return (
    <main className={grid.gridColumnCenter}>
      <div className={forms.contentWrapper}>
        <h1 className={forms.heading}>Add ingredients</h1>
        <form onSubmit={handleSubmit}>
          <div
            className={`${flex.flexVerticalEnd} ${flex.flexGap4Units} ${forms.fieldGroup}`}
          >
            <div>
              <label className={forms.label} htmlFor={'new-ingredient-label'}>
                Name
              </label>
              <input
                ref={inputRef}
                name={'label'}
                className={forms.input}
                id={'new-ingredient-label'}
                type={'text'}
                onChange={(e) => setLabel(e.target.value)}
                value={label}
              />
            </div>
            <div>
              <label className={forms.label} htmlFor={'new-ingredient-unit'}>
                Unit
              </label>
              <select
                className={forms.select}
                id={'new-ingredient-unit'}
                onChange={(e) => setServingUnitId(e.target.value)}
                value={servingUnitId}
              >
                <option>Select</option>
                {servingUnits?.length &&
                  servingUnits.map((servingUnit) => (
                    <option key={servingUnit.id} value={servingUnit.id}>
                      {servingUnit.label}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                className={forms.label}
                htmlFor={'add-ingredient-food-group'}
              >
                Food group
              </label>
              <select
                className={forms.select}
                id={'add-ingredient-food-group'}
                onChange={(e) => setFoodGroupId(e.target.value)}
                value={foodGroupId}
              >
                <option>Select</option>
                {foodGroups?.length &&
                  foodGroups.map((foodGroup) => (
                    <option key={foodGroup.id} value={foodGroup.id}>
                      {foodGroup.category}
                    </option>
                  ))}
              </select>
            </div>

            <button className={forms.buttonInline}>Add</button>
          </div>
        </form>
        <table className={forms.table}>
          <caption>{ingredients.length} ingredients</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Food group</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.map((ingredient: IngredientDetails) => (
              <tr key={ingredient.id}>
                <td>{ingredient.label}</td>
                <td>{ingredient.foodGroup?.category}</td>
                <td>{ingredient.servingUnit?.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
