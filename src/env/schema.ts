import { z } from 'zod';

export const envSchema = z.object({
  API_BASE_URL: z.string().min(1),
  API_KEY: z.string().min(1),
  API_REST_URL: z.string().min(1),
});

export type AppEnv = z.infer<typeof envSchema>;
