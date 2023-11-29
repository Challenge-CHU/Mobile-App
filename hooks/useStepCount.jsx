import React, { useEffect, useState } from "react";
import { useStepCountStore } from "../store/useStepCountStore";
import { useHealthKit } from "./useHealthKit";
import { useGoogleFit } from "./useGoogleFit";
import { Platform } from "react-native";

const useStepCount = (date) => {
  const { streak, updateStreak } = useStepCountStore();

  const { steps } =
    Platform.OS === "ios" ? useHealthKit(date) : useGoogleFit(date);

  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     // Utilisation du hook pour android
  //     const androidStepHook = useGoogleFit(date);
  //     setSteps(androidStepHook.steps);
  //   } else if (Platform.OS === "ios") {
  //     // Utilisation du hook pour ios

  //     const iosStepHook = useHealthKit(date);
  //     setSteps(iosStepHook.steps);
  //   }
  // }, [date]);

  useEffect(() => {
    // Effect pour obtenir et mettre à jour les données de l'API
    // ...
    // Mise à jour du streak en fonction des données reçues
    // updateStreak(newStreakValue);
  }, []); // Assurez-vous de gérer les dépendances correctement

  // Enregistrez dans le local storage à chaque mise à jour
  // useEffect(() => {
  //   localStorage.setItem("stepCountStreak", JSON.stringify(streak));
  // }, [streak]);

  return {
    steps,
    streak,
    updateStreak,
  };
};

// // Chargez la valeur du local storage au démarrage de l'application
// const initialStreak = JSON.parse(localStorage.getItem("stepCountStreak")) || 0;
// useStepCountStore.setState({ streak: initialStreak });

export default useStepCount;
