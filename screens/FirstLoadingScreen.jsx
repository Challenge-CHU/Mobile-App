import React, { useEffect, useState } from "react";
import ImageLoader from "../components/ImageLoader.jsx";
import { View, StyleSheet, Text } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { useImageStore } from "../store/useImageStore.jsx";
const FirstLoadingScreen = () => {
  const idleUrl = process.env.EXPO_PUBLIC_S3_URL;
  

  return (
    <View style={styles.container}>
      <Rive
        url={idleUrl}
        stateMachineName="State Machine 1"
        style={{ width: 400, height: 400 }}
      />
      <Text>First</Text>
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

export default FirstLoadingScreen;
