import { ROUTES } from "@/constants/routes";
import GlobalLayout from "@/layouts/global-layout";
import GuestOnlyLayout from "@/layouts/guest-only-layout";
import UserOnlyLayout from "@/layouts/user-only-layout";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import IndexPage from "@/pages/index-page";
import LoginPage from "@/pages/login-page";
import NotFoundPage from "@/pages/not-found-page";
import PostDetailPage from "@/pages/post-detail-page";
import ProfileDetailPage from "@/pages/profile-detail-page";
import ResetPasswordPage from "@/pages/reset-password-page";
import SignupPage from "@/pages/signup-page";
import { Route, Routes } from "react-router";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
        </Route>

        <Route element={<UserOnlyLayout />}>
          <Route path={ROUTES.HOME} element={<IndexPage />} />
          <Route path={ROUTES.POST_DETAIL} element={<PostDetailPage />} />
          <Route path={ROUTES.PROFILE_DETAIL} element={<ProfileDetailPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
