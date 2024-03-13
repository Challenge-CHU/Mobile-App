import { create } from "zustand";


export const useStepCountStore = create((set, get) => ({
  startDateChallenge: null,
  endDateChallenge: null,
  challengeId: null,
  // startDateChallenge: new Date(2023, 2, 1),
  // endDateChallenge: new Date(2024, 10, 30),
  dailySteps: 0,
  weekSteps: [],
  allSteps: [],
  streak: 0,
  goal: 10000,
  updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
  updateSteps: (newStepsValue) => set({ dailySteps: newStepsValue }),
  updateWeekSteps: (newStepsValue) => set({ weekSteps: newStepsValue }),
  updateStartDate: (newStepsValue) =>
    set({ startDateChallenge: newStepsValue }),
  updateEndDate: (newStepsValue) => set({ endDateChallenge: newStepsValue }),
  updateDates: (startDate, endDate) =>
    set({ startDateChallenge: startDate, endDateChallenge: endDate }),
  updateIdChall: (newId) => set({ challengeId: newId }),
}));
