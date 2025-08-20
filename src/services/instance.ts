import { createLoggingService, LoggingService } from './loggingService';
import { createStorageService, StorageService } from './storageService';

export interface AllServices {
  storageService: StorageService;
  loggingService: LoggingService;
}

export const getDefaulServices = (): AllServices => {
  return {
    storageService: createStorageService(),
    loggingService: createLoggingService(),
  };
};
