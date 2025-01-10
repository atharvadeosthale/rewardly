import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/db";
import { Todo, todosTable } from "@/database/schemas/todo";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { usersTable } from "@/database/schemas/user";
import { TodoModal } from "./todo-modal";

async function TodoList() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerk_id, userId),
  });

  if (!user) return null;

  const todos = await db.query.todosTable.findMany({
    where: eq(todosTable.user_id, user.id),
  });

  if (!todos.length) {
    return (
      <div className="text-center text-muted-foreground">
        No todos yet. Start by adding one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo: Todo) => (
        <Card
          key={todo.id}
          className="group hover:border-primary/50 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{todo.title}</CardTitle>
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {todo.completed ? "Completed" : "In Progress"}
            </div>
          </CardContent>
        </Card>
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
