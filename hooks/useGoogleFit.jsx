import { useEffect, useState } from "react";
import GoogleFit, { Scopes, Fitness } from "react-native-google-fit";

export const useGoogleFit = (date) => {
  console.log("utilise google fit hook");
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        // if already authorized, fetch data
        setHasPermissions(true);
        console.log("yes bébé déjà ");
      } else {
        console.log("non ducoup je demande ");

        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then((authResult) => {
            if (authResult.success) {
              console.log("AUTH_SUCCESS");
              console.log("yes bébé après avoir demander");
              setHasPermissions(true);
              // if successfully authorized, fetch data
            } else {
              console.log("non bébé après avoir demander");

              console.log("AUTH_DENIED " + authResult.message);
            }
          })
          .catch(() => {
            dispatch("AUTH_ERROR");
          });
      }
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) return;

    handleGetDailySteps();
  }, [hasPermissions]);

  //demander les pas quotidien

  const handleGetDailySteps = () => {
    //   const opt = {
    //     startDate: new Date().toISOString(), // required ISO8601Timestamp
    //     endDate: new Date().toISOString(), // required ISO8601Timestamp
    //   };

    //   GoogleFit.getDailyStepCountSamples(opt)
    //     .then((res) => {
    //       console.log("Daily steps >>> ", res);
    //     })
    //     .catch((err) => {
    //       console.warn(err);
    //     });

    const handleStepCount = (stepCount) => {
      console.log(stepCount);
    };

    GoogleFit.getStepCount(new Date(), handleStepCount);
  };

  //Daily Steps
  // var today = new Date();
  // var lastWeekDate = new Date(
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDate() - 8,
  // );
  // const opt = {
  //   startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
  //   endDate: today.toISOString(), // required ISO8601Timestamp
  //   bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  //   bucketInterval: 1, // optional - default 1.
  // };

  // let fetchStepsData = async (opt) => {
  //   const res = await GoogleFit.getDailyStepCountSamples(opt);
  //   if (res.length !== 0) {
  //     for (var i = 0; i < res.length; i++) {
  //       if (res[i].source === 'com.google.android.gms:estimated_steps') {
  //         let data = res[i].steps.reverse();
  //         dailyStepCount = res[i].steps;
  //         setdailySteps(data[0].value);
  //       }
  //     }
  //   } else {
  //     console.log('Not Found');
  //   }
  // };

  // useEffect(() => {
  //   const androidHook = GoogleFitHook(date);
  //   // Utilisez les valeurs spécifiques à Google Fit
  //   setSteps(androidHook.steps);
  // }, [date]);

  return {
    steps,
  };
};
