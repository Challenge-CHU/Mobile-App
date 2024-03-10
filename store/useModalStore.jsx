import { create } from "zustand";

export const useModalStore = create((set, get) => ({
  isModalSettingsOpen: 0,
  updateModalSettings: (newValue) => set({ isModalSettingsOpen: newValue }),
}));
