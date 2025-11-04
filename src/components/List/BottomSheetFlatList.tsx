import { BottomSheetFlatList as BSFlatList } from '@gorhom/bottom-sheet';

import { GenericList } from './GenericList';
import { BottomSheetFlatListProps } from './types';

export const BottomSheetFlatList = <TItem,>(
  props: BottomSheetFlatListProps<TItem>,
) => {
  return (
    <GenericList<TItem>
      {...props}
      // @ts-expect-error - GorhomBSFlashList does not accept ref
      FlatListComponent={BSFlatList}
    />
  );
};
