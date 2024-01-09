import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const BottomSheet = ({ styles, children }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View style={{ ...styled.container }}>
      <TouchableOpacity onPress={openBottomSheet}>
        <Text>Open BottomSheet</Text>
      </TouchableOpacity>

      {bottomSheetVisible && (
        <View style={{ ...styled.bottomSheet, ...styles }}>
          {/* <TouchableOpacity onPress={closeBottomSheet}>
            <Text>Close BottomSheet</Text>
          </TouchableOpacity> */}
          {children}
        </View>
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
    height: 300, // You can adjust this value according to your design
    backgroundColor: "white",
    // backgroundColor: "red",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 5,
  },
});

export default BottomSheet;
