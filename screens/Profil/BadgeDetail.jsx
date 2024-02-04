import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";
import { useImageStore } from "../../store/useImageStore";

const BadgeDetail = ({ navigation, route }) => {
  /**
   * TODO: Ajuster en fonction de la façon dont
   * les données seront envoyés
   */

  const { params } = route;

  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
        gap: ResponsiveHeight(3.7),
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titre}>{params.badge.name}</Text>
      </View>
      <BadgeLevel
        badge={params.badge}
        level={3}
        objectif="Marcher 1 000 000 pas"
      />
      <BadgeLevel
        badge={params.badge}
        level={2}
        objectif="Marcher 500 000 pas"
      />
      <BadgeLevel
        badge={params.badge}
        level={1}
        objectif="Marcher 100 000 pas"
      />
    </View>
  );
};

const BadgeLevel = ({ badge, level, objectif }) => {
  const { getImageFromCache, imageCache } = useImageStore();
  let levels = {
    1: getImageFromCache("bronze"),
    2: getImageFromCache("silver"),
    3: getImageFromCache("gold"),
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: levels[level] }}
        style={{
          width: ResponsiveWidth(27.9),
          height: ResponsiveHeight(8.8),
          objectFit: "contain",
          opacity: badge.unlock ? 1 : 0.25,
        }}
        resizeMode="contain"
      />
      <Text style={styles.text}>{objectif}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: ResponsiveHeight(2.3),
  },
  text: {
    fontSize: ResponsiveHeight(1.8),
    fontWeight: "500",
  },
  titre: {
    fontSize: ResponsiveHeight(2.3),
    fontWeight: "700",
    paddingHorizontal: ResponsiveHeight(2),
  },
  titleContainer: {
    marginBottom: ResponsiveHeight(5.3),
  },
});

export default BadgeDetail;
