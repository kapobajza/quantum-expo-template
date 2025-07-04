import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

import { queryClients } from './queryClients';

export const mutations = table('mutations', {
  id: t.text().notNull().primaryKey(),
  mutationKey: t.text(),
  value: t.text().notNull(),
  queryClientId: t.integer().references(() => queryClients.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});
