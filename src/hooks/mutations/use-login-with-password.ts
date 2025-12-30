import { loginWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginWithPassword = () => {
  return useMutation({
    mutationFn: loginWithPassword,
  });
};
