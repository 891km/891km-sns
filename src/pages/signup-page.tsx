import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useSignupWithPassword } from "@/hooks/mutations/use-signup-with-password";
import { useState } from "react";
import { Link } from "react-router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signupWithPassword } = useSignupWithPassword();

  const handleSignupWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signupWithPassword({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-8">
      <h2 className="pt-6 text-center text-xl font-bold">회원가입</h2>
      <div className="flex flex-col gap-4">
        <FloatingLabelInput
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingLabelInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full py-6"
          onClick={handleSignupWithPasswordClick}
          disabled={email.trim() === "" || password.trim() === ""}
        >
          회원가입
        </Button>
      </div>

      <div className="text-muted-foreground flex flex-col items-center gap-1">
        이미 계정이 있다면?
        <Link to="/login" className="text-black hover:font-semibold">
          로그인
        </Link>
      </div>
    </div>
  );
}
