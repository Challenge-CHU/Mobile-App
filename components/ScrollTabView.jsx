import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";

const ScrollTabView = ({ children, onVisible }) => {
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollViewWidth = Dimensions.get("window").width;
    const offsetX = event.nativeEvent.contentOffset.x;

    const child1Position = offsetX;
    const child2Position = offsetX - scrollViewWidth;

    const visibilityThreshold = scrollViewWidth * 0.8; // Ajustez le seuil de visibilité

    if (child1Position >= 0 && child1Position < visibilityThreshold) {
      onVisible(1);
    } else if (
      child2Position >= -visibilityThreshold &&
      child2Position < scrollViewWidth
    ) {
      onVisible(2);
    } else {
      onVisible(null);
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      horizontal={true}
      style={{
        // backgroundColor: "yellow",
        width: "100%",
        height: "auto",
        flexDirection: "row",
        overflow: "scroll",
      }}
      decelerationRate={0}
      snapToInterval={Dimensions.get("window").width}
      snapToAlignment={"center"}
      scrollEventThrottle={16}
    >
      {children.map((child, idx) => {
        return (
          <View
            style={{
              width: Dimensions.get("window").width,
              backgroundColor: idx + 1 === 1 ? "red" : "yellow",
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            {child}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ScrollTabView;
