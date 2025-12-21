import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "@/store/todos";
import type { Todo } from "@/types/todo-type";

export default function TodoItem({ id, content }: Todo) {
  const deleteTodo = useDeleteTodo();

  const handleDeleteItem = () => {
    deleteTodo(id);
  };

  return (
    <div
      id={"todo" + id}
      className="radius flex items-center justify-between rounded-md border p-2 pl-3"
    >
      {content}
      <Button variant="destructive" onClick={handleDeleteItem}>
        삭제
      </Button>
    </div>
  );
}
