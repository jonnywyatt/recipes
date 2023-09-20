import grid from '@/app/styles/grid.module.scss';
import { inspect } from 'util';
import styles from './page.module.scss';

export default function Loading() {
  return (
    <div className={grid.gridColumnCenter}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
}
