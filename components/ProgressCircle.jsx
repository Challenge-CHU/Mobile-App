import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { PercentageOf } from "../tools/Percentage";
import { useImageStore } from "../store/useImageStore";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
import Walky from "./Walky";

const ProgressCircle = ({ objectif, progression }) => {
  const [animationProgress, setAnimationProgress] = useState(
    new Animated.Value(0)
  );

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const { getImageFromCache, imageCache } = useImageStore();
  const handleDanceTransition = () => {
    setCompleted(true);
  };

  useEffect(() => {
    // Calculer le pourcentage d'avancement par rapport à l'objectif
    // const progressPercentage = (progression / objectif) * 100;
    if (progression >= objectif) {
      setTimeout(handleDanceTransition, 750);
    } else {
      setCompleted(false);
    }

    setProgressPercentage((progression / objectif) * 100);
    // Mettre à jour la valeur d'animation en fonction du pourcentage
    Animated.timing(animationProgress, {
      toValue: progressPercentage / 100,
      duration: 500, // Durée de l'animation en millisecondes
      easing: Easing.ease,
      // easing: Easing.linear,
      useNativeDriver: true, // Nécessaire pour les animations Lottie
    }).start();
  }, [progression, objectif, progressPercentage]);

  return (
    <View style={styles.container}>
      {completed ? (
        <Walky width={300} height={300} mode="dance" />
      ) : (
        <AnimatedLottieView
          source={require("../assets/arm-walky.json")}
          progress={animationProgress ?? 0}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      )}

      <View
        style={{
          position: "absolute",
          bottom: -5,
        }}
      >
        <Text
          style={{
            fontSize: ResponsiveHeight(3.5),
            fontWeight: 700,
            color: Colors.colors.darkblue,
          }}
        >
          {progression}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    flex: 1,
  },
});

export default ProgressCircle;
