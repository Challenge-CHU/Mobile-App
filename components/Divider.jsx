import React from "react";
import { View, StyleSheet } from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

const Divider = ({ style }) => {
  return <View style={{ ...styles.default, ...style }}></View>;
};

const styles = StyleSheet.create({
  default: {
    width: "95%",
    borderBlockColor: "#000000",
    borderWidth: 1,
    marginVertical: ResponsiveHeight(3),
    marginHorizontal: "auto",
    alignSelf: "center",
  },
});

export default Divider;
