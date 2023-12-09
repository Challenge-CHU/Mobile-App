import { View, Text, Platform, SafeAreaView } from "react-native";
import { Typography, Spacing, Colors, Buttons } from "../styles";
import React from "react";

const PlateformSafeView = ({ children, styles }) => {
  if (Platform.OS === "android") {
    return (
      <View
        style={{
          color: Colors.colors.black,
          paddingTop: 32,
        }}
      >
        {children}
      </View>
    );
  } else if (Platform.OS === "ios") {
    return <SafeAreaView style={styles}>{children}</SafeAreaView>;
  }
};

export default PlateformSafeView;
