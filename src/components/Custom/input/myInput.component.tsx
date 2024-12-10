import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import { InputProps } from './myInput.props';

export const MyInput = ({
  label,
  inputStyle,
  containerStyle,
  labelStyle,
  errorStyle,
  icon,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label ? (
        <label className="mr-2 flex w-full flex-row text-lg font-bold">
          <span className="text-main w-32">{label}</span>
          <input {...field} {...props} className={labelStyle} autoComplete="off" />
        </label>
      ) : (
        <div
          className={
            containerStyle +
            ' ' +
            `flex w-full items-center rounded-lg border-2 border-white bg-third px-2 py-1 focus:border-first`
          }
        >
          {icon}
          <input
            {...field}
            {...props}
            className={
              inputStyle +
              ' ' +
              `w-full rounded-lg bg-transparent text-white outline-none placeholder:font-normal placeholder:text-white`
            }
            autoComplete="off"
          />
        </div>
      )}
      <div className={errorStyle}>
        {meta.error && meta.touched && <div className={`my-1 text-first`}>{meta.error}</div>}
      </div>
    </>
  );
};
