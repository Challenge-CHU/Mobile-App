import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import aspectRatio from "../tools/AspectRatio";

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
            fontSize: aspectRatio(Typography.fontSizes.sm),
          }}
        >
          2 mois restants
        </Text>
      </View>
      <Image
        source={require("../assets/timer.png")}
        style={{
          width: 26,
          height: 32,
          zIndex: 2,
          transform: "translateY(-4pxpx)",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimerTag;
