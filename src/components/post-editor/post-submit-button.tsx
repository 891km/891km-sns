import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";
import { usePostContent } from "@/provider/post-editor/post-content-provider";
import { usePostEditor } from "@/provider/post-editor/post-editor-provider";
import { usePostImages } from "@/provider/post-editor/post-images-provider";
import { toast } from "sonner";

export default function PostSubmitButton() {
  const { isEdit, userId, postId, isPending, closeModal } = usePostEditor();
  const { content, isEmptyContent, isContentChanged } = usePostContent();
  const { imageItems } = usePostImages();

  const { mutate: createPost } = useCreatePost({
    onSuccess: () => {
      closeModal();
      toast.info("포스터를 성공적으로 게시하였습니다!");
    },
    onError: () => {
      toast.error("포스트 게시에 실패하였습니다.");
    },
  });

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => {
      closeModal();
      toast.info("포스터를 성공적으로 수정하였습니다!");
    },
    onError: () => {
      toast.error("포스트 수정에 실패하였습니다.");
    },
  });

  const handleCreatePostClick = () => {
    if (isEdit) return;
    if (isEmptyContent || !userId) return;
    createPost({
      content,
      imageFiles: imageItems.map((imageItem) => imageItem.file),
      userId: userId,
    });
  };

  const handleUpdatePostClick = () => {
    if (!isEdit) return;
    if (isEmptyContent || !userId || !isContentChanged) return;

    updatePost({
      id: postId,
      content,
    });
  };

  return (
    <>
      {isEdit ? (
        <Button
          onClick={handleUpdatePostClick}
          disabled={isPending || !isContentChanged}
        >
          {isPending && <Spinner />}
          수정하기
        </Button>
      ) : (
        <Button onClick={handleCreatePostClick} disabled={isPending}>
          {isPending && <Spinner />}
          게시하기
        </Button>
      )}
    </>
  );
}
