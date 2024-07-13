import { TextField } from '@material-ui/core';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      inputRef={ref}
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      label={label}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
