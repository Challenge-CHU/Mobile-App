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
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const ScrollTabView = ({ children, onChange, tabNames, color }) => {
  const scrollViewRef = useRef(null);
  const [visibleChild, setVisibleChild] = useState(1);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    if (viewableItems[0]) {
      setVisibleChild(viewableItems[0].index + 1);
    }
  }, []);

  useEffect(() => {
    if (onChange != undefined) {
      onChange(visibleChild);
    }
  }, [visibleChild]);

  const handleScrollToTab = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToIndex({ index, animated: true });
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
          name={tabNames[0]}
          onPressEvent={() => handleScrollToTab(0)}
          visibleChild={visibleChild}
          id={1}
          color={color}
        />

        <View
          style={{
            width: 2,
            height: ResponsiveHeight(2.8),
            backgroundColor: color,
            borderRadius: 64,
            opacity: 0.25,
          }}
        />
        <TabText
          name={tabNames[1]}
          // name={"Global"}
          onPressEvent={() => handleScrollToTab(1)}
          visibleChild={visibleChild}
          id={2}
          color={color}
        />
      </View>
      <FlatList
        ref={scrollViewRef}
        snapToStart
        pagingEnabled
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={children}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get("window").width,
            }}
          >
            {item}
          </View>
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

const TabText = ({ name, onPressEvent, visibleChild, id, color }) => {
  return (
    <TouchableOpacity style={{ position: "relative" }} onPress={onPressEvent}>
      <Text
        style={{
          color: color,
          opacity: visibleChild === id ? 1 : 0.4,
          fontFamily: "Inter-Regular",
          fontSize: ResponsiveHeight(1.6),
          borderBottomWidth: 2,
          borderBottomColor: "#000000",
        }}
      >
        {name}
      </Text>
      {visibleChild === id ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: color,
            opacity: 1,
            borderRadius: 2,
          }}
        ></View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ScrollTabView;
