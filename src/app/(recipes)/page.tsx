import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import grid from '@/app/styles/grid.module.css';
import { getData } from '@/app/utils/getData';
import { gfsDidot } from '@/app/utils/fonts';
import { Tags } from '@/components/Tags';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
              <h2 className={`${gfsDidot.className} ${styles.title}`}>
                {recipe.title}
              </h2>
              <Tags tags={recipe.tags} />
              <div className={styles.image}>
                <Link href={`/recipes/${recipe.id}`}>
                  <Image
                    src={recipe.src}
                    alt={recipe.title}
                    fill={true}
                    style={{ objectFit: 'cover' }}
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
