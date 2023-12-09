import { useEffect, useState } from "react";
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
  // const stepCountStore = useStepCountStore();

  //Observateur pour les pas en temps réel (Pas fiable donc DEPRECATED)
  const recordStep = () => {
    GoogleFit.startRecording((res) => {
      console.log(res, "res1");
      GoogleFit.observeSteps((res) => {
        console.log(res, "res2");
        console.log("HEy");
        if (res.steps) {
          setSteps((prevValue) => prevValue + res.steps);
        }
      });
    });
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
    recordStep,
  };
};