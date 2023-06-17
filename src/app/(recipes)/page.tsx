import styles from './page.module.scss';
import { getData } from '@/app/utils/getData';
import { Tags } from '@/components/Tags';
import Link from 'next/link';
import grid from '@/app/styles/grid.module.css';
import {
  countLabelSuffix,
  decorateTags,
  getRecipes,
  makeImageSrcSet,
  parseSelectedTags,
  QsMap,
} from '@/app/(recipes)/utils';
import { TagsMultiSelect } from '@/components/Tags/TagsMultiSelect';
import { PreparationTime } from '@/components/PreparationTime';
import { VegCount } from '@/components/VegCount';

export const dynamic = 'force-dynamic';
interface PageProps {
  searchParams: QsMap;
}

export default async function Home({ searchParams }: PageProps) {
  const selectedTags = parseSelectedTags(searchParams.tags);
  const allTags = await getData('/api/tags');
  const recipes = await getRecipes(selectedTags);
  const decoratedTags = decorateTags({ allTags, selectedTags });
  return (
    <main className={grid.gridColumnCenter}>
      <div className={styles.tagWrapper}>
        <TagsMultiSelect tags={decoratedTags} />
      </div>
      <div className={styles.resultsCount}>
        {recipes.length}{' '}
        {countLabelSuffix({ count: recipes.length, label: 'recipe' })}
      </div>
      <div className={styles.list}>
        {
          // @ts-ignore
          recipes.map((recipe) => {
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
                      src={recipe.src}
                      alt={recipe.title}
                      srcSet={makeImageSrcSet(recipe.images)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </Link>
                </div>
              </div>
            );
          })
        }
      </div>
    </main>
  );
}
