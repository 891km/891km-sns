import CreatePostButton from "@/components/post-feed/create-post-button";
import PostFeed from "@/components/post-feed/post-feed";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-7">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
