import React, { useEffect, useState, useCallback } from "react";
import { useStepCountStore } from "../store/useStepCountStore";
import { useHealthKit } from "./useHealthKit";
import { useGoogleFit } from "./useGoogleFit";
import { Platform } from "react-native";

const useStepCount = () => {
  let date = new Date();
  const store = useStepCountStore();

  const setSteps = useCallback(
    (nouveauxPas) => {
      store.updateSteps(nouveauxPas);
    },
    [store.updateSteps]
  );
  const setWeekSteps = useCallback(
    (nouveauxPas) => {
      store.updateWeekSteps(nouveauxPas);
    },
    [store.updateWeekSteps]
  );

  const { steps, handleGetWeekSteps, weekSteps, allSteps } =
    Platform.OS === "ios" ? useHealthKit(date) : useGoogleFit(date);

  useEffect(() => {
    if (steps != undefined) {
      setSteps(steps);
    }
  }, [steps]);

  useEffect(() => {
    if (weekSteps != undefined) {
      setWeekSteps(weekSteps);
    }
  }, [weekSteps]);
};

export default useStepCount;
