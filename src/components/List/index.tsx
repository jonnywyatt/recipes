import { ReactFCWithChildren } from '@/react';
import styles from './styles.module.scss';

interface Props {
  list: string[];
}

export const List: ReactFCWithChildren<Props> = ({ list }) => {
  if (!list) return <></>;
  return (
    <ol className={styles.list}>
      {list.map((item) => (
        <li
          className={styles.listItem}
          key={item.substring(0, 20).toLowerCase()}
        >
          {item}
        </li>
      ))}
    </ol>
  );
};
