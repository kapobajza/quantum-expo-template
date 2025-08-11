import { createContext, use } from 'react';

import { BottomSheetName, ShowBottomSheetFn } from './types';

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
