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

  const {
    handleGetCountStepForADay,
    handleGetAllStepsFromBeginning,
    steps,
    handleGetWeekSteps,
    weekSteps,
    allSteps,
  } = Platform.OS === "ios" ? useHealthKit(date) : useGoogleFit(date);

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

  const calculateStatsForDate = async (date) => {
    const steps = await handleGetStepsByDate(date);

    console.log("les pas dans function: ", steps);

    if (steps != undefined) {
      const km = convertStepToKm(steps);
      const ecoScore = computeEcoScore(steps);
      const kcal = computeKcal(steps);

      const stats = [
        { int: steps || 0, description: "Pas" },
        { int: km || 0, description: "Km cumulés" },
        { int: kcal || 0, description: "Kcal brulées" }, // Remplacez cette valeur par votre vrai calcul
        { int: ecoScore || 0, description: "Eco score" },
      ];

      return stats;
    } else {
      return [
        { int: 0, description: "Pas" },
        { int: 0, description: "Km cumulés" },
        { int: 0, description: "Kcal brulées" }, // Remplacez cette valeur par votre vrai calcul
        { int: 0, description: "Eco score" },
      ];
    }
  };

  const handleGetStepsByDate = async (date) => {
    try {
      const result = await handleGetCountStepForADay(date);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des pas :", error);
      return null;
    }
  };

  const computeAllDataFromBegining = async () => {
    const stepsObj = await handleGetStepsFromBeginning();

    if (stepsObj != undefined) {
      console.log("CA PASSE");
      const totalSteps = stepsObj.reduce((acc, obj) => acc + obj.value, 0);
      const average = Math.round(totalSteps / stepsObj.length);
      const km = Math.round(convertStepToKm(totalSteps));

      const stats = [
        { int: totalSteps || 0, description: "Pas cumulés" },
        { int: km || 0, description: "Km cumulés" },
        { int: average || 0, description: "Moy des pas par jour" },
      ];

      return stats;
    } else {
      console.log("CA PASSE PAS");
      const stats = [
        { int: 0, description: "Pas cumulés" },
        { int: 0, description: "Km cumulés" },
        { int: 0, description: "Moy des pas par jour" },
      ];
      return stats;
    }
  };

  const handleGetStepsFromBeginning = async () => {
    try {
      const result = await handleGetAllStepsFromBeginning();
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des pas :", error);
      return null;
    }
  };

  const handleFormatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const dateFormatee = date.toLocaleDateString("fr-FR", options);

    const moisEnMajuscules = dateFormatee.replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

    return moisEnMajuscules;
  };

  const convertStepToKm = (step) => {
    const stepsLengthInKm = 0.00076;
    const distanceInKm = step * stepsLengthInKm;
    return distanceInKm;
  };
  const computeKcal = (step) => {
    const caloriesPerStepDefault = 0.05;
    const caloriesBurned = step * caloriesPerStepDefault;
    return caloriesBurned;
  };
  const computeEcoScore = (step) => {
    const empreinteCarbonePerStepDefault = 0.0002;
    const kgCO2Economises = step * empreinteCarbonePerStepDefault;
    return kgCO2Economises;
  };

  return {
    handleFormatDate,
    handleGetStepsByDate,
    calculateStatsForDate,
    computeAllDataFromBegining,
    handleGetStepsFromBeginning,
  };
};

export default useStepCount;
