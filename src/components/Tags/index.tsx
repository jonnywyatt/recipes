import styles from './Tags.module.css';
import React from 'react';
import { Tag } from '@/components/Tag';
import { DecoratedTag } from '@/app/api/api';
export const Tags: React.FC<{ tags: DecoratedTag[] }> = ({ tags }) => {
  return (
    <div className={styles.Tags}>
      {tags.map((props: DecoratedTag) => (
        <Tag key={props.id} {...props} href={`/?tags=${props.id}`} />
      ))}
    </div>
  );
};
