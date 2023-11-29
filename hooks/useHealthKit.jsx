import { useEffect, useState } from "react";
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

  const handleGetCountStep = (options) => {
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error get step count: ", err);
        return;
      }
      setSteps(results.value);
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
    return () => {
      clearInterval(interval);
    };
  }, [hasPermissions]);

  return {
    steps,
    hasPermissions,
  };
};
