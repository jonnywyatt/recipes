import Image from 'next/image';
import styles from './page.module.scss';
import { getData } from '@/app/utils/getData';
import { Tags } from '@/components/Tags';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default async function Home({ searchParams }: PageProps) {
  const url = searchParams?.tags
    ? `/api/recipes?tag=${searchParams.tags}`
    : '/api/recipes';
  const recipes = await getData(url);
  return (
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
  );
}
