import styles from './styles.module.scss';
import Link from 'next/link';
import buttonsLinks from '@/app/styles/buttonsLinks.module.scss';

import { IconLeaf } from '@/images/icons/IconLeaf';
export const VegCount = ({
  count,
  isLarge,
}: {
  count: number;
  isLarge?: boolean;
}) => {
  return (
    <div className={`${styles.wrapper} ${isLarge ? styles.wrapperLarge : ''}`}>
      <IconLeaf width={isLarge ? 20 : 18} height={isLarge ? 20 : 18} />
      <span className={styles.label}>
        {count}{' '}
        <Link
          title="Click for more info on what counts as a plant"
          className={buttonsLinks.infoLink}
          href="/plants"
        >
          plants
        </Link>
      </span>
    </div>
  );
};
