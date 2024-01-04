import { create } from "zustand";


export const useStepCountStore = create((set) => ({
  startDateChallenge: null,
  endDateChallenge: null,
  dailySteps: 0,
  weekSteps: [],
  allStep: [],
  streak: 0,
  goal: 10000,
  updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
  updateSteps: (newStepsValue) => set({ dailySteps: newStepsValue }),
  updateWeekSteps: (newStepsValue) => set({ weekSteps: newStepsValue }),
}));
