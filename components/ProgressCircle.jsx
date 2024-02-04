import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { PercentageOf } from "../tools/Percentage";
import { useImageStore } from "../store/useImageStore";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const ProgressCircle = ({ objectif, progression }) => {
  const [animationProgress, setAnimationProgress] = useState(
    new Animated.Value(0)
  );

  const { getImageFromCache, imageCache } = useImageStore();

  useEffect(() => {
    // Calculer le pourcentage d'avancement par rapport à l'objectif
    const progressPercentage = (progression / objectif) * 100;

    // Mettre à jour la valeur d'animation en fonction du pourcentage
    Animated.timing(animationProgress, {
      toValue: progressPercentage / 100,
      duration: 1000, // Durée de l'animation en millisecondes
      easing: Easing.linear,
      useNativeDriver: false, // Nécessaire pour les animations Lottie
    }).start();
  }, [progression, objectif]);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require("../assets/grph2.json")}
        progress={animationProgress ?? 0}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
      <View
        style={{
          flex: 1,
          width: ResponsiveWidth(23),
          height: ResponsiveHeight(16),
          position: "absolute",
          bottom: PercentageOf(ResponsiveHeight(16), 35),
        }}
      >
        <Image
          source={{ uri: getImageFromCache("walkyy") }}
          style={{
            width: ResponsiveWidth(23),
            height: ResponsiveHeight(16),
            resizeMode: "contain", // Pour que l'image ne soit pas cut en hauteur ou longueur
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
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
