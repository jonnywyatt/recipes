import { getData } from '@/app/utils/getData';
import { Tags } from '@/components/Tags';
import spacing from '@/app/styles/spacing.module.css';
import grid from '@/app/styles/grid.module.css';
import styles from './page.module.scss';

export default async function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getData('/api/tags');
  return (
    <main className={grid.gridColumnCenter}>
      <div className={styles.tagWrapper}>
        <Tags tags={tags} />
      </div>
      {children}
    </main>
  );
}
