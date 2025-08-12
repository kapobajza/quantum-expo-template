import z from 'zod';

export const userConversationSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
  message: z.object({
    id: z.string(),
    lastMessage: z
      .object({
        id: z.string(),
        content: z.string(),
        created_at: z.string(),
      })
      .nullable(),
  }),
  conversationId: z.string(),
});

export type UserConversationDto = z.infer<typeof userConversationSchema>;

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.string(),
  users_conversations: z.array(
    z.object({
      email: z.string(),
      id: z.string(),
    }),
  ),
});

export type ChatMessageDto = z.infer<typeof chatMessageSchema>;
