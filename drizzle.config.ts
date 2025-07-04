import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema',
  out: './src/db/drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
