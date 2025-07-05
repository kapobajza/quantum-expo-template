import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Slot } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import { StrictMode } from 'react';
import { LogBox } from 'react-native';

import { ApiProvider } from '@/api';
import { MigrationsRunner } from '@/components';
import { AlertProvider } from '@/components/Alert';
import { ToastProvider } from '@/components/Toast';
import { DatabaseProvider, SqliteDatabase } from '@/db';
import { DatabaseRepository } from '@/db/context';
import { createSqlitePersister } from '@/db/persister';
import { createLocaleRepo, createQueryRepo } from '@/db/repo';
import * as schema from '@/db/schema';
import { AppEnvProvider, getAppEnv } from '@/env';
import { I18nProvider } from '@/locale';
import { QueryFactoryProvider } from '@/query';
import { QueryProvider } from '@/query/QueryProvider';
import {
  AllServices,
  createLoggingService,
  createStorageService,
  ServicesProvider,
} from '@/services';
import { defaultTheme, ThemeProvider } from '@/theme';

const appEnv = getAppEnv();

const loggingService = createLoggingService();

const db = openDatabaseSync('your_db_name_here.db');
const drizzleDb: SqliteDatabase = drizzle(db, {
  schema,
});

const services: AllServices = {
  storageService: createStorageService(),
  loggingService,
};

LogBox.ignoreLogs([
  /findNodeHandle is deprecated.*/,
  /findHostInstance_DEPRECATED is deprecated.*/,
]);

const repo: DatabaseRepository = {
  localeRepository: createLocaleRepo(drizzleDb),
  queryRepository: createQueryRepo(drizzleDb),
};

const sqliteQueryPersister = createSqlitePersister(repo.queryRepository);

function RootLayout() {
  return (
    <StrictMode>
      <AppEnvProvider config={appEnv}>
        <ServicesProvider services={services}>
          <MigrationsRunner database={drizzleDb}>
            <DatabaseProvider repository={repo}>
              <I18nProvider>
                <ThemeProvider theme={defaultTheme}>
                  <ToastProvider>
                    <QueryProvider persister={sqliteQueryPersister}>
                      <ApiProvider>
                        <QueryFactoryProvider>
                          <AlertProvider>
                            <Slot />
                          </AlertProvider>
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
