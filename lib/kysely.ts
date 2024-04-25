import { createKysely } from "@vercel/postgres-kysely";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export interface Database {}

export const db = process.env.VERCEL
    ? createKysely<Database>()
    : new Kysely<Database>({
          dialect: new PostgresDialect({
              pool: new Pool({
                  connectionString: process.env.POSTGRES_URL,
              }),
          }),
      });
