import defaultProfile from "@/assets/default-profile.png";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProfileAvatar({
  src,
  size = 10,
  className,
  isPending = false,
}: {
  src?: string | null;
  /** tailwindcss 사이즈 기준 */
  size?: number;
  className?: string;
  isPending?: boolean;
}) {
  return (
    <>
      {isPending ? (
        <Skeleton
          style={{ width: size * 4, height: size * 4 }}
          className={cn(
            `h-${size} w-${size}`,
            "text-muted rounded-full ring-1 ring-current",
          )}
        />
      ) : (
        <img
          src={src || defaultProfile}
          alt="유저 프로필"
          style={{ width: size * 4, height: size * 4 }}
          className={cn(
            "text-muted rounded-full object-cover ring-1 ring-current",
            className,
          )}
        />
      )}
    </>
  );
}
