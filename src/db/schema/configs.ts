import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

import { ThemeApperance } from '@/theme';

export const configs = table('configs', {
  id: t.integer().primaryKey(),
  theme: t.text().$type<ThemeApperance>(),
});
