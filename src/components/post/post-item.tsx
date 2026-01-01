import ProfileInfo from "@/components/profile/profile-info";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ROUTES } from "@/constants/routes";
import { formatTimeAgo } from "@/lib/time";
import { useSessionUserId } from "@/store/session";
import type { PostWithAuthor } from "@/types/types";
import { HeartIcon, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function PostItem({ post }: { post: PostWithAuthor }) {
  const userId = useSessionUserId();
  const isCurrentUserPost = post.author_id === userId;
  const LIMIT_CONTENT_LENGTH = 180;

  const [isExtended, setIsExtensed] = useState(
    Boolean(post.content.length < LIMIT_CONTENT_LENGTH),
  );

  const handleExtendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExtensed(true);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-7 not-last:border-b">
      <div className="flex items-center justify-between">
        <ProfileInfo
          variant="post"
          userId={post.author_id}
          dateText={formatTimeAgo(post.created_at)}
        ></ProfileInfo>

        {isCurrentUserPost && (
          <div className="text-muted-foreground flex">
            <Button variant="ghost">수정</Button>
            <Button variant="ghost">삭제</Button>
          </div>
        )}
      </div>

      <Link
        to={ROUTES.POST_DETAIL.replace(":postId", String(post.id))}
        className="flex flex-col gap-4"
      >
        <p className="text-base/6.5">
          {!isExtended ? (
            <>
              {post.content.slice(0, LIMIT_CONTENT_LENGTH)}...
              <button
                className="cursor-pointer px-2 text-gray-400"
                onClick={handleExtendClick}
              >
                더보기
              </button>
            </>
          ) : (
            <>{post.content}</>
          )}
        </p>

        {post.image_urls && (
          <Carousel>
            <CarouselContent>
              {post.image_urls.map((imageUrl, index) => (
                <CarouselItem key={imageUrl} className="basis-auto">
                  <div className="relative h-64 w-fit flex-1 shrink-0 basis-auto overflow-hidden rounded-sm border">
                    <img
                      src={imageUrl}
                      alt={`게시된 이미지 ${index}`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </Link>

      <div className="flex gap-2">
        <Button variant="outline">
          <HeartIcon className="h-4 w-4" />
          <span>{post.like_count}</span>
        </Button>
        <Button variant="outline">
          <MessageSquare className="h-4 w-4" />
          <span>댓글 달기</span>
        </Button>
      </div>
    </div>
  );
}
