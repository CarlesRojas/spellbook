import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./server/database/schema",
    out: "./server/database/migration",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
