import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FAFAFA",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    borderRadius: 12,
    padding: 12,
  },
});

export default Card;
