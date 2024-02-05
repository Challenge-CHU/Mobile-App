import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useImageStore } from "../store/useImageStore";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const BubbleMessage = ({ msg }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{msg}</Text>
      <View style={styles.bottomBubble}>
        <Image
          source={{ uri: getImageFromCache("queue") }}
          style={{
            objectFit: "contain",
            width: ResponsiveHeight(4.9),
            height: ResponsiveHeight(3.1),
          }}
          // style={{ objectFit: "contain", width: 42, height: 27 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    position: "relative",
    width: "auto",
    paddingVertical: ResponsiveHeight(2.6),
    paddingHorizontal: ResponsiveHeight(2.6),
    borderRadius: ResponsiveHeight(1.4),
  },
  bottomBubble: {
    position: "absolute",
    bottom: -ResponsiveHeight(2.9),
    right: "50%",

    // backgroundColor: "green",
  },
  text: {
    fontSize: ResponsiveHeight(2.1),
    fontWeight: "600",
  },
});

export default BubbleMessage;
