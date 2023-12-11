import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import PlateformSafeView from "../components/PlateformSafeView";
import ProgressCircle from "../components/ProgressCircle";
import { Colors, Spacing, Typography } from "../styles";
import LottieView from "lottie-react-native";
import aspectRatio from "../tools/AspectRatio";
import useStepCount from "../hooks/useStepCount";
import ScrollTabView from "../components/ScrollTabView";

const Home = () => {
  const [visibleChild, setVisibleChild] = useState(1);

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
        }}
      >
        {/* View lottie fire + chrono */}
        <View
          style={{
            paddingHorizontal: Spacing.padding.sm,
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
            position: "relative",
            overflow: "visible",
          }}
        >
          <LottieView
            source={require("../assets/fire.json")}
            style={{ width: 50, height: 50, zIndex: 2 }}
            loop
            autoPlay
          />
          <View
            style={{
              backgroundColor: Colors.colors.blue,
              paddingHorizontal: Spacing.padding.md,
              paddingVertical: aspectRatio(4),
              borderBottomRightRadius: 16,
              borderTopRightRadius: 16,
              transform: "translate(-20px, 10px)",
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: Colors.colors.white,
                fontWeight: "700",
                fontSize: aspectRatio(Typography.fontSizes.sm),
              }}
            >
              3 jours
            </Text>
          </View>
        </View>
        {/* selector tab perso && global */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: "#000000",
              color: "#000000",
              opacity: visibleChild === 1 ? 1 : 0.25,
            }}
          >
            Goodbye
          </Text>
          <View
            style={{
              width: 2,
              height: 24,
              backgroundColor: "black",
            }}
          ></View>
          <Text
            style={{
              color: "#000000",
              color: "#000000",
              opacity: visibleChild === 2 ? 1 : 0.25,
            }}
          >
            Goodbye
          </Text>
        </View>

        <ScrollTabView onVisible={handleOnVisible}>
          <ProgressCircle objectif={STEP_GOAL} progression={steps} />
          <View>
            <Text>Global 1</Text>
            <Text>Global 1</Text>
            <Text>Global 1</Text>
            <Text>Global 1</Text>
            <Text>Global 1</Text>
          </View>
        </ScrollTabView>

        {/* <ProgressCircle objectif={STEP_GOAL} progression={steps} /> */}
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
      >
        <Text>Steps</Text>
        <Text>{steps}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text>Cliquez ici pour changer la valeur</Text>
        </TouchableOpacity>
      </View>
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
