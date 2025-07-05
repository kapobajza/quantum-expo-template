import z from 'zod';

import { createValidationSchema } from '@/validation/util';

export const authSignUpSchema = createValidationSchema({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthSignUpRequestBody = z.infer<typeof authSignUpSchema>;
