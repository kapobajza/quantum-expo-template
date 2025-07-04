import { AppEnv, envSchema } from './schema';

type ExcludeExpoPublicPrefix<TKey extends string> =
  TKey extends `EXPO_PUBLIC_${infer TSuffix}` ? TSuffix : TKey;

type ExpoPublicEnv = Record<`EXPO_PUBLIC_${keyof AppEnv}`, string>;

const env = process.env as unknown as ExpoPublicEnv;

const config = {
  API_URL: env.EXPO_PUBLIC_API_URL,
} satisfies Record<ExcludeExpoPublicPrefix<keyof AppEnv>, string>;

export const getAppEnv = () => {
  return envSchema.parse(config);
};
