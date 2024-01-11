import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const BottomSheet = ({ styles, children }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  return (
    <View style={{ ...styled.container }}>
      {bottomSheetVisible && (
        <View style={{ ...styled.bottomSheet, ...styles }}>{children}</View>
      )}
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 5,
  },
});

export default BottomSheet;
