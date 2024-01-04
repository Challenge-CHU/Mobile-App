import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import { Colors } from "../styles";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

const Profil = () => {
  return (
    <>
      <PlateformSafeView
        styles={{
          backgroundColor: Colors.colors.blue,
          height: "100%",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.colors.blue,
            height: ResponsiveHeight(17),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: ResponsiveWidth(8.2),
            gap: ResponsiveHeight(2.84),
          }}
        >
          <Image
            source={require("../assets/iconfriend.png")}
            style={{
              width: ResponsiveWidth(19.2),
              height: ResponsiveHeight(10.9),
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              color: "#FFFFFF",
              fontSize: ResponsiveHeight(3.08),
              fontWeight: "600",
            }}
          >
            Pseudo
          </Text>
          <Image
            source={require("../assets/setting-wheel.png")}
            style={{
              width: ResponsiveWidth(5.8),
              height: ResponsiveHeight(2.8),
            }}
            resizeMode="contain"
          />
        </View>
      </PlateformSafeView>
      <BottomSheet styles={{ height: ResponsiveHeight(72), padding: 0 }}>
        <View
          style={{
            paddingHorizontal: ResponsiveHeight(2.8),
            paddingVertical: ResponsiveHeight(3.79),
            position: "relative",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: ResponsiveHeight(2.8), fontWeight: "700" }}
            >
              Badges Années
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              top: -ResponsiveHeight(1.89),
              right: ResponsiveHeight(3.79),
            }}
          >
            <Image
              source={require("../assets/walkyy.png")}
              style={{
                width: ResponsiveWidth(18),
                height: ResponsiveHeight(12),
              }}
              resizeMode="contain"
            />
          </View>
          <View></View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({});

export default Profil;
