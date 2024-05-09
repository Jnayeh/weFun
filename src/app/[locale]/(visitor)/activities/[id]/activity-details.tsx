"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/helpers/client";
import { useState } from "react";

export default function ActivityDetailsDrawer({ details }: { details?: any }) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div
            className={cn(
              "fixed bottom-0 z-50 h-[25dvh] w-full flex-col rounded-t-3xl border-none bg-slate-50"
            )}
          >
          </div>
        </DrawerTrigger>
        <DrawerContent style={{ height: "80%" }}>
          <DrawerHeader className={cn("text-start gap-0", "overflow-y-auto")}>
            <DrawerTitle className="text-2xl font-ubuntu">Terrain BasketBall</DrawerTitle>
            <DrawerDescription>
              <div className="font-bold text-muted-foreground pb-2">
                sports, basketball, fun
              </div>
              <div className="flex gap-2 w-full flex-wrap dark:text-black text-white text-center">
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">
                  20 people
                </div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">
                  40 dinars
                </div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">
                  something
                </div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">max 9</div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">a9reb wa9t</div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2">Tunis</div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2"></div>
                <div className="min-w-12 rounded-full bg-muted-foreground flex-auto p-2"></div>
              </div>
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
