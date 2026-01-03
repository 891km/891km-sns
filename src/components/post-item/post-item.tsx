import { useState } from "react";
import { Link } from "react-router";
import { Ellipsis } from "lucide-react";

import { formatTimeAgo } from "@/lib/time";
import { ROUTES } from "@/constants/routes";

import { useSessionUserId } from "@/store/session";
import { useFetchPostById } from "@/hooks/queries/use-fetch-post-by-id";

import ProfileInfo from "@/components/profile/profile-info";
import Loader from "@/components/status/loader";
import ErrorMessage from "@/components/status/error-message";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POST_CONTENT_LENGTH_MAX } from "@/constants/constants";
import PostImageContents from "@/components/post-item/post-image-contents";
import PostShareButton from "@/components/post-item/post-share-button";
import PostEditButton from "@/components/post-item/post-edit-button";
import PostDeleteButton from "@/components/post-item/post-delete-button";
import PostLikeButton from "@/components/post-item/post-like-button";
import PostCommentButton from "@/components/post-item/post-comment-button";

export default function PostItem({
  postId,
  type = "FEED",
}: {
  postId: number;
  type?: "FEED" | "DETAIL";
}) {
  const userId = useSessionUserId();
  const { data: post, isPending, error } = useFetchPostById({ postId, type });

  const [isExtended, setIsExtended] = useState<boolean>(
    type === "DETAIL"
      ? true
      : Boolean(post && post.content.length < POST_CONTENT_LENGTH_MAX),
  );

  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  const isCurrentUserPost = post.author_id === userId;

  return (
    <div className="flex flex-col gap-6 px-1 pb-7 not-last:border-b">
      <div className="flex items-center justify-between">
        <ProfileInfo
          variant="post"
          authorId={post.author_id}
          dateText={formatTimeAgo(post.created_at)}
        ></ProfileInfo>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
              aria-label="포스트 옵션 열기"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PostShareButton postId={postId} />
            </DropdownMenuItem>
            {isCurrentUserPost && (
              <>
                <DropdownMenuItem>
                  <PostEditButton post={post} />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PostDeleteButton postId={post.id} />
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link
        to={ROUTES.POST_DETAIL.replace(":postId", String(post.id))}
        className="flex flex-col gap-4"
      >
        {post.content && (
          <p className="text-base/6.5 whitespace-pre-line">
            {!isExtended ? (
              <>
                {post.content.slice(0, POST_CONTENT_LENGTH_MAX)}...
                <ExtendContentButton setIsExtended={setIsExtended} />
              </>
            ) : (
              <>{post.content}</>
            )}
          </p>
        )}

        {post.image_urls && <PostImageContents imageUrls={post.image_urls} />}
      </Link>

      <div className="flex gap-2">
        <PostLikeButton
          postId={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />
        {type === "FEED" && <PostCommentButton postId={post.id} />}
      </div>
    </div>
  );
}

function ExtendContentButton({
  setIsExtended,
}: {
  setIsExtended: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleExtendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExtended(true);
  };

  return (
    <button
      className="cursor-pointer px-2 text-gray-400"
      onClick={handleExtendClick}
    >
      더보기
    </button>
  );
}
