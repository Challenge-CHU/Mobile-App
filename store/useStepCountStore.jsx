import { create } from "zustand";

// Créez un store Zustand
export const useStepCountStore = create((set) => ({
  streak: 0,
  updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
}));
