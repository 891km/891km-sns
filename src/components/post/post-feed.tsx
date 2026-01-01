import { useFetchInfinitePosts } from "@/hooks/queries/use-fetch-infinite-posts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ErrorMessage from "@/components/status/error-message";
import Loader from "@/components/status/loader";
import PostItem from "@/components/post/post-item";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useFetchInfinitePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;
  return (
    <>
      <div className="flex flex-col">
        {data.pages.map((page) =>
          page.map((post) => <PostItem key={post.id} post={post} />),
        )}
      </div>
      {isFetchingNextPage && (
        <>
          <div className="border-b"></div>
          <Loader />
        </>
      )}
      <div ref={ref}></div>
    </>
  );
}
