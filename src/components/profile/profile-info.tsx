import { useFetchProfile } from "@/hooks/queries/use-fetch-profile";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router";
import { UserRoundPenIcon } from "lucide-react";
import { useSessionUserId } from "@/store/session";
import { Button } from "@/components/ui/button";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";
import ProfileAvatar from "@/components/profile/profile-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface BaseProfileInfoProps {
  authorId: string;
  variant?: "default" | "simple";
}

interface PostProfileInfoProps {
  authorId: string;
  variant: "post";
  dateText: string;
}

interface GuestProfileInfoProps {
  variant: "guest";
}

type ProfileInfoProps =
  | BaseProfileInfoProps
  | PostProfileInfoProps
  | GuestProfileInfoProps;

export default function ProfileInfo(props: ProfileInfoProps) {
  const { variant } = props;

  if (variant === "guest") return <GuestProfileInfo />;
  if (variant === "post") return <PostProfileInfo {...props} />;
  if (variant === "simple") return <SimpleProfileInfo {...props} />;
  return <DefaultProfileInfo {...props} />;
}

// --- components
function PostProfileInfo(props: PostProfileInfoProps) {
  const currentUserId = useSessionUserId();
  const { dateText, authorId } = props;
  const { data: profile, error, isPending } = useFetchProfile(authorId);

  if (error || isPending)
    return (
      <div className="flex flex-row items-center gap-4">
        <ProfileAvatar isPending={isPending} />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );

  return (
    <Link to={ROUTES.PROFILE_DETAIL.replace(":authorId", authorId)}>
      <div className="flex flex-row items-center gap-4">
        <ProfileAvatar src={profile?.avatar_image_url} />
        <div>
          <div className="flex items-center gap-2">
            <div className="font-medium">{profile.nickname}</div>
            {currentUserId === authorId && (
              <span className="bg-muted flex h-5.5 w-5.5 items-center justify-center gap-1 rounded-full text-sm font-semibold">
                <UserRoundPenIcon className="text-muted-foreground h-3.5 w-auto pl-px" />
              </span>
            )}
          </div>
          <div className="text-muted-foreground text-sm">{dateText}</div>
        </div>
      </div>
    </Link>
  );
}

function SimpleProfileInfo(props: BaseProfileInfoProps) {
  const { authorId } = props;
  const { data: profile, error, isPending } = useFetchProfile(authorId);

  if (error || isPending)
    return (
      <div className="flex flex-row items-center gap-4">
        <ProfileAvatar isPending={isPending} />
        <Skeleton className="h-6 w-40" />
      </div>
    );

  return (
    <div className="flex flex-row items-center gap-3">
      <ProfileAvatar src={profile?.avatar_image_url} />
      <div className="flex flex-col items-center gap-2">
        <div className="tex-sm font-medium">{profile.nickname}</div>
      </div>
    </div>
  );
}

function DefaultProfileInfo(props: BaseProfileInfoProps) {
  const { authorId } = props;
  const userId = useSessionUserId();
  const openProfileEditorModal = useOpenProfileEditorModal();
  const { data: profile, error, isPending } = useFetchProfile(authorId);

  const handleEditProfileClick = () => {
    openProfileEditorModal();
  };

  const isCurrentUser = userId === authorId;

  if (error || isPending)
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-6">
        <ProfileAvatar size={30} isPending={isPending} />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-6 w-30" />
        </div>
        {isCurrentUser && (
          <Button variant="secondary" disabled={true}>
            프로필 수정
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-6">
      <ProfileAvatar src={profile.avatar_image_url} size={30} />
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-bold">{profile.nickname}</div>
        {profile.bio && (
          <p className="text-muted-foreground w-[87%] min-w-80 text-center sm:w-[50%]">
            {profile.bio}
          </p>
        )}
      </div>
      {isCurrentUser && (
        <Button variant="secondary" onClick={handleEditProfileClick}>
          프로필 수정
        </Button>
      )}
    </div>
  );
}

function GuestProfileInfo() {
  return (
    <div className="flex flex-row items-center gap-3">
      <ProfileAvatar src={null} />
      <div className="flex flex-col items-center gap-2">
        <div className="tex-sm font-medium">로그인 후 이용해 보세요</div>
      </div>
    </div>
  );
}
