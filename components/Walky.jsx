import React, { useEffect, useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import BubbleMessage from "./BubbleMessage";

const Walky = ({ width, height, reverse, mode }) => {
  const [modeAnim, setModeAnim] = useState(undefined);

  useEffect(() => {
    let artboard;
    let machineState;
    // const artBoards = ["arm walky", "Idle Walky", "Walk Walky", "Dance walky"];

    switch (mode) {
      case "idle":
        artboard = "Idle Walky";
        machineState = "Idle";
        break;
      case "dance":
        artboard = "Dance walky";
        machineState = "State Machine 2";
        break;
      case "walk":
        artboard = "Walk Walky 1";
        machineState = "State Machine 1";
        break;
      default:
        break;
    }

    setModeAnim({ artboard: artboard, machineState: machineState });
  }, [mode]);

  if (modeAnim === undefined || modeAnim.artboard === undefined) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Rive
          resourceName="walky_animation"
          // resourceName="idle_walky1"
          // url={idleUrl}
          artboardName={modeAnim.artboard}
          // stateMachineName="State Machine 1"
          stateMachineName={modeAnim.machineState}
          // style={{ width: ResponsiveWidth(35.1), height: ResponsiveHeight(24.8) }}
          style={{
            width: width,
            height: height,
            padding: 0,
            margin: 0,
            transform: reverse != undefined ? "scaleX(-1)" : "",
            backgroundColor: "transparent",
          }}
          fit="scaleDown"
          // fit="fill"
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
