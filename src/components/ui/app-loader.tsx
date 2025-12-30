import { Spinner } from "@/components/ui/spinner";

export default function AppLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
