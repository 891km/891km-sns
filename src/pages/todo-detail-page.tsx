import { useTodoDataById } from "@/hooks/queries/use-todo-list";
import { useParams } from "react-router";

export default function TodoDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useTodoDataById(String(id), "DETAIL");

  if (isLoading) return <div>로딩중...</div>;
  if (error || !data) return <div>오류가 발생하였습니다.</div>;
  return <div>{data.content}</div>;
}
