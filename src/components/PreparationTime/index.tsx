import styles from './styles.module.scss';
import { IconAlarm } from '@/images/icons/IconAlarm';
export const PreparationTime = ({
  time,
  isLarge,
}: {
  time: number;
  isLarge?: boolean;
}) => {
  return (
    <div className={`${styles.wrapper} ${isLarge ? styles.wrapperLarge : ''}`}>
      <IconAlarm width={isLarge ? 20 : 16} height={isLarge ? 20 : 16} />
      <span className={styles.label}>{time}m</span>
    </div>
  );
};
