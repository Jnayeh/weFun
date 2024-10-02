import { create } from "zustand";
export const useActivityDetailStore = create<{
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}>((set) => ({
  open: false,
  openDrawer: () =>
    set((state: { open: boolean }) => ({
      open: true,
    })),
  closeDrawer: () =>
    set((state: { open: boolean }) => ({
      open: false,
    })),
}));
