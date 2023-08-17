import styles from './page.module.scss';
import { Tags } from '@/components/Tags';
import Link from 'next/link';
import grid from '@/app/styles/grid.module.css';
import {
  countLabelSuffix,
  decorateTags,
  getTagsAndRecipes,
  makeImageSrcSet,
  parseSelectedTags,
  QsMap,
} from '@/app/(recipes)/utils';
import { TagsMultiSelect } from '@/components/Tags/TagsMultiSelect';
import { PreparationTime } from '@/components/PreparationTime';
import { VegCount } from '@/components/VegCount';
import { RecipeDecorated } from '@/app/api/api';

interface PageProps {
  searchParams: QsMap;
}

export default async function Home({ searchParams }: PageProps) {
  const selectedTags = parseSelectedTags(searchParams.tags);
  const { tags, recipes } = await getTagsAndRecipes(selectedTags);
  const decoratedTags = decorateTags({ allTags: tags, selectedTags });
  return (
    <main className={grid.gridColumnCenter}>
      <div className={styles.tagWrapper}>
        <TagsMultiSelect tags={decoratedTags} />
      </div>
      <h1 className={styles.resultsCount}>
        {recipes.length}{' '}
        {countLabelSuffix({ count: recipes.length, label: 'recipe' })}
      </h1>
      <div className={styles.list}>
        {recipes.map((recipe: RecipeDecorated) => {
          return (
            <div key={recipe.id} className={styles.item}>
              <h2 className={styles.title}>
                <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </h2>
              <div className={styles.tagsPrepTime}>
                <Tags tags={recipe.tags} />
                <div className={styles.noWrap}>
                  <VegCount count={recipe.vegCount} />
                  <PreparationTime time={recipe.preparationTimeMin} />
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Link href={`/recipes/${recipe.id}`}>
                  <img
                    className={styles.image}
                    src={recipe.images[0].fileName}
                    alt={recipe.title}
                    srcSet={makeImageSrcSet(recipe.images)}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
