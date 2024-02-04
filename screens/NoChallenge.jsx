import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import { useImageStore } from "../store/useImageStore";
const NoChallenge = () => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <PlateformSafeView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "blue",
          height: "22%",
        }}
      >
        <Image
          source={{ uri: getImageFromCache("chu-blanc") }}
          style={{ objectFit: "contain", width: 234, height: 125 }}
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
            transform: "translateY(-80px)",
          }}
        >
          <BubbleMessage
            msg={
              "Il n’y a aucun challenge en cours en ce moment, reviens plus tard !"
            }
          />
          <View style={{ position: "absolute", top: 12, right: -65 }}>
            <Walky />
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
          style={{ objectFit: "contain", width: 208, height: 130 }}
        />
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default NoChallenge;
