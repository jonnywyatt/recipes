import styles from './Tag.module.css';
import React from 'react';
import Link from 'next/link';
import { DecoratedTag } from '@/app/api/api.d';

export const Tag: React.FC<DecoratedTag> = ({ isSelected, label, href }) => {
  return (
    <Link
      className={`${styles.Tag} ${isSelected ? styles.isSelected : ''}`}
      href={href}
    >
      {label}
    </Link>
  );
};
