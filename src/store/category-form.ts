

import { create } from 'zustand';
export type ProgressStore = {
  progress: number;
  setProgress: (prog: number) => void;
};
export type CategoryStore = {
  label: string;
  visible: boolean;
  details: string;
  cover?: string;

  setLabel: (value: string) => void;
  setDetails: (value: string) => void;
  setCover: (cover: string) => void;

  setState: (newState: {
    label: string;
    description: string;
    details: string;
    visible: boolean;
    cover?: string;

  }) => void;
};
export const useProgressStore = create<ProgressStore>((set) => ({
  progress: 1,
  setProgress: (prog: number) => set(() => ({ progress: prog })),
}));

export const useCategoryStore = create<CategoryStore>((set) => ({
  label: '',
  details: '',
  visible: true,
  setLabel: (label: string) => set(() => ({ label })),
  setCover: (cover: string) => set(() => ({ cover })),
  setDetails: (details: string) => set(() => ({ details })),
  setState: (newState: {
    label: string;
    details: string;
    visible: boolean;
    cover?: string;
  }) => set(() => ({ ...newState })),
}));
