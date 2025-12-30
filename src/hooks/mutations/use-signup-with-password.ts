import { signupWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignupWithPassword = () => {
  return useMutation({
    mutationFn: signupWithPassword,
  });
};
