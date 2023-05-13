import styles from './page.module.scss';
import { getData } from '@/app/utils/getData';
import { Tags } from '@/components/Tags';
import Link from 'next/link';
import grid from '@/app/styles/grid.module.css';
import { Api } from '@/app/api/api';
import { parseSelectedTags } from '@/app/(recipes)/parseSelectedTags';

export const dynamic = 'force-dynamic';
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function Home({ searchParams }: PageProps) {
  const allTags = await getData('/api/tags');
  const selectedTags = parseSelectedTags(searchParams.tags);
  const url = selectedTags.length
    ? `/api/recipes?tags=${selectedTags.join(',')}`
    : '/api/recipes';
  const decoratedTags = allTags.map((tag: Api.Tag) => ({
    ...tag,
    isSelected: selectedTags.includes(tag.id),
  }));
  const recipes = await getData(url);
  return (
    <main className={grid.gridColumnCenter}>
      <div className={styles.tagWrapper}>
        <Tags tags={decoratedTags} />
      </div>
      <div className={styles.list}>
        {
          // @ts-ignore
          recipes.map((recipe) => {
            return (
              <div key={recipe.id} className={styles.item}>
                <h2 className={styles.title}>{recipe.title}</h2>
                <Tags tags={recipe.tags} />
                <div className={styles.imageWrapper}>
                  <Link href={`/recipes/${recipe.id}`}>
                    <img
                      className={styles.image}
                      src={recipe.src}
                      alt={recipe.title}
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
