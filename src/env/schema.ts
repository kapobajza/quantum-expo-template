import { z } from 'zod';

export const envSchema = z.object({
  API_URL: z.string().min(1),
});

export type AppEnv = z.infer<typeof envSchema>;
