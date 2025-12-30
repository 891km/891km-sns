import { Link } from "react-router";
import { useState } from "react";
import { useLoginWithPassword } from "@/hooks/mutations/use-login-with-password";
import { useLoginWithOAuth } from "@/hooks/mutations/use-login-with-oauth";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import githubLogo from "@/assets/github-mark.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: loginWithPassword } = useLoginWithPassword();
  const { mutate: loginWithOAuth } = useLoginWithOAuth();

  const handleLoginWithPasswordClick = () => {
    if (email.trim() === "" || password.trim() === "") return;
    loginWithPassword({ email, password });

    setEmail("");
    setPassword("");
  };

  const handleLoginWithGithubClick = () => {
    loginWithOAuth("github");
  };

  const handleLoginWithTestClick = () => {
    window.alert("아직 제공하지 않는 서비스입니다.");
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-8">
      <h2 className="pt-6 text-center text-xl font-bold">로그인</h2>
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
          disabled={email.trim() === "" || password.trim() === ""}
          onClick={handleLoginWithPasswordClick}
        >
          로그인
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-muted-foreground before:text-border after:text-border flex items-center justify-center gap-2 text-sm before:flex-1 before:border-t before:content-[''] after:flex-1 after:border-t after:content-['']">
          또는
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full py-6"
            onClick={handleLoginWithGithubClick}
          >
            <img src={githubLogo} alt="" className="h-5 w-5" />
            Github로 로그인
          </Button>
          <Button
            variant="outline"
            className="w-full py-6"
            onClick={handleLoginWithTestClick}
          >
            테스트 계정으로 로그인
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground flex flex-col items-center gap-1">
        아직 계정이 없다면?
        <Link to="/signup" className="text-black hover:font-semibold">
          회원가입
        </Link>
      </div>
    </div>
  );
}
