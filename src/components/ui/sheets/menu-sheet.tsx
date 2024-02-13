"use client";

import { useState } from "react";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
  SheetContentProps,
  SheetFooter,
} from "~/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/helpers/server";

export default function MenuSheet({ ...props }: SheetContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Menu button"
          className={cn(
            `absolute bottom-20 right-2 flex h-12 w-12  items-center justify-center rounded-full bg-slate-600 p-2 text-2xl text-white hover:bg-red-900`
          )}
        >
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent {...props}>
        <SheetHeader>
          <SheetTitle>Add Store</SheetTitle>
          <SheetDescription>
            Create your store and start placing weird items on the internet.
            Click Submit when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="flex gap-2 p-2">
          <Button variant="default" size="sm">
            Done
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
