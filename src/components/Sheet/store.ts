import * as Crypto from 'expo-crypto';
import { useEffect, useState } from 'react';

import {
  ActionSheetItem,
  ActionSheetState,
  SheetAction,
  SheetActionType,
} from './types';

const listeners: ((state: ActionSheetState) => void)[] = [];

const reducer = (
  state: ActionSheetState,
  action: SheetAction,
): ActionSheetState => {
  switch (action.type) {
    case SheetActionType.Show:
      return {
        ...state,
        sheets: [
          ...state.sheets,
          {
            ...action.sheet,
            id: Crypto.randomUUID(),
          },
        ],
      };

    case SheetActionType.Remove:
      return {
        ...state,
        sheets: state.sheets.filter(
          (ActionSheet) => ActionSheet.id !== action.id,
        ),
        pendingCloseQueue: new Set(
          [...state.pendingCloseQueue].filter((id) => id !== action.id),
        ),
      };

    case SheetActionType.Dismiss:
      let sheetsToDismiss: ActionSheetItem[] = [];

      if (action.name) {
        sheetsToDismiss = state.sheets.filter(
          (sheet) => sheet.name === action.name,
        );
      } else if (state.sheets.length > 0) {
        const lastActionSheet = state.sheets.at(-1);
        sheetsToDismiss = lastActionSheet ? [lastActionSheet] : [];
      }

      return {
        ...state,
        pendingCloseQueue: new Set([
          ...state.pendingCloseQueue,
          ...sheetsToDismiss.map((ActionSheet) => ActionSheet.id),
        ]),
      };

    case SheetActionType.DismisAll:
      return {
        ...state,
        pendingCloseQueue: new Set(
          state.sheets.map((ActionSheet) => ActionSheet.id),
        ),
      };

    case SheetActionType.Update:
      return {
        ...state,
        sheets: state.sheets.map((sheet) =>
          sheet.id === action.sheet.id ? { ...sheet, ...action.sheet } : sheet,
        ),
      };

    default:
      return state;
  }
};

let memoryState: ActionSheetState = {
  sheets: [],
  pendingCloseQueue: new Set(),
};

const dispatch = (action: SheetAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

export const useActionSheetStore = () => {
  const [state, setState] = useState<ActionSheetState>(memoryState);

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
