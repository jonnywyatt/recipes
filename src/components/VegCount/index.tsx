import styles from './styles.module.scss';
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
        {count}
        {isLarge ? ' plant ingredients' : ''}
      </span>
    </div>
  );
};
