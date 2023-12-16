import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Colors } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import { PercentageOf } from "../tools/Percentage";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const fakeData = [
  { int: 187000, description: "Pas cumulés aujourd'hui" },
  { int: 1584, description: "Marcheurs" },
  { int: 6000000, description: "Pas depuis le début" },
  { int: 7576, description: "Pas moyen par marcheur" },
];

const GlobalStats = () => {
  let screenHeight = Dimensions.get("screen").height;

  let tabtext = PercentageOf(screenHeight, 1.6);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: ResponsiveHeight(1.4),
        // backgroundColor: "purple",
        flex: 2,
        marginHorizontal: "auto",
        width: "100%",
      }}
    >
      {fakeData.map(({ int, description }, idx) => {
        return <Stats key={idx} int={int} description={description} />;
      })}
    </View>
  );
};

const Stats = ({ int, description }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: ResponsiveHeight(1.4),
        height: "auto",
        width: "80%",
        marginHorizontal: "auto",
      }}
    >
      <Text
        style={{
          color: Colors.colors.darkblue,
          fontSize: ResponsiveHeight(3.4),
          fontWeight: "700",
          width: "50%",
          textAlign: "right",
        }}
      >
        {int.toLocaleString("fr-FR")}
      </Text>

      <Text
        style={{
          fontWeight: "600",
          fontSize: ResponsiveHeight(1.4),
          width: "50%",
          textAlign: "left",
        }}
      >
        {description}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({});

export default GlobalStats;
