import { Spinner } from "@/components/ui/spinner";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Spinner className="h-6 w-6" />
    </div>
  );
}
