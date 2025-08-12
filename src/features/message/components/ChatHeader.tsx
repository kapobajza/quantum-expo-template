import React from 'react';
import { View } from 'react-native';

import { HeaderBackButton } from '@/components/Navigation/HeaderBackButton';
import { HeaderTitle } from '@/components/Navigation/HeaderTitle';
import { useChatHeaderHeight } from '@/features/message/hooks/useChatHeaderHeight';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

export const ChatHeader = () => {
  const styles = useStyles(stylesheet);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.headerBackground}>
        <HeaderBackButton />
        <HeaderTitle center>{t('chat.title')}</HeaderTitle>
        <View style={styles.iconSection} />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme, { insets }) => {
  const { height, spacing } = useChatHeaderHeight();

  return {
    container: {
      position: 'absolute',
      top: 0,
      height: height + spacing,
      width: '100%',
      backgroundColor: theme.colors.background.main,
    },
    headerBackground: {
      height,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: theme.spacing.md,
    },
    iconSection: {
      width: theme.spacing['10'],
    },
    spacer: {
      height: insets.top,
    },
  };
});
