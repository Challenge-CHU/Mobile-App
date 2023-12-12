import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import LottieView from "lottie-react-native";
import aspectRatio from "../tools/AspectRatio";

const FireTag = ({ streak }) => {
  //Gérer la streak en temps ici
  return (
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
        style={{
          width: 50,
          height: 50,
          zIndex: 2,
          transform: "translateY(-8px)",
        }}
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
          transform: "translateX(-20px)",
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
  );
};

const styles = StyleSheet.create({});

export default FireTag;
