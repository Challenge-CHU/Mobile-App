import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import Walky from "../components/Walky";
import GreyCard from "../components/GreyCard";
import { useImageStore } from "../store/useImageStore";

const Social = () => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <>
      <PlateformSafeView styles={{ backgroundColor: Colors.colors.blue }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600", color: "#ffffff" }}>
            Mes amis
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#317DBA",
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderRadius: 6,
            }}
          >
            <Image
              source={{ uri: getImageFromCache("plus") }}
              style={{
                objectFit: "contain",
                width: 15,
                height: 15,
              }}
            />
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
              Ajouter un ami
            </Text>
          </TouchableOpacity>
        </View>
      </PlateformSafeView>
      <BottomSheet styles={{ height: ResponsiveHeight(70), padding: 0 }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View
            style={{
              height: ResponsiveHeight(33),
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Walky
              width={ResponsiveHeight(35.5)}
              height={ResponsiveHeight(44.1)}
              reverse
            />
          </View>
          <GreyCard />
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({});

export default Social;
