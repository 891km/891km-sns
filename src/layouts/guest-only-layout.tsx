import { ROUTES } from "@/constants/routes";
import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const session = useSession();
  if (session) return <Navigate to={ROUTES.HOME} replace={true} />;
  return <Outlet />;
}
