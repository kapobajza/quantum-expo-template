import { FieldValues, UseFormProps as UseRHFormProps } from 'react-hook-form';
import { ZodSchema } from 'zod';

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
  TSchema extends ZodSchema = ZodSchema,
> = UseRHFormProps<TFieldValues, TContext, TTransformedValues> & {
  schema: TSchema;
};
