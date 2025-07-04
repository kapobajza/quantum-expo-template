import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useMountEffect } from '@/hooks';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { AlertContext } from './context';
import { AlertItem } from './types';

interface AlertProps {
  setContext: (context: AlertContext) => void;
}

export const Alert = ({ setContext }: AlertProps) => {
  const [item, setItem] = useState<AlertItem>();
  const scaleAnimation = useSharedValue(0);
  const styles = useStyles(stylesheet);
  const theme = useTheme();
  const { t } = useTranslation();

  const showAlert = (item: AlertItem) => {
    setItem({
      ...item,
      type: item.type ?? 'info',
    });
    scaleAnimation.value = withTiming(1, {
      duration: 300,
    });
  };

  const hideAlert = () => {
    const handleAnimationEnd = () => {
      setItem(undefined);
    };

    scaleAnimation.value = withTiming(
      0,
      {
        duration: 300,
      },
      () => {
        runOnJS(handleAnimationEnd)();
      },
    );
  };

  useMountEffect(() => {
    setContext({
      showAlert,
      hideAlert,
    });
  });

  const interpolatedColors = [
    theme.addColorTransparency(theme.colors.secondary[100], 0),
    theme.addColorTransparency(theme.colors.secondary[100], 0.5),
  ];

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scaleAnimation.value,
      [0, 1],
      interpolatedColors,
    ),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
    opacity: scaleAnimation.value,
  }));

  if (!item) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.overlay, animatedOverlayStyle]}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={hideAlert}
        pointerEvents={item.type === 'prompt' ? 'box-only' : 'auto'}
        style={StyleSheet.absoluteFillObject}
        disabled={item.type === 'prompt'}
      />
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Text variant="h5" center>
          {item.title}
        </Text>
        <Text style={styles.message} center>
          {item.message}
        </Text>
        <Button
          title={item.type === 'info' ? t('general.ok') : t('general.confirm')}
          onPress={() => {
            if (item.onConfirm) {
              item.onConfirm(hideAlert);
              return;
            }

            hideAlert();
          }}
          style={styles.button}
        />
        {item.type === 'prompt' && (
          <Button
            title={t('general.cancel')}
            variant="secondary"
            onPress={() => {
              if (item.onCancel) {
                item.onCancel(hideAlert);
                return;
              }

              hideAlert();
            }}
            style={styles.button}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.highest,
  },
  container: {
    width: theme.spacing['3/4'],
    padding: theme.spacing['4'],
    backgroundColor: theme.colors.secondary[900],
    borderRadius: theme.radii['4'],
    justifyContent: 'center',
    gap: theme.spacing['2'],
  },
  button: {
    padding: theme.spacing['2'],
  },
  message: {
    marginBottom: theme.spacing['4'],
  },
}));
