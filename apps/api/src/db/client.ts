import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "../utils/env.js";
import * as schema from "./schema.js";

loadEnv();

const defaultPath = path.join(process.cwd(), "drizzle", "data.sqlite");
const databasePath = process.env.DATABASE_URL ?? defaultPath;

const resolvedPath = path.isAbsolute(databasePath)
  ? databasePath
  : path.join(process.cwd(), databasePath);

fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

const sqlite = new Database(resolvedPath);

export const db = drizzle(sqlite, { schema });
export type DatabaseClient = typeof db;
