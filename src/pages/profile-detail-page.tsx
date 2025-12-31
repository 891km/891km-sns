import ProfileInfo from "@/components/profile/profile-info";
import { ROUTES } from "@/constants/routes";
import { Navigate, useParams } from "react-router";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;
  if (!userId) return <Navigate to={ROUTES.HOME} replace />;
  return (
    <>
      <ProfileInfo userId={userId} />
    </>
  );
}
