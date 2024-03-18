"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { cn } from "~/utils/helpers/client";

export default function ActivityDetailsDrawer({ details }: { details?: any }) {
  const [snap, setSnap] = useState<number | string | null>(0.3);
  return (
    <>
      <Drawer
        open={true}
        modal={false}
        snapPoints={[0.3, 0.9]}
        dismissible={false}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <DrawerContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className={snap === null ? "h-30v" : `h-${Number(snap) * 100}v`}
        >
          <DrawerHeader
            className={cn("text-start", {
              "overflow-y-auto": snap === 0.8,
              "overflow-hidden": snap !== 0.8,
            })}
          >
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone.This action cannot be undone.This
              action cannot be undone.This action cannot be undone.This action
              cannot be undone.This action cannot be undone.This action cannot
              be undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.This action cannot be
              undone.This action cannot be undone.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className=" sticky bottom-0 z-30 w-full p-0">
            <Button className=" h-16 rounded-none rounded-t-3xl text-xl">
              Plan it
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
