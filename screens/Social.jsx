import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import ManualCounter from "../components/ManualCounter";

const Social = () => {
  return (
    <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}>
      {/* <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ManualCounter int={123} />
      </View> */}
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default Social;
