import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import { useImageStore } from "../store/useImageStore";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
const NoChallenge = () => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <PlateformSafeView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "22%",
        }}
      >
        <Image
          source={{ uri: getImageFromCache("chu-blanc") }}
          style={{
            objectFit: "contain",
            width: ResponsiveHeight(27.7),
            height: ResponsiveHeight(14.8),
          }}
        />
      </View>

      <View
        style={{
          height: "56%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: "10%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            transform: [{ translateY: ResponsiveHeight(9.4) }],
          }}
        >
          <BubbleMessage
            msg={
              "Il n’y a aucun challenge en cours en ce moment, reviens plus tard !"
            }
          />
          <View
            style={{
              position: "absolute",
              top: ResponsiveHeight(12),
              right: -ResponsiveHeight(1.4),
            }}
          >
            <Walky
              width={ResponsiveHeight(35.5)}
              height={ResponsiveHeight(44.1)}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "22%",
        }}
      >
        <Image
          source={{ uri: getImageFromCache("cesi-blanc") }}
          style={{
            objectFit: "contain",
            width: ResponsiveHeight(24),
            height: ResponsiveHeight(15),
          }}
        />
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default NoChallenge;
