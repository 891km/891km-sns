import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { MessageSquareIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function PostCommentButton({
  postId,
  count,
}: {
  postId: number;
  count: number;
}) {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(ROUTES.POST_DETAIL.replace(":postId", String(postId)));
  };

  return (
    <Button variant="outline" onClick={handleCommentClick}>
      <MessageSquareIcon className="h-4 w-4" />
      <span>{count}</span>
      <span>댓글 달기</span>
    </Button>
  );
}
