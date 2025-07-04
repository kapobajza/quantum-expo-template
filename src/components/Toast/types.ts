import { ObjectValues } from '@/types';

export const ToastAnimationType = {
  SlideIn: 'slide-in',
  SlideOut: 'slide-out',
} as const;

export type ToastAnimationType = ObjectValues<typeof ToastAnimationType>;

export interface ToastMethods {
  slideIn: () => void;
  slideOut: () => void;
}

export const ToastType = {
  Error: 'error',
  Success: 'success',
  Info: 'info',
} as const;

export type ToastType = ObjectValues<typeof ToastType>;

export interface ToastOptions {
  message: string;
  type: ToastType;
  id: string;
}

export type ToastOptionsMinimal = Omit<ToastOptions, 'id'>;

export type ShowToastFn = (item: ToastOptionsMinimal) => void;
