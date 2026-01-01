import ErrorMessage from "@/components/status/error-message";
import { useFetchPosts } from "@/hooks/queries/use-fetch-posts";
import Loader from "@/components/status/loader";
import PostItem from "@/components/post/post-item";

export default function PostFeed() {
  const { data: posts, error, isPending } = useFetchPosts();

  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
