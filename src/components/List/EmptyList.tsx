import { ReactNode } from 'react';

import { FlatList } from './FlatList';
import type { CommonListProps } from './types';

const renderItem = () => null;

const data: unknown[] = [];

export type EmptyListProps = Omit<
  CommonListProps,
  'renderItem' | 'data' | 'children' | 'ListFooterComponent'
> & {
  children?: ReactNode;
};

export const EmptyList = ({ children, ...rest }: EmptyListProps) => {
  return (
    <FlatList
      {...rest}
      renderItem={renderItem}
      data={data}
      ListFooterComponent={children as never}
    />
  );
};
