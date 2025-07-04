import { createContext, use } from 'react';

import { LocaleRepo, QueryRepo } from './repo';

export interface DatabaseRepository {
  localeRepository: LocaleRepo;
  queryRepository: QueryRepo;
}

export const DatabaseContext = createContext<DatabaseRepository | undefined>(
  undefined,
);

export function useDatabaseRepo() {
  const context = use(DatabaseContext);

  if (context === undefined) {
    throw new Error('useDatabaseRepo must be used within a DatabaseProvider');
  }

  return context;
}
