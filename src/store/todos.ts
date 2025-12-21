import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Todo } from "@/types/todo-type";

const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

export const useTodoStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content: content,
            });
          });
        },
        deleteTodo: (targetId: number) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => targetId !== todo.id);
          });
        },
      },
    })),
  ),
);

export const useTodos = () => {
  const todos = useTodoStore((store) => store.todos);
  return todos;
};

export const useCreateTodo = () => {
  const createTodo = useTodoStore((store) => store.actions.createTodo);
  return createTodo;
};

export const useDeleteTodo = () => {
  const deleteTodo = useTodoStore((store) => store.actions.deleteTodo);
  return deleteTodo;
};
