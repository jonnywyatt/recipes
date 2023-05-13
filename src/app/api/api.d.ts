namespace Api {
  interface Tag {
    id: string;
    label: string;
  }
}

export interface DecoratedTag extends Api.Tag {
  isSelected: boolean;
  href: string;
}

export interface Recipe {
  id: string;
  title: string;
  src: string;
  tags: Tag[];
  ingredients: {
    main: Ingredient[];
    flavourBoosters: any[];
  };
}

interface Ingredient {
  id: string;
}

export interface IngredientDetails {
  id: string;
  label: string;
  units?: {
    standard: string;
    standardPlural?: string;
  };
}
