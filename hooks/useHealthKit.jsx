import { useEffect, useMemo, useState } from "react";
import AppleHealthKit, { HealthKitPermission } from "react-native-health";
import { useStepCountStore } from "../store/useStepCountStore";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Observers.Walking,
    ],
    write: [],
  },
};

export const useHealthKit = (date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [weekSteps, setWeekSteps] = useState();
  const { startDateChallenge } = useStepCountStore();

  const handleGetAllChallengeSteps = useMemo(() => {
    //Todo: Récupérer la date de début de challenge qui doit etre un param et la date d'aujoud'hui ou la date de fin en param
  });

  const handleGetCountStep = (options) => {
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error get step count: ", err);
        return;
      }
      setSteps(results.value);
    });
  };

  const handleGetCountStepForADay = (date) => {
    return new Promise((resolve, reject) => {
      const options = {
        date: date.toISOString(),
        includeManuallyAdded: false,
      };

      AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log("Error get step count: ", err);
          reject(err);
          return;
        }

        // console.log("test date dans le use healthkit: ", results.value);
        resolve(results.value);
      });
    });
  };

  const handleGetAllStepsFromBeginning = () => {

    return new Promise((resolve, reject) => {
      let today = new Date();
      let firstDayChallenge = new Date(startDateChallenge);

      // const differenceInMillis = today.getTime() - firstDayChallenge.getTime();
      // const differenceInMinutes = differenceInMillis / (1000 * 60);
      // console.log("différence en minutes: ", differenceInMinutes);
      let optionDate = {
        startDate: firstDayChallenge.toISOString(),
        endDate: today.toISOString(),
        includeManuallyAdded: false,
        period: 1440, //period en minutes sinon il va donner un datetime par enregistrement
      };

      AppleHealthKit.getDailyStepCountSamples(optionDate, (err, results) => {
        if (err) {
          console.log("Error get step week: ", err);
          return;
        }
        // console.log(results, " CUrieux");
        resolve(results);
      });
    });
  };

  const handleGetWeekSteps = async () => {
    let day = date.getDay();
    let daysBefore = 0;
    if (day === 0) {
      daysBefore = 6;
    } else {
      daysBefore = day - 1;
    }

    let today = new Date();
    let lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysBefore
    );

    // console.log("last week date: ", lastWeekDate);

    let optionDate = {
      startDate: lastWeekDate.toISOString(),
      endDate: today.toISOString(),
      includeManuallyAdded: false,
      period: 1440, //1440 minutes => 24 heures
    };

    AppleHealthKit.getDailyStepCountSamples(optionDate, (err, results) => {
      if (err) {
        console.log("Error get step week: ", err);
        return;
      }

      // console.log("alors ?: ", results, " ", optionDate);
      setWeekSteps(results);
    });
  };

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("Error getting permissions: ", err);
        return;
      }
      console.log("permissions accordé");

      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      console.log("pas de permissions");
      return;
    }
    const options = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    handleGetCountStep(options);
    const interval = setInterval(() => handleGetCountStep(options), 300000);
    handleGetWeekSteps();
    return () => {
      clearInterval(interval);
    };
  }, [hasPermissions]);

  return {
    steps,
    hasPermissions,
    handleGetWeekSteps,
    weekSteps,
    handleGetCountStepForADay,
    handleGetAllStepsFromBeginning,
  };
};
