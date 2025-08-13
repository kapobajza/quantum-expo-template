import z from 'zod';

import {
  chatMessageSchema,
  userConversationSchema,
} from '@/types/api/chat.dto';

import { createApiBuilder, createHttpClient } from './factory';

export const createChatApi = createApiBuilder((options) => {
  const usersConversationsHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'users_conversations',
  });

  const messagesHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'messages',
  });

  const rpcHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'rpc',
  });

  return {
    getConversations(userId: string) {
      return usersConversationsHttpClient.get({
        queryParams: {
          select:
            '...conversations!inner(conversationId:id,...messages!conversations_last_message_id_fkey(message:content,messageId:id,...org_users(userId:id,email))),fallbackUser:org_users!inner(email,id)',
          user_id: `eq.${userId}`,
          order: 'created_at.desc',
        },
        schema: z.array(userConversationSchema),
      });
    },
    getMessages(conversationId: string, limit: number) {
      return messagesHttpClient.get({
        queryParams: {
          select: 'id,content,created_at,user:org_users(email,id)',
          conversation_id: `eq.${conversationId}`,
          order: 'created_at.desc',
          limit,
        },
        schema: z.array(chatMessageSchema),
      });
    },
    startConversation(data: { other_user_id: string }) {
      return rpcHttpClient.post({
        path: 'start_conversation',
        body: {
          p_other_user_id: data.other_user_id,
        },
        schema: z.object({
          conversationId: z.string(),
        }),
      });
    },
    addNewMessage(data: { conversationId: string; content: string }) {
      return rpcHttpClient.post({
        path: 'add_new_message',
        body: {
          p_conversation_id: data.conversationId,
          p_content: data.content,
        },
        schema: z.object({
          messageId: z.string(),
        }),
      });
    },
  };
});

export type ChatApi = ReturnType<typeof createChatApi>;
