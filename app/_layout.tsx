import { Slot } from 'expo-router';
import { StrictMode } from 'react';
import { LogBox } from 'react-native';

import { AppProviders } from '@/components/App/AppProviders';
import { getAppEnv } from '@/env';
import { getDefaulServices } from '@/services/instance';

LogBox.ignoreLogs([
  /findNodeHandle is deprecated.*/,
  /findHostInstance_DEPRECATED is deprecated.*/,
]);

const appEnv = getAppEnv();
const services = getDefaulServices(appEnv);

function RootLayout() {
  return (
    <StrictMode>
      <AppProviders services={services} appEnv={appEnv}>
        <Slot />
      </AppProviders>
    </StrictMode>
  );
}

export default RootLayout;
