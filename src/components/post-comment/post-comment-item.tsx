import { Link } from "react-router";
import ProfileInfo from "@/components/profile/profile-info";
import { useSessionUserId } from "@/store/session";
import { Button } from "@/components/ui/button";

export default function PostCommentItem() {
  const tempAuthorId = useSessionUserId();

  return (
    <div className={"flex flex-col gap-2 pb-5 not-last:border-b"}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Link to={"#"}>
            <ProfileInfo authorId={tempAuthorId!} variant="simple" />
          </Link>
          <span className="text-muted-foreground text-sm">10분 전</span>
        </div>
        <div className="text-muted-foreground flex items-center">
          <Button variant="ghost" size="sm" className="p-2">
            수정
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            삭제
          </Button>
        </div>
      </div>
      <div className="ml-14 flex flex-col items-start gap-2">
        <p>댓글 컨텐츠</p>
        <Button variant="link" size="sm" className="text-muted-foreground p-0">
          댓글 더보기
        </Button>
      </div>
    </div>
  );
}
