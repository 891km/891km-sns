import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { usePostEditor } from "@/provider/post-editor/post-editor-provider";
import { usePostImages } from "@/provider/post-editor/post-images-provider";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { XIcon } from "lucide-react";

type ImageItem = {
  file: File;
  previewUrl: string;
};

export default function PostImagePreview() {
  const store = usePostEditorModal();

  const { isEdit } = usePostEditor();
  const { imageItems, setImageItems } = usePostImages();

  const handleDeleteImageClick = (imageItem: ImageItem) => {
    setImageItems((prevImages) =>
      prevImages.filter(
        (prevImage) => prevImage.previewUrl !== imageItem.previewUrl,
      ),
    );
    URL.revokeObjectURL(imageItem.previewUrl);
  };

  return (
    <>
      {store.isOpen && store.type === "EDIT" && store.imageUrls && (
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
      {!isEdit && imageItems.length > 0 && (
        <Carousel>
          <CarouselContent>
            {imageItems.map((imageItem) => (
              <CarouselItem key={imageItem.previewUrl} className="basis-auto">
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
    </>
  );
}
