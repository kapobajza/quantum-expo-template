import { BottomSheetHandle as GHBottomSheetHandle } from '@gorhom/bottom-sheet';
import React, { ComponentProps } from 'react';

import { createStyleSheet, useStyles } from '@/theme';

export const BottomSheetHandle = ({
  indicatorStyle,
  style,
  ...props
}: ComponentProps<typeof GHBottomSheetHandle>) => {
  const styles = useStyles(stylesheet);

  return (
    <GHBottomSheetHandle
      indicatorStyle={[indicatorStyle, styles.indicator]}
      style={[style, styles.handle]}
      {...props}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
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
