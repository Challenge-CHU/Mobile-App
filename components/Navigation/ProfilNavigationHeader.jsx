import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";
import { useImageStore } from "../../store/useImageStore";

const ProfilNavigationHeader = ({ back, options, route, navigation }) => {
  const { name } = route;
  const { getImageFromCache, imageCache } = useImageStore();

  const getBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
        paddingVertical: ResponsiveHeight(3.5),
        position: "relative",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: "visible",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        columnGap: 12,
      }}
    >
      {name != "ProfilHome" && (
        <TouchableOpacity onPress={getBack}>
          <Image
            source={{ uri: getImageFromCache("backarrow") }}
            resizeMode="contain"
            style={{
              width: ResponsiveHeight(4),
              height: ResponsiveHeight(4),
              objectFit: "contain",
              // backgroundColor: "red",
            }}
          />
        </TouchableOpacity>
      )}

      {name === "ProfilHome" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: aspectRatio(ResponsiveHeight(2.8)),
              fontWeight: "700",
            }}
          >
            Badges
          </Text>
        </View>
      )}
      {name === "Settings" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: aspectRatio(ResponsiveHeight(2.8)),
              fontWeight: "700",
            }}
          >
            Paramètres
          </Text>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          top: -ResponsiveHeight(1.89),
          right: ResponsiveHeight(3.79),
        }}
      >
        <Image
          source={{ uri: getImageFromCache("walkyy") }}
          style={{
            width: ResponsiveWidth(18),
            height: ResponsiveHeight(12),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfilNavigationHeader;
