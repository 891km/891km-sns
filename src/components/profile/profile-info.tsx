import { useFetchProfile } from "@/hooks/queries/use-fetch-profile";
import defaultProfile from "@/assets/default-profile.png";
import ErrorMessage from "@/components/status/error-message";
import Loader from "@/components/status/loader";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router";

// type ProfileInfoVariant = "default" | "post-edit" | "post";

interface BaseProfileInfoProps {
  userId: string;
  variant?: "default" | "post-edit";
}

interface PostProfileInfoProps {
  userId: string;
  variant: "post";
  dateText: string;
}

type ProfileInfoProps = BaseProfileInfoProps | PostProfileInfoProps;

export default function ProfileInfo(props: ProfileInfoProps) {
  const { userId, variant } = props;
  const { data: profileData, error, isPending } = useFetchProfile(userId);

  if (error) return <ErrorMessage />;
  if (isPending) return <Loader />;

  if (variant === "post") {
    const { dateText } = props;
    return (
      <Link to={ROUTES.PROFILE_DETAIL.replace(":userId", userId)}>
        <div className="flex flex-row items-center gap-4">
          <img
            src={profileData?.profile_img_url || defaultProfile}
            alt="유저 프로필"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{profileData.nickname}</div>
            <div className="text-muted-foreground text-sm">{dateText}</div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "post-edit") {
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
