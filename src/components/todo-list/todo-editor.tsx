import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/hooks/queries/use-todo-list";
import { useState } from "react";

export default function TodoEditor() {
  const [content, setContent] = useState("");
  const { mutate: createTodo, isPending } = useCreateTodo();

  const handleAddItem = () => {
    if (content.trim() === "") return;
    createTodo(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="새로운 할 일을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleAddItem} disabled={isPending}>
        추가
      </Button>
    </div>
  );
}
