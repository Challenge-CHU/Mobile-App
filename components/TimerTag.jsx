import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { PercentageOf } from "../tools/Percentage";
import { useImageStore } from "../store/useImageStore";
import { useStepCountStore } from "../store/useStepCountStore";
const TimerTag = ({ datetime }) => {
  /**
   * TODO: Gérer la logique du tems restant ici
   */

  const { endDateChallenge } = useStepCountStore();
  const { getImageFromCache, imageCache } = useImageStore();

  const [monthRemaining, setMonthRemaining] = useState();

  const handleDate = () => {
    const today = new Date();
    const endDate = new Date(endDateChallenge);
    const remainingTime = new Date(endDate.getTime() - today.getTime());
    setMonthRemaining(remainingTime.getUTCMonth());
  };

  useEffect(() => {
    if (endDateChallenge != undefined && endDateChallenge != null) handleDate();
  }, []);

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
          {monthRemaining > 1 && monthRemaining != undefined
            ? monthRemaining + " mois restants"
            : ""}
          {monthRemaining <= 1 && monthRemaining != undefined
            ? "Dernier mois"
            : ""}
        </Text>
      </View>
      <View
        style={{
          transform: `translateY(-${PercentageOf(ResponsiveHeight(3.7), 4)}px)`,
          zIndex: 2,
        }}
      >
        <Image
          source={{ uri: getImageFromCache("timer") }}
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
