import { useApi } from '@/api';

import { createQueryOptionsFactory } from './factory';

export const createChatsQueryOptions = createQueryOptionsFactory(
  'chats',
  () => {
    const { chatApi } = useApi();

    return {
      conversations: (userId: string | undefined) => ({
        queryKey: ['conversations', userId],
        async queryFn() {
          if (!userId) {
            return {
              results: [],
            };
          }
          const { data } = await chatApi.getConversations(userId);
          return {
            results: data,
          };
        },
      }),
      messages: (conversationId: string) => ({
        queryKey: ['messages', conversationId],
        queryFn: async (params: { limit: number }) => {
          const { data } = await chatApi.getMessages(
            conversationId,
            params.limit,
          );
          return {
            results: data,
          };
        },
      }),
    };
  },
);
