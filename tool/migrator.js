const path = require("path");
const fs = require("node:fs/promises");
const { Kysely, PostgresDialect, Migrator, FileMigrationProvider } = require("kysely");
const { createKysely } = require("@vercel/postgres-kysely");
const { Pool } = require("pg");

async function migrateToLatest() {
    const db = process.env.VERCEL
        ? createKysely()
        : new Kysely({
            dialect: new PostgresDialect({
                pool: new Pool({
                    connectionString: process.env.POSTGRES_URL,
                }),
            }),
        });
    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            // This needs to be an absolute path.
            migrationFolder: path.join(__dirname, "../migration"),
        }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
        if (it.status === "Success") {
            console.log(
                `migration "${it.migrationName}" was executed successfully`,
            );
        } else if (it.status === "Error") {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });

    if (error) {
        console.error("failed to migrate");
        console.error(error);
        process.exit(1);
    }

    await db.destroy();
}

migrateToLatest();
