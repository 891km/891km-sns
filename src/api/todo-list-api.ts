import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types/todo-list-type";

export async function fetchTodos() {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error("Fetch Failed");

  const data: Todo[] = await res.json();
  return data;
}

export async function fetchTodoById(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`);
  if (!res.ok) throw new Error("Fetch Failed");

  const data: Todo = await res.json();
  return data;
}

export async function createTodo(content: string) {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });
  if (!res.ok) throw new Error("Post Failed");

  const data: Todo = await res.json();
  return data;
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete Failed");

  const data: Todo = await res.json();
  return data;
}

export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const res = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Update Failed");

  const data: Todo = await res.json();
  return data;
}
