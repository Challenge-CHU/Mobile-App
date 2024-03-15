import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import aspectRatio from "../tools/AspectRatio";
import { PercentageOf } from "../tools/Percentage";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { useImageStore } from "../store/useImageStore";

const LittleWalkyMsg = ({ message, hideWalky }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: ResponsiveWidth(5.6),
        paddingVertical: ResponsiveHeight(1.8),
        // marginBottom: ResponsiveHeight(1.8),
        gap: ResponsiveWidth(5),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hideWalky === true ? null : (
        <Image
          source={{ uri: getImageFromCache("littlewalky") }}
          style={{
            width: ResponsiveWidth(7.4),
            height: ResponsiveHeight(5.32),
          }}
          resizeMode="contain"
        />
      )}

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
        <Text
          style={{
            color: "black",
            fontSize: ResponsiveHeight(1.8),
            // fontSize: aspectRatio(10),
            // fontSize: `${PercentageOf(Dimensions.get("screen").height, 1.8)}px`,
          }}
        >
          {message ??
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LittleWalkyMsg;
