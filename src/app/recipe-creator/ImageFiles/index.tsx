import forms from '@/app/styles/forms.module.scss';
import flex from '@/app/styles/flex.module.scss';

interface Props {
  filenameSm: string;
  setFilenameSm: (filename: string) => void;
  filenameLg: string;
  setFilenameLg: (filename: string) => void;
  widthSm: string;
  setWidthSm: (widthSm: string) => void;
  widthLg: string;
  setWidthLg: (widthLg: string) => void;
}

export const ImageFiles = ({
  filenameSm,
  setFilenameSm,
  filenameLg,
  setFilenameLg,
  widthSm,
  setWidthSm,
  widthLg,
  setWidthLg,
}: Props) => {
  return (
    <div className={forms.fieldGroup}>
      <h2 className={forms.subHeading}>Images</h2>
      <div
        className={`${flex.flexVerticalEnd} ${flex.flexGap4Units} ${forms.fieldGroup}`}
      >
        <div>
          <label className={forms.label} htmlFor="filename">
            Filename (sm)
          </label>
          <input
            className={forms.input}
            type="text"
            name="filenameSm"
            id="filenameSm"
            value={filenameSm}
            onChange={(e) => setFilenameSm(e.target.value)}
          />
        </div>
        <div>
          <label className={forms.label} htmlFor={'add-image-sm-width'}>
            Width (sm)
          </label>
          <input
            name={'widthSm'}
            className={forms.input}
            id={'add-image-sm-width'}
            type={'text'}
            size={4}
            onChange={(e) => setWidthSm(e.target.value)}
            value={widthSm}
          />
        </div>
      </div>
      <div className={`${flex.flexVerticalEnd} ${flex.flexGap4Units}`}>
        <div>
          <label className={forms.label} htmlFor="filename">
            Filename (lg)
          </label>
          <input
            className={forms.input}
            type="text"
            name="filenameLg"
            id="filenameLg"
            value={filenameLg}
            onChange={(e) => setFilenameLg(e.target.value)}
          />
        </div>
        <div>
          <label className={forms.label} htmlFor={'add-image-lg-width'}>
            Width (lg)
          </label>
          <input
            name={'widthLg'}
            className={forms.input}
            id={'add-image-lg-width'}
            type={'text'}
            size={4}
            onChange={(e) => setWidthLg(e.target.value)}
            value={widthLg}
          />
        </div>
      </div>
    </div>
  );
};
