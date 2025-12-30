import { loginWithOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useLoginWithOAuth = (callback?: UseMutationCallback) => {
  return useMutation({
    mutationFn: loginWithOAuth,
    onError: (error) => {
      if (callback?.onError) {
        callback.onError(error);
      }
    },
  });
};
