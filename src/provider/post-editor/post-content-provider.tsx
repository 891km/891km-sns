import { usePostEditorModal } from "@/store/post-editor-modal";
import { createContext, useContext, useState, type ReactNode } from "react";

// --- content state
type PostContentContextValue = {
  content: string;
  setContent: (v: string) => void;
  isEmptyContent: boolean;
  isContentChanged: boolean;
};

const PostContentContext = createContext<PostContentContextValue | null>(null);

export const usePostContent = () => {
  const ctx = useContext(PostContentContext);
  if (!ctx) {
    throw new Error("usePostContent는 PostContentProvider가 있어야 합니다.");
  }
  return ctx;
};

export function PostContentProvider({ children }: { children: ReactNode }) {
  const store = usePostEditorModal();
  const [content, setContent] = useState("");
  const isEmptyContent = !content.trim();
  const isContentChanged =
    store.isOpen && store.type === "EDIT" && content !== store.content;

  return (
    <PostContentContext.Provider
      value={{
        content,
        setContent,
        isEmptyContent,
        isContentChanged,
      }}
    >
      {children}
    </PostContentContext.Provider>
  );
}
