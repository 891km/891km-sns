import { createContext, useContext, type ReactNode, useState } from "react";

// -- images state
type ImageItem = {
  file: File;
  previewUrl: string;
};

type PostImagesContextValue = {
  imageItems: ImageItem[];
  setImageItems: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  isEmptyImages: boolean;
};

const PostImagesContext = createContext<PostImagesContextValue | null>(null);

export const usePostImages = () => {
  const ctx = useContext(PostImagesContext);
  if (!ctx) {
    throw new Error("usePostImages는 usePostImagesProvider가 있어야 합니다.");
  }
  return ctx;
};

export function PostImagesProvider({ children }: { children: ReactNode }) {
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const isEmptyImages = imageItems.length === 0;

  return (
    <PostImagesContext.Provider
      value={{
        imageItems,
        setImageItems,
        isEmptyImages,
      }}
    >
      {children}
    </PostImagesContext.Provider>
  );
}
