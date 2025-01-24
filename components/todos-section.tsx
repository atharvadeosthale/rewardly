import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { Todo } from "@/database/schemas/todo";
import { eq } from "drizzle-orm";
import { usersTable } from "@/database/schemas/user";
import { TodoModal } from "./todo-modal";
import TodoCard from "./todo-card";

async function TodoList() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerk_id, userId),
  });

  if (!user) return null;

  const todos = await db.query.todosTable.findMany({
    where: (todos) => eq(todos.user_id, user.id) && eq(todos.completed, 0),
  });

  if (!todos.length) {
    return (
      <div className="text-center text-muted-foreground">
        No todos yet. Start by adding one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
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
