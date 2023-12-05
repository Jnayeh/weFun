import { create } from "zustand";
export const useSideBarStore = create<{
  rightBarOpen: boolean;
  leftBarOpen: boolean;
  toggleLeftBar: () => void;
  toggleRightBar: () => void;
}>((set) => ({
  leftBarOpen: true,
  rightBarOpen: false,
  toggleLeftBar: () =>
    set((state: { leftBarOpen: boolean }) => ({
      leftBarOpen: !state.leftBarOpen,
      rightBarOpen: false,
    })),
  toggleRightBar: () =>
    set((state: { rightBarOpen: boolean }) => ({
      rightBarOpen: !state.rightBarOpen,
      leftBarOpen: false,
    })),
}));
