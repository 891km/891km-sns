import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todo-list";

export default function TodoListPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5 p-5">
      <h2 className="text-2xl font-bold">TodoList</h2>
      <TodoEditor />
      <TodoItems />
    </div>
  );
}

const TodoItems = () => {
  const { data: todoIds, isLoading, error } = useTodosData();

  if (error) return <div>오류가 발생하였습니다.</div>;
  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col-reverse gap-3">
      {todoIds?.map((todoId) => (
        <TodoItem key={todoId} id={todoId} />
      ))}
    </div>
  );
};
