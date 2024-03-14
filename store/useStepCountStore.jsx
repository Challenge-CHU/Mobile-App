import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStepCountStore = create(
  persist(
    (set, get) => ({
      startDateChallenge: null,
      endDateChallenge: null,
      challengeId: null,
      dailySteps: 0,
      weekSteps: [],
      allSteps: [],
      streak: 0,
      goal: 10000,

      numberOfUsers: 0,
      totalSteps: 0,
      averageStepsPerUser: null,
      todaySteps: 0,
      totalDistanceInEarthCircumnavigations: "0.000",
      totalCO2SavedInKg: "0.0",
      totalDistanceInKilometers: "0",

      updateStreak: (newStreakValue) => set({ streak: newStreakValue }),
      updateSteps: (newStepsValue) => set({ dailySteps: newStepsValue }),
      updateWeekSteps: (newStepsValue) => set({ weekSteps: newStepsValue }),
      updateStartDate: (newStepsValue) =>
        set({ startDateChallenge: newStepsValue }),
      updateEndDate: (newStepsValue) =>
        set({ endDateChallenge: newStepsValue }),
      updateDates: (startDate, endDate) =>
        set({ startDateChallenge: startDate, endDateChallenge: endDate }),
      updateIdChall: (newId) => set({ challengeId: newId }),
      updateStats: (
        newNumberOfUsers,
        newTotalSteps,
        newAverageStepsPerUser,
        newTodaySteps,
        newTotalDistanceInEarthCircumnavigations,
        newTotalCO2SavedInKg,
        newTotalDistanceInKilometers
      ) =>
        set({
          numberOfUsers: newNumberOfUsers,
          totalSteps: newTotalSteps,
          averageStepsPerUser: newAverageStepsPerUser,
          todaySteps: newTodaySteps,
          totalDistanceInEarthCircumnavigations:
            newTotalDistanceInEarthCircumnavigations,
          totalCO2SavedInKg: newTotalCO2SavedInKg,
          totalDistanceInKilometers: newTotalDistanceInKilometers,
        }),
      deconnection: () =>
        set({ startDateChallenge: null, endDateChallenge: null }),
    }),
    {
      name: "steps", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
