"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { todosTable } from "@/database/schemas/todo";
import { revalidatePath } from "next/cache";
import { usersTable } from "@/database/schemas";
import { eq } from "drizzle-orm";

type CreateTodoInput = {
  title: string;
  coins: number;
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
    completed: 0,
  });

  revalidatePath("/dashboard");
}
