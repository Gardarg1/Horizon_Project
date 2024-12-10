import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export interface InputProps {
  label?: string;
  // placeholder: string,
  name: string;
  labelStyle?: string;
  inputStyle?: string;
  errorStyle?: string;
  containerStyle?: string;
  icon?: ReactElement<IconType>;
  formik?: boolean;
}
