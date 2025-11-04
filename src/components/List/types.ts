import {
  BottomSheetFlashList as BSFlashList,
  BottomSheetFlatList as BSFlatList,
} from '@gorhom/bottom-sheet';
import { FlashListProps as ShopifyFlashListProps } from '@shopify/flash-list';
import { ComponentProps, ComponentType, ReactElement, Ref } from 'react';
import { FlatListProps as RNFlatListProps } from 'react-native';

import { ThemeSpacing } from '@/theme/tokens/spacing';

export interface CommonListProps {
  isLoading?: boolean;
  isLoadingMore?: boolean;
  error?: unknown;
  isError?: boolean;
  ErrorComponent?: ReactElement | null;
  isEmpty?: boolean;
  emptyText?: string;
  ListEmptyComponent?: ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
  topSpacing?: boolean | ThemeSpacing;
  bottomSpacing?: ThemeSpacing;
  shouldRenderHeader?: boolean;
}

export interface GenericListProps<TItem>
  extends Omit<
      RNFlatListProps<TItem>,
      'ListEmptyComponent' | 'refreshing' | 'onRefresh'
    >,
    CommonListProps {
  FlatListComponent: ComponentType<
    RNFlatListProps<TItem> & {
      ref?: Ref<RNFlatListProps<TItem>>;
    }
  >;
  ref?: Ref<RNFlatListProps<TItem>>;
}

export type FlatListProps<TItem> = Omit<
  GenericListProps<TItem>,
  'FlatListComponent'
>;

export type FlashListProps<TItem> = CommonListProps &
  ShopifyFlashListProps<TItem>;

export type BottomSheetFlatListProps<TItem> = CommonListProps &
  ComponentProps<typeof BSFlatList<TItem>>;

export type BottomSheetFlashListProps<TItem> = CommonListProps &
  ComponentProps<typeof BSFlashList<TItem>>;
