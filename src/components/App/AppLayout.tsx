import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import { Container } from '@/components/Container';
import { Loader } from '@/components/Loader';
import { useMountEffect } from '@/hooks';
import { useTranslation } from '@/locale';
import { mapValidationErrors } from '@/validation';

import { useSetupAuthFlow } from './hooks';

void SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { mutate: setupAuthFlow, isPending, isError } = useSetupAuthFlow();
  const { t } = useTranslation();

  useMountEffect(() => {
    setupAuthFlow();
    mapValidationErrors(t);
  });

  if (isPending) {
    return (
      <Container fill useSafeAreas>
        <Loader fill center />
      </Container>
    );
  }

  if (isError) {
    return <Redirect href="/auth/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default AppLayout;
