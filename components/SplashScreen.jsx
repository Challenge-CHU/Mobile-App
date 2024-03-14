import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import Walky from "./Walky";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Walky
        width={ResponsiveHeight(59)}
        height={ResponsiveHeight(59)}
        mode="walk"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colors.blue,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999999,
    height: "100%",
    width: "100%",
  },
});

export default SplashScreen;
