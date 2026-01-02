import { useFetchProfile } from "@/hooks/queries/use-fetch-profile";
import defaultProfile from "@/assets/default-profile.png";
import ErrorMessage from "@/components/status/error-message";
import Loader from "@/components/status/loader";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router";
import { UserRoundPenIcon } from "lucide-react";
import { useSessionUserId } from "@/store/session";

interface BaseProfileInfoProps {
  userId: string;
  variant?: "default" | "post-edit";
}

interface PostProfileInfoProps {
  authorId: string;
  variant: "post";
  dateText: string;
}

type ProfileInfoProps = BaseProfileInfoProps | PostProfileInfoProps;

export default function ProfileInfo(props: ProfileInfoProps) {
  const { variant } = props;

  if (variant === "post") return <PostProfileInfo {...props} />;
  if (variant === "post-edit") return <PostEditProfileInfo {...props} />;
  return <DefaultProfileInfo {...props} />;
}

// --- components
function PostProfileInfo(props: PostProfileInfoProps) {
  const currentUserId = useSessionUserId();
  const { dateText, authorId } = props;
  const { data: profileData, error, isPending } = useFetchProfile(authorId);
  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  return (
    <Link to={ROUTES.PROFILE_DETAIL.replace(":userId", authorId)}>
      <div className="flex flex-row items-center gap-4">
        <img
          src={profileData?.profile_img_url || defaultProfile}
          alt="유저 프로필"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <div className="font-medium">{profileData.nickname}</div>
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

function PostEditProfileInfo(props: BaseProfileInfoProps) {
  const { userId } = props;
  const { data: profileData, error, isPending } = useFetchProfile(userId);
  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-row items-center gap-3">
      <img
        src={profileData?.profile_img_url || defaultProfile}
        alt="유저 프로필"
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="tex-sm font-medium">{profileData.nickname}</div>
      </div>
    </div>
  );
}

function DefaultProfileInfo(props: BaseProfileInfoProps) {
  const { userId } = props;
  const { data: profileData, error, isPending } = useFetchProfile(userId);
  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10">
      <img
        src={profileData?.profile_img_url || defaultProfile}
        alt="유저 프로필"
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-bold">{profileData.nickname}</div>
        {profileData.bio && (
          <p className="text-muted-foreground">{profileData.bio}</p>
        )}
      </div>
    </div>
  );
}
