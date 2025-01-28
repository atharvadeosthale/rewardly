import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { Todo, todosTable } from "@/database/schemas/todo";
import { and, eq } from "drizzle-orm";
import { usersTable } from "@/database/schemas/user";
import { TodoModal } from "./todo-modal";
import TodoCard from "./todo-card";

async function TodoList() {
  const { userId } = await auth();
  if (!userId) return null;

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

  if (!todos.length) {
    return (
      <div className="text-center text-muted-foreground mt-5">
        No todos yet. Start by adding one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      {todos.map((todo: Todo) => (
        <TodoCard todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default async function TodosSection() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
        <TodoModal />
      </div>
      <TodoList />
    </div>
  );
}
