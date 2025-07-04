import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

export const queryClients = table('query_clients', {
  id: t.integer().notNull().primaryKey(),
  timestamp: t.integer().notNull(),
  buster: t.text().notNull(),
});
