import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Card from "./Card";
import Graph from "./Graph";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { gap, padding } from "../styles/spacing";
import { Colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../store/useImageStore";
import IconProfil from "./IconProfil";
import { useUserStore } from "../store/useUserStore";
import Constants from "expo-constants";
import { useStepCountStore } from "../store/useStepCountStore";

export const LayoutHome = React.memo(({ value }) => {
  if (value === 1) return <LayoutHomePerso />;
  if (value === 2) return <LayoutHomeGlobal />;
});

export const LayoutHomePerso = React.memo(() => {
  const { getImageFromCache, imageCache } = useImageStore();
  const { badges } = useUserStore();
  const [dataBadges, setDataBadges] = useState();
  const [count, setCount] = useState();
  const [selectedBadge, setSelectedBadge] = useState(undefined);
  const navigation = useNavigation();

  const handlecount = badges.reduce((acc, obj) => {
    if (obj.earned) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    if (badges != undefined && badges.length > 0) {
      const random = Math.floor(Math.random() * badges.length);
      setSelectedBadge(badges[random]);
      setDataBadges(badges);
    }
  }, []);

  useEffect(() => {
    setDataBadges(badges);
    setCount(handlecount);
  }, [badges]);

  if (selectedBadge === undefined) return null;

  return (
    <>
      {/* Card Statistique */}
      <TouchableOpacity
        style={{ width: "100%", height: "auto" }}
        onPress={() => navigation.navigate("Historical")}
      >
        <Card
          style={{
            width: "100%",
            height: ResponsiveHeight(17.3),
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: ResponsiveHeight(1.9),
              fontWeight: "700",
            }}
          >
            Historique & statistiques
          </Text>

          <Graph />
        </Card>
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          paddingBottom: ResponsiveHeight(2.84),
          flexDirection: "row",
          alignItems: "center",
          gap: ResponsiveWidth(8.72),
        }}
      >
        <TouchableOpacity
          style={{ width: "55%", height: "100%" }}
          onPress={() => navigation.navigate("Profil")}
        >
          <Card
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              height: ResponsiveHeight(15.28),
            }}
          >
            <Text
              style={{
                fontSize: ResponsiveHeight(1.9),
                fontWeight: "700",
              }}
            >
              {selectedBadge.name}
            </Text>
            <Image
              source={{ uri: getImageFromCache(selectedBadge.labelImage) }}
              style={{
                width: ResponsiveWidth(27.95),
                height: ResponsiveHeight(8.89),
                position: "absolute",
                top: -12,
                right: -40,
                objectFit: "contain",
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: ResponsiveHeight(1.9) }}>
                {selectedBadge.earned ? "Débloquer" : "Non débloqué"}
              </Text>
              <Text style={{ fontSize: ResponsiveHeight(1.9) }}>
                {count}/{badges.length}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: ResponsiveWidth(28.97),
            height: ResponsiveHeight(15.28),
          }}
          onPress={() => navigation.navigate("Social")}
        >
          <Card
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: -ResponsiveHeight(2),
              }}
            >
              <IconProfil
                selected={false}
                id={1}
                width={ResponsiveWidth(12.56)}
                height={ResponsiveHeight(7.11)}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginTop: ResponsiveHeight(1.42),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: ResponsiveHeight(1.9),
                  fontWeight: "700",
                }}
              >
                Ajouter un Ami
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </>
  );
});

export const LayoutHomeGlobal = React.memo(() => {
  const { getImageFromCache } = useImageStore();
  const {
    totalDistanceInEarthCircumnavigations,
    totalCO2SavedInKg,
    totalDistanceInKilometers,
  } = useStepCountStore();

  return (
    <View style={{ flexGrow: 1, gap: ResponsiveHeight(1.42) }}>
      <GlobalStatsCard
        stat={totalDistanceInEarthCircumnavigations}
        text="Tour(s) de la Terre parcourus ensemble"
        icon={getImageFromCache("earth")}
      />
      <GlobalStatsCard
        stat={totalCO2SavedInKg}
        text="Kg de CO² économisé"
        icon={getImageFromCache("feuille")}
      />
      <GlobalStatsCard
        stat={totalDistanceInKilometers}
        text="Km parcourus"
        icon={getImageFromCache("green-character")}
      />
    </View>
  );
});

const GlobalStatsCard = ({ stat, text, icon }) => {
  return (
    <Card
      style={{
        height: "4%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 0,
        gap: ResponsiveWidth(6.1),
      }}
    >
      <Text
        style={{
          fontSize: ResponsiveHeight(3.3),
          margin: 0,
          padding: 0,
          fontWeight: "700",
          color: Colors.colors.darkblue,
        }}
      >
        {stat}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: ResponsiveHeight(1.6) }}>{text}</Text>
      </View>
      <Image
        source={{ uri: icon }}
        style={{
          objectFit: "contain",
          width: ResponsiveWidth(7.6),
          height: ResponsiveHeight(3.5),
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({});
