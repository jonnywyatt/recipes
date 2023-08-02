import qs from 'qs';
import { Api, DecoratedTag } from '@/app/api/api';
import Tag = Api.Tag;
import { getData } from '@/app/utils/getData';

export const parseSelectedTags = (tags: string | string[] | undefined) => {
  const list = Array.isArray(tags) ? tags : [tags];
  return list
    .filter((tag) => typeof tag !== 'undefined')
    .map((tag) => parseInt(tag as string, 10));
};

export const decorateTags = ({
  allTags,
  selectedTags,
}: {
  allTags: Tag[];
  selectedTags: number[];
}) =>
  allTags.map((tag: Api.Tag) => ({
    ...tag,
    isSelected: selectedTags.includes(tag.id),
    href: '/',
  }));

export const getRecipes = async (selectedTags: number[]) => {
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
  val: number;
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

export const countLabelSuffix = ({
  count,
  label,
}: {
  count: number;
  label: string;
}) => `${label}${count === 1 ? '' : 's'}`;

export const makeImageSrcSet = (
  imageData: { fileName: string; width: number }[]
) => {
  return imageData
    .map(({ fileName, width }) => `/images/${fileName} ${width}w`)
    .join(', ');
};
