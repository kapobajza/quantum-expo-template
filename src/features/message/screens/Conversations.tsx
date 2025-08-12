import React from 'react';

import { Button, Text } from '@/components';
import { Box } from '@/components/Container/Box';
import { ListContainer } from '@/components/Container/ListContainer';
import { FlatList } from '@/components/List';
import { Header } from '@/components/Navigation';
import { ConversationItem } from '@/features/message/components/ConversationItem';
import { useGetConversations } from '@/features/message/hooks/useGetConversations';
import { useStartRandomChat } from '@/features/message/hooks/useStartRandomChat';
import { useTranslation } from '@/locale';

const Conversations = () => {
  const { results = [], listProps } = useGetConversations();
  const { t } = useTranslation();
  const { mutate: startRandomChat, isPending } = useStartRandomChat();

  return (
    <>
      <Header title={t('chat.title')} canGoBack={false} />
      <ListContainer fill>
        <FlatList
          {...listProps}
          data={results}
          renderItem={({ item }) => {
            return <ConversationItem item={item} />;
          }}
          ListEmptyComponent={
            <Box gap="4" alignSelf="stretch">
              <Text center>{t('conversations.noResults.message')}</Text>
              <Button
                title={t('conversations.noResults.action')}
                onPress={() => {
                  startRandomChat();
                }}
                isLoading={isPending}
              />
            </Box>
          }
        />
      </ListContainer>
    </>
  );
};

export default Conversations;
