import styles from './Tag.module.scss';
import React from 'react';
import Link from 'next/link';
import { DecoratedTag } from '@/app/api/api';

export const Tag: React.FC<DecoratedTag> = ({ id, isSelected, label }) => {
  return (
    <Link
      className={`${styles.Tag} ${isSelected ? styles.isSelected : ''}`}
      href={isSelected ? '/' : `?tags=${id}`}
    >
      {label}
    </Link>
  );
};
