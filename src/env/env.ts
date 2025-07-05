import { AppEnv, envSchema } from './schema';

type ExcludeExpoPublicPrefix<TKey extends string> =
  TKey extends `EXPO_PUBLIC_${infer TSuffix}` ? TSuffix : TKey;

type ExpoPublicEnv = Record<`EXPO_PUBLIC_${keyof AppEnv}`, string>;

const env = process.env as unknown as ExpoPublicEnv;

const config = {
  API_BASE_URL: env.EXPO_PUBLIC_API_BASE_URL,
  API_KEY: env.EXPO_PUBLIC_API_KEY,
  API_REST_URL: `${env.EXPO_PUBLIC_API_BASE_URL}/rest/v1`,
} satisfies Record<ExcludeExpoPublicPrefix<keyof AppEnv>, string>;

export const getAppEnv = () => {
  return envSchema.parse(config);
};
