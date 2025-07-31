import { createContext, RefObject, use } from 'react';
import { NativeGesture, ScrollView } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

import { ActionSheetName, ShowActionSheetFn } from './types';

export interface ActionSheetContext {
  showActionSheet: ShowActionSheetFn;
  hideActionSheet: (name?: ActionSheetName) => void;
  closeAllActionSheets: () => void;
}

export const ActionSheetContext = createContext<ActionSheetContext | undefined>(
  undefined,
);

export const useActionSheet = () => {
  const context = use(ActionSheetContext);

  if (!context) {
    throw new Error('useActionSheet must be used within a ActionSheetProvider');
  }

  return context;
};

export interface ActionSheetScrollableContext {
  draggableRef: {
    scrollRef: RefObject<ScrollView | null>;
    height: RefObject<number | null>;
  };
  nativeGestureRef: RefObject<NativeGesture>;
  isScrollingGesture: SharedValue<boolean>;
}

export const ActionSheetScrollableContext = createContext<
  ActionSheetScrollableContext | undefined
>(undefined);

export const useActionSheetScrollable = () => {
  const context = use(ActionSheetScrollableContext);

  if (!context) {
    throw new Error(
      'useActionSheetScrollable must be used within a ActionSheetScrollableProvider',
    );
  }

  return context;
};
