import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema";

const DATABASE_NAME = "db.db";
// Enable change listener if you want to use live queries
const expoDb = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });
export const db = drizzle(expoDb, { schema });
