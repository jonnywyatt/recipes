import styles from './Tag.module.css';
import React from 'react';
import { ReactFCWithChildren } from '@/react';
import Link from 'next/link';

interface Props {
  id: string;
}
export const Tag: ReactFCWithChildren<Props> = ({ children, id }) => {
  return (
    <Link className={styles.Tag} href={`?tags=${id}`}>
      {children}
    </Link>
  );
};
