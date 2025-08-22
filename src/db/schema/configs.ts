import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

import { ThemeAppearance } from '@/theme/types';

export const configs = table('configs', {
  id: t.integer().primaryKey(),
  theme: t.text().$type<ThemeAppearance>(),
});
