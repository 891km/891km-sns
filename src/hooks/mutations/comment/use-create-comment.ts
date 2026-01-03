import { createComment } from "@/api/comment-api";
import { QUERY_KEYS } from "@/constants/constants";
import { useFetchProfile } from "@/hooks/queries/use-fetch-profile";
import { useSessionUserId } from "@/store/session";
import type { CommentItem, UseMutationCallback } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = (callback?: UseMutationCallback) => {
  const queryClient = useQueryClient();
  const userId = useSessionUserId();
  const { data: profile } = useFetchProfile(userId);

  return useMutation({
    mutationFn: createComment,
    onError: (error) => callback?.onError?.(error),
    onSuccess: (newComment) => {
      (callback?.onSuccess?.(),
        queryClient.setQueryData<CommentItem[]>(
          QUERY_KEYS.comment.byPost(newComment.post_id),
          (comments) => {
            if (!comments)
              throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");

            if (!profile) {
              throw new Error("사용자의 프로필 정보를 찾을 수 없습니다.");
            }

            return [...comments, { ...newComment, author: profile }]; // 오름차순
          },
        ));
    },
    onMutate: () => callback?.onMutate?.(),
    onSettled: () => callback?.onSettled?.(),
  });
};
