import { TriangleAlert } from "lucide-react";

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <TriangleAlert className="h-7 w-7 text-red-400" />
      <div className="text-center whitespace-pre-line">
        {message || "오류가 발생하였습니다.\n잠시 후 다시 시도해 주세요."}
      </div>
    </div>
  );
}
