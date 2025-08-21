import { BottomSheetHandle as GHBottomSheetHandle } from '@gorhom/bottom-sheet';
import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native-unistyles';

export const BottomSheetHandle = ({
  indicatorStyle,
  style,
  ...props
}: ComponentProps<typeof GHBottomSheetHandle>) => {
  return (
    <GHBottomSheetHandle
      indicatorStyle={[indicatorStyle, styles.indicator]}
      style={[style, styles.handle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  indicator: {
    backgroundColor: theme.colors.surface.background,
    width: 80,
    height: 5,
  },
  handle: {
    borderTopLeftRadius: theme.radii[12],
    borderTopRightRadius: theme.radii[12],
  },
}));
