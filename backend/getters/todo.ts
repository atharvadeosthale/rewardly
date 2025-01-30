// Getters that ONLY run on server

import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { usersTable } from "@/database/schemas/user";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { todosTable } from "@/database/schemas/todo";

export async function fetchTodos(userId: string) {
  "use cache";
  cacheTag(`todos-${userId}`);

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!user) return null;

  const todos = await db
    .select()
    .from(todosTable)
    .where(and(eq(todosTable.user_id, user.id), eq(todosTable.completed, 0)));

  return todos;
}
