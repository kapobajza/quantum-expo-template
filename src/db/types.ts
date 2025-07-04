import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';

import * as schema from '@/db/schema';

export type SqliteDatabase = ExpoSQLiteDatabase<typeof schema>;
