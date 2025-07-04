import { z } from 'zod';

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserDto = z.infer<typeof userResponseSchema>;
