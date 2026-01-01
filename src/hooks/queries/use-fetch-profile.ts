import { createProfile, fetchProfile } from "@/api/profile-api";
import { QUERY_KEYS } from "@/constants/constants";
import { useSessionUserId } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useFetchProfile = (userId?: string) => {
  const currentUserId = useSessionUserId();
  const isCurrentUser = userId === currentUserId;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profileData = await fetchProfile(userId!);
        return profileData;
      } catch (error) {
        if (isCurrentUser && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId,
  });
};
