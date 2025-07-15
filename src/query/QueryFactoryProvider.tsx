import { createContext, ReactNode, use } from 'react';

import { createQueryBuilder } from './factory/builder';

type QueryFactoryContext = ReturnType<typeof createQueryBuilder>;

const QueryFactoryContext = createContext<QueryFactoryContext | null>(null);

export const QueryFactoryProvider = ({ children }: { children: ReactNode }) => {
  const queryOptions = createQueryBuilder();

  return (
    <QueryFactoryContext value={queryOptions}>{children}</QueryFactoryContext>
  );
};

const useQueryFactory = () => {
  const context = use(QueryFactoryContext);

  if (!context) {
    throw new Error(
      'useQueryFactory must be used within a QueryFactoryProvider',
    );
  }

  return context;
};

export const useQueryKeyFactory = () => {
  const factory = useQueryFactory();
  return factory.queryKeys;
};

export const useQueryOptionsFactory = () => {
  const factory = useQueryFactory();
  return factory.queryOptions;
};
