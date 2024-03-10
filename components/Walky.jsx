import React from "react";
import { View, StyleSheet } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import BubbleMessage from "./BubbleMessage";

const Walky = ({ width, height, reverse }) => {
  return (
    <View style={styles.container}>
      <View>
        <Rive
          resourceName="idle_walky1"
          // url={idleUrl}
          stateMachineName="State Machine 1"
          // style={{ width: ResponsiveWidth(35.1), height: ResponsiveHeight(24.8) }}
          style={{
            width: width,
            height: height,
            padding: 0,
            margin: 0,
            transform: reverse != undefined ? "scaleX(-1)" : "",
            backgroundColor: "transparent",
          }}
          fit="contain"
          alignment="center"
        />
      </View>
    </View>
  );
};
export const Walky2 = ({ width, height, reverse }) => {
  const artBoards = ["arm walky", "Idle Walky", "Walk Walky", "Dance walky"];
  return (
    <View style={styles.container}>
      <View>
        <Rive
          resourceName="walky"
          artboardName="arm walky"
          // url={idleUrl}
          stateMachineName="State Machine 1"
          // style={{ width: ResponsiveWidth(35.1), height: ResponsiveHeight(24.8) }}
          style={{
            width: width,
            height: height,
            padding: 0,
            margin: 0,
            transform: reverse != undefined ? "scaleX(-1)" : "",
            backgroundColor: "transparent",
          }}
          fit="contain"
          alignment="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Walky;
