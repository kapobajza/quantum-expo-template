import { BottomSheetView as GHBottomSheetView } from '@gorhom/bottom-sheet';
import React, { ComponentProps } from 'react';

import { createStyleSheet, useStyles } from '@/theme';

export const BottomSheetView = ({
  style,
  ...props
}: ComponentProps<typeof GHBottomSheetView>) => {
  const styles = useStyles(stylesheet);

  return <GHBottomSheetView style={[styles.container, style]} {...props} />;
};

const stylesheet = createStyleSheet((theme, { insets }) => ({
  container: {
    backgroundColor: theme.colors.background.main,
    paddingBottom: theme.spacing['4'] + insets.bottom,
  },
}));
