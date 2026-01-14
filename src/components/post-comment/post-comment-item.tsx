import { Link } from "react-router";
import ProfileInfo from "@/components/profile/profile-info";
import { Button } from "@/components/ui/button";
import type { NestedComment } from "@/types/types";
import { formatTimeAgo } from "@/lib/time";
import { useSessionUserId } from "@/store/session";
import { useEffect, useState } from "react";
import PostCommentEditor from "@/components/post-comment/post-comment-editor";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { TOAST_MESSAGES_COMMENT } from "@/constants/toast-messages";
import { useOpenAlertModal } from "@/store/alert-modal";
import { cn } from "@/lib/utils";

export default function PostCommentItem({
  comment,
}: {
  comment: NestedComment;
}) {
  const userId = useSessionUserId();

  const {
    id,
    author_id,
    post_id,
    parent_comment_id,
    root_comment_id,
    content,
    created_at,
    parentComment,
    children: replyComments,
  } = comment;

  const openAlertModal = useOpenAlertModal();

  const { mutate: deleteComment, isPending: isDeletePending } =
    useDeleteComment({
      onSuccess: () => {
        toast.info(TOAST_MESSAGES_COMMENT.DELETE.SUCCESS);
      },
      onError: () => {
        toast.error(TOAST_MESSAGES_COMMENT.DELETE.ERROR);
      },
    });

  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsReply] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setIsReply(false);
  }, []);

  const handleToggleReplyClick = () => {
    setIsReply(!isReply);
  };

  const handleEditCommentClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteCommentClick = () => {
    openAlertModal({
      title: "댓글을 삭제하시겠습니까?",
      description: "삭제된 댓글은 복구할 수 없습니다.",
      onAction: () => deleteComment(id),
    });
  };

  const isCurrentUser = userId === author_id;
  const isRootComment = root_comment_id === null;
  const isOverTwoLevels = parent_comment_id !== root_comment_id;

  return (
    <div
      className={cn(
        "flex flex-col pb-5 not-last:border-b",
        !isRootComment && "border-none p-0",
      )}
    >
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Link to={"#"}>
              <ProfileInfo authorId={author_id!} variant="simple" />
            </Link>
            <span className="text-muted-foreground text-sm whitespace-nowrap">
              {formatTimeAgo(created_at)}
            </span>
          </div>
          {isCurrentUser && (
            <div className="text-muted-foreground flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="p-1.5 sm:p-2"
                onClick={handleEditCommentClick}
              >
                {isEditing ? "취소" : "수정"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1.5 sm:p-2"
                disabled={isEditing || isDeletePending}
                onClick={handleDeleteCommentClick}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
        <div className="ml-14 flex flex-col items-start gap-2">
          <div className="flex w-full flex-col gap-1.5">
            {isOverTwoLevels && (
              <p className="w-[90%] truncate text-sm text-blue-300 sm:w-[65%]">
                ㄴ@{parentComment?.author.nickname}&nbsp;|&nbsp;
                {parentComment?.content}
              </p>
            )}
            {isEditing ? (
              <PostCommentEditor
                type="EDIT"
                commentId={id}
                initialContent={content}
                onClose={handleEditCommentClick}
              />
            ) : (
              <p className="whitespace-pre-line">{content}</p>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground p-1.5 text-sm"
            onClick={handleToggleReplyClick}
          >
            답글 달기
          </Button>

          {isReply && (
            <PostCommentEditor
              type="REPLY"
              postId={post_id}
              parentCommentId={id}
              rootCommentId={root_comment_id || id}
              onClose={handleToggleReplyClick}
            />
          )}
        </div>
      </div>

      {replyComments.length > 0 && (
        <div className="mt-4 flex w-full flex-col gap-4 pl-4 sm:pl-14">
          {replyComments.map((comment) => (
            <PostCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
