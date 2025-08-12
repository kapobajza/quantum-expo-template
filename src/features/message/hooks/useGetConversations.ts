import { useMeQueryCached } from '@/hooks';
import { useInfiniteQuery, useQueryOptionsFactory } from '@/query';

export const useGetConversations = () => {
  const queryOptions = useQueryOptionsFactory();
  const { data } = useMeQueryCached();

  return useInfiniteQuery(queryOptions.chats.conversations(data?.id));
};
