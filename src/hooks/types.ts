import { FieldValues, UseFormProps as UseRHFormProps } from 'react-hook-form';
import { ZodType } from 'zod';

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
  TSchema extends ZodType = ZodType,
> = UseRHFormProps<TFieldValues, TContext, TTransformedValues> & {
  schema: TSchema;
};
