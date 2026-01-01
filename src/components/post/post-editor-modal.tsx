import ProfileInfo from "@/components/profile/profile-info";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";
import { cn } from "@/lib/utils";
import { useOpenAlertModal } from "@/store/alert-modal";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useSessionUserId } from "@/store/session";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ImageIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type ImageItem = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const store = usePostEditorModal();
  const userId = useSessionUserId();
  const openAlertModal = useOpenAlertModal();

  const MAX_COTENT_LENGTH = 800;
  const [content, setContent] = useState<string>("");
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      store.actions.close();
      toast.info("포스터를 성공적으로 게시하였습니다!");
    },
    onError: () => {
      toast.error("포스트 게시에 실패하였습니다.");
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      store.actions.close();
      toast.info("포스터를 성공적으로 수정하였습니다!");
    },
    onError: () => {
      toast.error("포스트 수정에 실패하였습니다.");
    },
  });

  const handleCloseModal = () => {
    if (store.isOpen && store.type === "EDIT" && content === store.content) {
      store.actions.close();
    } else if (!isEmptyContent || !isEmptyImages) {
      openAlertModal({
        title: "게시물 작성이 마무리 되지 않았습니다",
        description: "이 화면에서 나가면 작성 중인 내용이 사라집니다.",
        onAction: () => {
          store.actions.close();
        },
      });
      return;
    }
    store.actions.close();
  };

  const handleCreatePostClick = () => {
    if (!store.isOpen) return;
    if (store.type !== "CREATE") return;
    if (isEmptyContent || !userId) return;
    createPost({
      content,
      imageFiles: imageItems.map((imageItem) => imageItem.file),
      userId: userId,
    });
  };

  const handleUpdatePostClick = () => {
    if (!store.isOpen) return;
    if (store.type !== "EDIT") return;
    if (isEmptyContent || !userId || content === store.content) return;

    updatePost({
      id: store.postId,
      content,
    });
  };

  const handleFileInputClick = () => {
    fileInputRef?.current?.click();
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setImageItems((prev) => [
        ...prev,
        { file, previewUrl: URL.createObjectURL(file) },
      ]);
    });

    e.target.value = "";
  };

  const handleDeleteImageClick = (imageItem: ImageItem) => {
    setImageItems((prevImages) =>
      prevImages.filter(
        (prevImage) => prevImage.previewUrl !== imageItem.previewUrl,
      ),
    );
    URL.revokeObjectURL(imageItem.previewUrl);
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    if (!store.isOpen) {
      imageItems.forEach((imageItem) => {
        URL.revokeObjectURL(imageItem.previewUrl);
      });
      return;
    }
    1;
    if (store.type === "EDIT") {
      setContent(store.content);
      setImageItems([]);
    } else {
      setContent("");
      setImageItems([]);
    }
    textareaRef.current?.focus();
  }, [store.isOpen]);

  const isEmptyContent = !content.trim();
  const isEmptyImages = imageItems.length === 0;

  if (!store.isOpen) return;
  return (
    <Dialog open={store.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="flex max-h-[90vh] min-h-80 flex-col">
        <DialogHeader className="gap-8">
          <DialogTitle className="sm:text-center">
            {store.type === "CREATE" ? "포스트 작성" : "포스트 수정"}
          </DialogTitle>
          <ProfileInfo userId={userId!} variant="post-edit" />
          <DialogDescription className="sr-only">
            글을 입력하고 이미지를 첨부해 게시물을 작성할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-2 p-2">
            <textarea
              ref={textareaRef}
              className="min-h-30 w-full resize-none focus:outline-none"
              placeholder="나누고 싶은 이야기가 있나요?"
              name="content"
              value={content}
              maxLength={MAX_COTENT_LENGTH}
              onChange={(e) => setContent(e.target.value)}
              disabled={isCreatePostPending}
            />
            <span
              className={cn(
                "ml-auto text-sm",
                content.length === MAX_COTENT_LENGTH
                  ? "text-red-400"
                  : "text-muted-foreground",
              )}
            >
              {content.length} / {MAX_COTENT_LENGTH}
            </span>
          </div>
          {store.type === "EDIT" && store.imageUrls && (
            <Carousel>
              <CarouselContent>
                {store.imageUrls.map((imageUrl) => (
                  <CarouselItem key={imageUrl} className="basis-auto">
                    <div className="relative h-40 w-fit flex-1 shrink-0 basis-auto overflow-hidden rounded-sm border">
                      <img
                        src={imageUrl}
                        alt="선택된 이미지 미리보기"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
          {store.type === "CREATE" && imageItems.length > 0 && (
            <Carousel>
              <CarouselContent>
                {imageItems.map((imageItem) => (
                  <CarouselItem
                    key={imageItem.previewUrl}
                    className="basis-auto"
                  >
                    <div className="relative h-40 w-fit flex-1 shrink-0 basis-auto overflow-hidden rounded-sm border">
                      <img
                        src={imageItem.previewUrl}
                        alt="선택된 이미지 미리보기"
                        className="h-full w-auto object-contain"
                      />
                      <Button
                        size="icon-sm"
                        variant="secondary"
                        className="bg-secondary/60 absolute top-0 right-0 m-2.5 h-7 w-7"
                        aria-label="이미지 삭제"
                        onClick={() => handleDeleteImageClick(imageItem)}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
        <DialogFooter>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSelectImages}
          />
          <Tooltip delayDuration={1000}>
            <TooltipTrigger>
              <Button
                variant="outline"
                onClick={handleFileInputClick}
                disabled={isCreatePostPending || store.type === "EDIT"}
              >
                <ImageIcon />
                이미지 추가
              </Button>
            </TooltipTrigger>
            {store.type === "EDIT" && (
              <TooltipContent
                className={cn(
                  "bg-neutral-200 text-neutral-950",
                  "[&_svg]:bg-neutral-200 [&_svg]:fill-neutral-200",
                  "dark:bg-neutral-50",
                  "dark:[&_svg]:bg-neutral-50 dark:[&_svg]:fill-neutral-50",
                )}
              >
                <p>이미지는 수정할 수 없습니다.</p>
              </TooltipContent>
            )}
          </Tooltip>
          {store.type === "CREATE" && (
            <Button
              onClick={handleCreatePostClick}
              disabled={isCreatePostPending}
            >
              {isCreatePostPending && <Spinner />}
              게시하기
            </Button>
          )}
          {store.type === "EDIT" && (
            <Button
              onClick={handleUpdatePostClick}
              disabled={isUpdatePostPending || content === store.content}
            >
              {isUpdatePostPending && <Spinner />}
              수정하기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
