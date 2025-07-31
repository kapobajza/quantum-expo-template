import React, { useMemo, useRef, useState } from 'react';
import {
  Gesture,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import { createStyleSheet, useStyles } from '@/theme';

import { ActionSheetContext, ActionSheetScrollableContext } from './context';
import { ActionSheetList } from './SheetList';
import { ActionSheetStack } from './types';

export const ActionSheetProvider = ({
  children,
  stack,
}: {
  children: React.ReactNode;
  stack: ActionSheetStack;
}) => {
  const styles = useStyles(stylesheet);
  const [context, setContext] = useState<ActionSheetContext>({
    hideActionSheet() {
      // no-op, will be overridden
    },
    showActionSheet() {
      // no-op, will be overridden
    },
    closeAllActionSheets() {
      // no-op, will be overridden
    },
  });
  const nativeGestureRef = useRef(Gesture.Native());
  const scrollRef = useRef<ScrollView>(null);
  const isScrollingGesture = useSharedValue(false);
  const height = useRef<number>(null);

  const scrollableContextValue = useMemo(
    () =>
      ({
        draggableRef: {
          scrollRef,
          height,
        },
        nativeGestureRef,
        isScrollingGesture,
      }) satisfies ActionSheetScrollableContext,
    [isScrollingGesture],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ActionSheetContext value={context}>
        <ActionSheetScrollableContext value={scrollableContextValue}>
          {children}
          <ActionSheetList setContext={setContext} stack={stack} />
        </ActionSheetScrollableContext>
      </ActionSheetContext>
    </GestureHandlerRootView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
  },
});
