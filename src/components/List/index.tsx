import { ReactFCWithChildren } from '@/react';
import styles from './styles.module.scss';
import { Ingredient } from '@/app/api/api';

interface Props {
  list: Ingredient[];
  renderItem: (item: Ingredient) => JSX.Element;
}

export const List: ReactFCWithChildren<Props> = ({ list, renderItem }) => {
  if (!list) return <></>;
  return (
    <ol className={styles.list}>
      {list.map((item) => (
        <li className={styles.listItem} key={item.id}>
          {renderItem(item)}
        </li>
      ))}
    </ol>
  );
};
