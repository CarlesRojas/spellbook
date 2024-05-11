import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const runMigrations = async () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set in the environment variables.");

    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: "server/database/migration" });

    await sql.end();
};

runMigrations();
