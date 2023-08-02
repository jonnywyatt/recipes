import { getData } from '@/app/utils/getData';
import styles from './page.module.scss';
import grid from '@/app/styles/grid.module.css';
import flex from '../../styles/flex.module.css';
import { Tags } from '@/components/Tags';
import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs';
import { List } from '@/components/List';
import { PreparationTime } from '@/components/PreparationTime';
import { makeImageSrcSet } from '@/app/(recipes)/utils';
import { IconLeaf } from '@/images/icons/IconLeaf';
import Link from 'next/link';

interface PageProps {
  params: { [key: string]: string | undefined };
}
export default async function Recipe({ params }: PageProps) {
  const recipe = await getData(`/api/recipes/${params.id}`);
  return (
    <>
      <div className={grid.gridColumnCenter}>
        <h1 className={styles.heading}>{recipe.title}</h1>
        <div className={styles.metaDataWrapper}>
          <Tags tags={recipe.tags} />
          <PreparationTime time={recipe.preparationTimeMin} isLarge={true} />
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
              <Tab tab="tab2">Steps</Tab>
            </TabList>
            <TabPanel tab="tab1">
              <div className={styles.listHeading}>
                <div>
                  <IconLeaf width={20} height={20} />
                  <span className={styles.label}>
                    {recipe.vegCount} plant-based ingredients (
                    <Link
                      title="Click for more info on what counts as a plant"
                      className={'infoLink'}
                      href="/plants"
                    >
                      more info
                    </Link>
                    )
                  </span>
                </div>
              </div>
              <List
                list={recipe.ingredients}
                renderItem={(item) => (
                  <div
                    className={`${flex.flexVerticalCenter} ${flex.flexGap1Unit}`}
                  >
                    {item.label}
                    {item.foodGroup?.countsAsPlant ? (
                      <IconLeaf width={18} height={18} />
                    ) : null}
                  </div>
                )}
              />
            </TabPanel>
            <TabPanel tab="tab2">
              <List list={recipe.steps} renderItem={(item) => <>{item}</>} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
