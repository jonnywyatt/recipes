import styles from './styles.module.scss';
export const PreparationTime = ({ time }: { time: number }) => {
  return (
    <div className={styles.wrapper}>
      <img src="/icons/alarm.svg" alt="Alarm clock icon" />
      <span className={styles.time}>{time} min</span>
    </div>
  );
};
