import { BottomSheetFlashList as BSList } from '@gorhom/bottom-sheet';

import { GenericList } from './GenericList';
import { BottomSheetFlashListProps } from './types';

export const BottomSheetFlashList = <TItem,>(
  props: BottomSheetFlashListProps<TItem>,
) => {
  return (
    <GenericList<TItem>
      {...props}
      // @ts-expect-error - GorhomBSFlashList does not accept ref
      FlatListComponent={BSList}
    />
  );
};
