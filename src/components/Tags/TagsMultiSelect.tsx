import styles from './Tags.module.scss';
import React from 'react';
import { Tag } from '@/components/Tag';
import { DecoratedTag } from '@/app/api/api';
import { makeQueryString } from '@/app/(recipes)/utils';
export const TagsMultiSelect: React.FC<{
  tags: DecoratedTag[];
}> = ({ tags }) => {
  return (
    <div className={styles.Tags}>
      {tags.map(({ id, label, isSelected }: DecoratedTag) => {
        const href = makeQueryString({ tags, val: id });

        return (
          <Tag
            key={id}
            href={href}
            id={id}
            label={label}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};
