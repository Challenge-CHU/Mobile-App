import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import aspectRatio from "../tools/AspectRatio";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../store/useImageStore";
import { useUserStore } from "../store/useUserStore";

const BadgeList = ({ titre }) => {
  const navigation = useNavigation();
  const { badges } = useUserStore();

  // const badgesGroupedByFamilyId = badges.reduce((acc, badge) => {
  //   // Vérifier si la famille existe déjà dans l'accumulateur
  //   if (acc.hasOwnProperty(badge.badge_family_id)) {
  //     // Ajouter le badge à la famille existante
  //     acc[badge.badge_family_id].push(badge);
  //   } else {
  //     // Créer un nouvel entrée pour la famille et y ajouter le badge
  //     acc[badge.badge_family_id] = [badge];
  //   }
  //   return acc;
  // }, {});

  // Triez les badges par badge_family_id
  badges.sort((a, b) => a.badge_family_id.localeCompare(b.badge_family_id));

  // Créez un objet pour stocker les badges uniques par famille
  const uniqueBadgesByFamily = {};

  // Parcourez les badges triés
  badges.forEach((badge) => {
    if (!uniqueBadgesByFamily.hasOwnProperty(badge.badge_family_id)) {
      // Si la famille n'existe pas encore, ajoutez le badge
      uniqueBadgesByFamily[badge.badge_family_id] = badge;
    } else {
      // Si la famille existe déjà, vérifiez si le badge actuel est earned et a un rang plus élevé
      const existingBadge = uniqueBadgesByFamily[badge.badge_family_id];
      if (!existingBadge.earned && badge.earned) {
        // Si le badge actuel est earned et a un rang plus élevé, remplacez le badge existant
        uniqueBadgesByFamily[badge.badge_family_id] = badge;
      } else if (
        !existingBadge.earned &&
        !badge.earned &&
        badge.rank < existingBadge.rank
      ) {
        // Si aucun des deux badges n'est earned mais le badge actuel a un rang plus faible, remplacez le badge existant
        uniqueBadgesByFamily[badge.badge_family_id] = badge;
      }
    }
  });

  // Convertissez l'objet en tableau
  const uniqueBadges = Object.values(uniqueBadgesByFamily);

  // console.log(uniqueBadges);

  const sortedBadges = badges.sort((a, b) => a.rank - b.rank);

  return (
    <View style={{ gap: ResponsiveHeight(3.7) }}>
      {/* {titre && (
        <Text
          style={{
            fontSize: aspectRatio(ResponsiveHeight(2.3)),
            fontWeight: "700",
          }}
        >
          {titre}
        </Text>
      )} */}

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-around",
          rowGap: ResponsiveHeight(4),
          marginTop: ResponsiveHeight(1.8),
          marginBottom: ResponsiveHeight(7),
        }}
      >
        {uniqueBadges.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Badges", {
                  id: item.badge_family_id,
                  title: item.BadgeFamily.name,
                  badgeFamily: item.badge_family_id,
                })
              }
            >
              <Badges badge={item} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const Badges = ({ badge }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default BadgeList;
