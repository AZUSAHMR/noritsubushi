import { createKysely } from "@vercel/postgres-kysely";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

interface HistoryTable {
    user_id: string;
    line: string;
    origin: string;
    destination: string;
    boarded_at: Date | null;
    memo: string | null;
    created_at: Date;
}

export interface Database {
    history: HistoryTable;
}

export const db = process.env.VERCEL
    ? createKysely<Database>()
    : new Kysely<Database>({
          dialect: new PostgresDialect({
              pool: new Pool({
                  connectionString: process.env.POSTGRES_URL,
              }),
          }),
      });
