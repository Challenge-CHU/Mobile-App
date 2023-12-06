import { useEffect, useState } from "react";
import AppleHealthKit, { HealthKitPermission } from "react-native-health";
import { NativeEventEmitter, NativeModules } from "react-native";

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
  console.log("utilise healthkit hook");

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
  //A tester

  // useEffect(() => {
  //   new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
  //     'healthKit:Steps:new',
  //     async () => {
  //       console.log('--> observer triggered');
  //     },
  //   );
  // });

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
