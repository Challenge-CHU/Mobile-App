import { useEffect, useMemo, useState } from "react";
import AppleHealthKit, { HealthKitPermission } from "react-native-health";

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

  const handleGetWeekSteps = async () => {
    let day = date.getDay();
    let daysBefore = 0;
    if (day === 0) {
      daysBefore = -6;
    } else {
      daysBefore = day - 1;
    }

    let today = new Date();
    let lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysBefore
    );

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

      // results.map((item, idx) => {
      //   let date = new Date(item.endDate);
      //   let day = date.getDay();
      //   console.log(`${idx} DAY: ${day}, steps: ${item.value}`);
      // });
      setWeekSteps(results);
    });
  };

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("Error getting permissions: ", err);
        return;
      }

      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
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
  };
};
