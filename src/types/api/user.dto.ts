import { z } from 'zod';

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  email_confirmed_at: z.string().nullable(),
  phone: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  last_sign_in_at: z.string().nullable(),
  user_metadata: z.record(z.string(), z.unknown()).optional(),
  app_metadata: z.record(z.string(), z.unknown()).optional(),
});

export type UserDto = z.infer<typeof userResponseSchema>;
