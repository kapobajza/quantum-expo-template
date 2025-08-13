import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useMeQueryCached } from '@/hooks';
import { useQueryKeyFactory } from '@/query';
import { useUpdateInfiniteQueryData } from '@/query/hooks/useUpdateInfiniteQueryData';
import { useService } from '@/services';
import { ChatMessageDto, UserConversationDto } from '@/types/api/chat.dto';

export const useSubscribeToNewMessages = () => {
  const { databaseService } = useService();
  const { data } = useMeQueryCached();
  const queryKey = useQueryKeyFactory();
  const { updateInfiniteQueryData } = useUpdateInfiniteQueryData();
  const timeoutId = useRef<number>(undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = databaseService.subscribeToNewMessage((event) => {
      clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        void queryClient.invalidateQueries({
          queryKey: queryKey.chats.messages(event.conversationId),
        });
        void queryClient.invalidateQueries({
          queryKey: queryKey.chats.conversations(data?.id),
        });
      }, 3000);

      if (event.userId === data?.id) {
        return;
      }

      updateInfiniteQueryData<ChatMessageDto>(
        queryKey.chats.messages(event.conversationId),
        (old) => {
          return [
            {
              content: event.message,
              created_at: new Date().toISOString(),
              id: event.messageId,
              user: {
                email: event.email,
                id: event.userId,
              },
            } satisfies ChatMessageDto,
            ...old,
          ];
        },
      );

      updateInfiniteQueryData<UserConversationDto>(
        queryKey.chats.conversations(data?.id),
        (old) => {
          return old.map((uc) => {
            if (uc.conversationId === event.conversationId) {
              return {
                ...uc,
                message: event.message,
                email: event.email,
                userId: event.userId,
              } satisfies UserConversationDto;
            }

            return uc;
          });
        },
      );
    });

    return () => {
      void unsubscribe();
    };
  }, [
    data?.id,
    databaseService,
    queryClient,
    queryKey.chats,
    updateInfiniteQueryData,
  ]);
};
