import { useQueryClient } from '@tanstack/react-query';

import { useApi } from '@/api';
import { useMeQueryCached } from '@/hooks';
import { useMutation, useQueryKeyFactory } from '@/query';

export const useStartRandomChat = () => {
  const { chatApi, userApi } = useApi();
  const { data } = useMeQueryCached();
  const queryClient = useQueryClient();
  const queryKey = useQueryKeyFactory();

  return useMutation({
    mutationFn: async () => {
      if (!data?.id) {
        throw new Error('User ID is not available');
      }

      const { data: randomUsers } = await userApi.getRandomUser(data.id);

      const { data: conversationRes } = await chatApi.startConversation({
        other_user_id: randomUsers[0].id,
      });

      return conversationRes.conversationId;
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: queryKey.chats.conversations(data?.id),
      });
    },
  });
};
