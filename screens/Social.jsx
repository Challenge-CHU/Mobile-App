import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Rive from "rive-react-native";

const Social = () => {
  return (
    <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Hello</Text>
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default Social;
