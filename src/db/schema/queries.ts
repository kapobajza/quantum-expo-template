import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

import { queryClients } from './queryClients';

export const queries = table('queries', {
  queryHash: t.text().notNull().primaryKey(),
  value: t.text().notNull(),
  queryClientId: t
    .integer()
    .notNull()
    .references(() => queryClients.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
