import AppLoader from "@/components/ui/app-loader";
import supabase from "@/lib/supabase";
import { useSetSession, useIsSessionLoaded } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const IsSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!IsSessionLoaded) return <AppLoader />;
  return children;
}
