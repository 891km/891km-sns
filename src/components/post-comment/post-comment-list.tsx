import PostCommentItem from "@/components/post-comment/post-comment-item";
import ErrorMessage from "@/components/status/error-message";
import Loader from "@/components/status/loader";
import { useFetchCommentsByPost } from "@/hooks/queries/use-fetch-comments-by-post";
import type { CommentItem, NestedComment } from "@/types/types";

function toNestedComments(comments: CommentItem[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      result.push({
        ...comment,
        children: [],
      });
    } else {
      const rootCommentIndex = result.findIndex(
        (item) => item.id === comment.root_comment_id,
      );

      if (rootCommentIndex === -1) return;

      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id,
      );

      if (!parentComment) return;

      result[rootCommentIndex].children.push({
        ...comment,
        parentComment,
        children: [],
      });
    }
  });

  return result;
}

export default function PostCommentList({ postId }: { postId: number }) {
  const { data: comments, error, isPending } = useFetchCommentsByPost(postId);

  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  const nestedComments = toNestedComments(comments);
  return (
    <>
      {comments.length > 0 && (
        <div className="flex items-center gap-1 text-lg font-bold">
          <span>댓글</span>
          <span>{comments.length}</span>
        </div>
      )}
      <div className="my-2 flex flex-col gap-5">
        {nestedComments.map((comment) => (
          <PostCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
