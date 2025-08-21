import { useQueryClient } from '@tanstack/react-query';
import * as DevMenu from 'expo-dev-client';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { DevSettings, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Container } from '@/components/Container';
import { Loader } from '@/components/Loader';
import { StackNoHeader } from '@/components/Navigation';
import { RouteName } from '@/constants/route';
import { useDatabaseRepo } from '@/db/context';
import { ErrorCode, isErrorCode } from '@/error';
import { useMountEffect } from '@/hooks';
import { useTranslation } from '@/locale';
import { mapValidationErrors } from '@/validation';

import { useSetupAuthFlow } from './hooks';

void SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { mutate: setupAuthFlow, isPending, data, error } = useSetupAuthFlow();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { queryRepository } = useDatabaseRepo();

  useMountEffect(() => {
    setupAuthFlow();
    mapValidationErrors(t);

    if (__DEV__) {
      void DevMenu.registerDevMenuItems([
        {
          name: 'Clear React Query cache & Reload',
          callback: () => {
            queryClient.clear();
            void queryClient.resetQueries();
            void queryRepository.removeQueryClient();
            DevSettings.reload();
          },
        },
      ]);
    }
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
        <Redirect href={RouteName.Auth.Login} />
      </View>
    );
  }

  return (
    <StackNoHeader>
      <Stack.Screen name="(tabs)" />
    </StackNoHeader>
  );
}

const styles = StyleSheet.create((theme) => ({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  loader: {
    margin: 0,
  },
}));

export default AppLayout;
