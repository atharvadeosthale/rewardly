import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./user";

export const todosTable = sqliteTable("todos", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: int("completed").notNull().default(0),
  user_id: int("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export type Todo = typeof todosTable.$inferSelect;
