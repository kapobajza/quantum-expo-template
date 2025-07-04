import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import { useState } from 'react';

import migrations from '@/db/drizzle/migrations';
import { SqliteDatabase } from '@/db/types';
import useMountEffect from '@/hooks/useMountEffect';
import { useService } from '@/services/ServiceProvider';

export const MigrationsRunner = ({
  database,
  children,
}: {
  children: React.ReactNode;
  database: SqliteDatabase;
}) => {
  const { loggingService } = useService();
  const [isLoading, setIsLoading] = useState(true);

  useMountEffect(() => {
    void (async () => {
      try {
        await migrate(database, migrations);
      } catch (error) {
        loggingService.captureException(error);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  if (isLoading) {
    return null;
  }

  return children;
};
