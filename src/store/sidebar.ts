import { create } from "zustand";
export const useSideBarStore = create<{
  rightBarOpen: boolean;
  leftBarOpen: boolean;
  menuBarOpen: boolean;
  toggleLeftBar: () => void;
  toggleRightBar: () => void;
  toggleMenutBar: () => void;
}>((set) => ({
  leftBarOpen: false,
  rightBarOpen: false,
  menuBarOpen: false,
  toggleLeftBar: () =>
    set((state: { leftBarOpen: boolean }) => ({
      leftBarOpen: !state.leftBarOpen,
      rightBarOpen: false,
      menuBarOpen: false,
    })),
    toggleRightBar: () =>
      set((state: { rightBarOpen: boolean }) => ({
        rightBarOpen: !state.rightBarOpen,
        leftBarOpen: false,
        menuBarOpen: false,
      })),
      toggleMenutBar: () =>
        set((state: { menuBarOpen: boolean }) => ({
          menuBarOpen: !state.menuBarOpen,
          leftBarOpen: false,
          rightBarOpen: false,
        })),
}));
