import React, { ReactElement, useMemo } from 'react';
import {
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Container } from '@/components/Container';
import { Loader } from '@/components/Loader';
import { Text } from '@/components/Text';
import { useMapError } from '@/error/hooks';
import { useTranslation } from '@/locale';
import { useTheme } from '@/theme';
import { ThemeSpacing } from '@/theme/tokens/spacing';

import { CommonListProps, GenericListProps } from './types';

const NonListContent = ({
  ListHeader,
  children,
  refreshControl,
}: {
  ListHeader: ReactElement;
  children: React.ReactNode;
  refreshControl: ReactElement<RefreshControlProps> | undefined;
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollable}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {ListHeader}
      <Container center fill>
        {children}
      </Container>
    </ScrollView>
  );
};

export const GenericList = <TItem,>({
  isLoading,
  isLoadingMore,
  error,
  isEmpty,
  emptyText,
  ErrorComponent,
  ListFooterComponent,
  ListFooterComponentStyle,
  ListEmptyComponent,
  topSpacing = true,
  ListHeaderComponent,
  isError,
  onRefresh,
  FlatListComponent,
  bottomSpacing,
  data,
  refreshing = false,
  shouldRenderHeader = true,
  ref,
  ...rest
}: GenericListProps<TItem>) => {
  const { t } = useTranslation();
  const mapError = useMapError();
  const theme = useTheme();

  const RefreshComponent = useMemo(() => {
    return onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={theme.colors.background.text.main}
      />
    ) : undefined;
  }, [onRefresh, refreshing, theme.colors.background.text.main]);

  const ListFooter = useMemo(() => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={ListFooterComponentStyle}>
        {isLoadingMore ? <Loader style={styles.loader} /> : null}
        {ListFooterComponent as ReactElement}
        <View style={styles.bottomSpacer(bottomSpacing)} />
      </View>
    );
  }, [
    ListFooterComponent,
    ListFooterComponentStyle,
    bottomSpacing,
    isLoading,
    isLoadingMore,
  ]);

  const ListHeader = useMemo(() => {
    let LoaderComponent = null;

    if (isLoading) {
      LoaderComponent = <Loader fill center />;
    }

    return (
      <View style={styles.listHeader(isLoading)}>
        {topSpacing && !isEmpty ? (
          <View style={styles.topSpacer({ topSpacing })} />
        ) : null}
        {shouldRenderHeader ? (ListHeaderComponent as ReactElement) : null}
        {LoaderComponent}
      </View>
    );
  }, [ListHeaderComponent, isEmpty, isLoading, shouldRenderHeader, topSpacing]);

  if (error && isError && isEmpty && !isLoading) {
    return (
      ErrorComponent ?? (
        <NonListContent
          ListHeader={ListHeader}
          refreshControl={RefreshComponent}
        >
          <Text center variant="large.semibold">
            {mapError(error)}
          </Text>
        </NonListContent>
      )
    );
  }

  if (isEmpty && !isLoading) {
    return (
      ListEmptyComponent ?? (
        <NonListContent
          ListHeader={ListHeader}
          refreshControl={RefreshComponent}
        >
          <Text center variant="large.semibold">
            {emptyText ?? t('general.noResults')}
          </Text>
        </NonListContent>
      )
    );
  }

  return (
    <FlatListComponent
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={RefreshComponent}
      contentContainerStyle={styles.listContent(isLoading)}
      ListHeaderComponentStyle={styles.header(isLoading)}
      {...rest}
      ListFooterComponent={ListFooter}
      ListHeaderComponent={ListHeader}
      ListFooterComponentStyle={ListFooterComponentStyle}
      data={data}
      ref={ref}
    />
  );
};

const styles = StyleSheet.create((theme, { insets }) => ({
  bottomSpacer: (bottomSpacing: ThemeSpacing | undefined) => {
    const spacing = bottomSpacing ? theme.spacing(bottomSpacing) : 0;
    return {
      height: spacing + insets.bottom,
    };
  },
  topSpacer: ({
    topSpacing,
  }: Required<Pick<CommonListProps, 'topSpacing'>>) => ({
    height:
      typeof topSpacing === 'boolean'
        ? theme.spacing(6)
        : theme.spacing(topSpacing),
  }),
  loader: {
    marginTop: theme.spacing('4'),
  },
  listHeader: (isLoading: boolean | undefined) => ({
    flex: isLoading ? 1 : undefined,
  }),
  scrollable: {
    flexGrow: 1,
  },
  listContent: (isLoading: boolean | undefined) => ({
    flexGrow: isLoading ? 1 : undefined,
  }),
  header: (isLoading: boolean | undefined) => ({
    flex: isLoading ? 1 : undefined,
  }),
}));
