import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

import {
  Container,
  BasicInput,
  MaskedInput,
  Label,
  InputError,
} from "./styles";

interface Props {
  mask?: any[];
  onBlurWatcher?: (
    e: React.FocusEvent<HTMLInputElement>,
    error: string | undefined
  ) => void;
}

const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({
  placeholder,
  mask = false,
  onBlurWatcher,
  ...props
}) => {
  const [field, meta] = useField(props.id as string);

  const inputProps: Record<any, any> = {
    ...props,
    ...field,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      field.onBlur(e);
      if (onBlurWatcher) onBlurWatcher(e, meta.error);
    },
  };

  if (mask) inputProps.mask = mask;

  return (
    <Container>
      <Label htmlFor={props.id}>{placeholder}</Label>
      {mask ? <MaskedInput {...inputProps} /> : <BasicInput {...inputProps} />}
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </Container>
  );
};

export default Input;
