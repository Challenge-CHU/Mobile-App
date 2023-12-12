import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import PlateformSafeView from "../components/PlateformSafeView";
import ProgressCircle from "../components/ProgressCircle";
import { Colors, Spacing, Typography } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import useStepCount from "../hooks/useStepCount";
import ScrollTabView from "../components/ScrollTabView";
import GlobalStats from "../components/GlobalStats";
import FireTag from "../components/FireTag";
import TimerTag from "../components/TimerTag";
// import { useFonts } from "expo-font";
// let customFonts = {
//   // 'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf')
//   "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
//   "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
//   "AlegreyaSansSC-Bold": require("../assets/fonts/AlegreyaSansSC-Bold.ttf"),
// };

const Home = () => {
  // const [isLoaded] = useFonts(customFonts);
  const [visibleChild, setVisibleChild] = useState(1);
  const scrollViewRef = useRef(null);

  const halfWindowsHeigth = Dimensions.get("window").height / 2; //50 VH
  const STEP_GOAL = 10000;

  //Hook pour récupérer la données depuis health au format: new Date(YYYY-MM-DD)
  const { steps } = useStepCount(new Date());

  //OLD: fonction pour changer le graph dynamiquement depuis un bouton
  const handlePress = () => {
    if (progressValue >= 10000 || progressValue === undefined) {
      setProgressValue(1000);
    } else {
      setProgressValue((prevValue) => Math.min(prevValue + 1000, 10000));
    }
  };

  const handleOnVisible = (visibleInt) => {
    setVisibleChild(visibleInt);
  };

  return (
    <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}>
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
          paddingTop: aspectRatio(10),
        }}
      >
        {/* View lottie fire + chrono */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FireTag />
          <TimerTag />
        </View>
        {/* selector tab perso && global */}

        <ScrollTabView>
          <ProgressCircle objectif={STEP_GOAL} progression={steps} />
          <GlobalStats />
        </ScrollTabView>

        {/* Test fontFamily */}
        {/* <Text
          style={{
            color: "#000000",
            opacity: 1,
            fontSize: 32,
            textAlign: "center",
            fontWeight: "700",
            fontFamily: "Inter-Bold",
          }}
        >
          187 000
        </Text> */}
      </View>
      {/* FIn header blanc */}
      <View
        style={{
          backgroundColor: Colors.colors.blue,
          flexGrow: 1,
          height: "100%",
          transform: "translateY(-30px)",
          zIndex: 0,
          paddingTop: 40,
        }}
      ></View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
