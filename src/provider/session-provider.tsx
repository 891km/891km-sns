import AppLoader from "@/components/status/app-loader";
import { useFetchProfile } from "@/hooks/queries/use-fetch-profile";
import supabase from "@/lib/supabase";
import {
  useSetSession,
  useIsSessionLoaded,
  useSessionUserId,
} from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const userId = useSessionUserId();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isLoading: isProfileLoading } = useFetchProfile(userId);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded || isProfileLoading) return <AppLoader />;
  return children;
}
