import { createContext, ReactNode, use } from 'react';

import { useQueryBuilder } from './hooks';

type QueryFactoryContext = ReturnType<typeof useQueryBuilder>;

const QueryFactoryContext = createContext<QueryFactoryContext | null>(null);

export const QueryFactoryProvider = ({ children }: { children: ReactNode }) => {
  const queryOptions = useQueryBuilder();

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
