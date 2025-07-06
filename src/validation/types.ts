import { ObjectValues } from '@/types';

export const CustomValidationCode = {
  RepeatPassword: 'repeatPassword',
} as const;

export type CustomValidationCode = ObjectValues<typeof CustomValidationCode>;
