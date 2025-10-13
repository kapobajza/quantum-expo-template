import { createContext, use } from 'react';

import { useBottomSheetStore } from './store';
import {
  BottomSheetName,
  BottomSheetStackParams,
  ShowBottomSheetFn,
} from './types';

export interface BottomSheetContext {
  showBottomSheet: ShowBottomSheetFn;
  hideBottomSheet: (name?: BottomSheetName) => void;
  closeAllBottomSheets: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContext | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = use(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  return context;
};

export const useBottomSheetParams = <
  TBottomSheetName extends BottomSheetName = BottomSheetName,
>(
  name: TBottomSheetName,
): BottomSheetStackParams[TBottomSheetName] => {
  const { sheets } = useBottomSheetStore();
  return sheets.find((s) => s.name === name)
    ?.params as BottomSheetStackParams[TBottomSheetName];
};
