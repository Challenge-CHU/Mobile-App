import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import Walky from "./Walky";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Walky width={400} height={400} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colors.blue,
  },
});

export default SplashScreen;
