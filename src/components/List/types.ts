import { ComponentType, ReactElement, Ref } from 'react';
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
