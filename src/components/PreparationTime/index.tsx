import styles from './styles.module.scss';
export const PreparationTime = ({
  time,
  isLarge,
}: {
  time: number;
  isLarge?: boolean;
}) => {
  return (
    <div className={`${styles.wrapper} ${isLarge ? styles.wrapperLarge : ''}`}>
      <img
        src="/icons/alarm.svg"
        alt="Preparation time"
        width={isLarge ? '20px' : '16px'}
        height={isLarge ? '20px' : '16px'}
      />
      <span className={styles.label}>{time}m</span>
    </div>
  );
};
