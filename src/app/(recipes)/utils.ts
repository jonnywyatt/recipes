import { Api } from '@/app/api/api';
import Tag = Api.Tag;
import { getData } from '@/app/utils/getData';

export const parseSelectedTags = (tags: string | string[] | undefined) => {
  if (Array.isArray(tags)) {
    return tags;
  }
  if (tags) {
    return [tags];
  }
  return [];
};

export const decorateTags = ({
  allTags,
  selectedTags,
}: {
  allTags: Tag[];
  selectedTags: string[];
}) =>
  allTags.map((tag: Api.Tag) => ({
    ...tag,
    isSelected: selectedTags.includes(tag.id),
  }));

export const getRecipes = async (selectedTags: string[]) => {
  const url = selectedTags.length
    ? `/api/recipes?tags=${selectedTags.join(',')}`
    : '/api/recipes';
  return getData(url);
};
