import { toNestErrors } from '@hookform/resolvers';
import {
  appendErrors,
  FieldError,
  FieldValues,
  Resolver,
  useForm as useRHForm,
} from 'react-hook-form';
import { z, ZodType } from 'zod/v4';
import { $ZodIssue } from 'zod/v4/core';

import { UseFormProps } from './types';

function parseZod4Issues(
  zodErrors: $ZodIssue[],
  validateAllFieldCriteria: boolean,
) {
  const errors: Record<string, FieldError> = {};
  for (; zodErrors.length; ) {
    const error = zodErrors[0];
    const { code, message, path } = error;
    const _path = path.join('.');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!errors[_path]) {
      if (error.code === 'invalid_union' && error.errors.length > 0) {
        const unionError = error.errors[0][0];

        errors[_path] = {
          message: unionError.message,
          type: unionError.code,
        };
      } else {
        errors[_path] = { message, type: code };
      }
    }

    if (error.code === 'invalid_union') {
      error.errors.forEach((unionError) => {
        unionError.forEach((e) => zodErrors.push(e));
      });
    }

    if (validateAllFieldCriteria) {
      const types = errors[_path].types;
      const messages = types?.[error.code];

      errors[_path] = appendErrors(
        _path,
        validateAllFieldCriteria,
        errors,
        code,
        messages
          ? ([] as string[]).concat(messages as string[], error.message)
          : error.message,
      ) as FieldError;
    }

    zodErrors.shift();
  }

  return errors;
}

const resolver = <TInput extends FieldValues, TContext, TOutput>(
  schema: ZodType<TOutput, TOutput>,
): Resolver<TInput, TContext, TOutput> => {
  return (values, _, options) => {
    try {
      const result = z.parse(schema, values);

      return {
        values: result,
        errors: {},
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = parseZod4Issues(error.issues, true);
        return {
          values: {},
          errors: toNestErrors(zodErrors, options),
        };
      }

      throw error;
    }
  };
};

export default function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
  TSchema extends ZodType = ZodType,
>(props: UseFormProps<TFieldValues, TContext, TTransformedValues, TSchema>) {
  const { schema, ...other } = props;

  return useRHForm<
    // @ts-expect-error - Known issue: https://github.com/colinhacks/zod/issues/4992
    z.input<typeof schema>,
    TContext,
    z.output<typeof schema>
  >({
    ...other,
    resolver: resolver(schema),
  });
}
