import * as Crypto from 'expo-crypto';
import { useEffect, useState } from 'react';

import { ModalAction, ModalActionType, ModalItem, ModalState } from './types';

const listeners: ((state: ModalState) => void)[] = [];

const reducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionType.Show:
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...action.modal,
            id: Crypto.randomUUID(),
          },
        ],
      };

    case ModalActionType.Remove:
      return {
        ...state,
        modals: state.modals.filter((modal) => modal.id !== action.id),
        pendingCloseQueue: new Set(
          [...state.pendingCloseQueue].filter((id) => id !== action.id),
        ),
      };

    case ModalActionType.Dismiss:
      let modalsToDismiss: ModalItem[] = [];

      if (action.name) {
        modalsToDismiss = state.modals.filter(
          (modal) => modal.name === action.name,
        );
      } else if (state.modals.length > 0) {
        const lastModal = state.modals.at(-1);
        modalsToDismiss = lastModal ? [lastModal] : [];
      }

      return {
        ...state,
        pendingCloseQueue: new Set([
          ...state.pendingCloseQueue,
          ...modalsToDismiss.map((modal) => modal.id),
        ]),
      };

    case ModalActionType.DismisAll:
      return {
        ...state,
        pendingCloseQueue: new Set(state.modals.map((modal) => modal.id)),
      };

    default:
      return state;
  }
};

let memoryState: ModalState = { modals: [], pendingCloseQueue: new Set() };

const dispatch = (action: ModalAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

export const useModalStore = () => {
  const [state, setState] = useState<ModalState>(memoryState);

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
    ...state,
    dispatch,
  };
};
