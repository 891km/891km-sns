import { signupWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useSignupWithPassword = (callback?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signupWithPassword,
    onError: (error) => {
      if (callback?.onError) {
        callback.onError(error);
      }
    },
  });
};
