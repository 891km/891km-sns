import PostItem from "@/components/post-item/post-item";
import { Navigate, useParams } from "react-router";

export default function PostDetailPage() {
  const params = useParams();
  const { postId } = params;
  if (!postId) return <Navigate to={"/"} />;

  return (
    <div>
      <PostItem postId={Number(postId)} type="DETAIL" />
    </div>
  );
}
