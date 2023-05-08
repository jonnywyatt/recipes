import styles from './Tags.module.css';
import React from 'react';
import { Tag } from '@/components/Tag';
import { Api } from '@/app/api/api';
export const Tags: React.FC<{ tags: Api.Tag[] }> = ({ tags }) => {
  return (
    <div className={styles.Tags}>
      {tags.map(({ id, label }: Api.Tag) => (
        <Tag key={id} id={id}>
          {label}
        </Tag>
      ))}
    </div>
  );
};
