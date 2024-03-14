import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";
import { useImageStore } from "../../store/useImageStore";
import { useUserStore } from "../../store/useUserStore";
import { Badges } from "../../components/BadgeList";

const BadgeDetail = ({ navigation, route }) => {
  const { badges } = useUserStore();
  const [arrayFamilyBadge, setArrayFamilyBadge] = useState([]);
  const { params } = route;


  useEffect(() => {
    const familyIdToSort = params.id; // L'ID de la famille de badges que vous souhaitez trier

    const badgesOfFamily = badges.filter(
      (badge) => badge.badge_family_id === familyIdToSort
    );

    setArrayFamilyBadge(badgesOfFamily);
  }, [params]);

  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titre}>{params.title}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ gap: ResponsiveHeight(3.7) }}
        contentContainerStyle={{
          gap: ResponsiveHeight(3.7),
          paddingBottom: ResponsiveHeight(8),
        }}
      >
        {arrayFamilyBadge.map((item, idx) => {
          return <BadgesDetailed key={idx} badge={item} />;
        })}
      </ScrollView>
    </View>
  );
};
export const BadgesDetailed = ({ badge }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: getImageFromCache(badge.labelImage) }}
        style={{
          width: ResponsiveWidth(27.9),
          height: ResponsiveHeight(8.8),
          objectFit: "contain",
          opacity: badge.earned ? 1 : 0.25,
        }}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.text}>{badge.name}</Text>
        {/* <Text>{badge.description}</Text> */}
      </View>
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
    marginBottom: ResponsiveHeight(4),
  },
});

export default BadgeDetail;
