import { createContext, use } from 'react';

import { useAppEnv } from '@/env';

import { createDatabaseService, DatabaseService } from './databaseService';
import { createLoggingService, LoggingService } from './loggingService';
import { createStorageService, StorageService } from './storageService';

export interface AllServices {
  storageService: StorageService;
  loggingService: LoggingService;
  databaseService: DatabaseService;
}

const ServicesContext = createContext<AllServices | undefined>(undefined);

export const ServicesProvider = ({
  children,
  services,
}: {
  children: React.ReactNode;
  services?: AllServices;
}) => {
  const appEnv = useAppEnv();

  const defaultServices: AllServices = {
    storageService: createStorageService(),
    loggingService: createLoggingService(),
    databaseService: createDatabaseService(appEnv),
  };

  return (
    <ServicesContext value={services ?? defaultServices}>
      {children}
    </ServicesContext>
  );
};

export const useService = () => {
  const context = use(ServicesContext);

  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }

  return context;
};
