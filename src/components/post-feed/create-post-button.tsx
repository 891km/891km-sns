import { PlusCircleIcon } from "lucide-react";
import { useOpenPostEditorModal } from "../../store/post-editor-modal";
import { useSessionUserId } from "@/store/session";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useOpenAlertModal } from "@/store/alert-modal";

export default function CreatePostButton() {
  const userId = useSessionUserId();
  const openPostEditorModal = useOpenPostEditorModal();
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    if (userId) {
      openPostEditorModal();
    } else {
      openAlertModal({
        title: "로그인이 필요한 서비스입니다.",
        description: "로그인 화면으로 이동하시겠습니까?",
        onAction: () => {
          navigate(ROUTES.LOGIN);
        },
      });
    }
  };

  return (
    <button
      className="bg-muted text-muted-foreground flex cursor-pointer items-center justify-between rounded-xl px-6 py-4"
      onClick={handleCreatePostClick}
    >
      <span>나누고 싶은 이야기가 있나요?</span>
      <PlusCircleIcon className="h-6 w-6" />
    </button>
  );
}
