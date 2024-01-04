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
        <Rive
          url="https://hajimejudobucket.s3.eu-west-3.amazonaws.com/idle_walky.riv"
          // resourceName="idle-walky"
          // artboardName="walky"
          stateMachineName="State Machine 1"
          style={{ width: 400, height: 400 }}
        />
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default Social;
