import { router } from 'expo-router';
import React from 'react';

import { Box } from '@/components/Container/Box';
import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';
import { RouteName } from '@/constants/route';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';
import { UserConversationDto } from '@/types/api/chat.dto';

export const ConversationItem = ({ item }: { item: UserConversationDto }) => {
  const styles = useStyles(stylesheet);
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        router.push({
          pathname: RouteName.Chat.ById,
          params: { id: item.conversationId },
        });
      }}
    >
      <Box
        padding="3"
        borderRadius="full"
        backgroundColor="primary.0"
        justifyContent="center"
        alignItems="center"
      >
        <Icon name="User" color="primary.300" size="7" />
      </Box>
      <Box gap="1" fill>
        <Text variant="body.medium">{item.user.email}</Text>
        <Text
          variant="xSmall.regular"
          color="surface.text.main"
          numberOfLines={2}
        >
          {item.message.lastMessage?.content ?? t('conversations.noMessages')}
        </Text>
      </Box>
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    item: {
      backgroundColor: theme.colors.surface.background,
      padding: theme.spacing['4'],
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radii['4'],
      gap: theme.spacing['4'],
      marginBottom: theme.spacing['4'],
      height: theme.spacing['20'],
    },
  };
});
