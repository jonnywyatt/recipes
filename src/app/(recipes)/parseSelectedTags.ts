export const parseSelectedTags = (tags: string | string[] | undefined) => {
  if (Array.isArray(tags)) {
    return tags;
  }
  if (tags) {
    return [tags];
  }
  return [];
};
