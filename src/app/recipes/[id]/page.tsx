import { getData } from '@/app/utils/getData';
import styles from './page.module.scss';
import grid from '@/app/styles/grid.module.css';
import flex from '@/app/styles/flex.module.css';
import spacing from '../../styles/spacing.module.css';
import { Tags } from '@/components/Tags';
import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs';
import { List } from '@/components/List';
import { PreparationTime } from '@/components/PreparationTime';
import { makeImageSrcSet } from '@/app/(recipes)/utils';

export const dynamic = 'force-dynamic';
interface PageProps {
  params: { [key: string]: string | undefined };
}
export default async function Recipe({ params }: PageProps) {
  const recipe = await getData(`/api/recipes/${params.id}`);
  return (
    <>
      <div className={grid.gridColumnCenter}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={spacing.marginBottom3}>
          <Tags tags={recipe.tags} />
        </div>
      </div>
      <div className={`${grid.fullBleed} ${styles.contentWrapper}`}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={recipe.src}
              alt={recipe.title}
              srcSet={makeImageSrcSet(recipe.images)}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className={styles.content}>
          <Tabs defaultSelectedTab="tab1">
            <TabList aria-label="jser tabs">
              <Tab tab="tab1">Ingredients</Tab>
              <Tab tab="tab2">Method</Tab>
            </TabList>
            <TabPanel tab="tab1">
              <List list={recipe.ingredients.main} />
            </TabPanel>
            <TabPanel tab="tab2">
              <div className={spacing.marginBottom5}>
                <PreparationTime time={recipe.preparationTimeMin} />
              </div>
              <List list={recipe.steps} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
