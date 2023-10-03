import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={'gridColumnCenter'}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
}
