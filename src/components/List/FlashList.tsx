import { FlashList as ShopifyFlashList } from '@shopify/flash-list';
import React from 'react';

import { GenericList } from './GenericList';
import { FlashListProps } from './types';

export const FlashList = <TItem,>(props: FlashListProps<TItem>) => {
  return (
    <GenericList<TItem>
      {...props}
      // @ts-expect-error - ShopifyFlashList does not accept ref
      FlatListComponent={ShopifyFlashList}
    />
  );
};
