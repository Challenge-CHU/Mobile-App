import { useEffect, useState, useMemo } from "react";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { useStepCountStore } from "../store/useStepCountStore";

const permissions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
  ],
};

export const useGoogleFit = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const { startDateChallenge } = useStepCountStore();


  const handleGetCountStepForADay = async (date) => {
    let selectDate = new Date(date);

    let startOfDay = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate(),
      0, // heures
      0, // minutes
      0, // secondes
      0 // millisecondes
    );

    // Obtenir la date de fin de la journée actuelle
    let endOfDay = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate(),
      23, // heures
      59, // minutes
      59, // secondes
      999 // millisecondes
    );

    const options = {
      startDate: startOfDay.toISOString(),
      endDate: endOfDay.toISOString(),
    };

    console.log("date debut : ", selectDate.toLocaleString());
    console.log("date fin : ", endOfDay.toLocaleString());

    const dailySteps = await GoogleFit.getDailyStepCountSamples(options);

    const googleFitData = dailySteps.find(
      (entry) => entry.source === "com.google.android.gms:estimated_steps"
    );

    // console.log("resulttttt: ", googleFitData.steps);

    if (googleFitData.steps != undefined) {
      const totalSteps = googleFitData.steps.reduce(
        (acc, obj) => acc + obj.value,
        0
      );
      return totalSteps;
    }

    return googleFitData.steps;
  };
  const handleGetAllStepsFromBeginning = async () => {
    let today = new Date();
    let firstDayChallenge = new Date(startDateChallenge);
    // console.log("start: ", firstDayChallenge.toISOString());
    // console.log("end: ", today.toISOString());

    const options = {
      startDate: firstDayChallenge.toISOString(),
      endDate: today.toISOString(),
    };

    const dailySteps = await GoogleFit.getDailyStepCountSamples(options);
    // console.log("gg fit data all sources: ", dailySteps);
    // console.log("OOOMEGGAAAA: ", dailySteps);

    const googleFitData = dailySteps.find(
      (entry) => entry.source === "com.google.android.gms:estimated_steps"
    );

    // console.log("gg fit data: ", googleFitData);

    return googleFitData.steps;
  };

  //Demande d'authorisation API Google
  const hanldeGetAuth = () => {
    GoogleFit.authorize(permissions)
      .then((authResult) => {
        if (authResult.success) {
          setHasPermissions(true);
          console.log("[Permission Accordé]");
        } else {
          console.log("Permission Réfuser]");
        }
      })
      .catch(() => {
        dispatch("AUTH_ERROR");
      });
  };

  //Les pas de la semaine
  const handleGetDailySteps = async () => {
    try {
      let today = new Date();
      let lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 8
      );

      // console.log("Semaine dernière: ", lastWeekDate);
      // console.log("Aujourd'hui: ", today);

      const options = {
        startDate: lastWeekDate.toISOString(),
        endDate: today.toISOString(),
      };

      //Retourne les pas de toutes les sources (Xiaomi, samsung, google, etc)
      const dailySteps = await GoogleFit.getDailyStepCountSamples(options);
      console.log("Daily Steps:", dailySteps);

      //Filtre pour récupèrer que la source de l'api Google
      const googleFitData = dailySteps.find(
        (entry) => entry.source === "com.google.android.gms:estimated_steps"
      );

      let todayDate = googleFitData.steps.find((item) => {
        return item.date === new Date().toISOString().split("T")[0];
      });

      if (todayDate != undefined && todayDate.value) {
        setSteps(todayDate.value);
      } else {
        setSteps(0);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des pas:", error);
    }
  };

  //Au Lancement, Vérifie les authorisations
  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;

      console.log(authorized);

      if (authorized) {
        setHasPermissions(true);
        console.log("[Permissons déjà accordé]");
        return;
      } else {
        console.log("[Demande de permissions]");
        hanldeGetAuth();
      }
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) return;

    handleGetDailySteps();

    // recordStep();
  }, [hasPermissions]);

  return {
    steps,
    hasPermissions,
    // recordStep,
    handleGetCountStepForADay,
    handleGetAllStepsFromBeginning,
  };
};
