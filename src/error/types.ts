import { z } from 'zod';

import { SnakeToPascalCase } from '@/types';

export const errorCodeSchema = z.union([
  z.literal('GENERAL:UNKNOWN'),
  z.literal('GENERAL:FORBIDDEN'),
  z.literal('GENERAL:BAD_REQUEST'),
  z.literal('GENERAL:NOT_FOUND'),
  z.literal('GENERAL:VALIDATION'),
  z.literal('GENERAL:UNAUTHORIZED'),
  z.literal('OTP:INVALID'),
  z.literal('OTP:EXPIRED'),
  z.literal('OTP:TOO_MANY_ATTEMPTS'),
  z.literal('ACCOUNT:UNREGISTERED'),
  z.literal('ACCOUNT:ALREADY_EXISTS'),
  z.literal('ACCOUNT:BLOCKED'),
  z.literal('ACCOUNT:INVALID_TOKEN_OR_NOT_FOUND'),
  z.literal('INTERNAL:MISSING_AUTH_TOKEN'),
]);

export type ErrorCode = z.infer<typeof errorCodeSchema>;

type ErroCodeKey<TKey extends string> =
  TKey extends `${infer Prefix}:${infer Suffix}`
    ? `${SnakeToPascalCase<Prefix>}${SnakeToPascalCase<Suffix>}`
    : never;

export const ErrorCode = {
  AccountAlreadyExists: 'ACCOUNT:ALREADY_EXISTS',
  AccountBlocked: 'ACCOUNT:BLOCKED',
  AccountInvalidTokenOrNotFound: 'ACCOUNT:INVALID_TOKEN_OR_NOT_FOUND',
  AccountUnregistered: 'ACCOUNT:UNREGISTERED',
  GeneralBadRequest: 'GENERAL:BAD_REQUEST',
  GeneralForbidden: 'GENERAL:FORBIDDEN',
  GeneralNotFound: 'GENERAL:NOT_FOUND',
  GeneralUnauthorized: 'GENERAL:UNAUTHORIZED',
  GeneralValidation: 'GENERAL:VALIDATION',
  GeneralUnknown: 'GENERAL:UNKNOWN',
  OtpExpired: 'OTP:EXPIRED',
  OtpInvalid: 'OTP:INVALID',
  OtpTooManyAttempts: 'OTP:TOO_MANY_ATTEMPTS',
  InternalMissingAuthToken: 'INTERNAL:MISSING_AUTH_TOKEN',
} as const satisfies {
  [K in ErrorCode as ErroCodeKey<K>]: K;
};

export const errorDataSchema = z.object({
  code: errorCodeSchema,
  data: z.unknown().optional(),
});
