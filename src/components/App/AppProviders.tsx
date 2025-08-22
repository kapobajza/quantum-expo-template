import React, { ReactNode } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ApiProvider } from '@/api';
import { BottomSheetProvider } from '@/components/BottomSheet';
import { ModalProvider } from '@/components/Modal';
import { ToastProvider } from '@/components/Toast';
import { DatabaseProvider } from '@/db';
import { databaseRepository, drizzleDb } from '@/db/instance';
import { AppEnv, AppEnvProvider } from '@/env';
import { I18nProvider } from '@/locale';
import { QueryFactoryProvider } from '@/query';
import { QueryProvider } from '@/query/QueryProvider';
import { ServicesProvider } from '@/services';
import { AllServices } from '@/services/instance';
import { ThemeProvider } from '@/theme/ThemeProvider';

import { MigrationsRunner } from './MigrationsRunner';

export const AppProviders = ({
  children,
  services,
  appEnv,
}: {
  children: ReactNode;
  services: AllServices;
  appEnv: AppEnv;
}) => {
  return (
    <AppEnvProvider config={appEnv}>
      <ServicesProvider services={services}>
        <MigrationsRunner database={drizzleDb}>
          <DatabaseProvider repository={databaseRepository}>
            <I18nProvider>
              <ThemeProvider>
                <ToastProvider>
                  <QueryProvider>
                    <ApiProvider>
                      <QueryFactoryProvider>
                        <ModalProvider>
                          <KeyboardProvider>
                            <BottomSheetProvider>
                              {children}
                            </BottomSheetProvider>
                          </KeyboardProvider>
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
  );
};
