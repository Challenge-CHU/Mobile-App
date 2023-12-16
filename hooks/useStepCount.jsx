import React, { useEffect, useState } from "react";
import { useStepCountStore } from "../store/useStepCountStore";
import { useHealthKit } from "./useHealthKit";
import { useGoogleFit } from "./useGoogleFit";
import { Platform } from "react-native";

const useStepCount = () => {
  let date = new Date();
  const { streak, updateStreak } = useStepCountStore();

  const { steps, handleGetWeekSteps, weekSteps } =
    Platform.OS === "ios" ? useHealthKit(date) : useGoogleFit(date);

  return {
    steps,
    streak,
    updateStreak,
    handleGetWeekSteps,
    weekSteps,
  };
};


export default useStepCount;
