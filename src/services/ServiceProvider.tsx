import { createContext, use } from 'react';

import { LoggingService } from './loggingService';
import { StorageService } from './storageService';

export interface AllServices {
  storageService: StorageService;
  loggingService: LoggingService;
}

const ServicesContext = createContext<AllServices | undefined>(undefined);

export const ServicesProvider = ({
  children,
  services,
}: {
  children: React.ReactNode;
  services: AllServices;
}) => {
  return <ServicesContext value={services}>{children}</ServicesContext>;
};

export const useService = () => {
  const context = use(ServicesContext);

  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }

  return context;
};
