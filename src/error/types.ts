import { z } from 'zod';

import { SnakeToPascalCase } from '@/types';

export const errorCodeSchema = z.union([
  z.literal('GENERAL:UNKNOWN'),
  z.literal('GENERAL:FORBIDDEN'),
  z.literal('GENERAL:BAD_REQUEST'),
  z.literal('GENERAL:NOT_FOUND'),
  z.literal('GENERAL:VALIDATION'),
  z.literal('GENERAL:UNAUTHORIZED'),
  z.literal('INTERNAL:MISSING_APP_SCHEMA'),
]);

export type ErrorCode = z.infer<typeof errorCodeSchema>;

type ErroCodeKey<TKey extends string> =
  TKey extends `${infer Prefix}:${infer Suffix}`
    ? `${SnakeToPascalCase<Prefix>}${SnakeToPascalCase<Suffix>}`
    : never;

export const ErrorCode = {
  GeneralBadRequest: 'GENERAL:BAD_REQUEST',
  GeneralForbidden: 'GENERAL:FORBIDDEN',
  GeneralNotFound: 'GENERAL:NOT_FOUND',
  GeneralUnauthorized: 'GENERAL:UNAUTHORIZED',
  GeneralValidation: 'GENERAL:VALIDATION',
  GeneralUnknown: 'GENERAL:UNKNOWN',
  InternalMissingAppSchema: 'INTERNAL:MISSING_APP_SCHEMA',
} as const satisfies {
  [K in ErrorCode as ErroCodeKey<K>]: K;
};

export const errorDataSchema = z.object({
  code: errorCodeSchema,
  data: z.unknown().optional(),
});
