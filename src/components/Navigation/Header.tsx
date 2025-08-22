import { Header as RNHeader } from '@react-navigation/elements';
import { ComponentProps, ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useTranslation } from '@/locale';

import { HeaderBackButton } from './HeaderBackButton';
import { HeaderTitle } from './HeaderTitle';

type RNHeaderProps = ComponentProps<typeof RNHeader>;

export interface HeaderProps extends Omit<RNHeaderProps, 'title'> {
  canGoBack?: boolean;
  modal?: boolean;
  title: string | ReactNode;
}

export const Header = ({
  title,
  canGoBack,
  modal,
  headerRight,
  headerTitleAlign,
  headerLeft,
  headerStyle,
  ...props
}: HeaderProps) => {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <RNHeader
      {...props}
      title={typeof title === 'string' ? title : ''}
      headerTitle={() =>
        typeof title === 'string' ? <HeaderTitle>{title}</HeaderTitle> : title
      }
      back={
        canGoBack
          ? {
              title: t('general.back'),
              href: undefined,
            }
          : undefined
      }
      headerLeft={
        headerLeft ??
        ((props) => {
          return canGoBack ? (
            <View>
              <HeaderBackButton {...props} modal={modal} />
            </View>
          ) : null;
        })
      }
      headerRight={
        headerRight
          ? (props) => (
              <View style={styles.headerRight}>{headerRight(props)}</View>
            )
          : undefined
      }
      headerStatusBarHeight={
        modal && Platform.OS === 'ios' ? theme.spacing('2') : undefined
      }
      modal={modal}
      headerStyle={[styles.headerBackgroundContainer, headerStyle]}
      headerTitleAlign={headerTitleAlign}
    />
  );
};

const styles = StyleSheet.create((theme) => {
  return {
    headerRight: {
      marginEnd: theme.spacing('md'),
    },
    headerBackgroundContainer: {
      backgroundColor: theme.colors.background.main,
      ...theme.shadows.medium,
    },
  };
});
