import { ReactNode } from 'react';

import { QueryFactoryContext } from './context';
import { useQueryBuilder } from './factory/builder';

export const QueryFactoryProvider = ({ children }: { children: ReactNode }) => {
  const queryOptions = useQueryBuilder();

  return (
    <QueryFactoryContext value={queryOptions}>{children}</QueryFactoryContext>
  );
};
