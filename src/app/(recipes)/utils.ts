import qs from 'qs';
import { Api, DecoratedTag } from '@/app/api/api';
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
    href: '/',
  }));

export const getRecipes = async (selectedTags: string[]) => {
  const url = selectedTags.length
    ? `/api/recipes?tags=${selectedTags.join(',')}`
    : '/api/recipes';
  return getData(url);
};

export type QsMap = Record<string, string | string[] | undefined>;

export const makeQueryString = ({
  tags,
  val,
}: {
  tags: DecoratedTag[];
  val: string;
}) => {
  const updatedTags = tags.map((tag) => {
    if (tag.id === val) {
      return {
        ...tag,
        isSelected: !tag.isSelected,
      };
    }
    return tag;
  });
  const selectedTags = updatedTags
    .filter((tag) => tag.isSelected)
    .map((tag) => tag.id);
  const queryString = qs.stringify(
    { tags: selectedTags },
    { arrayFormat: 'repeat' }
  );
  return queryString ? `?${queryString}` : '/';
};
