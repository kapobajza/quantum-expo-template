import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import * as Crypto from 'expo-crypto';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';

import { useApi } from '@/api';
import { RouteName } from '@/constants/route';
import { useMeQueryCached } from '@/hooks';
import { useMutation, useQueryKeyFactory } from '@/query';
import { ChatMessageDto } from '@/types/api/chat.dto';

export const useSendMessage = () => {
  const { chatApi } = useApi();
  const { id: conversationId } =
    useLocalSearchParams<typeof RouteName.Chat.ById>();
  const queryClient = useQueryClient();
  const queryKey = useQueryKeyFactory();
  const timeoutId = useRef<number>(undefined);
  const { data } = useMeQueryCached();

  return useMutation({
    mutationFn: async (message: string) => {
      return await chatApi.addNewMessage({
        conversationId: conversationId,
        content: message,
      });
    },
    onMutate(variables) {
      queryClient.setQueryData<InfiniteData<{ results: ChatMessageDto[] }>>(
        queryKey.chats.messages(conversationId),
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: [
                {
                  content: variables,
                  created_at: new Date().toISOString(),
                  id: Crypto.randomUUID(),
                  users_conversations: [
                    {
                      email: data?.email ?? '',
                      id: data?.id ?? '',
                    },
                  ],
                } satisfies ChatMessageDto,
                ...page.results,
              ],
            })),
          } satisfies InfiniteData<{ results: ChatMessageDto[] }>;
        },
      );
    },
    onSuccess() {
      clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        void queryClient.invalidateQueries({
          queryKey: queryKey.chats.messages(conversationId),
        });
      }, 3000);
    },
  });
};
