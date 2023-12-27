import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Typography, Colors, Buttons } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { PercentageOf } from "../tools/Percentage";
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
        // style={{
        //   width: ResponsiveWidth(62),
        //   height: ResponsiveWidth(28.5),
        //   backgroundColor: "yellow",
        // }}
        style={{ width: "100%", height: "100%" }}
        // style={{ width: "100%", height: "90%" }} //Avant c'etait 80% height
        resizeMode="contain"
      />
      <View
        style={{
          flex: 1,
          width: ResponsiveWidth(23),
          height: ResponsiveHeight(16),
          // width: "20%",
          // height: "45%",
          position: "absolute",
          bottom: PercentageOf(ResponsiveHeight(16), 35),
          // bottom: 32,
          // bottom: "25%",
        }}
      >
        <Image
          source={require("../assets/walkyy.png")}
          style={{
            width: ResponsiveWidth(23),
            // width: "100%",
            height: ResponsiveHeight(16), // Set height to 'auto' to maintain aspect ratio
            // height: "100%", // Set height to 'auto' to maintain aspect ratio
            resizeMode: "contain", // Scale image to fit while maintaining aspect ratio
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          // bottom: "10%",
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
