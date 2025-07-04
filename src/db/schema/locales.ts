import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

import { UserLocaleCode, UserLocaleTag } from '@/locale/types';

export const locales = table('locales', {
  id: t.integer().primaryKey(),
  code: t.text().$type<UserLocaleCode>().notNull().unique(),
  tag: t.text().$type<UserLocaleTag>().notNull().unique(),
});
