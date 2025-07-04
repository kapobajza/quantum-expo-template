import * as schema from '@/db/schema';
import { SqliteDatabase } from '@/db/types';
import { UserLocale } from '@/locale';

const LOCALE_ID = 1;

export const createLocaleRepo = (db: SqliteDatabase) => {
  return {
    async getLocale() {
      return db.query.locales.findFirst();
    },
    setLocale(locale: UserLocale) {
      return db
        .insert(schema.locales)
        .values({
          ...locale,
          id: LOCALE_ID,
        })
        .onConflictDoUpdate({
          target: schema.locales.id,
          set: {
            code: locale.code,
            tag: locale.tag,
          },
        })
        .returning();
    },
  };
};

export type LocaleRepo = ReturnType<typeof createLocaleRepo>;
