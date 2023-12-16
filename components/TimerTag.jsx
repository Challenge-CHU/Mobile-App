import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { PercentageOf } from "../tools/Percentage";

const TimerTag = ({ datetime }) => {
  //Gérer le temps restant ici
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
      <View
        style={{
          backgroundColor: "#F1F1F1",
          paddingHorizontal: Spacing.padding.md,
          paddingVertical: aspectRatio(4),
          borderBottomLeftRadius: 16,
          borderTopLeftRadius: 16,
          transform: "translateX(12px)",
          zIndex: 1,
        }}
      >
        <Text
          style={{
            color: Colors.colors.blue,
            fontWeight: "700",
            fontSize: ResponsiveHeight(1.4),
          }}
        >
          2 mois restants
        </Text>
      </View>
      <View
        style={{
          transform: `translateY(-${PercentageOf(ResponsiveHeight(3.7), 4)}px)`,
          zIndex: 2,
        }}
      >
        <Image
          source={require("../assets/timer.png")}
          style={{
            width: ResponsiveWidth(6.66),
            height: ResponsiveHeight(3.7),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimerTag;
