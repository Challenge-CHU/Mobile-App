import React from "react";
import { View, StyleSheet } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import BubbleMessage from "./BubbleMessage";

const Walky = ({ width, height, reverse }) => {
  const idleUrl = process.env.EXPO_PUBLIC_S3_URL;

  return (
    <View style={styles.container}>
      <View>
        <Rive
          resourceName="idle-walky2"
          // url={idleUrl}
          stateMachineName="State Machine 1"
          // style={{ width: ResponsiveWidth(35.1), height: ResponsiveHeight(24.8) }}
          // style={{
          //   width: width,
          //   height: height,
          //   padding: 0,
          //   margin: 0,
          //   transform: reverse != undefined ? "scaleX(-1)" : "",
          //   backgroundColor: "transparent",
          // }}
          fit="contain"
          alignment="center"
          style={{ width: 350, height: 423, backgroundColor: "transparent" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Walky;
