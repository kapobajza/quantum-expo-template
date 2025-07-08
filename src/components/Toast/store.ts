import { useEffect, useState } from 'react';

import { ToastAction, ToastActionType, ToastItem, ToastState } from './types';

const listeners: ((state: ToastState) => void)[] = [];

const TOAST_LIMIT = 5;

const toastTimeouts = new Map<ToastItem['id'], ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ToastActionType.Remove,
      id: toastId,
    });
  }, 700);

  toastTimeouts.set(toastId, timeout);
};

const clearFromRemoveQueue = (toastId: string) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};

const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case ToastActionType.Add:
      return {
        ...state,
        toasts: [...state.toasts, action.toast].slice(0, TOAST_LIMIT),
      };
    case ToastActionType.Remove:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
    case ToastActionType.Update:
      clearFromRemoveQueue(action.toast.id);
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast,
        ),
      };
    case ToastActionType.Dismiss:
      addToRemoveQueue(action.id);

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.id ? { ...toast, visible: false } : toast,
        ),
      };
    default:
      return state;
  }
};

let memoryState: ToastState = { toasts: [] };

const dispatch = (action: ToastAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

export const useToastStore = () => {
  const [state, setState] = useState<ToastState>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toasts: state.toasts,
    dispatch,
  };
};
