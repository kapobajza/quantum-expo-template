import { router } from 'expo-router';
import React from 'react';

import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { createStyleSheet, useStyles } from '@/theme';

interface Props {
  onPress?: () => void;
  modal?: boolean;
}

export const HeaderBackButton = ({ onPress, modal }: Props) => {
  const styles = useStyles(stylesheet);

  return (
    <Pressable
      style={styles.headerLeft}
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }

        router.back();
      }}
    >
      <Icon
        name={modal ? 'X' : 'ArrowLeft'}
        size="6"
        color="surface.text.main"
      />
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    headerLeft: {
      width: theme.spacing['10'],
      height: theme.spacing['10'],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.surface.background,
      marginStart: theme.spacing.md,
      marginEnd: theme.spacing['2'],
    },
  };
});
