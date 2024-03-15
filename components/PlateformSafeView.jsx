import { View, Text, Platform, SafeAreaView } from "react-native";
import { Typography, Spacing, Colors, Buttons } from "../styles";
import React from "react";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const PlateformSafeView = ({ children, styles }) => {
  if (Platform.OS === "android") {
    return (
      <View
        style={{
          color: Colors.colors.black,
          paddingTop: ResponsiveHeight(4),
          ...styles,
        }}
      >
        {children}
      </View>
    );
  } else if (Platform.OS === "ios") {
    return <SafeAreaView style={styles}>{children}</SafeAreaView>;
  } else {
    <View
    style={{
      color: Colors.colors.black,
      paddingTopTop: ResponsiveHeight(4),
      ...styles,
    }}
  >
    {children}
  </View>
  }
};

export default PlateformSafeView;