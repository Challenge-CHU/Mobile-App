import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Typography, Colors, Buttons } from "../styles";
import aspectRatio from "../tools/AspectRatio";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const ProgressCircle = ({ objectif, progression }) => {
  const [animationProgress, setAnimationProgress] = useState(
    new Animated.Value(0)
  );

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
        progress={animationProgress}
        style={{ width: "100%", height: "80%" }}
        // style={{ width: 281, height: 400 }}
      />
      <View
        style={{
          flex: 1,
          width: "20%",
          height: "45%",
          position: "absolute",
          bottom: "25%",
        }}
      >
        <Image
          source={require("../assets/walkyy.png")}
          style={{
            width: "100%",
            height: "100%", // Set height to 'auto' to maintain aspect ratio
            resizeMode: "contain", // Scale image to fit while maintaining aspect ratio
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "10%",
        }}
      >
        <Text
          style={{
            fontSize: aspectRatio(Typography.fontSizes.xl),
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
