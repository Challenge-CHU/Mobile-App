import { useEffect, useState } from "react";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { useStepCountStore } from "../store/useStepCountStore";
import * as BackgroundFetch from "expo-background-fetch";
import { AsyncStorage } from "react-native"; // ou toute autre méthode de stockage que vous utilisez
import * as TaskManager from "expo-task-manager";

const permissions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    // Ajoutez d'autres scopes au besoin
  ],
};

export const useGoogleFit = () => {
  console.log("Utilise le hook Google Fit");
  const BACKGROUND_FETCH_TASK = "backgroundFetchTask";
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const stepCountStore = useStepCountStore();

  // let task = TaskManager.getRegisteredTasksAsync();

  // console.log("tasks: ", task);

  const backgroundFetchTask = async (taskId) => {
    console.log("Tâche en arrière-plan exécutée.");
    await handleGetDailySteps();
    BackgroundFetch.finish(taskId);
  };

  //Enregistre les pas
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

  const hanldeGetAuth = () => {
    // Authentication if already not authorized for a particular device
    GoogleFit.authorize(permissions)
      .then((authResult) => {
        if (authResult.success) {
          console.log("[Permission Accordé]");
          setHasPermissions(true);
          // if successfully authorized, fetch data
        } else {
          console.log("Permission Réfuser]");
        }
      })
      .catch(() => {
        console.log("OOOOOOOOO:");
        dispatch("AUTH_ERROR");
      });
  };

  const handleGetDailySteps = async () => {
    console.log("tu passe par ou ?");

    try {
      let today = new Date();
      let lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 8
      );
      const options2 = {
        startDate: lastWeekDate.toISOString(),
        endDate: today.toISOString(),
      };
      const dailySteps = await GoogleFit.getDailyStepCountSamples(options2);

      console.log("Daily Steps:", dailySteps);
      const googleFitData = dailySteps.find(
        (entry) => entry.source === "com.google.android.gms:estimated_steps"
      );
      console.log("trier entry: ", googleFitData);

      if (googleFitData.steps[0].value) {
        setSteps(googleFitData.steps[0].value);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des pas:", error);
    }
  };

  //Au Lancement, récupérer les authorisation
  useEffect(() => {
    console.log("gang");
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

    test = true;
  }, []);

  useEffect(() => {
    if (!hasPermissions) return;

    handleGetDailySteps();

    recordStep();
  }, [hasPermissions]);

  return {
    steps,
    hasPermissions,
    recordStep,
  };
};


