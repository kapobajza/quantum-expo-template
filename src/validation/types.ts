import { ObjectValues } from '@/types';

export const CustomValidationCode = {
  Phone: 'phone',
} as const;

export type CustomValidationCode = ObjectValues<typeof CustomValidationCode>;
