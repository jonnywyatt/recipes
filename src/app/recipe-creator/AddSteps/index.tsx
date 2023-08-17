import forms from '@/app/styles/forms.module.scss';

interface Props {
  steps: string[];
  onChange: (steps: string[]) => void;
}
export const AddSteps = ({ steps, onChange }: Props) => {
  return (
    <div className={forms.fieldGroup}>
      <label htmlFor={'add-steps'}>
        <h2 className={forms.subHeading}>Steps</h2>
      </label>
      <textarea
        className={forms.textArea}
        id={'add-steps'}
        value={steps.join('\n')}
        rows={15}
        onChange={(e) => onChange(e.target.value.split('\n'))}
      ></textarea>
    </div>
  );
};
