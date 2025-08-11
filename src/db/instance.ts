import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import { DatabaseRepository } from '@/db/context';

import { createConfigRepo } from './repo/configRepo';
import { createLocaleRepo } from './repo/localeRepo';
import { createQueryRepo } from './repo/queryRepo';
import * as schema from './schema';
import { SqliteDatabase } from './types';

const db = openDatabaseSync('your_db_name_here.db');

export const drizzleDb: SqliteDatabase = drizzle(db, {
  schema,
});

export const databaseRepository: DatabaseRepository = {
  localeRepository: createLocaleRepo(drizzleDb),
  queryRepository: createQueryRepo(drizzleDb),
  configRepository: createConfigRepo(drizzleDb),
};
