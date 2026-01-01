import { fetchPosts } from "@/api/post-api";
import { QUERY_KEYS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPosts(),
  });
};
