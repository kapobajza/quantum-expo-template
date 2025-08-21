import { BottomSheetView as GHBottomSheetView } from '@gorhom/bottom-sheet';
import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native-unistyles';

export const BottomSheetView = ({
  style,
  ...props
}: ComponentProps<typeof GHBottomSheetView>) => {
  return <GHBottomSheetView style={[styles.container, style]} {...props} />;
};

const styles = StyleSheet.create((theme, { insets }) => ({
  container: {
    backgroundColor: theme.colors.background.main,
    paddingBottom: theme.spacing(4) + insets.bottom,
  },
}));
