import { z } from 'zod';

import { SnakeToPascalCase } from '@/types';

export const errorCodeSchema = z.union([
  z.literal('unknown'),
  z.literal('forbidden'),
  z.literal('bad_request'),
  z.literal('not_found'),
  z.literal('unauthorized'),
  z.literal('missing_app_schema'),
  z.literal('missing_auth_token'),
  z.literal('email_not_confirmed'),
  z.literal('invalid_credentials'),
  z.literal('over_email_send_rate_limit'),
  z.number(),
]);

export type ErrorCode = z.infer<typeof errorCodeSchema>;

export const ErrorCode = {
  BadRequest: 'bad_request',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  Unauthorized: 'unauthorized',
  Unknown: 'unknown',
  MissingAppSchema: 'missing_app_schema',
  MissingAuthToken: 'missing_auth_token',
  EmailNotConfirmed: 'email_not_confirmed',
  InvalidCredentials: 'invalid_credentials',
  OverEmailSendRateLimit: 'over_email_send_rate_limit',
} as const satisfies {
  [K in ErrorCode as SnakeToPascalCase<K>]: K;
};

export const errorDataSchema = z.object({
  code: errorCodeSchema,
  error_code: z.literal('bad_jwt').optional(),
  data: z.unknown().optional(),
});
