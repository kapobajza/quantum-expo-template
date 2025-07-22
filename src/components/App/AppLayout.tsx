import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { View } from 'react-native';

import { Container } from '@/components/Container';
import { Loader } from '@/components/Loader';
import { StackNoHeader } from '@/components/Navigation';
import { ErrorCode, isErrorCode } from '@/error';
import { useMountEffect } from '@/hooks';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';
import { mapValidationErrors } from '@/validation';

import { useSetupAuthFlow } from './hooks';

void SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { mutate: setupAuthFlow, isPending, data, error } = useSetupAuthFlow();
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  useMountEffect(() => {
    setupAuthFlow();
    mapValidationErrors(t);
  });

  if (isPending) {
    return (
      <Container style={styles.loader} fill useSafeAreas>
        <Loader fill center />
      </Container>
    );
  }

  if (isErrorCode(error, ErrorCode.Unauthorized) || data === 'no_token') {
    return (
      <View style={styles.background}>
        <Redirect href="/auth/login" />
      </View>
    );
  }

  return (
    <StackNoHeader>
      <Stack.Screen name="index" />
    </StackNoHeader>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  loader: {
    margin: 0,
  },
}));

export default AppLayout;
