import { createClient } from '@supabase/supabase-js';

import { AppEnv } from '@/env';
import { NewRealtimeMessage } from '@/types/api/chat.dto';

export const createDatabaseService = (env: AppEnv) => {
  const supabase = createClient(env.API_BASE_URL, env.API_KEY);

  return {
    subscribeToNewMessage: (
      onMessage: (message: NewRealtimeMessage) => void,
    ) => {
      const channel = supabase
        .channel('chat')
        .on(
          'broadcast',
          {
            event: 'new_message',
          },
          (event) => {
            onMessage(event.payload as NewRealtimeMessage);
          },
        )
        .subscribe();

      return () => channel.unsubscribe();
    },
    setAccessToken: (token: string) => {
      return supabase.realtime.setAuth(token);
    },
  };
};

export type DatabaseService = ReturnType<typeof createDatabaseService>;
