'use client';

import { IngredientPostData } from './ChooseIngredient';
import grid from '@/app/styles/grid.module.css';
import { FormEvent, useState } from 'react';
import forms from '@/app/styles/forms.module.scss';
import spacing from '@/app/styles/spacing.module.scss';
import { fetchHelper } from '@/app/utils/fetchHelper';
import { IngredientsList } from '@/app/recipe-creator/IngredientsList';
import { useClientDataOnMount } from '@/app/utils/useFetchHelper';
import { IngredientDetails, IngredientWithFoodGroup } from '@/app/api/api';
import { Tag } from '@prisma/client';
import { TagsList } from '@/app/recipe-creator/Tags';
import { ImageFiles } from '@/app/recipe-creator/ImageFiles';
import { AddSteps } from '@/app/recipe-creator/AddSteps';

export default function Ingredients() {
  const [title, setTitle] = useState('');
  const [preparationTimeMin, setPreparationTimeMin] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientDetails[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [imageFilenameSm, setImageFilenameSm] = useState('');
  const [imageFilenameLg, setImageFilenameLg] = useState('');
  const [imageWidthSm, setImageWidthSm] = useState('');
  const [imageWidthLg, setImageWidthLg] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [recipeId, setRecipeId] = useState<number | undefined>();

  const { data: availableIngredients } =
    useClientDataOnMount<IngredientWithFoodGroup[]>('/api/ingredients');
  const { data: availableTags } = useClientDataOnMount<Tag[]>('/api/tags');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetchHelper('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({
        title,
        preparationTimeMin: parseInt(preparationTimeMin, 10),
        ingredients: selectedIngredients.map(
          ({ ingredientId, quantityMin, quantityMax }) => ({
            ingredientId,
            quantityMin,
            quantityMax,
          })
        ),
        tags: selectedTags,
        images: [
          {
            fileName: imageFilenameSm,
            width: parseInt(imageWidthSm, 10),
          },
          {
            fileName: imageFilenameLg,
            width: parseInt(imageWidthLg, 10),
          },
        ],
        steps,
      }),
    });
    if (response.recipeId) {
      setRecipeId(response.recipeId);
    }
  };

  const onIngredientAdded = (data: IngredientPostData) => {
    if (
      !selectedIngredients.find(
        ({ ingredientId }) => ingredientId === data.ingredientId
      )
    ) {
      const detail = availableIngredients.find(
        ({ id }) => data.ingredientId === id
      );
      // @ts-ignore
      setSelectedIngredients([...selectedIngredients, { ...detail, ...data }]);
    }
  };

  const onIngredientDeleted = (ingredientId: number) => {
    setSelectedIngredients(
      selectedIngredients.filter(({ ingredientId: id }) => id !== ingredientId)
    );
  };

  const onTagSelected = (tagId: number) => {
    if (!selectedTags.find((id) => id === tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    }
  };

  const onStepsChange = (steps: string[]) => {
    setSteps(steps);
  };

  return (
    <main className={grid.gridColumnCenter}>
      <div className={forms.contentWrapper}>
        <h1 className={forms.heading}>Add a recipe</h1>
        {recipeId && (
          <div className={spacing.marginBottom6}>
            Recipe created. <a href={`/recipes/${recipeId}`}>View</a>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={forms.fieldGroup}>
            <label className={forms.label} htmlFor="title">
              Title
            </label>
            <input
              className={forms.inputLarge}
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={forms.fieldGroup}>
            <label className={forms.label} htmlFor="preparationTimeMin">
              Preparation time (minutes)
            </label>
            <input
              className={forms.input}
              type="number"
              name="preparationTimeMin"
              id="preparationTimeMin"
              value={preparationTimeMin}
              onChange={(e) => setPreparationTimeMin(e.target.value)}
            />
          </div>
          <TagsList
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagSelected={onTagSelected}
          />
          <ImageFiles
            filenameSm={imageFilenameSm}
            setFilenameSm={setImageFilenameSm}
            filenameLg={imageFilenameLg}
            setFilenameLg={setImageFilenameLg}
            widthSm={imageWidthSm}
            setWidthSm={setImageWidthSm}
            widthLg={imageWidthLg}
            setWidthLg={setImageWidthLg}
          />
          <IngredientsList
            onIngredientAdded={onIngredientAdded}
            onIngredientDeleted={onIngredientDeleted}
            selectedIngredients={selectedIngredients}
            availableIngredients={availableIngredients}
          />
          <AddSteps steps={steps} onChange={onStepsChange} />
          <button className={forms.buttonPrimary} type="submit">
            Save
          </button>
        </form>
      </div>
    </main>
  );
}
