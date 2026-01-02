import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";
import { PostContentProvider } from "@/provider/post-editor/post-content-provider";
import { PostImagesProvider } from "@/provider/post-editor/post-images-provider";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useSessionUserId } from "@/store/session";
import { createContext, useContext, type ReactNode } from "react";

type PostEditorContextValue = {
  userId: string;
  postId: number;
  isModalOpen: boolean;
  isEdit: boolean;
  isPending: boolean;
  closeModal: () => void;
};

const PostEditorContext = createContext<PostEditorContextValue | null>(null);

export const usePostEditor = () => {
  const ctx = useContext(PostEditorContext);
  if (!ctx) {
    throw new Error("usePostEditor는 PostEditorProvider가 있어야 합니다.");
  }
  return ctx;
};

export function PostEditorProvider({ children }: { children: ReactNode }) {
  const userId = useSessionUserId()!;
  const store = usePostEditorModal();

  const closeModal = () => {
    store.actions.close();
  };

  const { isPending: isCreatePostPending } = useCreatePost({});
  const { isPending: isUpdatePostPending } = useUpdatePost({});

  const isModalOpen = store.isOpen;
  const isEdit = isModalOpen && store.type === "EDIT";
  const postId = +(isEdit && store.postId);
  const isPending = isUpdatePostPending || isCreatePostPending;

  return (
    <PostContentProvider>
      <PostImagesProvider>
        <PostEditorContext.Provider
          value={{
            userId,
            postId,
            isModalOpen,
            isEdit,
            isPending,
            closeModal,
          }}
        >
          {children}
        </PostEditorContext.Provider>
      </PostImagesProvider>
    </PostContentProvider>
  );
}
