import z from 'zod';

import { CustomValidationCode } from '@/validation/types';
import {
  createCustomSchemaParams,
  createValidationSchema,
} from '@/validation/util';

import { userResponseSchema } from './user.dto';

export const authSignInSchema = createValidationSchema({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

export type AuthSignInRequestBody = z.infer<typeof authSignInSchema>;

export const authSignUpSchema = createValidationSchema({
  email: z.string().min(1).email(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
}).superRefine((data, ctx) => {
  if (data.password !== data.repeatPassword) {
    ctx.addIssue({
      code: 'custom',
      path: ['repeatPassword'],
      ...createCustomSchemaParams(CustomValidationCode.RepeatPassword),
    });
  }
});

export type AuthSignUpRequestBody = z.infer<typeof authSignUpSchema>;

export const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number(),
  token_type: z.string(),
  user: userResponseSchema,
});

export type SessionResponse = z.infer<typeof sessionSchema>;
