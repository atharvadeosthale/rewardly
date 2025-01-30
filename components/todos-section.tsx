import { auth } from "@clerk/nextjs/server";
import { Todo } from "@/database/schemas/todo";
import { TodoModal } from "./todo-modal";
import TodoCard from "./todo-card";
import { fetchTodos } from "@/backend/getters/todo";

async function TodoList() {
  const { userId } = await auth.protect();

  const todos = await fetchTodos(userId);

  if (!todos || !todos.length) {
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
