import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Colors } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import { PercentageOf } from "../tools/Percentage";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";


const GlobalStats = ({ data, flex, justifyStart }) => {
  let screenHeight = Dimensions.get("screen").height;

  let tabtext = PercentageOf(screenHeight, 1.6);

  return (
    <View
      style={{
        justifyContent: justifyStart != undefined ? "flex-start" : "center",
        alignItems: "center",
        gap: ResponsiveHeight(1.4),
        // backgroundColor: "purple",
        flex: flex ? 1 : 0,
        marginHorizontal: "auto",
        width: "100%",
      }}
    >
      {data &&
        data.map(({ int, description }, idx) => {
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
          // fontSize: ResponsiveHeight(3.4),
          fontWeight: "700",
          // width: "50%",
          textAlign: "right",
        }}
      >
        {int != null ? int.toLocaleString("fr-FR") : 0}
      </Text>

      <Text
        style={{
          fontWeight: "600",
          fontSize: ResponsiveHeight(1.6),
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
