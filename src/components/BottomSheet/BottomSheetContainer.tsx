import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';

import { createStyleSheet, useStyles } from '@/theme';

import { BottomSheetBackdrop } from './BottomSheetBackdrop';
import { BottomSheetBackground } from './BottomSheetBackground';
import { BottomSheetHandle } from './BottomSheetHandle';
import { BottomSheetItem, BottomSheetOptions } from './types';

export const BottomSheetContainer = ({
  item,
  isPendingClose,
  removeBottomSheet,
  options,
}: {
  item: BottomSheetItem;
  isPendingClose: boolean;
  removeBottomSheet: (id: string) => void;
  options: BottomSheetOptions | undefined;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const styles = useStyles(stylesheet);
  const { snapPoints } = options ?? {};

  useEffect(() => {
    if (isPendingClose) {
      bottomSheetRef.current?.close();
    }
  }, [isPendingClose]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={() => {
        removeBottomSheet(item.id);
      }}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      style={styles.container}
      backgroundComponent={BottomSheetBackground}
      handleComponent={BottomSheetHandle}
      snapPoints={snapPoints}
    >
      <item.Component params={item.params} />
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
