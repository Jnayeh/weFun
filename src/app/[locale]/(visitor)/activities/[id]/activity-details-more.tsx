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
import { cn } from "~/utils/helpers/client";
import { useActivityDetailStore } from "./drawer-store";

export default function ActivityMoreDetails({ details }: { details?: any }) {
  const { open, openDrawer } = useActivityDetailStore();
  return (
    <>
      <div
        className={cn(
          "z-50 fixed bottom-0 w-full flex-col h-[25dvh] rounded-t-3xl border-none bg-slate-50",
        )}
        onClick={openDrawer}
      >
        <div className="rounded"></div>
      </div>
    </>
  );
}
