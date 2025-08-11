import { BottomSheetBackdrop as GHBottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { ComponentProps } from 'react';

export const BottomSheetBackdrop = (
  props: ComponentProps<typeof GHBottomSheetBackdrop>,
) => {
  return (
    <GHBottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.7}
    />
  );
};
