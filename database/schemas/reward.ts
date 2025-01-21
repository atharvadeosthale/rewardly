import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./user";

export const rewardsTable = sqliteTable("rewards", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  cost: int("cost").notNull().default(0),
  createdBy: int("created_by")
    .notNull()
    .references(() => usersTable.id),
});

export type Reward = typeof rewardsTable.$inferSelect;
