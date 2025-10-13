import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';

import { createStyleSheet, useStyles } from '@/theme';

import { BottomSheetBackdrop } from './BottomSheetBackdrop';
import { BottomSheetBackground } from './BottomSheetBackground';
import { BottomSheetHandle } from './BottomSheetHandle';
import { useBottomSheetStore } from './store';
import { BottomSheetActionType } from './types';

export const BottomSheetContainer = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const styles = useStyles(stylesheet);
  const { dispatch, pendingCloseQueue, activeSheet } = useBottomSheetStore();

  useEffect(() => {
    if (pendingCloseQueue.has(activeSheet?.id ?? '')) {
      bottomSheetRef.current?.close();
    }
  }, [activeSheet?.id, pendingCloseQueue]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={() => {
        dispatch({
          type: BottomSheetActionType.Remove,
          id: activeSheet?.id ?? '',
        });
      }}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      style={styles.container}
      backgroundComponent={BottomSheetBackground}
      handleComponent={BottomSheetHandle}
      {...rest}
    >
      {children}
    </BottomSheet>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.main,
    borderTopLeftRadius: theme.radii[12],
    borderTopRightRadius: theme.radii[12],
  },
}));
