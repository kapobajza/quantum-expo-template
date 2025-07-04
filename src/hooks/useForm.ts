import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm as useRHForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';

import { UseFormProps } from './types';

export default function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
  TSchema extends ZodSchema = ZodSchema,
>(props: UseFormProps<TFieldValues, TContext, TTransformedValues, TSchema>) {
  const { schema, ...other } = props;

  return useRHForm<z.input<typeof schema>, TContext, z.output<typeof schema>>({
    ...other,
    resolver: zodResolver(schema),
  });
}
