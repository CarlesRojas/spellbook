/* eslint-disable no-var */
import { env } from "@/env";
import * as schema from "@/server/database/schema/index";
import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
    var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
    db = drizzle(postgres(env.DATABASE_URL), { schema });
} else {
    if (!global.db) global.db = drizzle(postgres(env.DATABASE_URL), { schema });
    db = global.db;
}

export { db };

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
    "one" | "many",
    boolean,
    TSchema,
    TSchema[TableName]
>["with"];

export type InferResultType<
    TableName extends keyof TSchema,
    With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<TSchema, TSchema[TableName], { with: With }>;
