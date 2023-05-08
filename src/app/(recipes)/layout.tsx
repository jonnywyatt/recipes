import { getData } from '@/app/utils/getData';
import { Tags } from '@/components/Tags';
import spacing from '@/app/styles/spacing.module.css';
import grid from '@/app/styles/grid.module.css';

export default async function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getData('/api/tags');
  return (
    <main className={grid.gridColumnCenter}>
      <div className={spacing.marginBottom4}>
        <Tags tags={tags} />
      </div>
      {children}
    </main>
  );
}
