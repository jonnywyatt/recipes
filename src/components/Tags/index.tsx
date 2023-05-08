import styles from './Tags.module.css';
import React from 'react';
import { Tag } from '@/components/Tag';
export const Tags: React.FC<{ tags: Api.Tag[] }> = ({ tags }) => {
  return (
    <div className={styles.Tags}>
      {tags.map(({ id, label }: Api.Tag) => (
        <Tag id={id}>{label}</Tag>
      ))}
    </div>
  );
};
