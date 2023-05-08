import { getData } from '@/app/utils/getData';
import styles from './recipe.module.scss';
import grid from '@/app/styles/grid.module.css';
import spacing from '../../styles/spacing.module.css';
import colours from '../../styles/colours.module.css';
import Image from 'next/image';
import { Tags } from '@/components/Tags';
import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs';
import { List } from '@/components/List';
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
      <div className={grid.fullBleed}>
        <div
          className={`${spacing.paddingBottom4} ${colours.backgroundSecondary}`}
        >
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={recipe.src} alt={recipe.title} />
          </div>
        </div>
        <Tabs defaultSelectedTab="tab1">
          <TabList aria-label="jser tabs">
            <Tab tab="tab1">Ingredients</Tab>
            <Tab tab="tab2">Method</Tab>
          </TabList>
          <TabPanel tab="tab1">
            <List list={recipe.ingredients.main} />
          </TabPanel>
          <TabPanel tab="tab2">
            <List list={recipe.steps} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
