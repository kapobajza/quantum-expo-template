import { useApi } from '@/api';
import { useMeQueryCached } from '@/hooks';
import { useMutation } from '@/query';

export const useStartRandomChat = () => {
  const { chatApi, userApi } = useApi();
  const { data } = useMeQueryCached();
  return useMutation({
    mutationFn: async () => {
      if (!data?.id) {
        throw new Error('User ID is not available');
      }

      const { data: randomUsers } = await userApi.getRandomUser(data.id);

      const { data: conversationRes } = await chatApi.startConversation({
        user_id: data.id,
        other_user_id: randomUsers[0].id,
      });

      return conversationRes.conversationId;
    },
  });
};
