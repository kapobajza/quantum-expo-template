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

export type ToastPosition = 'top' | 'bottom';

export interface ToastItem {
  message: string;
  type: ToastType;
  id: string;
  height?: number;
  visible: boolean;
  createdAt: number;
}

export type ToastItemMinimal = Pick<ToastItem, 'message' | 'type'>;

export type ShowToastFn = (item: ToastItemMinimal) => void;

export interface ToastState {
  toasts: ToastItem[];
}

export const ToastActionType = {
  Add: 'add_toast',
  Remove: 'remove_toast',
  Update: 'update_toast',
  Dismiss: 'dismiss_toast',
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
      id: string;
    };
