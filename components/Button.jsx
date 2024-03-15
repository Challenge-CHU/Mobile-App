import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { Colors } from "../styles";
import aspectRatio from "../tools/AspectRatio";

const Button = ({ title, onPress, color, bgColor }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: bgColor != undefined ? bgColor : Colors.colors.darkblue,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: ResponsiveHeight(1.42),
      // paddingVertical: ResponsiveHeight(1),
      paddingVertical: 14,
      width: "100%",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        style={{
          fontSize: aspectRatio(ResponsiveHeight(2.3)),
          color: color != undefined ? color : "#ffffff",
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
