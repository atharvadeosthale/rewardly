import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  clerk_id: text("clerk_id").notNull(),
  balance: int("balance").notNull().default(0),
  pro_user: int("pro_user").notNull().default(0),
});
