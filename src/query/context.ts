import { createContext, use } from 'react';

import { useQueryBuilder } from './factory/builder';

export type QueryFactoryContext = ReturnType<typeof useQueryBuilder>;

export const QueryFactoryContext = createContext<QueryFactoryContext | null>(
  null,
);

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
