import ProfileInfo from "@/components/profile/profile-info";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ROUTES } from "@/constants/routes";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { formatTimeAgo } from "@/lib/time";
import { useSessionUserId } from "@/store/session";
import type { PostWithAuthor } from "@/types/types";
import { HeartIcon, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/store/alert-modal";
import AppLoader from "@/components/status/app-loader";
import { useOpenEditPostEditorModal } from "../../store/post-editor-modal";

export default function PostItem({ post }: { post: PostWithAuthor }) {
  const userId = useSessionUserId();
  const isCurrentUserPost = post.author_id === userId;
  const LIMIT_CONTENT_LENGTH = 180;

  const [isExtended, setIsExtended] = useState<boolean>(
    Boolean(post.content.length < LIMIT_CONTENT_LENGTH),
  );

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
            <EditPostButton post={post} />
            <DeletePostButton postId={post.id} />
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
              <ExtendContentButton setIsExtended={setIsExtended} />
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
        <LikeButton likeCount={post.like_count} />
        <CommentButton />
      </div>
    </div>
  );
}

// --- button components

function EditPostButton({ post }: { post: PostWithAuthor }) {
  const openEditPostEditorModal = useOpenEditPostEditorModal();

  const handleEditPostClick = () => {
    openEditPostEditorModal({
      postId: post.id,
      content: post.content,
      imageUrls: post.image_urls,
    });
  };

  return (
    <Button variant="ghost" onClick={handleEditPostClick}>
      수정
    </Button>
  );
}

function DeletePostButton({ postId }: { postId: number }) {
  const openAlertModal = useOpenAlertModal();
  const { mutate: deletePost, isPending } = useDeletePost({
    onError: (error) => {
      toast.info(error.message);
    },
    onSuccess: () => {
      toast.info("게시물을 성공적으로 삭제하였습니다.");
    },
  });

  const handleDeletePostClick = () => {
    openAlertModal({
      title: "게시물을 삭제하시겠습니까?",
      description: "삭제하면 복구할 수 없습니다.",
      onAction: () => deletePost(postId),
    });
  };

  return (
    <>
      {isPending && <AppLoader />}
      <Button variant="ghost" onClick={handleDeletePostClick}>
        삭제
      </Button>
    </>
  );
}

function LikeButton({ likeCount }: { likeCount: number }) {
  return (
    <Button variant="outline">
      <HeartIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </Button>
  );
}

function CommentButton() {
  return (
    <Button variant="outline">
      <MessageSquare className="h-4 w-4" />
      <span>댓글 달기</span>
    </Button>
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
