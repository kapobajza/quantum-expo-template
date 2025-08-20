import { createContext, use } from 'react';

import { AppEnv } from './schema';

const AppEnvContext = createContext<AppEnv | undefined>(undefined);

export const AppEnvProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: AppEnv;
}) => {
  return <AppEnvContext value={config}>{children}</AppEnvContext>;
};

export const useAppEnv = () => {
  const context = use(AppEnvContext);

  if (context === undefined) {
    throw new Error('useAppEnv must be used within AppEnvProvider');
  }

  return context;
};
