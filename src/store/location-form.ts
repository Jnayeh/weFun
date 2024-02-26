import { create } from 'zustand';
export type ProgressStore = {
  progress: number;
  setProgress: (prog: number) => void;
};
export type LocationStore = {
  label: string;
  visible: boolean;
  longitude?: number;
  latitude?: number;
  cover?: string;
  setLabel: (value: string) => void;
  setLongitude: (longitude: number) => void;
  setLatitude: (latitude: number) => void;
  setCover: (cover: string) => void;
  setState: (newState: {
    label: string;
    visible: boolean;
    latitude?: number;
    longitude?: number;
    cover?: string;
  }) => void;
};

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: 1,
  setProgress: (prog: number) => set(() => ({ progress: prog })),
}));


export const useLocationStore = create<LocationStore>((set) => ({
  label: '',
  visible: true,
  longitude: 0,
  latitude:0,
  setLabel: (label: string) => set(() => ({ label })),
  setLongitude: (longitude: number) => set(() => ({ longitude })),
  setLatitude: (latitude: number) => set(() => ({ latitude })),
  setCover: (cover: string) => set(() => ({ cover })),
  setState: (newState: {
    label: string;
    visible: boolean;
    latitude?: number;
    longitude?: number;
    cover?: string;
  }) => set(() => ({ ...newState })),
}));




// id: serial("id").primaryKey(),
// label: varchar("label", { length: 255 }),
// cover: varchar("cover", { length: 255 }),
// visible: smallint("visible").default(1),
// latitude: real("latitude"),
// longitude: real("longitude"),
// createdAt: timestamp("createdAt").defaultNow(),
// modifiedAt: timestamp("modifiedAt").defaultNow().onUpdateNow(),