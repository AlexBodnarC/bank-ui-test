import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

console.log(env.DATABASE_URL, env.DATABASE_TOKEN);

const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  createClient({ url: `${env.DATABASE_URL}?authToken=${env.DATABASE_TOKEN}` });
console.log(env.DATABASE_URL, env.DATABASE_TOKEN);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
