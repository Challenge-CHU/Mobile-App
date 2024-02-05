import React from "react";
import { View, StyleSheet } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import BubbleMessage from "./BubbleMessage";

const Walky = () => {
  const idleUrl = process.env.EXPO_PUBLIC_S3_URL;

  return (
    <View style={styles.container}>
      <View>
        <Rive
          url={idleUrl}
          stateMachineName="State Machine 1"
          // style={{ width: ResponsiveWidth(35.1), height: ResponsiveHeight(24.8) }}
          style={{
            width: ResponsiveHeight(35.5),
            height: ResponsiveHeight(44.1),
            // width: 300,
            // height: 373,
            padding: 0,
            margin: 0,
            // backgroundColor: "red",
          }}
          // style={{ width: 350, height: 423, backgroundColor: "red" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Walky;
