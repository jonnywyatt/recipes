import grid from '@/app/styles/grid.module.css';
import styles from './page.module.scss';
import buttonsLinks from '@/app/styles/buttonsLinks.module.scss';

export default async function PlantsInfo() {
  return (
    <main className={grid.gridColumnCenter}>
      <h1 className={styles.heading}>What counts as a plant ingredient?</h1>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={'/images/spices.jpg'}
            alt={'Spices'}
          />
        </div>
        <div className={styles.textBlock}>
          <p>We all know that eating plants is good for us.</p>
          <p>
            However, it seems that eating a large <strong>variety</strong> of
            plant foods is even better. Eating many different plant foods
            improves our gut health by encouraging the growth of different
            species of bacteria that live there, especially the healthy,
            beneficial (good) bacteria.
          </p>
          <p>
            The{' '}
            <a
              className={buttonsLinks.textLink}
              href={'https://joinzoe.com/learn/30-plants-per-week#what-counts?'}
            >
              recommendation by the Zoe project
            </a>{' '}
            is to eat at least 30 different plant-based foods per week.
          </p>
          <p>
            But it&apos;s not as daunting as it sounds - a wide range of foods
            count as plant-based including grains, nuts, seeds, herbs, and
            spices.
          </p>
          <p>
            Portion size doesn&apos;t really matter; it&apos;s the variety of
            different plant-based foods in your diet, that matters. A pinch of
            dried herbs counts the same as a plateful of salad.
          </p>
          <p>
            The Zoe project website has more details on{' '}
            <a
              className={buttonsLinks.textLink}
              href={'https://joinzoe.com/learn/30-plants-per-week#what-counts?'}
            >
              the foods that count towards your 30 plants per week target
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
