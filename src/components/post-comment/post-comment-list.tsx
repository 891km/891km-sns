import PostCommentItem from "@/components/post-comment/post-comment-item";

export default function PostCommentList() {
  return (
    <div className="my-2 flex flex-col gap-5">
      <PostCommentItem />
      <PostCommentItem />
      <PostCommentItem />
    </div>
  );
}
