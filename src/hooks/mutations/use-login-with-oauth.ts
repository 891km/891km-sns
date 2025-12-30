import { loginWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginWithOAuth = () => {
  return useMutation({
    mutationFn: loginWithOAuth,
  });
};
