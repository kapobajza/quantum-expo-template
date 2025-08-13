import z from 'zod';

export const userConversationSchema = z.object({
  conversationId: z.string(),
  email: z.string().nullable(),
  message: z.string().nullable(),
  messageId: z.string(),
  userId: z.string(),
  fallbackUser: z.object({
    email: z.string(),
    id: z.string(),
  }),
});

export type UserConversationDto = z.infer<typeof userConversationSchema>;

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.string(),
  user: z.object({
    email: z.string(),
    id: z.string(),
  }),
});

export type ChatMessageDto = z.infer<typeof chatMessageSchema>;

export interface NewRealtimeMessage {
  conversationId: string;
  createdAt: string;
  email: string;
  id: string;
  message: string;
  userId: string;
  messageId: string;
}
