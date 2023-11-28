import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  NativeEventEmitter,
  NativeModules,
} from "react-native";
import PlateformSafeView from "./components/PlateformSafeView";
import { useEffect, useState } from "react";
import AppleHealthKit, { HealthKitPermission } from "react-native-health";
import ProgressCircle from "./components/ProgressCircle";
import AnimatedSquare from "./components/AnimatedSquare";
import { Colors } from "./styles";
import useHealthData from "./hooks/useHealthData";

export default function App() {
  const halfWindowsHeigth = Dimensions.get("window").height / 2; //50 VH
  const STEP_GOAL = 10000;

  //Hook pour récupérer la données depuis health au format: new Date(YYYY-MM-DD)
  const { steps } = useHealthData(new Date());

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
          {/* <ProgressCircle objectif={10000} progression={progressValue} /> */}
          <ProgressCircle objectif={STEP_GOAL} progression={steps} />
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







