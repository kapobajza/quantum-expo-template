import { ReactNode } from 'react';

import { QueryFactoryContext } from './context';
import { createQueryBuilder } from './factory/builder';

export const QueryFactoryProvider = ({ children }: { children: ReactNode }) => {
  const queryOptions = createQueryBuilder();

  return (
    <QueryFactoryContext value={queryOptions}>{children}</QueryFactoryContext>
  );
};
