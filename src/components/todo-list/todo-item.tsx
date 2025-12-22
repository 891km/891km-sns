import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useDeleteTodo,
  useTodoDataById,
  useUpdateTodo,
} from "@/hooks/queries/use-todo-list";
import { Link } from "react-router";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo, isLoading } = useTodoDataById(id, "LIST");
  if (isLoading) return <div>로딩중...</div>;
  if (!todo) return;
  const { content, isDone } = todo;

  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  const handleClickCheckbox = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  const handleClickDelete = () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) return;
    deleteTodo(id);
  };

  return (
    <div
      id={"todo" + id}
      className="radius flex items-center justify-start gap-2 rounded-md border p-2 pl-3 hover:bg-gray-50"
    >
      <Checkbox
        checked={isDone}
        onClick={handleClickCheckbox}
        disabled={isDeleting}
      />
      <Link to={`/todolist/${id}`}>{content}</Link>
      <Button
        variant="destructive"
        onClick={handleClickDelete}
        className="ml-auto"
        disabled={isDeleting}
      >
        삭제
      </Button>
    </div>
  );
}
