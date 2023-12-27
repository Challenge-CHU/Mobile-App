import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import aspectRatio from "../tools/AspectRatio";
import { PercentageOf } from "../tools/Percentage";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const ScrollTabView = ({ children, onChange }) => {
  const scrollViewRef = useRef(null);
  const [visibleChild, setVisibleChild] = useState(1);
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    // console.log("Visible items are", viewableItems);
    // console.log("Changed in this iteration", changed);
    if (viewableItems[0]) {
      setVisibleChild(viewableItems[0].index + 1);
    }
  }, []);

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
        <TabText
          name={"Perso"}
          onPressEvent={handleScrollToPreviousTab}
          visibleChild={visibleChild}
          id={1}
        />

        <View
          style={{
            width: 2,
            height: 24,
            backgroundColor: "black",
            borderRadius: 64,
            opacity: 0.25,
          }}
        />
        <TabText
          name={"Global"}
          onPressEvent={handleScrollToTab}
          visibleChild={visibleChild}
          id={2}
        />
      </View>
      <FlatList
        snapToStart
        pagingEnabled
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={children}
        renderItem={({ item, index }) => (
          <View style={{ width: Dimensions.get("window").width }}>{item}</View>
        )}
        keyExtractor={(item, index) => index.toString()}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 90,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </>
  );
};

const TabText = ({ name, onPressEvent, visibleChild, id }) => {
  let screenHeight = Dimensions.get("screen").height;

  // let tabtext = PercentageOf(screenHeight, 1.6);

  return (
    <TouchableOpacity onPress={onPressEvent}>
      <Text
        style={{
          color: "#000000",
          color: "#000000",
          opacity: visibleChild === id ? 1 : 0.25,
          fontFamily: "Inter-Regular",
          fontSize: ResponsiveHeight(1.6),
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ScrollTabView;
