import { create } from "zustand";

// Créez un store Zustand
export const useStepCountStore = create((set) => ({
  steps: 0,
  streak: 0,
  updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
  // Ajoutez une nouvelle action pour mettre à jour les pas
  updateSteps: (newStepsValue) => set({ steps: newStepsValue }),
}));
