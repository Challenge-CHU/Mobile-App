import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

const ScrollTabView = ({ children, onChange }) => {
  const scrollViewRef = useRef(null);
  const [visibleChild, setVisibleChild] = useState(1);

  const handleScroll = (event) => {
    const scrollViewWidth = Dimensions.get("window").width;
    const offsetX = event.nativeEvent.contentOffset.x;

    const child1Position = offsetX;
    const child2Position = offsetX - scrollViewWidth;

    const visibilityThreshold = scrollViewWidth * 0.8; // Ajustez le seuil de visibilité

    if (child1Position >= 0 && child1Position < visibilityThreshold) {
      setVisibleChild(1);
    } else if (
      child2Position >= -visibilityThreshold &&
      child2Position < scrollViewWidth
    ) {
      setVisibleChild(2);
    } else {
      setVisibleChild(1);
    }
  };

  useEffect(() => {
    if (onChange != undefined) {
      onChange(visibleChild);
    }
  }, [visibleChild]);

  const handleScrollToTab = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: Dimensions.get("window").width,
        animated: true,
      });
    }
  };

  const handleScrollToPreviousTab = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={handleScrollToPreviousTab}>
          <Text
            style={{
              color: "#000000",
              color: "#000000",
              opacity: visibleChild === 1 ? 1 : 0.25,
              fontFamily: "Inter-Regular",
            }}
          >
            Perso
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 2,
            height: 24,
            backgroundColor: "black",
            borderRadius: 64,
            opacity: 0.25,
          }}
        />
        <TouchableOpacity onPress={handleScrollToTab}>
          <Text
            style={{
              color: "#000000",
              color: "#000000",
              opacity: visibleChild === 2 ? 1 : 0.25,
              fontFamily: "Inter-Regular",
            }}
          >
            Global
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
        horizontal={true}
        style={{
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
              key={idx}
              style={{
                width: Dimensions.get("window").width,
                overflow: "hidden",
                justifyContent: "flex-start",
              }}
            >
              {child}
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ScrollTabView;
