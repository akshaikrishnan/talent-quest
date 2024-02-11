import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ExamFooter() {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Button variant={"outline"}>
          <ChevronLeftIcon className="me-2" /> Previous
        </Button>
        <Button className="pl-5">
          Next
          <ChevronRightIcon className="ms-2" />
        </Button>
      </div>
    </footer>
  );
}
