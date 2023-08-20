import grid from '@/app/styles/grid.module.css';
import styles from './page.module.scss';
import buttonsLinks from '@/app/styles/buttonsLinks.module.scss';

export default async function PlantsInfo() {
  return (
    <main className={grid.gridColumnCenter}>
      <h1 className={styles.heading}>What counts as a plant ingredient?</h1>
      <div className={styles.textBlock}>
        <p>It’s not just fruits and veggies that count.</p>
        <p>You can include grains, nuts, seeds, herbs, and spices, too</p>
        <p>
          The Zoe project website has more details on{' '}
          <a
            className={buttonsLinks.textLink}
            href={'https://joinzoe.com/learn/30-plants-per-week#what-counts?'}
          >
            what counts as a plant
          </a>
          .
        </p>
      </div>
    </main>
  );
}
