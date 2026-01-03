import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { POST_COMMENT_LENGTH_MAX } from "@/constants/constants";
import { useRef, useState } from "react";

export default function PostCommentEditor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState("");

  return (
    <div className="flex w-full flex-col gap-2">
      <Textarea
        ref={textareaRef}
        className="max-h-40 min-h-20 w-full resize-none p-3 whitespace-pre-line focus:outline-none"
        placeholder="댓글을 남겨 보세요"
        name="content"
        value={comment}
        maxLength={POST_COMMENT_LENGTH_MAX}
        onChange={(e) => setComment(e.target.value)}
        // disabled={isPending}
      />
      <Button className="ml-auto">작성</Button>
    </div>
  );
}
