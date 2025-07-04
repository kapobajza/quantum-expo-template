import React, { ChangeEvent } from 'react';
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
  useController,
} from 'react-hook-form';

import { TextInput, TextInputProps } from './TextInput';

export interface ControlInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends TextInputProps {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: TName;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  label?: string;
}

export const ControlInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  defaultValue,
  label,
  ...props
}: ControlInputProps<TFieldValues, TName, TTransformedValues>) => {
  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control: control as never,
    defaultValue,
  });

  const handleChangeText = (text: string) => {
    field.onChange(text as PathValue<TFieldValues, TName> | ChangeEvent);
  };

  const handleBlur = () => {
    field.onBlur();
  };

  return (
    <TextInput
      {...props}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      value={field.value}
      error={fieldState.error?.message}
      label={label}
    />
  );
};
