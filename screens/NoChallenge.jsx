import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import { useImageStore } from "../store/useImageStore";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import { SvgUri } from "react-native-svg/src/xml";
import { useStepCountStore } from "../store/useStepCountStore";

const NoChallenge = ({ navigation }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  const {
    updateDates,
    startDateChallenge,
    endDateChallenge,
    updateStartDate,
    updateEndDate,
    updateIdChall,
  } = useStepCountStore();

  useEffect(() => {
    if (startDateChallenge != undefined && endDateChallenge != undefined) {
      console.log("ya des dates");
      navigation.navigate("SignUp");
    }
  }, [startDateChallenge, endDateChallenge]);

  return (
    <PlateformSafeView>
      <View
        style={{
          height: ResponsiveHeight(100),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: "14%",
            paddingHorizontal: ResponsiveHeight(4.7),
            marginTop: ResponsiveHeight(4.9),
            marginBottom: ResponsiveHeight(2),
            // paddingHorizontal: 40,
            // marginTop: 42,
          }}
        >
          <View
            style={{
              width: ResponsiveHeight(17.7),
              height: ResponsiveHeight(8.2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgUri
              width="100%"
              height="100%"
              uri={getImageFromCache("cesi")}
              fill={"#ffffff"}
            />
          </View>
          <View
            style={{
              width: ResponsiveHeight(17.7),
              height: ResponsiveHeight(8.2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgUri
              width="100%"
              height="100%"
              uri={getImageFromCache("chu")}
              fill={"#ffffff"}
            />
          </View>
        </View>
        <View
          style={{
            height: ResponsiveHeight(34),
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
              transform: `translateY(-${ResponsiveHeight(9.2)}px)`,
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
                top: ResponsiveHeight(4),
                right: -ResponsiveHeight(7.7),
              }}
            >
              <Walky
                width={ResponsiveHeight(31.5)}
                height={ResponsiveHeight(40.1)}
                mode="idle"
              />
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: ResponsiveHeight(4.7),
            flexDirection: "column",
            position: "relative",
            zIndex: 99,
          }}
        >
          <View
            style={{
              marginTop: ResponsiveHeight(3.7),
              marginBottom: ResponsiveHeight(4.7),
              gap: ResponsiveHeight(1.8),
              position: "relative",
              zIndex: 99,
            }}
          ></View>
        </View>
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({});

export default NoChallenge;
