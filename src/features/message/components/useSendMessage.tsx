import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import * as Crypto from 'expo-crypto';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';

import { useApi } from '@/api';
import { RouteName } from '@/constants/route';
import { useMeQueryCached, useMountEffect } from '@/hooks';
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

  useMountEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
      void queryClient.invalidateQueries({
        queryKey: queryKey.chats.conversations(data?.id),
      });
    };
  });

  return useMutation({
    mutationFn: async (message: string) => {
      return await chatApi.addNewMessage({
        conversationId: conversationId,
        content: message,
      });
    },
    onMutate(variables) {
      const previousData = queryClient.getQueryData<
        InfiniteData<{ results: ChatMessageDto[] }>
      >(queryKey.chats.messages(conversationId));

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
                  user: {
                    email: data?.email ?? '',
                    id: data?.id ?? '',
                  },
                } satisfies ChatMessageDto,
                ...page.results,
              ],
            })),
          } satisfies InfiniteData<{ results: ChatMessageDto[] }>;
        },
      );

      return previousData;
    },
    onSuccess() {
      clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        void queryClient.invalidateQueries({
          queryKey: queryKey.chats.messages(conversationId),
        });
      }, 3000);
    },
    onError(error, _variables, context, showError, mapError) {
      if (context) {
        queryClient.setQueryData<InfiniteData<{ results: ChatMessageDto[] }>>(
          queryKey.chats.messages(conversationId),
          context,
        );
      }

      showError(mapError(error));
    },
  });
};
