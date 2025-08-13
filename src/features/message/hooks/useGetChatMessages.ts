import { useLocalSearchParams } from 'expo-router';

import { RouteName } from '@/constants/route';
import { useInfiniteQuery, useQueryOptionsFactory } from '@/query';

export const useGetChatMessages = () => {
  const queryOptions = useQueryOptionsFactory();
  const { id } = useLocalSearchParams<typeof RouteName.Chat.ById>();

  return useInfiniteQuery({ ...queryOptions.chats.messages(id), limit: 30 });
};
