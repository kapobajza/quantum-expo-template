import { eq } from 'drizzle-orm';

import * as schema from '@/db/schema';
import { SqliteDatabase } from '@/db/types';
import { ThemeAppearance } from '@/theme/types';

const CONFIG_ID = 1;

export const createConfigRepo = (db: SqliteDatabase) => {
  return {
    async getThemeApperance() {
      const config = await db.query.configs.findFirst({
        where: eq(schema.configs.id, CONFIG_ID),
      });

      return config?.theme ?? undefined;
    },
    setThemeApperance(theme: ThemeAppearance) {
      return db
        .insert(schema.configs)
        .values({ id: CONFIG_ID, theme })
        .onConflictDoUpdate({
          target: schema.configs.id,
          set: { theme },
        });
    },
    deleteThemeApperance() {
      return db.delete(schema.configs).where(eq(schema.configs.id, CONFIG_ID));
    },
  };
};

export type ConfigRepo = ReturnType<typeof createConfigRepo>;
