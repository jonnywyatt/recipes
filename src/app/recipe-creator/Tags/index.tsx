import forms from '@/app/styles/forms.module.scss';
import flex from '@/app/styles/flex.module.scss';
import spacing from '@/app/styles/spacing.module.scss';
import { Tag } from '@prisma/client';

interface Props {
  availableTags: Tag[];
  selectedTags: number[];
  onTagSelected: (tagId: number) => void;
}
export const TagsList = ({
  availableTags,
  selectedTags,
  onTagSelected,
}: Props) => {
  return (
    <fieldset className={forms.fieldGroup}>
      <legend className={forms.subHeading}>Tags</legend>
      {availableTags?.length &&
        availableTags.map(({ id, label }) => {
          return (
            <div
              key={id}
              className={`${flex.flexVerticalCenter} ${flex.flexGap2Units} ${spacing.marginBottom2}`}
            >
              <input
                id={id.toString()}
                type="checkbox"
                onClick={() => onTagSelected(id)}
                checked={selectedTags.includes(id)}
              />
              <label htmlFor={id.toString()}>{label}</label>
            </div>
          );
        })}
    </fieldset>
  );
};
