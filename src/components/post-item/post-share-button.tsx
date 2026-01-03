import { Share2Icon } from "lucide-react";
import { toast } from "sonner";

export default function PostShareButton({ postId }: { postId: number }) {
  const handleSharePostClick = () => {
    const url = `${import.meta.env.VITE_SITE_URL}/post/${postId}`;

    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("링크가 복사되었습니다."))
      .catch(() => toast.error("링크 복사에 실패했습니다."));
  };

  return (
    <button
      className="flex h-full w-full cursor-pointer items-center gap-2.5"
      onClick={handleSharePostClick}
    >
      <Share2Icon className="h-2 w-2" />
      <span>공유하기</span>
    </button>
  );
}
