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
        queryFn: async () => {
          const { data } = await chatApi.getMessages(conversationId);
          return {
            results: data,
          };
        },
      }),
    };
  },
);
