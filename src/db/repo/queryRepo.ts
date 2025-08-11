import { eq, sql } from 'drizzle-orm';
import * as Crypto from 'expo-crypto';

import * as schema from '@/db/schema';
import { SqliteDatabase } from '@/db/types';

const QUERY_CLIENT_ID = 1;

export const createQueryRepo = (db: SqliteDatabase) => {
  return {
    initTx(callback: (tx: SqliteDatabase) => Promise<void>) {
      return db.transaction(callback);
    },
    insertQueryClient: (
      tx: SqliteDatabase,
      data: Omit<typeof schema.queryClients.$inferInsert, 'id'>,
    ) => {
      return tx
        .insert(schema.queryClients)
        .values({
          ...data,
          id: QUERY_CLIENT_ID,
        })
        .onConflictDoUpdate({
          target: schema.queryClients.id,
          set: {
            timestamp: sql.raw('excluded.timestamp'),
            buster: sql.raw('excluded.buster'),
          },
        })
        .returning({
          id: schema.queryClients.id,
        });
    },
    insertQueries: (
      tx: SqliteDatabase,
      data: (typeof schema.queries.$inferInsert)[],
    ) => {
      return tx
        .insert(schema.queries)
        .values(data)
        .onConflictDoUpdate({
          target: schema.queries.queryHash,
          set: {
            value: sql.raw('excluded.value'),
            queryClientId: sql.raw('excluded.queryClientId'),
          },
        })
        .returning();
    },
    insertMutations: (
      tx: SqliteDatabase,
      data: Omit<typeof schema.mutations.$inferInsert, 'id'>[],
    ) => {
      return tx
        .insert(schema.mutations)
        .values(
          data.map((mutation) => ({
            ...mutation,
            id: Crypto.randomUUID(),
          })),
        )
        .onConflictDoUpdate({
          target: schema.mutations.mutationKey,
          set: {
            value: sql.raw('excluded.value'),
            queryClientId: sql.raw('excluded.queryClientId'),
          },
        })
        .returning();
    },
    getQueryClient: async () => {
      return db
        .select({
          id: schema.queryClients.id,
          timestamp: schema.queryClients.timestamp,
          buster: schema.queryClients.buster,
          queries: schema.queries,
          mutations: schema.mutations,
        })
        .from(schema.queryClients)
        .leftJoin(
          schema.queries,
          eq(schema.queryClients.id, schema.queries.queryClientId),
        )
        .leftJoin(
          schema.mutations,
          eq(schema.queryClients.id, schema.mutations.queryClientId),
        )
        .where(eq(schema.queryClients.id, QUERY_CLIENT_ID));
    },
    removeQueryClient: async () => {
      return db
        .delete(schema.queryClients)
        .where(eq(schema.queryClients.id, QUERY_CLIENT_ID));
    },
  };
};

export type QueryRepo = ReturnType<typeof createQueryRepo>;
