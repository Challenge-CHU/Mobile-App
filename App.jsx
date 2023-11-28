import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PlateformSafeView from "./components/PlateformSafeView";
import { useEffect, useState } from "react";
import AppleHealthKit, { HealthKitPermission } from "react-native-health";
import ProgressCircle from "./components/ProgressCircle";
import AnimatedSquare from "./components/AnimatedSquare";
import { Colors } from "./styles";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
    ],
    write: [],
  },
};

export default function App() {
  const halfWindowsHeigth = Dimensions.get("window").height / 2;
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);

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
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error get step count: ", err);
        return;
      }
      console.log("le results: ", results.value);
      setSteps(results.value);
    });
  }, [hasPermissions]);

  const [progressValue, setProgressValue] = useState(1000);

  useEffect(() => {
    console.log("la progression dans app: ", progressValue);
  }, [progressValue]);

  const handlePress = () => {
    if (progressValue >= 10000 || progressValue === undefined) {
      setProgressValue(1000);
    } else {
      setProgressValue((prevValue) => Math.min(prevValue + 1000, 10000));
    }
  };

  return (
    <>
      <PlateformSafeView>
        <View
          style={{
            height: halfWindowsHeigth,
            borderWidth: 1,
            borderColor: "transparent",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            zIndex: 1,
          }}
        >
          <ProgressCircle objectif={10000} progression={progressValue} />
        </View>
        <View
          style={{
            backgroundColor: Colors.colors.blue,
            flexGrow: 1,
            height: "100%",
            transform: "translateY(-30px)",
            zIndex: 0,
            paddingTop: 40,
          }}
        >
          <Text>Steps</Text>
          <Text>{steps}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text>Cliquez ici pour changer la valeur</Text>
          </TouchableOpacity>
        </View>
      </PlateformSafeView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});







