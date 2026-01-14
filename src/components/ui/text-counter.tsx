import { cn } from "@/lib/utils";

export default function TextCounter({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  return (
    <span
      className={cn(
        "ml-auto text-sm",
        current === max ? "text-red-400" : "text-muted-foreground",
      )}
    >
      {current} / {max}
    </span>
  );
}
