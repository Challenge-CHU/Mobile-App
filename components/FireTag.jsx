import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import LottieView from "lottie-react-native";
import aspectRatio from "../tools/AspectRatio";
import { PercentageOf } from "../tools/Percentage";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

const FireTag = ({ streak }) => {
  //Gérer la streak en temps ici
  return (
    <View
      style={{
        paddingHorizontal: Spacing.padding.sm,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        position: "relative",
        overflow: "visible",
      }}
    >
      <LottieView
        source={require("../assets/fire.json")}
        style={{
          width: ResponsiveWidth(11),
          height: ResponsiveHeight(5.4),
          // height: 50,
          zIndex: 2,
          transform: `translateY(-${PercentageOf(
            ResponsiveHeight(5.4),
            12.9
          )}px)`,
        }}
        loop
        autoPlay
        resizeMode="contain"
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
          position: "relative",
        }}
      >
        <Text
          style={{
            color: Colors.colors.white,
            fontWeight: "700",
            fontSize: ResponsiveHeight(1.4),
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
