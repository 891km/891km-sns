import { Button } from "@/components/ui/button";
import { useTogglePostLike } from "@/hooks/mutations/post/use-toggle-post-like";
import { getLikeErrorMessageKo } from "@/lib/error-code-ko";
import { cn } from "@/lib/utils";
import { useSessionUserId } from "@/store/session";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PostLikeButton({
  postId,
  likeCount,
  isLiked,
}: {
  postId: number;
  likeCount: number;
  isLiked: boolean;
}) {
  const userId = useSessionUserId();
  const { mutate: togglePostLike } = useTogglePostLike({
    onError: (error) => {
      toast.error(getLikeErrorMessageKo(error));
    },
  });

  const [isToggling, setIsToggling] = useState(false);

  const handleLikeClick = () => {
    if (!isLiked) {
      setIsToggling(true);

      setTimeout(() => {
        setIsToggling(false);
      }, 500);
    }

    togglePostLike({ postId, userId: userId! });
  };

  return (
    <Button variant="outline" onClick={handleLikeClick}>
      <HeartIcon
        className={cn(
          "h-4 w-4",
          isToggling ? "animate-(--like-ping)" : "animate-none",
          isLiked && "fill-current",
        )}
      />
      <span>{likeCount}</span>
    </Button>
  );
}
