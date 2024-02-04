import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useImageStore } from "../store/useImageStore";

const BubbleMessage = ({ msg }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{msg}</Text>
      <View style={styles.bottomBubble}>
        <Image
          source={{ uri: getImageFromCache("queue") }}
          style={{ objectFit: "contain", width: 42, height: 27 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    // backgroundColor: "yellow",
    position: "relative",
    width: "auto",
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  // wrapper: {

  // },
  bottomBubble: {
    position: "absolute",
    bottom: -25,
    right: "50%",

    // backgroundColor: "green",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BubbleMessage;
