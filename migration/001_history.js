const { sql } = require("kysely");

async function up(db) {
    await db.schema
        .createTable("history")
        .addColumn("user_id", "varchar", (col) => col.notNull())
        .addColumn("line", "varchar", (col) => col.notNull())
        .addColumn("origin", "varchar", (col) => col.notNull())
        .addColumn("destination", "varchar", (col) => col.notNull())
        .addColumn("boarded_at", "date")
        .addColumn("memo", "text")
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.schema
        .createIndex("history_user_id_line_index")
        .on("history")
        .column("user_id")
        .column("line")
        .execute();
}

async function down(db) {
    await db.schema.dropTable("history").execute();
}

module.exports = { up, down };
