import { create } from 'zustand';
export type ProgressStore = {
  progress: number;
  setProgress: (prog: number) => void;
};
export type ActivityStore = {
  label: string;
  description: string;
  location: string;
  visible: boolean;
  price?: number;
  discount?: number;
  capacity?: number;
  activity_duration?: number;
  categoryId?: number;
  setLabel: (value: string) => void;
  setDescription: (value: string) => void;
  setLocation: (value: string) => void;

  setPrice: (price: number) => void;
  setDiscount: (discount: number) => void;
  setCapacity: (capacity: number) => void;
  setActivityDuration: (activity_duration: number) => void;
  setCategoryId: (categoryId: number) => void;
  setState: (newState: {
    label: string;
    description: string;
    location: string;
    visible: boolean;
    price?: number;
    discount?: number;
    capacity?: number;
    activity_duration?: number;
    categoryId?: number;
  }) => void;
};
export const useProgressStore = create<ProgressStore>((set) => ({
  progress: 1,
  setProgress: (prog: number) => set(() => ({ progress: prog })),
}));

export const useActivityStore = create<ActivityStore>((set) => ({
  label: '',
  description: '',
  location: '',
  visible: true,
  discount: 0,
  setLabel: (label: string) => set(() => ({ label })),
  setDescription: (description: string) => set(() => ({ description })),
  setLocation: (location: string) => set(() => ({ location })),
  setPrice: (price: number) => set(() => ({ price })),
  setDiscount: (discount: number) => set(() => ({ discount })),
  setCapacity: (capacity: number) => set(() => ({ capacity })),
  setActivityDuration: (activity_duration: number) => set(() => ({ activity_duration })),
  setCategoryId: (categoryId: number) => set(() => ({ categoryId })),
  setState: (newState: {
    label: string;
    description: string;
    location: string;
    visible: boolean;
    price?: number;
    discount?: number;
    capacity?: number;
    activity_duration?: number;
    categoryId?: number;
  }) => set(() => ({ ...newState })),
}));
