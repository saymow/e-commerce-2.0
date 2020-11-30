import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

import { Container, CustomInput, Label, InputError } from "./styles";

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

  return (
    <Container>
      <Label htmlFor={props.id}>{placeholder}</Label>
      <CustomInput
        {...props}
        {...field}
        mask={mask}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          field.onBlur(e);
          if (onBlurWatcher) onBlurWatcher(e, meta.error);
        }}
      />
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </Container>
  );
};

export default Input;
