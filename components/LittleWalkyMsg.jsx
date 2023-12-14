import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import aspectRatio from "../tools/AspectRatio";

const LittleWalkyMsg = ({ message }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 22,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/littlewalky.png")}
        style={{ width: 29, height: 45 }}
        // width="8px"
        // height="8px"
      />
      <View
        style={{
          backgroundColor: "#FAFAFA",
          flex: 1,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          height: 40,
          borderBottomLeftRadius: 12,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
          height: "auto",
        }}
      >
        <Text style={{ color: "black" }}>
          {message ??
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. "}
        </Text>
      </View>
    </View>
  );
};
// 0px 3px 4px rgba(0, 0, 0, 0.15)

const styles = StyleSheet.create({});

export default LittleWalkyMsg;
