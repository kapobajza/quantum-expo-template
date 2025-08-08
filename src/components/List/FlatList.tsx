import { FlatList as RNFlatList } from 'react-native';

import { GenericList } from './GenericList';
import { FlatListProps } from './types';

export const FlatList = <TItem,>(props: FlatListProps<TItem>) => {
  return <GenericList<TItem> {...props} FlatListComponent={RNFlatList} />;
};
