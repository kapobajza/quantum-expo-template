import { ObjectValues } from '@/types';

export const SSOProvider = {
  Google: 'google',
  Microsoft: 'microsoft',
} as const;

export type SSOProvider = ObjectValues<typeof SSOProvider>;
