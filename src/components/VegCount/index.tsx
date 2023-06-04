import styles from './styles.module.scss';
import Link from 'next/link';
export const VegCount = ({
  count,
  isLarge,
}: {
  count: number;
  isLarge?: boolean;
}) => {
  return (
    <div className={`${styles.wrapper} ${isLarge ? styles.wrapperLarge : ''}`}>
      <img
        src="/icons/leaf.svg"
        alt="Number of plant ingredients"
        width={isLarge ? '20px' : '18px'}
        height={isLarge ? '20px' : '18px'}
      />
      <span className={styles.label}>
        {count}{' '}
        <Link
          title="Click for more info on what counts as a plant"
          className={styles.infoLink}
          href="/plants"
        >
          plants
        </Link>
      </span>
    </div>
  );
};
