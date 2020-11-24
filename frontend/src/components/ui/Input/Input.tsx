import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

import { Container, CustomInput, Label, InputError } from "./styles";

interface Props {
  mask?: any[];
}

const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({
  placeholder,
  mask = false,
  ...props
}) => {
  const [field, meta] = useField(props.id as string);

  return (
    <Container>
      <Label htmlFor={props.id}>{placeholder}</Label>
      <CustomInput {...props} {...field} mask={mask} />
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </Container>
  );
};

export default Input;
