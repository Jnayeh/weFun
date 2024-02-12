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
} from "./ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function SheetComponent({
  button,
  ...props
}: SheetContentProps & { button: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent {...props}>
        <SheetHeader>
          <SheetTitle>Add Store</SheetTitle>
          <SheetDescription>
            Create your store and start placing weird items on the internet.
            Click Submit when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="flex gap-2 p-2">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
            <Button variant="default" size="sm">
                Done
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
