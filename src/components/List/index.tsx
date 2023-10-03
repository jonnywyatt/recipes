import { ReactFCWithChildren } from '@/react';
import styles from './styles.module.css';

import { IngredientDetails } from '@/app/api/api';

interface Props {
  list: IngredientDetails[];
  renderItem: (item: IngredientDetails) => JSX.Element;
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
