import { AppEnv } from '@/env';

import { createDatabaseService, DatabaseService } from './databaseService';
import { createLoggingService, LoggingService } from './loggingService';
import { createStorageService, StorageService } from './storageService';

export interface AllServices {
  storageService: StorageService;
  loggingService: LoggingService;
  databaseService: DatabaseService;
}

export const getDefaulServices = (appEnv: AppEnv): AllServices => {
  return {
    storageService: createStorageService(),
    loggingService: createLoggingService(),
    databaseService: createDatabaseService(appEnv),
  };
};
