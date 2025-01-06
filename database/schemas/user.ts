import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  balance: int("balance").notNull().default(0),
  pro_user: int("pro_user").notNull().default(0),
});
