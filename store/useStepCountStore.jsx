import { create } from "zustand";


export const useStepCountStore = create((set) => ({
  startDateChallenge: new Date(2023, 2, 1),
  endDateChallenge: new Date(2024, 10, 30),
  dailySteps: 0,
  weekSteps: [],
  allStep: [],
  streak: 0,
  goal: 10000,
  updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
  updateSteps: (newStepsValue) => set({ dailySteps: newStepsValue }),
  updateWeekSteps: (newStepsValue) => set({ weekSteps: newStepsValue }),
}));
