"use server";

import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { todosTable } from "@/database/schemas/todo";
import { revalidatePath } from "next/cache";
import { usersTable } from "@/database/schemas";
import { eq } from "drizzle-orm";

type CreateTodoInput = {
  title: string;
  coins: number;
  description?: string;
};

export async function createTodo(input: CreateTodoInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  await db.insert(todosTable).values({
    title: input.title,
    user_id: user[0].id,
    rewardCoins: input.coins,
    completed: 0,
    description: input.description,
  });

  revalidatePath("/dashboard");
}

export async function completeTodo(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  const [todo] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));

  if (!todo || todo.user_id !== user[0].id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(todosTable)
    .set({ completed: 1 })
    .where(eq(todosTable.id, id));

  await db
    .update(usersTable)
    .set({ balance: user[0].balance + todo.rewardCoins })
    .where(eq(usersTable.id, user[0].id));

  revalidatePath("/dashboard");
}

export async function deleteTodo(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  const [todo] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));

  if (!todo || todo.user_id !== user[0].id) {
    throw new Error("Unauthorized");
  }

  await db.delete(todosTable).where(eq(todosTable.id, id));
  revalidatePath("/dashboard");
}
