import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";

const ProfilNavigationHeader = ({ back, options, route, navigation }) => {
  // const ProfilNavigationHeader = ({ title, navigation }) => {
  const { name } = route;
  const getBack = () => {
    console.log("hey: ", name);
    navigation.goBack();
  };
  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
        paddingVertical: ResponsiveHeight(3.5),
        position: "relative",
        // backgroundColor: "green",
      }}
    >
      {name != "ProfilHome" ? (
        <TouchableOpacity onPress={getBack}>
          <Text>Heyho</Text>
        </TouchableOpacity>
      ) : (
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
            Badges Années
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
          source={require("../../assets/walkyy.png")}
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
