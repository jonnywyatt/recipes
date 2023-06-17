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

interface Image {
  fileName: string;
  width: number;
}

export interface Recipe {
  id: string;
  title: string;
  images: Image[];
  tags: Tag[];
  vegCount?: number;
  ingredients: {
    main: Ingredient[];
    flavourBoosters: any[];
  };
}

interface Ingredient {
  id: string;
  label?: string;
  foodGroup?: {
    category: 'vegetable' | 'herb' | 'grain' | 'stock';
    countsAsPlant?: boolean;
  };
}

export interface IngredientDetails {
  id: string;
  label: string;
  units?: {
    standard: string;
    standardPlural?: string;
  };
}
