import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Grip, Ghost } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-8">
      <Toaster />
      <div className="flex gap-2">
        <Button
          onClick={() => {
            toast("토스트 메시지", {
              position: "top-center",
            });
          }}
        >
          Toast
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>팝오버 콘텐츠</PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Header</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
            </DialogHeader>
            <div>안녕하세요~</div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Alert Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col gap-2">
        <Input placeholder="입력하세요" />
        <Textarea placeholder="입력하세요" />
      </div>
      <div className="flex gap-2">
        <Button>버튼</Button>
        <Button variant="destructive">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button variant="secondary">버튼</Button>
        <Button variant="ghost">버튼</Button>
        <Button variant="link">버튼</Button>
      </div>
      <div>
        <Carousel className="mx-10">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem className="flex basis-1/3 justify-center">
                {index + 1}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex gap-2">
        <Grip className="h-6 w-6 text-red-500" />
        <Ghost className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}

export default App;
