import { Slot } from 'expo-router';
import { StrictMode } from 'react';
import { LogBox } from 'react-native';

import { ApiProvider } from '@/api';
import { MigrationsRunner } from '@/components';
import { BottomSheetProvider } from '@/components/BottomSheet';
import { ModalProvider } from '@/components/Modal';
import { ToastProvider } from '@/components/Toast';
import { DatabaseProvider } from '@/db';
import { databaseRepository, drizzleDb } from '@/db/instance';
import { AppEnvProvider } from '@/env';
import { I18nProvider } from '@/locale';
import { QueryFactoryProvider } from '@/query';
import { QueryProvider } from '@/query/QueryProvider';
import { ServicesProvider } from '@/services';
import { ThemeProvider } from '@/theme';

LogBox.ignoreLogs([
  /findNodeHandle is deprecated.*/,
  /findHostInstance_DEPRECATED is deprecated.*/,
]);

function RootLayout() {
  return (
    <StrictMode>
      <AppEnvProvider>
        <ServicesProvider>
          <MigrationsRunner database={drizzleDb}>
            <DatabaseProvider repository={databaseRepository}>
              <I18nProvider>
                <ThemeProvider>
                  <ToastProvider>
                    <QueryProvider>
                      <ApiProvider>
                        <QueryFactoryProvider>
                          <ModalProvider>
                            <BottomSheetProvider>
                              <Slot />
                            </BottomSheetProvider>
                          </ModalProvider>
                        </QueryFactoryProvider>
                      </ApiProvider>
                    </QueryProvider>
                  </ToastProvider>
                </ThemeProvider>
              </I18nProvider>
            </DatabaseProvider>
          </MigrationsRunner>
        </ServicesProvider>
      </AppEnvProvider>
    </StrictMode>
  );
}

export default RootLayout;
