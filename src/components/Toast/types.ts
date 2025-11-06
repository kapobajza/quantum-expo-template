import { ReactElement } from 'react';

import { ObjectValues } from '@/types/common';

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

export type ToastPosition = 'top' | 'bottom';

export type ToastType = ObjectValues<typeof ToastType>;

export interface ToastItem {
  message: string;
  type: ToastType;
  id: string;
  height?: number;
  visible: boolean;
  createdAt: number;
  RightElement?: ReactElement;
  /** duration in ms or as 'forever' so that the toast never disappears automatically */
  duration?: 'forever' | number;
}

export type ToastItemMinimal = Pick<
  ToastItem,
  'message' | 'type' | 'RightElement' | 'duration'
>;

export type ShowToastFn = (item: ToastItemMinimal) => string;

export interface ToastState {
  toasts: ToastItem[];
}

export const ToastActionType = {
  Add: 'add_toast',
  Remove: 'remove_toast',
  Update: 'update_toast',
  Dismiss: 'dismiss_toast',
  DismissAll: 'dismiss_all_toasts',
} as const;

export type ToastAction =
  | {
      type: typeof ToastActionType.Add;
      toast: ToastItem;
    }
  | {
      type: typeof ToastActionType.Remove;
      id: string;
    }
  | {
      type: typeof ToastActionType.Update;
      toast: Omit<Partial<ToastItem>, 'id'> & Pick<ToastItem, 'id'>;
    }
  | {
      type: typeof ToastActionType.Dismiss;
      id: string | undefined;
    }
  | {
      type: typeof ToastActionType.DismissAll;
    };
