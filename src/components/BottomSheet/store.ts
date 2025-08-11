import * as Crypto from 'expo-crypto';
import { useEffect, useState } from 'react';

import {
  BottomSheetAction,
  BottomSheetActionType,
  BottomSheetItem,
  BottomSheetState,
} from './types';

const listeners: ((state: BottomSheetState) => void)[] = [];

const reducer = (
  state: BottomSheetState,
  action: BottomSheetAction,
): BottomSheetState => {
  switch (action.type) {
    case BottomSheetActionType.Show:
      return {
        ...state,
        sheets: [
          ...state.sheets,
          {
            ...action.item,
            id: Crypto.randomUUID(),
          },
        ],
        params: action.item.params,
        options: action.item.options,
      };

    case BottomSheetActionType.Remove: {
      const newSheets = state.sheets.filter((sheet) => sheet.id !== action.id);
      const lastSheet = newSheets.at(-1);
      return {
        ...state,
        sheets: newSheets,
        pendingCloseQueue: new Set(
          [...state.pendingCloseQueue].filter((id) => id !== action.id),
        ),
        params: lastSheet?.params,
        options: lastSheet?.options,
      };
    }

    case BottomSheetActionType.Dismiss:
      let sheetsToDismiss: BottomSheetItem[] = [];

      if (action.name) {
        sheetsToDismiss = state.sheets.filter(
          (bottomSheet) => bottomSheet.name === action.name,
        );
      } else if (state.sheets.length > 0) {
        const lastbottomSheet = state.sheets.at(-1);
        sheetsToDismiss = lastbottomSheet ? [lastbottomSheet] : [];
      }

      return {
        ...state,
        pendingCloseQueue: new Set([
          ...state.pendingCloseQueue,
          ...sheetsToDismiss.map((modal) => modal.id),
        ]),
      };

    case BottomSheetActionType.DismisAll:
      return {
        ...state,
        pendingCloseQueue: new Set(state.sheets.map((sheet) => sheet.id)),
        params: undefined,
        options: undefined,
      };

    default:
      return state;
  }
};

let memoryState: BottomSheetState = {
  sheets: [],
  pendingCloseQueue: new Set(),
  params: undefined,
  options: undefined,
};

const dispatch = (action: BottomSheetAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

export const useBottomSheetStore = () => {
  const [state, setState] = useState<BottomSheetState>(memoryState);

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
